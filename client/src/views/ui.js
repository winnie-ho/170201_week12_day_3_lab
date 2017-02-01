var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){
  this.countries = new Countries();

  this.countries.allDB(function(result){
    this.renderBucketList(result);
  }.bind(this));
  
  this.countries.all(function(result){
    this.render(result);
  }.bind(this));

  mapDiv = document.querySelector("#mapDiv");
  mapDiv.innerHTML = "";
  var centre = {lat: 55.9533, lng:-3.1883 };
  map = new MapWrapper(centre, 14);

}

UI.prototype = {
  render: function(countriesList){
    var countriesDiv = document.querySelector("#countries");
    var selectLabel = document.createElement("h3");
    selectLabel.innerText = "Select a country:"
    var countriesSelect = document.createElement("select");
      for (var country of countriesList){
        var place = document.createElement("option");
        place.innerText = country.name;
        place.value = JSON.stringify(country);

        countriesDiv.appendChild(selectLabel);
        selectLabel.appendChild(countriesSelect);
        countriesSelect.appendChild(place);
      }
  },

  handleBLButton: function(){
    var selectedCountry = document.querySelector("select");
    var countryObject = JSON.parse(selectedCountry.value);
    var addedCountry = document.createElement("p");
    addedCountry.innerText = "Country: " + countryObject.name + "\n Capital: " + countryObject.capital;
    var blDiv = document.querySelector("#bucket-list");
    blDiv.appendChild(addedCountry);
    
    map = new MapWrapper({lat: countryObject.latlng[0], lng: countryObject.latlng[1]}, 2);

      console.log(map);
      map.addMarker({lat: countryObject.latlng[0], lng: countryObject.latlng[1]});
    

    
    var newCountry = {
      name: countryObject.name,
      capital: countryObject.capital
    }
    console.log("country added to bucket list: ", countryObject.name);
    var countries = new Countries();    
    countries.makePost("/", newCountry, function(data){
    });
  },

  renderBucketList: function(bucketList){
    var blDiv = document.querySelector("#bucket-list");
      for(var country of bucketList){
        var blCountry = document.createElement("p");
        blCountry.innerText = "Country: " + country.name + "\n Capital: " + country.capital;
        blDiv.appendChild(blCountry);
      }
  }




}

module.exports = UI;