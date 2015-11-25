var Student = require('../../model/studentmodel');
var Course = require('../../model/coursemodel');
var Enrollment = require('../../model/enrollmodel');

module.exports = {
	enrollStudentInCourse: enrollStudentInCourse,
	removeStudentFromCourse: removeStudentFromCourse,
};

function enrollStudentInCourse(req, res, next) {
  	var requni = req.swagger.params.uni.value; //sudent uni
  	var reqcallno = req.swagger.params.callno.value; //course call number
  	var id;
  	Enrollment.count({}, function( err, count){
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
	  		res.json("Successfully enroll student" + requni + " in class " + reqcallno + ".");
	  	});
  	});
}

function removeStudentFromCourse(req, res, next) {
  	var sid = req.swagger.params.sid.value || 1;
  	Student.find({_id : sid},function(err, data) {
		if (err) return next(err);
		res.json(data);//res.status(200).send("ok");
	  });
}


function deleteStudent(req, res, next) {
  Student.remove({_id: req.swagger.params.sid.value}, function(err,data) {
    if(err) return next(err);
    //!
    res.setHeader('Content-Type', 'application/json');
    // var response = JSON.stringify(data, null, 2);
    // if(response['ok'] == 1) return res.end(JSON.stringify("OK"));
    // else return res.end(JSON.stringify(data, null, 2));
    res.json("Successfully delete student.");
  });
}