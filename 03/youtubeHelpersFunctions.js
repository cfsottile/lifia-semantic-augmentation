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
