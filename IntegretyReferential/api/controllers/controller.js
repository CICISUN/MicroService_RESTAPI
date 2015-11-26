var Student = require('../../model/studentmodel');
var Course = require('../../model/coursemodel');
var Enrollment = require('../../model/enrollmodel');
var async = require('async');

module.exports = {
	enrollStudentInCourse: enrollStudentInCourse,
	removeStudentFromCourse: removeStudentFromCourse,
	changeCourseSchema: changeCourseSchema,
	changeStudentSchema: changeStudentSchema
};

var validStudentSchema=Student;
var validCourseSchema=Course;


function enrollStudentInCourse(req, res, next) {
  	var requni = req.swagger.params.uni.value; //sudent uni
  	var reqcallno = req.swagger.params.callno.value; //course call number
  	var id;
  	async.waterfall([
  		function(callback){
		  	Student.find({uni : requni},function(err, data) {
				if (err) return next(err); //no student found
				else if(!data || data.length == 0) {
		          var error = new Error ('No student found.');
		          error.statusCode = 404;
		          return next(error);
		        }
				callback(null);
			  });
  		},
  		function(callback1) {
  			Course.find({callNumber : reqcallno}, function(err, data) {
  				if (err) return next(err);
  				else if(!data || data.length == 0) {
		          var error = new Error ('No such course.');
		          error.statusCode = 404;
		          return next(error);
		        }
  				callback1(null);
  			});
  		}],
  		function (err) {
  			if(err) return next(err);
  			else { //if both student and course exist, we do an insert operation on enrollment table
				Enrollment.count({}, function(err, count){
				  		id = count;
				    	//console.log( "Number of rows in enrollment:" + id);
					
					  	var newEnroll = new Enrollment({
					  		_id : id,
					  		callNumber : reqcallno,
					  		uni : requni,
					  	});

					  	newEnroll.save(function (err, newEnroll, data) {
					  		if (err) return next(err);
					  		res.setHeader('Content-Type', 'application/json');
					  		res.json("Successfully enroll student " + requni + " in class " + reqcallno + ".");
					  	});
					});
  			}
  		});
}

function removeStudentFromCourse(req, res, next) {
	var requni = req.swagger.params.uni.value; //sudent uni
  	var reqcallno = req.swagger.params.callno.value; //course call number
	  	async.waterfall([
  		function(callback){
		  	Student.find({uni : requni},function(err, data) {
				if (err) return next(err); //no student found
				else if(!data || data.length == 0) {
		          var error = new Error ('No student found.');
		          error.statusCode = 404;
		          return next(error);
		        }
				callback(null);
			  });
  		},
  		function(callback1) {
  			Course.find({callNumber : reqcallno}, function(err, data) {
  				if (err) return next(err);
  				else if(!data || data.length == 0) {
		          var error = new Error ('No such course.');
		          error.statusCode = 404;
		          return next(error);
		        }
  				callback1(null);
  			});
  		}],
  		function (err) {
  			if(err) return next(err);
  			else { //if both student and course exist, we do an insert operation on enrollment table
				Enrollment.remove({uni: requni, callNumber: reqcallno}, function(err, data) {
						if(err) return next(err);
						res.setHeader('Content-Type', 'application/json');
						res.json("Successfully remove student " + requni + " from course " + reqcallno + ".");
					});
  			}
  		});
}


function changeCourseSchema(req, res, next){
	var newSchema = req.swagger.params.newSchema.value;
	validCourseSchema=newSchema;
	console.log("new course schema", validCourseSchema);
	res.json("Successfully updated course schema!");
}

function changeStudentSchema(req, res, next){
	var newSchema = req.swagger.params.newSchema.value;
	validStudentSchema=newSchema;
	console.log("new student schema", validStudentSchema);
	res.json("Successfully updated student schema!");
}
