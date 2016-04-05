class Extractor {
  constructor (parserFunction) {
    this.parserFunction = parserFunction;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  run (augmentationWrappers) {
    augmentationWrappers.forEach(e => {
      e.setExtracted(this.parserFunction(e.getSelected()));
    });
  }
}
