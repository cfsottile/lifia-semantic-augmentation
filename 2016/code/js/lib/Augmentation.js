"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Augmentation = function () {
  function Augmentation(selector, extractor, getter, builder, injector) {
    _classCallCheck(this, Augmentation);

    this.augmentationWrappers = [];
    this.extractionSelector = selector;
    this.extractor = extractor;
    this.getter = getter;
    this.builder = builder;
    this.injector = injector;
  }

  _createClass(Augmentation, [{
    key: "select",
    value: function select() {
      extractionSelector.run(augmentationWrappers);
    }
  }, {
    key: "extract",
    value: function extract() {
      extractor.run(augmentationWrappers);
    }
  }, {
    key: "get",
    value: function get() {
      getter.run(augmentationWrappers);
    }
  }, {
    key: "run",
    value: function run() {
      this.select();
      //this.extract();
      //this.get();
      //this.build();
      //this.inject();
    }
  }, {
    key: "extractionSelector",
    set: function set(selector) {
      this.extractionSelector = selector;
    }
  }, {
    key: "extractor",
    set: function set(extractor) {
      this.extractor = extractor;
    }
  }, {
    key: "getter",
    set: function set(getter) {
      this.getter = getter;
    }
  }]);

  return Augmentation;
}();

exports.default = Augmentation;