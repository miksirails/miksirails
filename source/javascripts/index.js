var bespoke = require("bespoke"),
    keys = require("bespoke-keys"),
    touch = require("bespoke-touch"),
    hash = require('bespoke-hash'),
    nebula = require("bespoke-theme-nebula");

$(function() {
  var deck = bespoke.from("#presentation", [nebula(), keys(), touch(), hash()]);
});

if (__DEVELOPMENT__) {
  console.log("Running in development mode!");
}
