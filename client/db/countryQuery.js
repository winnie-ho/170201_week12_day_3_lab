var MongoClient = require("mongodb").MongoClient;

var CountryQuery = function(){
  this.url = "mongodb://localhost:27017/bucket_list";
};

CountryQuery.prototype = {
  allFromdb: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection("blCountries");
      console.log(collection);
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },
  //onQueryFinished is used as doing a simple return would be stuck inside the connection function. The onQueryFinished function is a shortcut to return the information that you are wanting. In this case it is the information on films.
  add: function(countryToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
      var collection = db.collection("blCountries");
      collection.insert(countryToAdd);
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
    };
    });
  }
};


module.exports = CountryQuery;