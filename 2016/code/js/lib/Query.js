"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = function () {
  function Query() {
    _classCallCheck(this, Query);

    this.endpoint;
    this.queryStrings;
  }

  _createClass(Query, [{
    key: "execute",
    value: function execute(args) {
      var data;
      $.ajax({
        async: false,
        dataType: "jsonp",
        url: endpoint.buildURI(this.buildQuery(args)),
        success: function success(_data) {
          data = _data;
        }
      });
      return data;
    }
  }, {
    key: "buildQuery",
    value: function buildQuery(args) {
      builtQuery = "";
      // nasty hack
      args.push("");
      queryStrings.forEach(e, function (i) {
        builtQuery.concat(e);
        builtQuery.concat(args[i]);
      });
      return builtQuery;
    }
  }, {
    key: "endpoint",
    set: function set(endpoint) {
      this.endpoint = endpoint;
    }
  }, {
    key: "queryStrings",
    set: function set(queryStrings) {
      this.queryStrings = queryStrings;
    }
  }]);

  return Query;
}();

exports.default = Query;