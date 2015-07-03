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
		success: callback(_data)
        }
    });
}

function addImage(data) {
    console.log(data);
    $("body").append("<img src=\"" + data.results.bindings[0].o.value + "\">");
}

function getImageUrlFromLocation (location, endpoint) {
    var query =
        "prefix dbpedia-owl: <http://dbpedia.org/ontology/>" + "\n" +
        "prefix dbpprop: <http://dbpedia.org/property/>" + "\n" +
        "select ?o where { ?s dbpprop:name \"" + location + "\"@en ." + "\n" +
        "?s dbpedia-owl:thumbnail ?o }";
    performQuery(query, addImage, defaultEndpoint());
}


var locations = hardcodedLocations();
// for (var location in locations) {
//     getImageUrlFromLocation(location);
// }
getImageUrlFromLocation(locations[0]);
getImageUrlFromLocation(locations[1]);
getImageUrlFromLocation(locations[2]);
