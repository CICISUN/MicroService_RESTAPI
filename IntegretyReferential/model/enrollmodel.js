
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/microservice');

var Schema = mongoose.Schema


var enrollment = new Schema({
	_id : Number
  , callNumber	: {
  	type : Number,
  	ref : "course", 
  }
  , uni	: {
  	type : String,
  	ref : "student",
  } 
},
{
  versionKey : false,
  //_id : false,
});

enrollment.index({callNumber:1, uni:1}, { unique: true });




module.exports = mongoose.model('enrollment',enrollment);