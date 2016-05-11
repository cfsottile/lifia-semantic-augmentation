var htmlString = '<div id="div1">\
	<div id="div2">\
		<p>\
      {{first}} {{second}} {{third}} {{fourth}}\
		</p>\
	</div>\
</div>';

var DOMParser = require("xmldom").DOMParser;
var htmlNode = (new DOMParser()).parseFromString(htmlString);
var itemTemplate = htmlNode.getElementById("itemTemplate");

augmentationWrappers.forEach(a => {
  var g = a.getGotten();
  var item = itemTemplate.cloneNode(true);
  var itemStr = item.toString();
  var toReplace = itemStr.match(/{{(.*?)}}/g);
  toReplace.forEach(function (e, i, a) {
    itemStr = itemStr.replace(e, g[e.slice(2, e.length - 2)]);
  });
  a.setBuilt(itemStr);
});