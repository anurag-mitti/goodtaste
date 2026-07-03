import fs from 'fs';
import mongoose from 'mongoose';
import { UrlItem } from './src/models/UrlItem.js';

const MONGODB_URI = 'mongodb+srv://anuragmitti:2owNt5LlVUwBLaWT@cluster0.rmqli.mongodb.net/Clothes?retryWrites=true&w=majority&appName=Cluster0';

async function importData() {
  try {
    console.log('Connecting to Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to Atlas.');
    
    console.log('Reading database_backup.json...');
    const rawData = fs.readFileSync('./database_backup.json');
    const data = JSON.parse(rawData);
    console.log(`Found ${data.length} items in backup.`);
    
    console.log('Clearing old items in Atlas...');
    await UrlItem.deleteMany({});
    
    console.log('Uploading items to Atlas...');
    // We'll strip _id just in case there are casting issues, 
    // or let Mongoose cast them. 
    // Since we're replacing everything, keeping them is fine.
    await UrlItem.insertMany(data);
    console.log(`Successfully imported ${data.length} items to Atlas! 🚀`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
}

importData();
