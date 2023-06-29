const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  const query = req.body.city;
  const apiKey = "558de872e99cc48574feda7c4e2f85c6";
  const unit = "metric";
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +',srb&appid='+ apiKey +'&units='+unit;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){

      const weatherData = JSON.parse(data);

      const city = weatherData.name;
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const image = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+image+"@4x.png";

      res.write("<body style='background-color:#e0d8d7'><h1>Quering city is: " + city + "</h1>\n" );
      res.write("<h1>Temperature is: "+temp+" degrees</h1>\n");
      res.write("<h1>Description: " +description+"</h1>\n");
      res.write("<img src="+imageURL+" style='background-color:#edd9d8'></body>");

      res.send();
    });
  });
});








app.listen(port, function(request, respond) {
  console.log("Listening port: " + port);
});
