var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(app.get('port'), function(){
	console.log('Express server');
});