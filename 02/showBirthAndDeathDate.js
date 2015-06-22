var actor;
var i = 2;
while ((actor = getElementByXpath(getMovieActorXpathString(i++))) !== null) {
    getBirthAndDeathDates(actor);
}