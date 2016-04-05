"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Extractor = function () {
  function Extractor() {
    _classCallCheck(this, Extractor);

    this.parserFunction;
  }

  _createClass(Extractor, [{
    key: "run",
    value: function run(augmentationWrappers) {
      var _this = this;

      augmentationWrappers.forEach(function (e) {
        e.setExtracted(_this.parserFunction(e.getSelected()));
      });
    }
  }, {
    key: "parserFunction",
    set: function set(fn) {
      this.parserFunction = fn;
    }
  }]);

  return Extractor;
}();

exports.default = Extractor;