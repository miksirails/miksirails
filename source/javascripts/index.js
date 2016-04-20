var bespoke = require("bespoke"),
    keys = require("bespoke-keys"),
    touch = require("bespoke-touch"),
    nebula = require("bespoke-theme-nebula");

$(function() {
  var deck = bespoke.from("#presentation", [nebula(), keys(), touch()]);
});

if (__DEVELOPMENT__) {
  console.log("Running in development mode!");
}
