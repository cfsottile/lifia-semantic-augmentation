//getBirthAndDeathDates.js

//returns a key->value array with the keys birthDate and deathDate for the actor given as a string in "actorName"

function getBirthAndDeathDates(actor){

  var actorName = actor.innerHTML;

	var actorUri;
	var url = "http://dbpedia.org/sparql";
	var results = [];

	var query = "\
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
	SELECT ?s \
	WHERE { \
		?s foaf:name \"" + actorName + "\"@en}";

	var queryUrl = encodeURI(url + "?query=" + query + "&format=json");

	$.ajax({
		dataType: "jsonp",
		url: queryUrl,
		success: function(_data) {
			actorUri = _data.results.bindings[0].s.value;

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

							if (_data.results.bindings.length !== 0) {
								if (_data.results.bindings[0].o !== undefined) {
									results["deathDate"]=_data.results.bindings[0].o.value;
									actor.innerHTML += " | 👶" + results["birthDate"] + " - 💀" + results["deathDate"];
								}
						}
            }});
          }
			});
		}
	});
}
