function main () {
    console.log('main');
    var locations = hardcodedLocations();
    // for (var location in locations) {
    //     getImageUrlFromLocation(location);
    // }
    getImageUrlFromLocation(locations[0]);
    getImageUrlFromLocation(locations[1]);
    getImageUrlFromLocation(locations[2]);
}
