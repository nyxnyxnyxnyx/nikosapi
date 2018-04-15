var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootwearSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique:true
  },
  cost: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  billPrice:{
    type: Number,

  },
  colors:[{
    type:String
  }],
  sizes:[{
    type:Number
  }],
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  stock:[{type:Schema.Types.Mixed}],
  images:[{type:Schema.Types.Mixed}],
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
},{usePushEach:true});

module.exports = mongoose.model('footwear', FootwearSchema);