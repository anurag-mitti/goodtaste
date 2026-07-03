import Fastify from 'fastify';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import { Server } from 'socket.io';
import PQueue from 'p-queue';
import mongoose from 'mongoose';
import { processUrl } from './scraper.js';
import { UrlItem } from './models/UrlItem.js';

const fastify = Fastify({ 
  logger: true,
  bodyLimit: 52428800 // 50MB limit to allow large base64 image uploads
});

await fastify.register(compress, { global: true });

await fastify.register(cors, {
  origin: '*', // Allow all origins for this demo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

const io = new Server(fastify.server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
});

io.on('connection', (socket) => {
  fastify.log.info(`Socket connected: ${socket.id}`);
});

// In-memory queue with concurrency limit of 5
const queue = new PQueue({ concurrency: 5 });

fastify.post('/api/ingest', async (request, reply) => {
  const { urls } = request.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return reply.status(400).send({ error: 'Please provide an array of URLs' });
  }

  reply.status(202).send({ message: 'URLs accepted for processing', count: urls.length });

  urls.forEach((url) => {
    queue.add(async () => {
      try {
        const result = await processUrl(url);
        // Save to MongoDB as a new entry allowing duplicates
        const newItem = await UrlItem.create(result);
        io.emit('url_processed', newItem);
      } catch (error) {
        fastify.log.error(`Error processing URL ${url}: ${error.message}`);
        const errResult = {
          url,
          status: 'error',
          category: 'Requires Manual Upload',
          error: error.message
        };
        const newItem = await UrlItem.create(errResult);
        io.emit('url_processed', newItem);
      }
    });
  });
});

// API Endpoints
fastify.get('/api/urls', async (request, reply) => {
  const items = await UrlItem.find().sort({ createdAt: -1 });
  return items;
});

fastify.put('/api/urls/update', async (request, reply) => {
  const { id, title, image, category, bought } = request.body;
  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (image !== undefined) updateFields.image = image;
  if (category !== undefined) updateFields.category = category;
  if (bought !== undefined) updateFields.bought = bought;

  const updatedItem = await UrlItem.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  );
  return updatedItem;
});

fastify.post('/api/urls/delete', async (request, reply) => {
  const { id } = request.body;
  const updatedItem = await UrlItem.findByIdAndUpdate(
    id,
    { $set: { category: 'Trash' } },
    { new: true }
  );
  return updatedItem;
});

fastify.post('/api/urls/clear-trash', async (request, reply) => {
  await UrlItem.deleteMany({ category: 'Trash' });
  return { success: true };
});

const start = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Clothes';
    await mongoose.connect(MONGODB_URI);
    fastify.log.info('Connected to MongoDB');
    
    const PORT = process.env.PORT || 3001;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
