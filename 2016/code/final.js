class Augmentation {
  constructor(selector, extractor, getter, builder, injector) {
    this.augmentationWrappers = [];
    this.extractionSelector = selector;
    this.extractor = extractor;
    this.getter = getter;
    // this.builder = builder;
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
    extractionSelector.run(augmentationWrappers);
  }

  extract () {
    extractor.run(augmentationWrappers);
  }

  get () {
    getter.run(augmentationWrappers);
  }

  run () {
    this.select();
    this.extract();
    this.get();
    return augmentationWrappers.getGotten();
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

  getSelected () {
    return this.selected;
  }

  getExtracted () {
    return this.extracted;
  }

  getGotten () {
    return this.gotten;
  }
}
class Endpoint {
  constructor () {
    this.endpoint = "http://dbpedia.org/sparql";
  }

  buildURI (query) {
    return encodeURI(endpoint + "?query=" + query + "&format=json");
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
      e.setGotten(this.parserFunction(query.execute(e.getExtracted())));
    });
  }
}
class Query {
  constructor (endpoint, queryString) {
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
    var data;
    $.ajax({
      async: false,
      dataType: "jsonp",
      url: endpoint.buildURI(this.buildQuery(args)),
      success: function(_data) {
        data = _data;
      }
    });
    return data;
  }

  buildQuery(args) {
    builtQuery = "";
    // nasty hack
    args.push("");
    queryStrings.forEach(e, i => {
      builtQuery.concat(e);
      builtQuery.concat(args[i]);
    })
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
var doc;
$.ajax({
  async: false,
  dataType: "html",
  url: ("http://www.imdb.com/title/tt2084970/locations"),
  success: function(_data){
    //parse the _data into a DOM
    DP = new DOMParser();
    doc = DP.parseFromString(_data, 'text/html');
  }
});

var extractionSelector = new Selector(() => {
  return doc.getElementById("filming_locations_content").children;
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
    results["thumbnail"] = data.results.bindings[0].o.value;
    return results;
  },
  query
)

var aug = new Augmentation(
  extractionSelector,
  extractor,
  getter
);

console.log(aug.run());
