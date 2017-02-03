var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
	var sessionToken = req.headers.authorization;
	
if(!req.body.user && sessionToken){

	console.log("*******************Req.body***************")
	console.log(req.body);
	console.log("*******************Req.body.user*****************");
	console.log(req.body.user);
	console.log("*******************Session Token*****************");
	console.log(sessionToken);
	// console.log("*******************Req.body.user*****************");
	// console.log(req.body.user.id);

		jwt.verify(sessionToken, process.env.JWT_SECRET, function(err, decoded) {
	console.log("*******************DECODED*****************");
	console.log(decoded);	
		console.log(decoded.expiresIn);	

	if(decoded){
	User.findOne({where: { id: decoded.id}}).then(
		function(user){
	req.user = user;
		console.log("*******************ValidateSession*****************");
	    console.log(user.id);
	    		console.log("*******************Decoded Id*****************");

	            console.log(decoded.id);


	next();
},
function(){
	res.status(401).send({error: 'Not authorized'});
}
);
} else {
	res.status(401).send({error: 'Not authorized'});
}
});
} else {
	next();
}
}

