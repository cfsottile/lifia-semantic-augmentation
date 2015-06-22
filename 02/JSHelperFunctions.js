//JSHelperFunctions.js


//returns an element from the DOM given an Xpath "path"

function getElementByXpath (path) {
			return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


//Returns the Xpath

function getMovieActorXpathString (i) {
			return "//*[@id=\"titleCast\"]/table/tbody/tr[" + i + "]/td[2]/a/span";
}