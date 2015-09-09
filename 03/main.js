function addImdbSoundtrackSection () {
    var songsListSection = '<div class="article">';
    songsListSection += '<h2>Soundtrack</h2>';

    var songsList = imdbSongsList();
    var i = 0;
    for (; i < songsList.length; i++) {
      var query = songsList[i]["title"] + " " + songsList[i]["performer"];
      songsListSection += "<h4>" + songsList[i]["title"] + " by " + songsList[i]["performer"] + "</h4> " +
        "<a href=\"" + getYoutubeSearchLinkFor(query) + "\">Search now!</a>" + "<br>";
    }

    songsListSection += '</div>';
    $(songsListSection).insertAfter('#titleCast');
}

// function linkOrIframeFor(query) {
//   var videoId = getVideoIdForStringQuery(query);
//   // if (Date.now() % 2 === 0) {
//     return "<a href=\"" + getYoutubeSearchLinkFor(query) + "\">Play now!</a>";
//   // } else {
//     // return getYoutubeIframeFor("ytplayer", videoId, 100, 100);
//   }
// }

addImdbSoundtrackSection();
