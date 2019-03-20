const express = require('express');
const videoRoutes = express.Router();

// Require Category model in our routes module
let Video = require('../model/videos.model');
let Category = require('../model/category.model');

videoRoutes.route('/add').post(function (req, res) {
  let video = new Video(req.body);
  video.save()
    .then(video => {
      res.status(200).json({'video': 'video is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
videoRoutes.route('/').get(function (req, res) {
    Video.find(function(err, videos){
    if(err){
      console.log(err);
    }
    else {
      res.json(videos);
    }
  });
});

videoRoutes.route('/updateVideo').post(function (req, res) {

  let videoVal = new Video({
      video_channel: req.body.channelName,
      video_link: req.body.videoLinks
  });

    Category.updateOne({category_name: req.body.videoCategory},
      {$addToSet : {'category_videos': videoVal}}, function(err) {
        if (err) {
            res.status(404).send("data is not found");
            console.log(err);
        }
        else {
            console.log('Success!');
            res.status(200).json({'response': 'Success!'});
        }
  });
});

videoRoutes.route('/deleteVideos/:id').get(function (req, res) {
  Category.updateOne({category_name: req.body.videoCategory},
    {$pull : {'category_videos': {'_id' : req.param.id}}}, function(err) {
      if (err) {
          res.status(404).send("data is not found");
          console.log(err);
      }
      else {
          console.log('Success!');
          res.status(200).json({'response': 'Deleted Successfully!'});
      }
    });
});

module.exports = videoRoutes;
