"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AugmentationWrapper = function () {
  function AugmentationWrapper() {
    _classCallCheck(this, AugmentationWrapper);

    this.selected;
    this.extracted;
    this.gotten;
  }

  _createClass(AugmentationWrapper, [{
    key: "selected",
    set: function set(object) {
      this.selected = object;
    },
    get: function get() {
      return this.selected;
    }
  }, {
    key: "extracted",
    set: function set(object) {
      this.extracted = object;
    },
    get: function get() {
      return this.extracted;
    }
  }, {
    key: "gotten",
    set: function set(object) {
      this.gotten = object;
    },
    get: function get() {
      return this.gotten;
    }
  }]);

  return AugmentationWrapper;
}();

exports.default = AugmentationWrapper;