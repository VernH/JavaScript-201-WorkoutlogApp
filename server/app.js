var express = require('express');
var app = express();

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});

app.use('/api/test', function(req, res){
	res.send("Hello World");
})