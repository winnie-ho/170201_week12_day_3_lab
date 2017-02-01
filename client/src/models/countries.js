var Country = require("./country");

var Countries = function(){

}

Countries.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  },

  makePost: function(url, newData, callback){
    var data = JSON.stringify(newData);
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = callback;
    request.send(data);
  },

  all: function(callback){
  var self = this;
    this.makeRequest("https://restcountries.eu/rest/v1/all", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      var result = JSON.parse(jsonString);
      console.log(result);
      callback(result);
      // var countries = self.populateCountries(result);
    });
  }, 

  populateBucketList: function(results){
    var self = this;
    this.makeRequest("", function(){
      if(this.status !== 200){
        return;
      }
    var blcountries = [];
    for (var result of results){
      var country = new Country (result);
      countries.push(country);
    }
    return countries;
      
    })
  }
}

module.exports = Countries;