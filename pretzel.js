
$(document).ready(function(){
    $.ajaxSetup({
        cache:false
    });

    // Pretzel JSON Filename here
    pretzelJSON = 'pretzel-data.json';

    // Enable extra console messages here
    var debug = false;
    var originalTitle = "";
    var wasPlaying = "";

    function logger(type, message) {
        if (debug) {
            console.log("********");
            console.log(type);
            console.log(message);
        }
    }

    function getPretzelData(jsonFile) {
        $.getJSON(jsonFile, function(responseData) {
            const { player, track } = responseData;
            const { playing } = player;
            const { title, artistsString, artists, release, liked } = track;
                if (originalTitle.valueOf() != title.valueOf() || wasPlaying != playing) {
                    logger("Title Change");
                    originalTitle = title;
                    wasPlaying = playing;
                    logger("Player:", player);
                    logger("Track:", track);
                    var paused = "";
                    if (!playing) {
                        paused = 'PAUSED :: ';
                    }
                    $('#song-content').animate({width: '0px'}, "slow").delay(1000).queue(function() {
                        $("#title").html(paused + title);
                        $("#artist").html(artistsString);
                        $('.marquee div').each(function(){
                            if($(this).text().length > 14){
                                $(this).parent().addClass('active');
                            } else {
                                $(this).parent().removeClass('active');
                            }
                        });
                        const randomId = new Date().getTime();
                        $('#song-art').css('background-image', 'url(pretzel-album.jpg?random=${randomId}');
                        $('#song-art-background').css('background-image', 'url(pretzel-album.jpg?random=${randomId}');
                        $(this).dequeue();
                    }).delay(1000).animate({width: '205px'}, "slow");
                }
            }
        );
    }

    logger("Notification:", "Document Ready");
    setInterval(function() {
        getPretzelData(globalThis.pretzelJSON);
    }, 50); 
  
});