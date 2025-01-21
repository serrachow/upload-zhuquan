// Import required modules
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/uploadDB';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const uploadSchema = new mongoose.Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now },
});

const Upload = mongoose.model('Upload', uploadSchema);

// Routes
// GET / - Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /upload - Handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const newUpload = new Upload({ filename: req.file.originalname });
    await newUpload.save();
    res.status(200).send('File uploaded and saved to database successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});