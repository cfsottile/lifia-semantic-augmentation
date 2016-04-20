class Getter {
  constructor (parserFunction, query) {
    this.parserFunction = parserFunction;
    this.query = query;
  }

  // setParserFunction (fn) {
  //   this.parserFunction = fn;
  // }

  // setQuery (query) {
  //   this.query = query;
  // }

  run (augmentationWrappers) {
    augmentationWrappers.forEach(e => {
      e.setGotten(this.parserFunction(this.query.execute(e.getExtracted())));
    });
  }
}
