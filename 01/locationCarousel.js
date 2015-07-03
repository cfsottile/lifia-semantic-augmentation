function hardcodedLocations () {
    return [
        "Bletchley Park",
        "Sherborne School"
    ];
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
var locations = hardcodedLocations();
// for (var location in locations) {
//     getImageUrlFromLocation(location);
// }
getImageUrlFromLocation(locations[0]);
getImageUrlFromLocation(locations[1]);
getImageUrlFromLocation(locations[2]);
