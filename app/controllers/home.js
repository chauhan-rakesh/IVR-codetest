
var xmlBody = require('../../config/kookoo.js');

exports.home = function(req, res) {

	res.header('Content-Type', 'text/xml');
	  res.send(xmlBody.getXMLBody(req));


}
