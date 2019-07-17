'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());

//routes
app.get('/location', (req, res) => {
  try {
    if (req.query.data !== 'Lynnwood')
      throw { status: 500, responseText: 'Lynnwood only for the moment!' };
    const geoData = require('./data/geo.json');
    const location = new Location(req.query.data, geoData);
    res.send(location);
  } catch (error) {
    res.status(400).send({ 'error': error });
  }
}).then( () => {

});

app.get('/weather', (req, res) => {
  try {
    if (req.query.data !== 'Los Angeles')
      throw { status: 500, responseText: 'It\'s only LA for now' };
    const weatherData = require('./data/darksky.json');
    const weatherResponse = [];
    for (let i = 0; i < 8; i++) {
      weatherResponse.push(new Weather(req.query.data, weatherData, i));
    }
    res.send(weatherResponse);
  } catch (error) {
    res.status(400).send({ 'error': error });
  }
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
