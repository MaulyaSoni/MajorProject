const mongoose = require('mongoose');
const Listing = require('../models/listing');
const { data } = require('./data');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function seedDB() {
    await mongoose.connect(MONGO_URL);
    await Listing.deleteMany({}); // Clear old data
    await Listing.insertMany(data); // Insert all listings
    console.log('Database seeded!');
    mongoose.connection.close();
}

seedDB();
