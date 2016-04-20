class Endpoint {
  constructor () {
    this.endpoint = "http://dbpedia.org/sparql";
  }

  buildURI (query) {
    return encodeURI(this.endpoint + "?query=" + query + "&format=json");
  }
}
