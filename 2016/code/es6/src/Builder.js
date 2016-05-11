// For now, only N to N
class Builder {
  constructor (htmlString) {
    this.htmlString = htmlString;
  }

  run (augmentationWrappers) {
    var itemTemplate = this.getItemTemplate();
    augmentationWrappers.forEach(aw => {
      aw.setBuilt(
        this.fulfillItemTemplate(itemTemplate, aw));
    });
  }

  getItemTemplate() {
    var DOMParser = require("xmldom").DOMParser;
    var htmlNode = (new DOMParser()).parseFromString(this.htmlString);
    return htmlNode.getElementById("itemTemplate");
  }

  fulfillItemTemplate(itemTemplate, aw) {
    var gotten = aw.getGotten();
    var itemStr = itemTemplate.cloneNode(true).toString();
    var toFulfill = itemStr.match(/{{(.*?)}}/g);
    toFulfill.forEach(function (e, i, a) {
      itemStr = itemStr.replace(e, gotten[e.slice(2, e.length - 2)]);
    });
    return itemStr;
  }
}
