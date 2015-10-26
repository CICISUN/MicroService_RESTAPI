//Import the Data Models
var Student = require('../../model/studentmodel');
// var app = require('express')();
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());



module.exports = {
  getStudentInfo: getStudentInfo,
  createStudent: createStudent,
};


// function getStudentInfo(req, res) {
//   	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
//   	Student.find({},function(err, data) {
// 		if (err) res.send(err);
// 		res.json(data);
// 	});
// }

function getStudentInfo(req, res) {
  	var sid = req.swagger.params.sid.value || 1;
  	console.log(sid);
  	Student.find({_id : sid},function(err, data) {
		if (err) res.send(err);
		res.json(data);
	});
}

function createStudent(req, res) {
    var body = req.swagger.params.body.value;

    // var newStudent = new Student({_id : req.swagger.body._id,
    //                               name : req.swagger.body.name,
    //                               gender : req.swagger.body.gender,
    //                               uni : req.swagger.body.uni,
    //                               department: req.swagger.body.department});
    console.log(body);

    Student.create(body);
    then(function(result) {
      res.json(result.dataValues);
    }).catch(function(err) {
        res.status(403).json({
          message: err.message,
          errors: err.errors,
          warnings: []
        });
    });
}