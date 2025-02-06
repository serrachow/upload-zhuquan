// Import required modules
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage'); // Import Upload class from AWS SDK v3

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/uploadDB';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define FileUpload schema
const fileUploadSchema = new mongoose.Schema({
  filename: String,
  url: String, // S3 URL
  uploadDate: { type: Date, default: Date.now },
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema); // Renamed to FileUpload

// ✅ Corrected S3Client initialization
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // Store file in memory for direct S3 upload
const upload = multer({ storage });

// Routes
// GET / - Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /upload - Handle file uploads to S3 and save to database
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const filename = `${Date.now()}-${req.file.originalname}`;
    const bucketName = process.env.S3_BUCKET_NAME;

    // ✅ Use Upload with a valid S3Client instance
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: filename,
        Body: req.file.buffer,
        ContentType: req.file.mimetype, // Set content type
      },
    });

    const uploadResult = await parallelUploads3.done(); // Perform the upload

    // Save the file metadata to MongoDB
    const newFileUpload = new FileUpload({
      filename,
      url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`, // S3 URL
    });

    await newFileUpload.save();
    res.status(200).send(`File uploaded to S3 and saved to database successfully! URL: ${newFileUpload.url}`);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
