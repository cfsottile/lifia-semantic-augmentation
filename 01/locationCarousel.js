function hardcodedLocations () {
    return [
        "Bletchley Park",
        "Sherborne School"
    ];
}

function getFilmingLocations () {

  var filming_locations = [];

  $.ajax({
    async: false,
		dataType: "html",
		url: (document.URL + 'locations'),
    success: function(_data){

      //parse the _data into a DOM
      DP = new DOMParser();
      doc = DP.parseFromString(_data, 'text/html');

      //get container element
      locations_containter = doc.getElementById("filming_locations_content");

      //get locations names
      for each (location_containter in locations_containter.children) {
        filming_locations.push(location_containter.children[0].children[0].innerHTML.split(',')[0]);
      }

    }
  });

  return filming_locations;
}

function defaultEndpoint() {
    return "http://dbpedia.org/sparql";
}

function performQuery(query, callback, endpoint) {
    // endpoint = endpoint !== undefined ? endpoint : defaultEndpoint();
    endpoint = endpoint || defaultEndpoint();
    queryUrl = encodeURI(endpoint + "?query=" + query + "&format=json");

    $.ajax({
		dataType: "jsonp",
		url: queryUrl,
		success: callback
    });
}

function addImage(data) {
    // document.getElementById('semantic_augmented_marquee').innerHtml += "<img src=\"" + data.results.bindings[0].o.value + "\">";
    // $('#semantic_augmented_marquee').add('<img src=\"' + data.results.bindings[0].o.value + '\">');
    var image = document.createElement('img');
    image.src = data.results.bindings[0].o.value;
    // image.className += ''
    $('#semantic_augmented_image_container').append(image);
    // document.getElementById('semantic_augmented_image_container').appendChild(image);
}

function addMarquee () {
    var imageContainer = '<marquee id="semantic_augmented_image_container" class="article">';
    imageContainer += '<h2>Location Photos</h2>';
    imageContainer += '</marquee>';
    $(imageContainer).insertAfter('#titleCast');
}

function getImageUrlFromLocation (location, endpoint) {
    var query =
        "prefix dbpedia-owl: <http://dbpedia.org/ontology/>" + "\n" +
        "prefix dbpprop: <http://dbpedia.org/property/>" + "\n" +
        "select ?o where { ?s dbpprop:name \"" + location + "\"@en ." + "\n" +
        "?s dbpedia-owl:thumbnail ?o }";
    performQuery(query, addImage, defaultEndpoint());
}

addMarquee();
var locations = getFilmingLocations();
for each (location in locations) {
    getImageUrlFromLocation(location);
}
// getImageUrlFromLocation(locations[0]);
// getImageUrlFromLocation(locations[1]);
// getImageUrlFromLocation(locations[2]);
