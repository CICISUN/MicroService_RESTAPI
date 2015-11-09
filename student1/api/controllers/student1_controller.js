//Import the Data Models
var Student = require('../../model/studentmodel');


module.exports = {
  getStudents: getStudents,
  getStudentInfo: getStudentInfo,
  createStudent: createStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
};


function getStudents(req, res, next) {
  	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  	Student.find({},function(err, data) {
		if (err) return next(err);
		res.json(data); //res.status(200).send("ok");
	});
}

function getStudentInfo(req, res, next) {
  	var sid = req.swagger.params.sid.value || 1;
  	Student.find({_id : sid},function(err, data) {
		if (err) return next(err);
		res.json(data);//res.status(200).send("ok");
	  });
}

function createStudent(req, res, next) {
    var body = req.swagger.params.student.value;
    var newStudent = new Student({_id : body.sid,
                                  name : body.name,
                                  gender : body.gender,
                                  uni : body.uni,
                                  department: body.department});

    newStudent.save(function (err, newStudent, data) {
      if (err) return next(err);
      //console.log(res.json(data));
      res.setHeader('Content-Type', 'application/json');
      res.json("Successfully created student.");
    });
}

function updateStudent(req, res, next) {
  //put
  var body = req.swagger.params.student.value;
  Student.update({_id: body.sid},{name: body.name, gender: body.gender, uni: body.uni, department: body.department}, function(err,data) {
    if (data['nModified'] == 0) {
      var error = new Error();
      error.statusCode = 401;
      error.message="No student found.";
      return next(error);
    }
    if (err) return next(err);
    res.setHeader('Content-Type', 'application/json');
    res.json("Successfully update student info.");
    // var response = JSON.stringify(data, null, 2);
    // if(response['ok'] == 1) return res.end(JSON.stringify("OK"));
    // else return res.end(JSON.stringify(data, null, 2));
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