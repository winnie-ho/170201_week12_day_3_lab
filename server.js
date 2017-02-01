var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));
app.use(require("./controllers"));

app.listen(3000, function () {
  console.log('App running on port '+this.address().port);
});
