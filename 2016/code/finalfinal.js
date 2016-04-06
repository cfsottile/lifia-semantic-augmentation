"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Augmentation = function () {
  function Augmentation(selector, extractor, getter, builder, injector) {
    _classCallCheck(this, Augmentation);

    this.augmentationWrappers = [];
    this.extractionSelector = selector;
    this.extractor = extractor;
    this.getter = getter;
    // this.builder = builder;
    // this.injector = injector;
  }

  _createClass(Augmentation, [{
    key: "setExtractionSelector",
    value: function setExtractionSelector(selector) {
      this.extractionSelector = selector;
    }
  }, {
    key: "setExtractor",
    value: function setExtractor(extractor) {
      this.extractor = extractor;
    }
  }, {
    key: "setGetter",
    value: function setGetter(getter) {
      this.getter = getter;
    }
  }, {
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
      this.extract();
      this.get();
      return augmentationWrappers.getGotten();
      //this.build();
      //this.inject();
    }
  }]);

  return Augmentation;
}();

var AugmentationWrapper = function () {
  function AugmentationWrapper() {
    _classCallCheck(this, AugmentationWrapper);

    this.selected;
    this.extracted;
    this.gotten;
  }

  _createClass(AugmentationWrapper, [{
    key: "setSelected",
    value: function setSelected(object) {
      this.selected = object;
    }
  }, {
    key: "setExtracted",
    value: function setExtracted(object) {
      this.extracted = object;
    }
  }, {
    key: "setGotten",
    value: function setGotten(object) {
      this.gotten = object;
    }
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.selected;
    }
  }, {
    key: "getExtracted",
    value: function getExtracted() {
      return this.extracted;
    }
  }, {
    key: "getGotten",
    value: function getGotten() {
      return this.gotten;
    }
  }]);

  return AugmentationWrapper;
}();

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

var Extractor = function () {
  function Extractor(parserFunction) {
    _classCallCheck(this, Extractor);

    this.parserFunction = parserFunction;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  _createClass(Extractor, [{
    key: "run",
    value: function run(augmentationWrappers) {
      var _this = this;

      augmentationWrappers.forEach(function (e) {
        e.setExtracted(_this.parserFunction(e.getSelected()));
      });
    }
  }]);

  return Extractor;
}();

var Getter = function () {
  function Getter(parserFunction, query) {
    _classCallCheck(this, Getter);

    this.parserFunction = parserFunction;
    this.query = query;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  // setQuery (query) {
  //   this.query = query;
  // }

  _createClass(Getter, [{
    key: "run",
    value: function run(augmentationWrappers) {
      var _this2 = this;

      augmentationWrappers.forEach(function (e) {
        e.setGotten(_this2.parserFunction(query.execute(e.getExtracted())));
      });
    }
  }]);

  return Getter;
}();

var Query = function () {
  function Query(endpoint, queryString) {
    _classCallCheck(this, Query);

    this.endpoint = endpoint;
    this.queryStrings = queryStrings;
  }

  // setEndpoint (endpoint) {
  //   this.endpoint = endpoint;
  // }

  // setQueryStrings (queryStrings) {
  //   this.queryStrings = queryStrings;
  // }

  _createClass(Query, [{
    key: "execute",
    value: function execute(args) {
      var data;
      $.ajax({
        async: false,
        dataType: "jsonp",
        url: endpoint.buildURI(this.buildQuery(args)),
        success: function success(_data) {
          data = _data;
        }
      });
      return data;
    }
  }, {
    key: "buildQuery",
    value: function buildQuery(args) {
      builtQuery = "";
      // nasty hack
      args.push("");
      queryStrings.forEach(e, function (i) {
        builtQuery.concat(e);
        builtQuery.concat(args[i]);
      });
      return builtQuery;
    }
  }]);

  return Query;
}();

var Selector = function () {
  function Selector(parserFunction) {
    _classCallCheck(this, Selector);

    this.parserFunction = parserFunction;
    this.dom;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  _createClass(Selector, [{
    key: "run",
    value: function run(augmentationWrappers) {
      this.parserFunction().forEach(function (e) {
        var aw = new AugmentationWrapper();
        aw.setSelected(e);
        augmentationWrappers.push(aw);
      });
    }
  }]);

  return Selector;
}();

var doc;
$.ajax({
  async: false,
  dataType: "html",
  url: "http://www.imdb.com/title/tt2084970/locations",
  success: function success(_data) {
    //parse the _data into a DOM
    DP = new DOMParser();
    doc = DP.parseFromString(_data, 'text/html');
  }
});

var extractionSelector = new Selector(function () {
  return doc.getElementById("filming_locations_content").children;
});

var extractor = new Extractor(function (location_container) {
  return location_container.children[0].children[0].innerHTML.split(',')[0];
});

var query = new Query(new Endpoint(), ["prefix dbpedia-owl: <http://dbpedia.org/ontology/>" + "\n" + "prefix dbpprop: <http://dbpedia.org/property/>" + "\n" + "select ?o where { ?s dbpprop:name \"", "\"@en ." + "\n" + "?s dbpedia-owl:thumbnail ?o }"]);

var getter = new Getter(function (data) {
  var results = {};
  results["thumbnail"] = data.results.bindings[0].o.value;
  return results;
}, query);

var aug = new Augmentation(extractionSelector, extractor, getter);

console.log(aug.run());

