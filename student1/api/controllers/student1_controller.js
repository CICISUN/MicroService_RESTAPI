//Import the Data Models
var Student = require('../../model/studentmodel');


module.exports = {
  getStudents: getStudents,
  getStudentInfo: getStudentInfo,
  createStudent: createStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
};


function getStudents(req, res) {
  	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  	Student.find({},function(err, data) {
		if (err) res.send(err);
		res.json(data);
	});
}

function getStudentInfo(req, res) {
  	var sid = req.swagger.params.sid.value || 1;
  	Student.find({_id : sid},function(err, data) {
		if (err) res.send(err);

		res.json(data);
	  });
}

function createStudent(req, res) {
    var body = req.swagger.params.student.value;
    var newStudent = new Student({_id : body.sid,
                                  name : body.name,
                                  gender : body.gender,
                                  uni : body.uni,
                                  department: body.department});

    newStudent.save(function (err, newStudent) {
      if (err) return console.error(err);
    });
}

function updateStudent(req, res) {
  //put
  var body = req.swagger.params.student.value;
  Student.update({_id: body.sid},{name: body.name}, {gender: body.gender}, {uni: body.uni}, {department: body.department}, function(err,data) {
    if (err) res.send(err);
    res.json(data);
  });
}

function deleteStudent(req, res) {
  Student.remove({_id: req.swagger.params.sid.value}, function(err,data) {
    if(err) {
      res.send(err);
      console.log(err);
    }
    res.json(data);
  });
}