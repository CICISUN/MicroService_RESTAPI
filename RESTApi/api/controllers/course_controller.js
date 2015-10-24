//Import the Data Models
var Course = require('../../model/coursemodel');

module.exports = {
  getCourses: getCourses,
  getCourse: getCourse
};


function getCourses(req, res) {
  	// variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  	Course.find({},function(err, data) {
		if (err) res.send(err);
		res.json(data);
	});
}

function getCourse(req, res) {
  	var cid = req.swagger.params.cid.value || 1;
  	console.log(cid);
  	Course.find({_id : cid},function(err, data) {
		if (err) res.send(err);
		res.json(data);
	});
} 