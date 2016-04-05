class Endpoint {
  constructor () {
    this.endpoint = "http://dbpedia.org/sparql";
  }

  buildURI (query) {
    return encodeURI(endpoint + "?query=" + query + "&format=json");
  }
}
