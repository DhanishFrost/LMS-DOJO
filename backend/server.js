const express = require('express');
const router = require("./routes/routes");
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cron = require('node-cron');
const eventService = require('./services/eventService');
const bodyParser = require('body-parser');
const ActviityService = require('./services/ActivityService');
const { updateSubmissionStatus } = require('./services/ActivityService');
var readlineSync = require('readline-sync');
//const submissionService = require('./services/submissionService');
const fs = require('fs');


// Set up multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontend/assets/images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Schedule the job to run daily at midnight (00:00)

cron.schedule('0 0 * * *', async () => {
    try {
      const updatedEventCount = await eventService.updateEventStatusToPast();
      console.log(`Updated ${updatedEventCount} events to "past" status.`);
    } catch (error) {
      console.error('Error updating event statuses:', error);
    }
  });


        
  cron.schedule('19 9 * * *', async () => {
    console.log('Running submission status update task...');
    await updateSubmissionStatus();
    console.log('Submission status update task completed.');
});


const app = express();
app.use(cors()); // Enable CORS

app.use(express.json());
app.use(express.static('../frontend'));
app.use('/frontend/assets/images', express.static(path.join(__dirname, '../frontend/assets/images')));
app.use(router);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
// Connection URL
const url = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connection Successful");
    })
    .catch((e) => {
        console.log(e);
    });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const SubmissionStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null , path.join( "./submissionUploads"))
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname)
    }

});

const SubmissionUpload = multer({ storage : SubmissionStorage ,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024
       },
})

app.post('/uploads' , SubmissionUpload.single('submissionFile') , (req, res) => {
    console.log(req.body);
    console.log(req.file);


    return res.send(req.file);
    

});

app.get('/download', (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, 'submissionUploads', filename);

    // Determine the appropriate content type based on the file extension
    let contentType = 'application/octet-stream'; // Default content type

    if (filename.endsWith('.pdf')) {
        contentType = 'application/pdf';
    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
    } else if (filename.endsWith('.png')) {
        contentType = 'image/png';
    } else if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
        contentType = 'application/msword'; // For Word documents
    }

    const contentDisposition = `attachment; filename="${filename}"`;
    res.setHeader('Content-Disposition', contentDisposition);
    res.setHeader('Content-Type', contentType);

    const fileStream = fs.createReadStream(filePath);
    
    fileStream.on('error', (error) => {
        console.error('Error reading the file:', error);
        res.status(500).send('Error reading the file');
    });

    fileStream.pipe(res);
});

