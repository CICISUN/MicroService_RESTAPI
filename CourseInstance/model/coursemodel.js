
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/microservice');

// var Schema=mongoose.Schema;
// var Course_Schema = new Schema({},{strict:false});

var Schema = mongoose.Schema

 
var course = new Schema({
   	_id	: Number
  , name     : String
  , instructor	: String
  , department	: String
  , semester	: String
  , callNumber	: Number 
  , enrollment	: Number 
  , waitlisted	: Number 
  , maxentrollment : Number 
  , strict	  : false
},
{
  versionKey : false
});



module.exports=mongoose.model('course',course);