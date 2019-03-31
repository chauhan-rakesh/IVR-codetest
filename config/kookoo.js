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
							_attr: { l:"1",t: ""}
						},
						{
							playtext: 'enter 1 for male and 2 for female'
						}
					]}]
				};
			}else if (event == 'GotDTMF') {
        var gender = req.query.sid.split('$')[1];
        if(data){
          if(gender){
            var genderAge = parseInt(data);
            if (genderAge) {
              if((gender == 21 && genderAge==1 ) || (gender == 18 && genderAge==1 )  ){
                res = {
                   response:
                   [{
                     playtext: "You are an adult"
                   }]
                 };
              }else if((gender == 18 && genderAge==2) || (gender == 21 && genderAge==2 ) ){
                res = {
                    response:
                    [{
                      playtext:"Minors are not allowed"
                    }]
                  };
                }
            }
                // gender
            }else  if (data.length == 1){
						var gender = parseInt(data);
						if(gender == 1) {
              res = {
                   response:
                   [{
                      _attr: { sid: cid + "$" + 21}
                    },{
                     collectdtmf: [ {
                       _attr: { l: "1", t: ""}
                     },
                     {
                      playtext: "Enter 1 if you are above 21 years and 2 if below 21 years"
                     }
                   ]}]
                 };
						}else if(gender == 2) {
              res = {
                   response:
                   [{
                      _attr: { sid: cid + "$" + 18}
                    },{
                     collectdtmf: [ {
                       _attr: { l: "1",t: ""}
                     },
                     {
                      playtext: "Enter 1 if you are above 18 years and 2 if below 18 years"
                     }
                   ]}]
                 };
						}else {
              res = {
                    response:
                    [{
                      playtext:"wrong data entered"
                    }]
                  };
            }



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
