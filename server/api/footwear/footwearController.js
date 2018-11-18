var Footwear = require('./footwearModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Footwear.findById(id)
    .populate('categories')
    .exec()
    .then(function(footwear) {
      if (!footwear) {
        next(new Error('No footwear with that id'));
      } else {
        req.footwear = footwear;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Footwear.find({})
    .populate('categories')
    .exec()
    .then(function(footwears){
      res.json(footwears);
    }, function(err){
      next(err);
    });
};

exports.group = function(req, res, next) {
  var params = req.body.parameter;

    const aggregatorOpts = [{
          $unwind: "$categories"
      },
      {
          $group: {
              _id: "$categories",
              count: { $sum: 1 }
          }
      }
    ]

    Footwear.aggregate(aggregatorOpts)
    .exec()
    .then(function(count){
      res.json(count);
    }, function(err){
      next(err);
    });

};

exports.getOne = function(req, res, next) {
  var footwear = req.footwear
  res.json(footwear);
};

exports.put = function(req, res, next) {
  var footwear = req.footwear;

  var update = req.body;
  
  _.merge(footwear, update);
  if(req.body.sizes){
    footwear.sizes=req.body.sizes
  }
  if(req.body.colors){
    footwear.colors=req.body.colors    
  }
  footwear.markModified('sizes');
  footwear.markModified('colors');
  footwear.markModified('stock');
  footwear.markModified('images');
  footwear.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newfootwear = req.body;
  newfootwear.author = req.user._id;
  Footwear.create(newfootwear)
    .then(function(footwear) {
      res.json(footwear);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.footwear.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};


exports.upload = function(req,res,next){
    res.send(req.files);
}


// set up global error handling


