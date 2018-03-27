var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FootwearSchema = new Schema({
  size:{
    type: Number,
  },
  code: {
    type: String,
    required: true
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
    type: Number
  },
  color:{
    type:String
  },
  barcode:{
    type:String,
    required:true,
    unique:true
  },
  totalStock:{
    type:Number
  },
  storeStock:{
    type:Number
  },
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}]
},{usePushEach:true});

module.exports = mongoose.model('footwear', FootwearSchema);
