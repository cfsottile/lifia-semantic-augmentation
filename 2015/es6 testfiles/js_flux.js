
class Getter {

  function get(){

  }

}

class Builder {

  private count;
  private elements = [];

  function add(element){

  }

  function build(elemType,elemDataCollection){

  }

}

/*
* ------------ Para N ----------------------------------------------------------
*/

var elements = selector.getElements(xpath);

var dataCol = extractor.extract(elements);

var augmentationData = getter.get(dataCol);

var augmentationElements = builder.build('elemType',augmentationData);

injector.inject()

/*
* ------------ Individual ------------------------------------------------------
*/

//select data elements
  var elements = selector.getElements(xpath);

//extract data from elements
  var extractedDataCollection = [];
  elements.forEach(function(element){
    extractedDataCollection.push( extractor.extractData(element) );
  });


//get augmentation data for each data collected

  //get augmentation data for each extracted data
  var augmentationDataCollection = [];
  extractedDataCollection.forEach(function(data){
    augmentationDataCollection.push( getter.getData(data) );
  });

  //get augmentation data from a compositon of extracted data
  augmentationDataCollection.push( getter.getData(data) ); //should this be a different getter method or should it allow both ways of using extracted data?


//with augmentation data, construct elements to inject

  //1 element for each augmentation data
  var augmentationElements = [];
  augmentationDataCollection.forEach(function(augmentationData){
    augmentationElements.push(builder.build('elemType', augmentationData));
  });

  //1 element for N augmentation data
  var augmentationElements.push(builder.build('elemType', augmentationDataCollection));


//inject each augmentation element where it's configured selector specifies
  augmentationElements.forEach(function(augmentationElement){
    injector.inject(augmentationElement);
  });
