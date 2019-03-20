const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let PikinCategories = new Schema({
  category_name: {
    type: String
  },
  age_from: {
    type: String
  },
  age_to: {
    type: String
  },
  category_description: {
    type: String
  },
  category_imageUrl: {
    type: String
  },
  category_videos: {
    type: []
  }
},{
    collection: 'pikinvids',
    versionKey: false
});

module.exports = mongoose.model('Category', PikinCategories);
