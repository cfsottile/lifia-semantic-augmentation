function getElementByXpath (path) {
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function anyImdbSoundtrackInfo () {
  return getElementByXpath('//*[@id="soundtracks"]') !== null ? true : false;
}

function toRawText(htmlText) {
  // stripTagsFromHtml, then replace &amp; for &
  return htmlText.replace(/(<([^>]+)>)/ig,"").replace(/\b(&amp;)\b/gi, "&").toLowerCase();
}

function multilineStringToArray(string) {
  // string.match(/^.*([\n\r]+|$)/gm);
  return string.match(/^.*([]+|$)/gm);
}

function toObject(songInfo) {
  var arrayedSongInfo = multilineStringToArray(songInfo);

  var song = {
    "title": arrayedSongInfo[0]
  };
  if (arrayedSongInfo[2].indexOf("performed") === 0) {
    song["performer"] = arrayedSongInfo[2].slice(13);
  } else if (arrayedSongInfo[1].indexOf("by") === 0) {
    song["performer"] = arrayedSongInfo[1].slice(3);
  }

  return song;
}

function parseDOM(_data) {
  // DP = new DOMParser();
  // doc = DP.parseFromString(_data, 'text/html');
  //
  // songsContainer = doc.getElementById("soundtracks_content").children[1];
  // var i;
  // for (i = 1; i < songsContainer.children.length; i++) {
  //   var songInfo = toRawText(songsContainer.children[i].innerHTML);
  //   var song = toObject(songInfo);
  //   songsList.push(song);
  // }
}

function imdbSongsList() {
  var songsList = [];

  var url = "soundtrack";
  $.ajax({
    async: false,
    dataType: "html",
    url: "soundtrack",
    // success: parseDOM()
    success: function (_data) {
      DP = new DOMParser();
      doc = DP.parseFromString(_data, 'text/html');

      songsContainer = doc.getElementById("soundtracks_content").children[1];
      var i;
      for (i = 1; i < songsContainer.children.length; i++) {
        var songInfo = toRawText(songsContainer.children[i].innerHTML);
        var song = toObject(songInfo);
        songsList.push(song);
      }
    }
  });

  return songsList;
}

imdbSongsList();
