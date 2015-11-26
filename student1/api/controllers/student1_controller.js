//Import the Data Models
var Student = require('../../model/studentmodel');


module.exports = {
  getStudents: getStudents,
  getStudentInfo: getStudentInfo,
  getStudentInfoByUni: getStudentInfoByUni,
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
      else if(!data || data.length == 0) {
        var error = new Error ('No student found. Bad Request.');
        error.statusCode = 400;
        return next(error);
      }
      res.json(data);
	  });
}


function getStudentInfoByUni(req, res, next) {
  var studentuni = req.swagger.params.uni.value;
    Student.find({uni : studentuni},function(err, data) {
      if (err) return next(err);
      else if(!data || data.length == 0) {
        var error = new Error ('No student found. Bad Request.');
        error.statusCode = 400;
        return next(error);
      }
      res.status(200);
      res.json(data);
    });
}


function createStudent(req, res, next) {
    var body = req.swagger.params.student.value;
    var newStudent = new Student({_id : body.sid,
                                  name : body.name,
                                  gender : body.gender,
                                  uni : body.uni,
                                  department: body.department});
  Student.find({uni : body.uni},function(err, data) {
          if (err) return next(err);
          else if(data.length != 0) {
              console.log(data);
                var error = new Error ('Duplicate student found. Bad Request.');
                error.statusCode = 400;
                return next(error);
            }
            else {
                newStudent.save(function (err, newStudent, data) {
                  
                  //console.log(res.json(data));
                  res.setHeader('Content-Type', 'application/json');
                  res.status(201);
                  res.json("Successfully created student.");
                  });
            }
  });
}

function updateStudent(req, res, next) {
  //put
  var body = req.swagger.params.student.value;
  Student.update({_id: body.sid},{name: body.name, gender: body.gender, uni: body.uni, department: body.department}, function(err,data) {
    if (data['nModified'] == 0) {
      var error = new Error();
      error.statusCode = 400;
      error.message="No student found. Bad Request";
      return next(error);
    }
    if (err) return next(err);
    res.status(204);
    res.setHeader('Content-Type', 'application/json');
    res.json("Successfully update student info.");
  });
}

function deleteStudent(req, res, next) {
    Student.find({uni : body.uni},function(err, data) {

          if(!data || data.length == 0) {
                var error = new Error ('Duplicate student found. Bad Request.');
                error.statusCode = 400;
                return next(error);
            }
            else {
                  Student.remove({_id: req.swagger.params.sid.value}, function(err,data) {

                if(err) return next(err);
                //!
                res.setHeader('Content-Type', 'application/json');
                // var response = JSON.stringify(data, null, 2);
                // if(response['ok'] == 1) return res.end(JSON.stringify("OK"));
                // else return res.end(JSON.stringify(data, null, 2));
                res.status(204);
                res.json("Successfully delete student.");
              });
            }
  });

}