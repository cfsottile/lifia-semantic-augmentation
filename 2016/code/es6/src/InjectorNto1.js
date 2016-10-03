class InjectorNto1 {
  constructor (doc, nodeGetterFunction, injectionFunction) {
    this.doc = doc;
    this.nodeGetterFunction = nodeGetterFunction;
    this.injectionFunction = injectionFunction;
  }

  run (augmentationWrappers, builtHtml, doc) {
    this.injectionFunction(
      this.nodeGetterFunction(augmentationWrappers, doc),
      builtHtml);
  }
}
