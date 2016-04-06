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
