const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PikinVideos = new Schema({
  video_channel: {
    type: String
  },
  video_link: {
    type: String
  }
},{
    collection: 'pikinvids'
});

module.exports = mongoose.model('Video', PikinVideos);
