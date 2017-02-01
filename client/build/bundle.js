/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(2);
var Country = __webpack_require__(3);
var MapWrapper = __webpack_require__(4);

var UI = function(){
  this.countries = new Countries();

  this.countries.allDB(function(result){
    this.renderBucketList(result);
  }.bind(this));
  
  this.countries.all(function(result){
    this.render(result);
  }.bind(this));

  var centre = {lat: 55.9533, lng:-3.1883 };

  var map = new MapWrapper(centre, 14);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function() {
  var ui = new UI();
  var addButton = document.querySelector("#bl-button");
  addButton.onclick = ui.handleBLButton;
}

window.onload = app;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__(3);

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

  allDB: function(callback){
    var self = this;
    this.makeRequest("http://localhost:3000/api", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      console.log("db results: ", jsonString);
      var results = JSON.parse(jsonString);
      var countriesDB = self.populateBucketList(results);
      callback(countriesDB);
    })
  },

  populateBucketList: function(results){
    var blCountries = [];
    for (var result of results){
      var country = new Country (result);
      blCountries.push(country);
    }
    return blCountries;
  }

}

module.exports = Countries;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Country = function(options){
  this.name = options.name;
  this.capital = options.capital;
}

Country.prototype = {

}

module.exports = Country;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var MapWrapper = function(coords, zoom) {
  var container = document.querySelector("#map");
    this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
    });
}


MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    console.log("marker added");
    return marker;
  },

  // addClickEvent: function(){
  //   google.maps.event.addListener(this.googleMap, "click", function(event){
  //     console.log("map has been clicked!");

  //     console.log(event);

  //     console.log("coords selected are: " + event.latLng.lat(), event.latLng.lng());
  //     var coordsSelected = {lat: event.latLng.lat(), lng: event.latLng.lng()};

  //     this.addMarker(coordsSelected);

  //   }.bind(this));
  // },

  // addInfoWindow: function(map, marker, contentString){
  //   var infoWindow = new google.maps.InfoWindow({
  //         content: contentString
  //       });
  //     marker.addListener("click", function(){
  //     infoWindow.open(this.googleMap, marker);
  //   })
  // }, 

  // geoLocate: function(runArray){

  //   console.log(runArray);
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var centre = {lat: position.coords.latitude, lng: position.coords.longitude}; 
  //     this.googleMap.setCenter(centre); 
  //     var marker = this.addMarker(centre);
  //     var nearRuns = document.querySelector("#near-runs");
  //     this.addInfoWindow(this.googleMap, marker, "You Are Here")
  //     for (var run of runArray){
  //       if (Math.sqrt(Math.pow((run.start_latlng[0] - position.coords.latitude),2))< 0.005){
  //         var runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
  //         this.addInfoWindow(this.googleMap, runMarker, run.name);
  //         var nearRunsInfo = document.createElement("p");
  //         nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
  //         nearRuns.appendChild(nearRunsInfo);
  //         var division = document.createElement("hr");
  //         nearRuns.appendChild(division);
  //         console.log(run.start_latlng[0])
  //         console.log(position.coords.latitude);
  //         console.log(run.start_latlng[0]-position.coords.latitude)
  //         console.log(run.name + "added");

  //       } else if (Math.sqrt(Math.pow((run.start_latlng[1] - position.coords.longitude),2)) < 0.005){
  //         var runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
  //         this.addInfoWindow(this.googleMap, runMarker, run.name);
  //         var nearRunsInfo = document.createElement("p");
  //         nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
  //         nearRuns.appendChild(nearRunsInfo);
  //         var division = document.createElement("hr");
  //         nearRuns.appendChild(division);
  //         console.log(run.start_latlng[1])
  //         console.log(position.coords.longitude);
  //         console.log(run.start_latlng[1]-position.coords.longitude);
  //         console.log(run.name + "added");
  //       }
  //     }
  //   }.bind(this)); 
  // }


}

module.exports = MapWrapper;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map