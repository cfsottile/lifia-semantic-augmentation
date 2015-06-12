// ==UserScript==
// @name        Morbo
// @namespace   http://www.imdb.com/title/
// @version     1
// @grant       none
// ==/UserScript==

// @require JSHelperFunctions.js


//getBirthAndDeathDates.js
function getBirthAndDeathDates(actorName){

	var actorUri;
	var url = "http://dbpedia.org/sparql";
	var results = [];
		
	var query = "\
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
	SELECT ?s \
	WHERE { \
		?s foaf:name \"" + actorName + "\"@en}";
	
	var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

	console.log(query);
	console.log(queryUrl);
	
	$.ajax({
		dataType: "jsonp",
		url: queryUrl,
		success: function(_data) {
			actorUri = _data.results.bindings[0].s.value;
			console.log(actorUri);

			query = "\
			prefix dbpedia2: <http://dbpedia.org/property/>\
			SELECT ?o \
			WHERE { \
				<" + actorUri + "> dbpedia2:birthDate ?o }";
			queryUrl = encodeURI(url + "?query=" + query + "&format=json");
			
			$.ajax({
				dataType: "jsonp",
				url: queryUrl,
				success: function(_data) {

					if (_data.results.bindings[0].o !== undefined) {
						actorName += "born on: ";
						actorName += _data.results.bindings[0].o.value;
						results["birthDate"]=_data.results.bindings[0].o.value;
					}
					query = "\
					prefix dbpedia2: <http://dbpedia.org/property/>\
					SELECT ?o \
					WHERE { \
						<" + actorUri + "> dbpedia2:deathDate ?o }";
					
					queryUrl = encodeURI(url + "?query=" + query + "&format=json");
					
					$.ajax({
						dataType: "jsonp",
						url: queryUrl,
						success: function(_data) {
							console.log(_data.results.bindings[0].o);
							if (_data.results.bindings[0].o !== undefined) {
								actorName += " and died on: "
								actorName += _data.results.bindings[0].o.value;
								results["deathDate"]=_data.results.bindings[0].o.value;
							}
							console.log(actorName);
							console.log(results);
							return results;
							
						}
					});
				}
			});
		}
	});
}

console.log(getBirthAndDeathDates("Heath Ledger"));