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
    this.builder = builder;
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
      extractionSelector.run(this.augmentationWrappers);
    }
  }, {
    key: "extract",
    value: function extract() {
      extractor.run(this.augmentationWrappers);
    }
  }, {
    key: "get",
    value: function get() {
      getter.run(this.augmentationWrappers);
    }
  }, {
    key: "build",
    value: function build() {
      builder.run(this.augmentationWrappers);
    }
  }, {
    key: "run",
    value: function run() {
      this.select();
      this.extract();
      this.get();
      var built = this.build();
      debugger;
      return built;
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
    key: "setBuilt",
    value: function setBuilt(object) {
      this.built = object;
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
  }, {
    key: "getBuilt",
    value: function getBuilt() {
      return this.built;
    }
  }]);

  return AugmentationWrapper;
}();

var BuilderNto1 = function () {
  function BuilderNto1(htmlString) {
    _classCallCheck(this, BuilderNto1);

    this.htmlString = htmlString;
  }

  _createClass(BuilderNto1, [{
    key: "run",
    value: function run(augmentationWrappers) {
      var _this = this;

      var finalHtml = this.createFinalHtml();
      var itemTemplate = finalHtml.getElementById("itemTemplate");
      // this.prepareFinalHtml(finalHtml);
      augmentationWrappers.forEach(function (aw) {
        _this.addFulfilledItemToFinalHtml(_this.fulfillItemTemplate(itemTemplate, aw), finalHtml);
        // debugger;
      });
      this.removeItemTemplateFromFinalHtml(finalHtml);
      return finalHtml;
    }
  }, {
    key: "createFinalHtml",
    value: function createFinalHtml() {
      var DOMParser = require("xmldom").DOMParser;
      return new DOMParser().parseFromString(this.htmlString);
    }

    // prepareFinalHtml() {
    //   finalHtml.
    // }

  }, {
    key: "fulfillItemTemplate",
    value: function fulfillItemTemplate(itemTemplate, aw) {
      var gotten = aw.getGotten();
      var item = itemTemplate.cloneNode(true);
      // debugger;
      item.setAttribute("id", "item");
      var itemStr = item.toString();
      var toFulfill = itemStr.match(/{{(.*?)}}/g);
      toFulfill.forEach(function (e, i, a) {
        itemStr = itemStr.replace(e, gotten[e.slice(2, e.length - 2)]);
      });
      var DOMParser = require("xmldom").DOMParser;
      var itemNode = new DOMParser().parseFromString(itemStr).firstChild;
      // debugger;
      return itemNode;
    }
  }, {
    key: "addFulfilledItemToFinalHtml",
    value: function addFulfilledItemToFinalHtml(fulfilledItem, finalHtml) {
      finalHtml.getElementById("itemTemplate").parentNode.appendChild(fulfilledItem);
    }
  }, {
    key: "removeItemTemplateFromFinalHtml",
    value: function removeItemTemplateFromFinalHtml(finalHtml) {
      finalHtml.removeChild(finalHtml.getElementById("itemTemplate"));
    }
  }]);

  return BuilderNto1;
}();
// For now, only N to N


var BuilderNtoN = function () {
  function BuilderNtoN(htmlString) {
    _classCallCheck(this, BuilderNtoN);

    this.htmlString = htmlString;
  }

  _createClass(BuilderNtoN, [{
    key: "run",
    value: function run(augmentationWrappers) {
      var _this2 = this;

      var itemTemplate = this.getItemTemplate();
      augmentationWrappers.forEach(function (aw) {
        aw.setBuilt(_this2.fulfillItemTemplate(itemTemplate, aw));
      });
      // for testing purposes
      return augmentationWrappers;
    }
  }, {
    key: "getItemTemplate",
    value: function getItemTemplate() {
      var DOMParser = require("xmldom").DOMParser;
      var htmlNode = new DOMParser().parseFromString(this.htmlString);
      return htmlNode.getElementById("itemTemplate");
    }
  }, {
    key: "fulfillItemTemplate",
    value: function fulfillItemTemplate(itemTemplate, aw) {
      var gotten = aw.getGotten();
      var itemStr = itemTemplate.cloneNode(true).toString();
      var toFulfill = itemStr.match(/{{(.*?)}}/g);
      toFulfill.forEach(function (e, i, a) {
        itemStr = itemStr.replace(e, gotten[e.slice(2, e.length - 2)]);
      });
      return itemStr;
    }
  }]);

  return BuilderNtoN;
}();

