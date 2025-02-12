const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/uploadDB';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fileUploadSchema = new mongoose.Schema({
  filename: String,
  url: String,
  name: String,
  email: String,
  datasetName: String,
  uploadDate: Date,
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

async function viewUploads() {
  try {
    const uploads = await FileUpload.find();
    console.log('Uploaded Files:', uploads);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error fetching uploads:', err);
  }
}

viewUploads();
