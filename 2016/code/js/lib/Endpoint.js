"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Endpoint = function () {
  function Endpoint() {
    _classCallCheck(this, Endpoint);

    this.endpoint = "http://dbpedia.org/sparql";
  }

  _createClass(Endpoint, [{
    key: "buildURI",
    value: function buildURI(query) {
      return encodeURI(endpoint + "?query=" + query + "&format=json");
    }
  }]);

  return Endpoint;
}();

exports.default = Endpoint;