'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());

//routes

app.get('/', (req, res) => {
  res.send("home page working");
})

app.get('/location', (req, res) => {
  res.send('works!');
  // const geoData = require('./data/geo.json');
  //const location = new Location(req.query.data, geoData);
  // res.send(location);
});

app.get('/weather', (req, res) => {
  res.send('weather works');
  // const weatherData = require('./data/darksky.json');
  // const weatherResponse = [];
  // for (let i = 0; i < 8; i++) {
  //   weatherResponse.push(new Weather(req.query.data, weatherData, i));
  // }
  // res.send(weatherResponse);

});


//logic

function Location(query, geoData) {
  this.search_query = query;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function Weather(query, weatherData, day) {
  this.forcast = weatherData.daily.data[day].summary;
  let tempTime = Date(weatherData.daily.data[day].time).toString().split(' ');
  tempTime = tempTime.splice(0, 4).join(' ');
  this.time = tempTime;
}

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
})
