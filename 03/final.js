function getVideoIdForStringQuery(query) {
  function getElementByXpath (path) {
  	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  var videoId;
  query = query.split(" ").join("+");
  queryUrl = "https://www.youtube.com/results?search_query=" + query;

  $.ajax({
    async: false,
    dataType: "html",
    url: queryUrl,
    success: function (_data) {
      var DP = new DOMParser();
      var doc = DP.parseFromString(_data, 'text/html');

      var video = getElementByXpath("/html/body/div[2]/div[4]/div/div[5]/div/div/div/div[1]/div/div[2]/div[2]/ol/li/ol/li[2]/div/div/div[2]/h3/a");
      videoId = video.href.split("=")[1];
    }
  });

  return videoId;
}

function getVideoUrlForId(id) {
  return "https://www.youtube.com/watch?v=" + id;
}

function getYoutubeSearchLinkFor(query) {
  return "https://www.youtube.com/results?search_query=" + query.split(" ").join("+");
}

function getYoutubeListIframeFor(iframe_id,query_string, pheight, pwidth) {

  return ('<iframe id="'+iframe_id+'"\
            type="text/html"\
            width="'+pwidth+'"'+
            'height="'+pheight+'"'+
            'src="http://www.youtube.com/embed?listType=search&list='+query_string+'"'+
            'frameborder="0"/>')
}

function getYoutubeIframeFor(iframe_id,video_id, pheight, pwidth) {

  return ('<iframe id="'+iframe_id+'"\
            type="text/html"\
            width="'+pwidth+'"'+
            'height="'+pheight+'"'+
            'src="http://www.youtube.com/embed/'+video_id+'"'+
            'frameborder="0"/>')

}
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
      var DP = new DOMParser();
      var doc = DP.parseFromString(_data, 'text/html');

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
