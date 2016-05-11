class Augmentation {
  constructor(selector, extractor, getter, builder, injector) {
    this.augmentationWrappers = [];
    this.extractionSelector = selector;
    this.extractor = extractor;
    this.getter = getter;
    this.builder = builder;
    // this.injector = injector;
  }

  setExtractionSelector (selector) {
    this.extractionSelector = selector;
  }

  setExtractor (extractor) {
    this.extractor = extractor;
  }

  setGetter (getter) {
    this.getter = getter;
  }

  select () {
    extractionSelector.run(this.augmentationWrappers);
  }

  extract () {
    extractor.run(this.augmentationWrappers);
  }

  get () {
    getter.run(this.augmentationWrappers);
  }

  build () {
    builder.run(this.augmentationWrappers);
  }

  run () {
    this.select();
    this.extract();
    this.get();
    this.build();
    debugger;
    return this.augmentationWrappers;
    //this.build();
    //this.inject();
  }
}
