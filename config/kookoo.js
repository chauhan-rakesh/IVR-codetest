var xml = require('xml');

function getXMLResponse(response) {
	return xml(response);
}

module.exports = {
	getXMLBody : function createResponse(req) {
		var event = req.query.event;
		var data = req.query.data || '';
		var cid = req.query.cid;
		var res;
		if(event){
			if (event == 'NewCall') {
				res = {
					response:
					[{
						playtext: 'Welcome to GalaxyCard'
					},
					{
						collectdtmf: [ {
							_attr: { t: "#"}
						},
						{
							playtext: 'enter 1 for male and 2 for female followed by #'
						}
					]}]
				};
			}
			else if(event == 'GotDTMF'){
				var trainId = req.query.sid.split('$')[1];
				if(trainId || data) {
					console.log('SID:: ', req.query.sid);
					if (trainId) {
						var trainDay = parseInt(data);
						if(trainDay || trainDay == 0) {
							if(trainDay == 1 || trainDay == 2 || trainDay == 3) {
								var day = ['Yesterday', 'Today', 'Tomorrow'];
								res = {
									response:
									[{
										playtext:"Hey male"
									}]
								};
							}
						}
					} else {
			res = {
				response:
				[{
					hangup: ''
				}
			]
		};
	}
}
}
	return getXMLResponse(res);
}

}
}
