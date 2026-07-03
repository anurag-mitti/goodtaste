import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://anuragmitti:2owNt5LlVUwBLaWT@cluster0.rmqli.mongodb.net/Clothes?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('SUCCESS! Connected to MongoDB Atlas successfully.');
    process.exit(0);
  } catch (error) {
    console.error('FAILED to connect:', error);
    process.exit(1);
  }
}

testConnection();
