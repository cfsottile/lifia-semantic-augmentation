class InjectorNtoN {
  constructor (doc, nodeGetterFunction, injectionFunction) {
    this.doc = doc;
    this.nodeGetterFunction = nodeGetterFunction;
    this.injectionFunction = injectionFunction;
  }

  run (augmentationWrappers, builtHtml, doc) {
    augmentationWrappers.forEach(aw => {
      this.injectionFunction(
        this.nodeGetterFunction(aw, doc),
        aw.getBuilt())
    });
  }
}
