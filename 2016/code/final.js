class Augmentation {
  constructor(selector, extractor, getter, builder, injector) {
    this.augmentationWrappers = [];
    this.extractionSelector=selector;
    this.extractor=extractor;
    this.getter=getter;
    this.builder=builder;
    this.injector=injector;
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
    //this.extract();
    //this.get();
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
  constructor () {
    this.parserFunction;
  }

  setParserFunction (fn) {
    this.parserFunction = fn;
  }

  run (augmentationWrappers) {
    augmentationWrappers.forEach(e => {
      e.setExtracted(this.parserFunction(e.getSelected()));
    });
  }
}
class Getter {
  constructor () {
    this.parserFunction;
    this.query;
  }

  setParserFunction (fn) {
    this.parserFunction = fn;
  }

  setQuery (query) {
    this.query = query;
  }

  run (augmentationWrappers) {
    augmentationWrappers.forEach(e => {
      e.setGotten(this.parserFunction(query.execute(e.getExtracted())));
    });
  }
}
class Query {
  constructor () {
    this.endpoint;
    this.queryStrings;
  }

  set endpoint (endpoint) {
    this.endpoint = endpoint;
  }

  set queryStrings (queryStrings) {
    this.queryStrings = queryStrings;
  }

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
  constructor () {
    this.parserFunction;
    this.dom;
  }

  setParserFunction (fn) {
    this.parserFunction = fn;
  }

  run (augmentationWrappers) {
    this.parserFunction().forEach(e => {
       var aw = new AugmentationWrapper();
       aw.setSelected(e);
       augmentationWrappers.push(aw);
    });
  }
}
var aug = new Augmentation(
  null,
  null,
  null,
  null,
  null
)

console.log(aug)
