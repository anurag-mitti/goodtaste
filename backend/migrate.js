import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { UrlItem } from './src/models/UrlItem.js';

cloudinary.config({ 
  cloud_name: 'hwlmsemb', 
  api_key: '635493444452725', 
  api_secret: 'WJLfjdGsrNqgjGqJnZ1_fCwEE0g' 
});

async function migrate() {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Clothes';
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const items = await UrlItem.find({ image: { $regex: /^data:/ } });
  console.log(`Found ${items.length} items with base64 images.`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      console.log(`Uploading image for item ${i+1}/${items.length}: ${item.title}`);
      const uploadResult = await cloudinary.uploader.upload(item.image, {
        folder: 'goodtaste'
      });
      item.image = uploadResult.secure_url;
      await item.save();
      console.log(`Successfully updated item ${item._id}`);
    } catch (err) {
      console.error(`Failed to upload image for item ${item._id}:`, err);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrate();
