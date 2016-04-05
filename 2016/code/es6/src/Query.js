class Query {
  constructor (endpoint, queryString) {
    this.endpoint = endpoint;
    this.queryStrings = queryStrings;
  }

  // setEndpoint (endpoint) {
  //   this.endpoint = endpoint;
  // }

  // setQueryStrings (queryStrings) {
  //   this.queryStrings = queryStrings;
  // }

  execute (args) {
    var data;
    $.ajax({
      async: false,
      dataType: "jsonp",
      url: endpoint.buildURI(this.buildQuery(args)),
      success: function(_data) {
        data = _data;
      }
    });
    return data;
  }

  buildQuery(args) {
    builtQuery = "";
    // nasty hack
    args.push("");
    queryStrings.forEach(e, i => {
      builtQuery.concat(e);
      builtQuery.concat(args[i]);
    })
    return builtQuery;
  }
}
