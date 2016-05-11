class Augmentation {
  constructor(selector, extractor, getter, builder, injector) {
    this.augmentationWrappers = [];
    this.extractionSelector = selector;
    this.extractor = extractor;
    this.getter = getter;
    this.builder = builder;
    // this.injector = injector;
  }

  setExtractionSelector (selector) {
    this.extractionSelector = selector;
  }

  setExtractor (extractor) {
    this.extractor = extractor;
  }

  setGetter (getter) {
    this.getter = getter;
  }

  select () {
    extractionSelector.run(this.augmentationWrappers);
  }

  extract () {
    extractor.run(this.augmentationWrappers);
  }

  get () {
    getter.run(this.augmentationWrappers);
  }

  build () {
    builder.run(this.augmentationWrappers);
  }

  run () {
    this.select();
    this.extract();
    this.get();
    this.build();
    debugger;
    return this.augmentationWrappers;
    //this.build();
    //this.inject();
  }
}
class AugmentationWrapper {
  constructor () {
    this.selected;
    this.extracted;
    this.gotten;
  }

  setSelected (object) {
    this.selected = object;
  }

  setExtracted (object) {
    this.extracted = object;
  }

  setGotten (object) {
    this.gotten = object;
  }

  setBuilt (object) {
    this.built = object;
  }

  getSelected () {
    return this.selected;
  }

  getExtracted () {
    return this.extracted;
  }

  getGotten () {
    return this.gotten;
  }

  getBuilt () {
    return this.built;
  }
}
// For now, only N to N
class Builder {
  constructor (htmlString) {
    this.htmlString = htmlString;
  }

  run (augmentationWrappers) {
    var itemTemplate = this.getItemTemplate();
    augmentationWrappers.forEach(aw => {
      aw.setBuilt(
        this.fulfillItemTemplate(itemTemplate, aw));
    });
  }

  getItemTemplate() {
    var DOMParser = require("xmldom").DOMParser;
    var htmlNode = (new DOMParser()).parseFromString(this.htmlString);
    return htmlNode.getElementById("itemTemplate");
  }

  fulfillItemTemplate(itemTemplate, aw) {
    var gotten = aw.getGotten();
    var itemStr = itemTemplate.cloneNode(true).toString();
    var toFulfill = itemStr.match(/{{(.*?)}}/g);
    toFulfill.forEach(function (e, i, a) {
      itemStr = itemStr.replace(e, gotten[e.slice(2, e.length - 2)]);
    });
    return itemStr;
  }
}
class Endpoint {
  constructor () {
    this.endpoint = "http://dbpedia.org/sparql";
  }

  buildURI (query) {
    return encodeURI(this.endpoint + "?query=" + query + "&format=json");
  }
}
class Extractor {
  constructor (parserFunction) {
    this.parserFunction = parserFunction;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  run (augmentationWrappers) {
    augmentationWrappers.forEach(e => {
      e.setExtracted(this.parserFunction(e.getSelected()));
    });
  }
}
class Getter {
  constructor (parserFunction, query) {
    this.parserFunction = parserFunction;
    this.query = query;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  // setQuery (query) {
  //   this.query = query;
  // }

  run (augmentationWrappers) {
    augmentationWrappers.forEach(e => {
      e.setGotten(this.parserFunction(this.query.execute(e.getExtracted())));
    });
  }
}
class Query {
  constructor (endpoint, queryStrings) {
    this.endpoint = endpoint;
    this.queryStrings = queryStrings;
  }

  // setEndpoint (endpoint) {
  //   this.endpoint = endpoint;
  // }

  // setQueryStrings (queryStrings) {
  //   this.queryStrings = queryStrings;
  // }

  execute (args) {
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

  buildQuery(args) {
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
}
class Selector {
  constructor (parserFunction) {
    this.parserFunction = parserFunction;
    this.dom;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  run (augmentationWrappers) {
    this.parserFunction().forEach(e => {
       var aw = new AugmentationWrapper();
       aw.setSelected(e);
       augmentationWrappers.push(aw);
    });
  }
}
// var $ = require('jquery')
var fs = require("fs");
var jsdom = require("jsdom");
var request = require("sync-request")

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
var doc = jsdom.jsdom(request("GET", "http://www.imdb.com/title/tt2084970/locations").getBody())

var extractionSelector = new Selector(() => {
  // in order to get a proper array, I have to do this
  var elements = doc.getElementById("filming_locations_content").children;
  var arr = [].slice.call(elements)
  arr.splice(0, 1)
  return arr;
});

var extractor = new Extractor(
  function(location_container) {
    return location_container.children[0].children[0].innerHTML.split(',')[0];
  }
);

var query = new Query(
  new Endpoint(),
  [
    "prefix dbpedia-owl: <http://dbpedia.org/ontology/>" + "\n" +
      "prefix dbpprop: <http://dbpedia.org/property/>" + "\n" +
      "select ?o where { ?s dbpprop:name \"",
    "\"@en ." + "\n" + "?s dbpedia-owl:thumbnail ?o }"
  ]
);

var getter = new Getter(
  function(data) {
    var results = {};
    if (data.results.bindings.length > 0) {
      results["thumbnail"] = data.results.bindings[0].o.value;
    }
    return results;
  },
  query
);

var builder = new Builder(
  '<div id="container">\
    <div id="itemTemplate">\
      <p>\
        {{thumbnail}}\
      </p>\
    </div>\
  </div>'
);

var aug = new Augmentation(
  extractionSelector,
  extractor,
  getter
);

console.log(aug.run());
