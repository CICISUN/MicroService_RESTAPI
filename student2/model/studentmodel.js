
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/microservice');

// var Schema=mongoose.Schema;
// var Course_Schema = new Schema({},{strict:false});

var Schema = mongoose.Schema

 
var student = new Schema({
   	_id	: Number
  , name : String
  , gender : String  
  , uni	: String
  , department	: String
  , strict	  : false
},
{
	versionKey : false
});



module.exports=mongoose.model('student',student);