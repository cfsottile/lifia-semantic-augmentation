class Query {
  constructor (endpoint, queryStrings) {
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
    var response = request("GET", this.endpoint.buildURI(this.buildQuery(args)));
    return JSON.parse(response.getBody('utf8'));
    //
    // var data;
    // $.ajax({
    //   async: false,
    //   dataType: "jsonp",
    //   url: endpoint.buildURI(this.buildQuery(args)),
    //   success: function(_data) {
    //     data = _data;
    //   }
    // });
    // return data;
  }

  buildQuery(args) {
    var builtQuery = "";
    // nasty hack
    // args.push("");
    // this.queryStrings.forEach((e, i) => {
      // builtQuery = builtQuery.concat(e);
      // builtQuery = builtQuery.concat(args);
    // })

    builtQuery = builtQuery.concat(this.queryStrings[0]);
    builtQuery = builtQuery.concat(args);
    builtQuery = builtQuery.concat(this.queryStrings[1]);
    return builtQuery;
  }
}
