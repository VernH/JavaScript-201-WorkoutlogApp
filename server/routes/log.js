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

router.get('/', function(req, res) {
	var userid = req.user.id;
	Log
	.findAll({
		where: { owner: userid }
	})
	.then(
		function findAllSuccess(data) {
			// console.log(data);
			res.json(data);
		},
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});
module.exports = router;
