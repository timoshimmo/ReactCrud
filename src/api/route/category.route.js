const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
require('dotenv').config()
const categoryRoutes = express.Router();

// Require Category model in our routes module
let Category = require('../model/category.model');
let Videos = require('../model/videos.model');

categoryRoutes.post('/add', function (req, res) {
    console.log(req.body);
    let category = new Category({
        category_name: req.body.categoryName,
        age_from: req.body.ageFrom,
        age_to: req.body.ageTo,
        category_description: req.body.categoryDescription,
        category_imageUrl: req.body.imgUrl,
        category_videos: req.body.videos
    });

    category.save()
      .then(category => {
          res.status(200).json('Database saved successfully');
      })
      .catch(err => {
          res.status(400).send('Unable to save database');
      });
});

categoryRoutes.route('/').get(function (req, res) {
    Category.find(function(err, categories) {
        if(err) {
          console.log(err);
        }
        else {
          res.json(categories);
        }
    });
});

categoryRoutes.route('/getCategory/:cgryname').get(function (req, res) {
    Category.findOne({category_name: req.params.cgryname}, function(err, category) {
        if (!category) {
          res.status(404).send("data is not found");
          console.log(err);
        }
        else {
          res.json(category);
        }
    });
});

categoryRoutes.route('/update/:cgryname').post(function (req, res) {

    let categoryVal = new Category({
        category_name: req.body.category,
        age_from: req.body.ageFrom,
        age_to: req.body.ageTo,
        category_description: req.body.categoryDescription,
        category_imageUrl: req.body.imagePreviewUrl
    });

    Category.updateOne({category_name: req.params.cgryname},
      {$set: {'category_name': req.body.category, 'age_from': req.body.ageFrom,
      'age_to': req.body.ageTo, 'category_description': req.body.categoryDescription, 'category_imageUrl': req.body.imagePreviewUrl}}, function(err) {
        if (err) {
            res.status(404).send("data is not found");
            console.log(err);
        }
        else {
            console.log('Success!');
            res.status(200).json({'response': 'Updated Successfully!'});
        }
  });

});

// Defined delete | remove | destroy route
categoryRoutes.route('/delete/:cgryname').get(function (req, res) {
    Category.deleteOne({category_name: req.params.cgryname}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = categoryRoutes;