var Endpoint = function () {
  function Endpoint() {
    _classCallCheck(this, Endpoint);

    this.endpoint = "http://dbpedia.org/sparql";
  }

  _createClass(Endpoint, [{
    key: "buildURI",
    value: function buildURI(query) {
      return encodeURI(this.endpoint + "?query=" + query + "&format=json");
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
      var _this3 = this;

      augmentationWrappers.forEach(function (e) {
        e.setExtracted(_this3.parserFunction(e.getSelected()));
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
      var _this4 = this;

      augmentationWrappers.forEach(function (e) {
        e.setGotten(_this4.parserFunction(_this4.query.execute(e.getExtracted())));
      });
    }
  }]);

  return Getter;
}();

var Query = function () {
  function Query(endpoint, queryStrings) {
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
      var response = request("GET", this.endpoint.buildURI(this.buildQuery(args)));
      return JSON.parse(response.getBody('utf8'));
      //
      // var data;
      // $.ajax({
      //   async: false,
      //   dataType: "jsonp",
      //   url: endpoint.buildURI(this.buildQuery(args)),
      //   success: function(_data) {
      //     data = _data;
      //   }
      // });
      // return data;
    }
  }, {
    key: "buildQuery",
    value: function buildQuery(args) {
      var builtQuery = "";
      // nasty hack
      // args.push("");
      // this.queryStrings.forEach((e, i) => {
      // builtQuery = builtQuery.concat(e);
      // builtQuery = builtQuery.concat(args);
      // })

      builtQuery = builtQuery.concat(this.queryStrings[0]);
      builtQuery = builtQuery.concat(args);
      builtQuery = builtQuery.concat(this.queryStrings[1]);
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
// var $ = require('jquery')


var fs = require("fs");
var jsdom = require("jsdom");
var request = require("sync-request");

// var doc;
// $.ajax({
//   async: false,
//   dataType: "html",
//   url: ("http://www.imdb.com/title/tt2084970/locations"),
//   success: function(_data){
//     //parse the _data into a DOM
//     DP = new DOMParser();
//     doc = DP.parseFromString(_data, 'text/html');
//   }
// });

// var doc = jsdom.jsdom(fs.readFileSync("./locations.html"))
var doc = jsdom.jsdom(request("GET", "http://www.imdb.com/title/tt2084970/locations").getBody());

var extractionSelector = new Selector(function () {
  // in order to get a proper array, I have to do this
  var elements = doc.getElementById("filming_locations_content").children;
  var arr = [].slice.call(elements);
  arr.splice(0, 1);
  return arr;
});

var extractor = new Extractor(function (location_container) {
  return location_container.children[0].children[0].innerHTML.split(',')[0];
});

var query = new Query(new Endpoint(), ["prefix dbpedia-owl: <http://dbpedia.org/ontology/>" + "\n" + "prefix dbpprop: <http://dbpedia.org/property/>" + "\n" + "select ?o where { ?s dbpprop:name \"", "\"@en ." + "\n" + "?s dbpedia-owl:thumbnail ?o }"]);

var getter = new Getter(function (data) {
  var results = {};
  if (data.results.bindings.length > 0) {
    results["thumbnail"] = data.results.bindings[0].o.value;
  }
  return results;
}, query);

var builder = new BuilderNto1('<div id="container">\
    <div id="itemTemplate">\
      <p>\
        {{thumbnail}}\
      </p>\
    </div>\
  </div>');

var aug = new Augmentation(extractionSelector, extractor, getter, builder);

console.log(aug.run());

