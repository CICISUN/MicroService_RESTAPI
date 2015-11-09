//Import the Data Models
var Course = require('../../model/coursemodel');


module.exports = {
  getCourses: getCourses,
  getCourse: getCourse,
  createCourse: createCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse,
};


function getCourses(req, res, next) {
  	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  	Course.find({},function(err, result) {
      //res.json(data);
      if (err) {
        return next(err.message);
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result || {}, null, 2));
	});
}

function getCourse(req, res, next) {
  	var cid = req.swagger.params.cid.value || 1;
  	Course.find({_id : cid},function(err, result) {
  		if (err) return next(err); //res.send(err);
  		//return res.status(200).send("ok");
      //res.json(data);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result[0] || {}, null, 2));
	});
}


function createCourse(req, res, next) {
    var body = req.swagger.params.course.value;
    var newCourse = new Course({_id : body.cid,
                                  name : body.name,
                                  instructor : body.instructor,
                                  department: body.department,
                                  semester: body.semester,
                                  callNumber: body.callNumber,
                                  enrollment: body.enrollment,
                                  waitlisted: body.waitlisted,
                                  maxentrollment: body.maxentrollment});

    newCourse.save(function (err, newCourse, data) {
        if (err) return next(err);
        //res.json(data); //res.status(200).send("ok");
        res.setHeader('Content-Type', 'application/json');
        response = "Succesfully added course: " + newCourse["name"];
        res.json(response);
    });
}

function updateCourse(req, res, next) {
  //put
  var body = req.swagger.params.course.value;
  Course.update({_id: body.cid}, {name: body.name,
                                  instructor : body.instructor,
                                  department: body.department,
                                  semester: body.semester,
                                  callNumber: body.callNumber,
                                  enrollment: body.enrollment,
                                  waitlisted: body.waitlisted,
                                  maxentrollment: body.maxentrollment}, function(err,data) {
    if (data['nModified'] == 0) {
      var error = new Error();
      error.statusCode = 401;
      error.message = "No such course found.";
      return next(error);
    }
    if (err) return next(err);
    //res.json(data); //res.status(200).send("ok");
    res.setHeader('Content-Type', 'application/json');
    response = "Succesfully updated course: " + body.name;
    res.json(response);
  });
}

function deleteCourse(req, res, next) {
  Course.remove({_id: req.swagger.params.cid.value}, function(err,data) {
    if(err) return next(err);
    //res.json(data)//res.status(200).send("ok");
    res.setHeader('Content-Type', 'application/json');
    response = "Succesfully deleted course: " + req.swagger.params.cid.value;
    res.json(response);  
  });
}