// hardcoding methods - start

function hardcodedLocations () {
    return [
        "Bletchley Park",
        "Sherborne School",
        "Joyce Grove"
    ];
}

// hardcoding methods - end

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
		success: function(_data) {
            callback(_data);
        }
    });
}

function addImage(data) {
    console.log(data);
    // $("body").append("<img src=\"" + imageUrl + "\">");
}

function getImageUrlFromLocation (location, endpoint) {
    var query =
        "prefix http://dbpedia.org/ontology/" + "\n" +
        "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" + "\n" +
        "select ?o where { ?s rdfs:label \"" + location + "\"@en ." + "\n" +
        "?s dbpedia-owl:thumbnail ?o }";
    performQuery(query, addImage);
}


var locations = hardcodedLocations();
for (var location in locations) {
    getImageUrlFromLocation(location);
}
