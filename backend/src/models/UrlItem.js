import mongoose from 'mongoose';

const UrlItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
  image: { type: String },
  category: { type: String, default: 'Requires Manual Upload' },
  bought: { type: Boolean, default: false }
}, { timestamps: true });

export const UrlItem = mongoose.model('UrlItem', UrlItemSchema, 'products');
