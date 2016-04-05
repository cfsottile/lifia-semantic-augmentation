class Selector {
  constructor (parserFunction) {
    this.parserFunction = parserFunction;
    this.dom;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  run (augmentationWrappers) {
    this.parserFunction().forEach(e => {
       var aw = new AugmentationWrapper();
       aw.setSelected(e);
       augmentationWrappers.push(aw);
    });
  }
}
