var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');

router.post('/', function(req, res) {
    // req has some body properties that have a username and pwd
    var description = req.body.log.description; // user: { username: 'blah', password: 'boo' }
    var result = req.body.log.result; // TODO: encrypt/hash this
    // tobe set as belongsTo var definition

    // Use our sequlize model to create user
   Log 
	    .create({ 
	    	description: description,
	    	result: result
	    })
	    .then(
	    	function createSuccess(log) {
	    		User.findById(1)
	    		.then(
	    			function(user) {
						log.setUser(user);
		    		}, 
		    		function(err) {
		    			console.log(err);
		    		}
		    	);
	    	}, 
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});

module.exports = router;


/* 
	test this in Postman (chrome extension) http://localhost:3000/api/user
	
	using the following in the body as "raw" "application/json"
	{
	    "user":{
	    "username":"frodobaggins",
	    "password":"password!!!"}
	}

	expected response:

	{
  "user": {
    "id": 1,
    "username": "frodobaggins",
    "passwordhash": "",
    "updatedAt": "2016-06-06T17:34:51.724Z",
    "createdAt": "2016-06-06T17:34:51.724Z"
  },
  "message": "created"
}
*/