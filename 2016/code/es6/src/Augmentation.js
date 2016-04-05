class Augmentation {
  constructor(selector, extractor, getter, builder, injector) {
    this.augmentationWrappers = [];
    this.extractionSelector = selector;
    this.extractor = extractor;
    this.getter = getter;
    // this.builder = builder;
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
    extractionSelector.run(augmentationWrappers);
  }

  extract () {
    extractor.run(augmentationWrappers);
  }

  get () {
    getter.run(augmentationWrappers);
  }

  run () {
    this.select();
    this.extract();
    this.get();
    return augmentationWrappers.getGotten();
    //this.build();
    //this.inject();
  }
}
