var express = require('express');
var app = express();

app.set("PORT", 8000);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response){
	response.render('index');
});

app.listen(app.get('PORT'), function(){
	console.log("Server Started at PORT " + app.get('PORT'));
});