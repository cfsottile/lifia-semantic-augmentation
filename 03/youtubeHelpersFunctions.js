function getYoutubeListIframeFor(query_string, pheight, pwidth) {

  return ('<iframe id="ytplayer"\
            type="text/html"\
            width="'+pwidth+'"'+
            'height="'+pheight+'"'+
            'src="http://www.youtube.com/embed?listType=search&list='+query_string+'"'+
            'frameborder="0"/>')
}

function getYoutubeVideoFor() {

}
