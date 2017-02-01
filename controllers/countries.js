var express = require('express');
var app = express();
var countryRouter = express.Router();

var Country = require('../client/src/models/country');
var countries = require("../client/src/models/countries");
var CountryQuery = require("../client/db/countryQuery.js");
var query = new CountryQuery();


// index
countryRouter.get('/', function(req, res) {
  query.allFromdb(function(results){
    res.json(results);
  })
});

// API index
countryRouter.get('/api', function(req, res) {
  query.allFromdb(function(results){
    res.json(results);
  })
});

//country by id
countryRouter.get('/:id', function(req, res){
  res.json(countries[req.params.id]);
});


//country update
countryRouter.put('/:id', function(req, res) {
  var country = new Country({
    name: req.body.name,
    capital: req.body.capital
  });
  countries[req.params.id] = country;
  res.json({data: countries});
});

//add new country
countryRouter.post('/', function(req, res) {
  var country = new Country({
    name: req.body.name,
    capital: req.body.capital,
    xcoord: req.body.xcoord,
    ycoord: req.body.ycoord
  });
  query.add(country, function(results){
    // res.json(results);
    res.redirect("/");
  })
});

//delete country
countryRouter.delete('/:id', function(req, res) {
  countries.splice(req.params.id, 1);
  res.json({data: countries});
});


module.exports = countryRouter;
