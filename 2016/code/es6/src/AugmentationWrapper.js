class AugmentationWrapper {
  constructor () {
    this.selected;
    this.extracted;
    this.gotten;
  }

  setSelected (object) {
    this.selected = object;
  }

  setExtracted (object) {
    this.extracted = object;
  }

  setGotten (object) {
    this.gotten = object;
  }

  setBuilt (object) {
    this.built = object;
  }

  getSelected () {
    return this.selected;
  }

  getExtracted () {
    return this.extracted;
  }

  getGotten () {
    return this.gotten;
  }

  getBuilt () {
    return this.built;
  }
}
