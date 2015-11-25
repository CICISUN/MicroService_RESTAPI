var Student = require('../../model/studentmodel');
var Course = require('../../model/coursemodel');
var Enrollment = require('../../model/enrollmodel');
var async = require('async');

module.exports = {
	enrollStudentInCourse: enrollStudentInCourse,
	removeStudentFromCourse: removeStudentFromCourse,
};

function enrollStudentInCourse(req, res, next) {
  	var requni = req.swagger.params.uni.value; //sudent uni
  	var reqcallno = req.swagger.params.callno.value; //course call number
  	var id;
  	async.waterfall([
  		function(callback){
		  	Student.find({_id : requni},function(err, data) {
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
  			Course.find({_id : reqcallno}, function(err, data) {
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
	Enrollment.remove({uni: requni, callNumber: reqcallno}, function(err, data) {
		if(err) return next(err);
		res.setHeader('Content-Type', 'application/json');
		res.json("Successfully remove student " + requni + " from course " + reqcallno + ".");
	});
}
