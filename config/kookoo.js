var xml = require('xml');

function getXMLResponse(response) {
	return xml(response);
}
var gender = 0;
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
			}else if (event == 'GotDTMF') {
        if(data){
          var adult = parseInt(data);
          var gender = parseInt(data);
          if(gender == 0){

            if(gender == 1 ){
              res = {
                response:
                [{
                  collectdtmf: [ {
                    _attr: { t: "#"}
                  },
                  {
                   playtext: "Enter 1 if you are above 21 years and 2 if below 21 years followed by #"
                  }
                ]}]
              };
            }else if(gender == 2){
              res = {
                response:
                [{
                  collectdtmf: [ {
                    _attr: { t: "#"}
                  },
                  {
                   playtext: "Enter 1 if you are above 18 years and 2 if below 18 years followed by #"
                  }
                ]}]
              };
            }
          }else if (adult == 1) {
            res = {
              response:
              [{
                playtext:"You are adult"
              }]
            };
          }else{
            res = {
              response:
              [{
                playtext:"minors not allowed"
              }]
            };
          }

        }

      }


}
else {
  res = {
    response:
    [{
      hangup: ''
    }
  ]
};
}
return getXMLResponse(res);
}
}
