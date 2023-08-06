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
        


const app = express();
app.use(cors()); // Enable CORS

app.use(express.json());
app.use(express.static('../frontend'));
app.use('/frontend/assets/images', express.static(path.join(__dirname, '../frontend/assets/images')));
app.use(router);

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



