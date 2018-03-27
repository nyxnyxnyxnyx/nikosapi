var Footwear = require('./footwearModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Footwear.findById(id)
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

exports.getOne = function(req, res, next) {
  var footwear = req.footwear;
  res.json(footwear);
};

exports.put = function(req, res, next) {
  var footwear = req.footwear;

  var update = req.body;

  _.merge(footwear, update);

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
