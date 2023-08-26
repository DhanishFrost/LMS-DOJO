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

