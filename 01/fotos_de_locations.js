// hardcoding methods - start

function hardcodedLocations () {
    return [
        "Bletchley Park",
        "Sherborne School",
        "Joyce Grove"
    ];
}

// hardcoding methods - ends

function defaultEndpoint() {
    return "http://dbpedia.org/sparql";
}

// returns array with results
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

    // return [ "http://commons.wikimedia.org/wiki/Special:FilePath/Bletchley_Park_-_Draco2008.jpg?width=300" ];
}

function getResourceIdFromLabel(label, endpoint) {
    var query =
        "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" + "\n" +
        "select ?s where { ?s rdfs:label \"" + label + "\"@en }";
    return performQuery(query, endpoint);
}

function getImageUrlFromId(resourceId) {
    var query =
        "prefix http://dbpedia.org/ontology/" + "\n" +
        "select ?o where { " + resourceId + " dbpedia-owl:thumbnail ?o }";
    return performQuery(query, endpoint);
}

function addImage(data) {
    console.log(data);
    // $("body").append("<img src=\"" + imageUrl + "\">");
}

// expects locations to be an array, with every location formatted as:
// * primary name, words before the comma
// * every word starts with an uppercase char, except for words like the, and, of
function getImagesForLocations(locations) {
    for (var location in locations) {
        getImageUrlFromId(getResourceIdFromLabel(location));
    }
}

// location is expected to be a string
function getImageUrlForLocation(location) {
    return getImageUrlFromId(getResourceIdFromLabel(location));
}

// var locations = hardcodedLocations();
// for (var location in locations) {
//     addImage("01", getImageUrlForLocation(location));
// }

$("body").append("<img src=\"" + performQuery() + "\">");
