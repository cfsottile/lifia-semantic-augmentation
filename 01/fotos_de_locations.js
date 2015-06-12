function defaultEndpoint() {
    return "http://dbpedia.org/sparql";
}

// returns array with results
function performQuery(query, endpoint) {
    // endpoint = endpoint !== undefined ? endpoint : defaultEndpoint();
    endpoint = endpoint || defaultEndpoint();

    // must be implemented, of course

    return [ "http://commons.wikimedia.org/wiki/Special:FilePath/Bletchley_Park_-_Draco2008.jpg?width=300" ];
}

function getResourceIdFromLabel(label, endpoint) {
    var query =
        "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>" + "\n" +
        "select ?s where { ?s rdfs:label \"" + label + ""\"@en }";
    return performQuery(query, endpoint);
}

function getImageUrlFromId(resourceId) {
    var query =
        "prefix http://dbpedia.org/ontology/" + "\n" +
        "select ?o where { " + resourceId + " dbpedia-owl:thumbnail ?o }";
    return performQuery(query, endpoint);
}

function addImage(imageId, imageUrl) {
    $("body").append("<img id=\"" + imageId + "\" src=\"" + imageUrl + ""\">");
}

// expects locations to be an array, with every location formatted as:
// * primary name, words before the comma
// * every word starts with an uppercase char, except for words like the, and, of
function getImagesForLocations(locations) {
    for (var location in locations) {
        getImageUrlFromId(getResourceIdFromLabel(location));
    }
}



// ToDo
// * Probar inyectando con greasemonkey
