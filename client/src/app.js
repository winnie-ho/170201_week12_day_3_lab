var UI = require("./views/ui");

var app = function() {
  var ui = new UI();
  var addButton = document.querySelector("#bl-button");
  addButton.onclick = ui.handleBLButton;
}

window.onload = app;