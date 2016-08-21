class BuilderNto1 {
  constructor (htmlString) {
    this.htmlString = htmlString;
  }

  run (augmentationWrappers) {
    var finalHtml = this.createFinalHtml();
    var itemTemplate = finalHtml.getElementById("itemTemplate");
    // this.prepareFinalHtml(finalHtml);
    augmentationWrappers.forEach(aw => {
        this.addFulfilledItemToFinalHtml(this.fulfillItemTemplate(itemTemplate, aw), finalHtml);
        // debugger;
    });
    this.removeItemTemplateFromFinalHtml(finalHtml);
    return finalHtml;
  }

  createFinalHtml() {
    var DOMParser = require("xmldom").DOMParser;
    return (new DOMParser()).parseFromString(this.htmlString);
  }

  // prepareFinalHtml() {
  //   finalHtml.
  // }

  fulfillItemTemplate(itemTemplate, aw) {
    var gotten = aw.getGotten();
    var item = itemTemplate.cloneNode(true);
    item.setAttribute("id", "item");
    var itemStr = item.toString();
    var toFulfill = itemStr.match(/{{(.*?)}}/g);
    toFulfill.forEach(function (e, i, a) {
      itemStr = itemStr.replace(e, gotten[e.slice(2, e.length - 2)]);
    });
    var DOMParser = require("xmldom").DOMParser;
    var itemNode = (new DOMParser()).parseFromString(itemStr).firstChild;
    return itemNode;
  }

  addFulfilledItemToFinalHtml(fulfilledItem, finalHtml) {
    finalHtml.getElementById("itemTemplate").parentNode.appendChild(fulfilledItem);
  }

  removeItemTemplateFromFinalHtml(finalHtml) {
    finalHtml.removeChild(finalHtml.getElementById("itemTemplate"));
  }
}
