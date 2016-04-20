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
)

var aug = new Augmentation(
  extractionSelector,
  extractor,
  getter
);

console.log(aug.run());
