var Countries = require("../models/countries.js");
var Country = require("../models/country.js");

var UI = function(){
  this.countries = new Countries();
  this.countries.all(function(result){
    this.render(result);
  }.bind(this));

  // this.countries.makeRequest("/", renderBucketList())

}

UI.prototype = {
  render: function(countriesList){
    var countriesDiv = document.querySelector("#countries");
    var countriesSelect = document.createElement("select");
      for (var country of countriesList){
        var place = document.createElement("option");
        place.innerText = country.name;
        place.value = JSON.stringify(country);

        countriesSelect.appendChild(place);
        countriesDiv.appendChild(countriesSelect);
      }
  },

  handleBLButton: function(){
    var selectedCountry = document.querySelector("select");
    var countryObject = JSON.parse(selectedCountry.value);
    var addedCountry = document.createElement("p");
    addedCountry.innerText = "Country: " + countryObject.name + "\n Capital: " + countryObject.capital;
    var blDiv = document.querySelector("#bucket-list");
    blDiv.appendChild(addedCountry);
    console.log(selectedCountry);

      var newCountry = {
        name: countryObject.name,
        capital: countryObject.capital
      }


    var countries = new Countries();    
    countries.makePost("/", newCountry, function(data){
      console.log(data);
    });
}
}

module.exports = UI;