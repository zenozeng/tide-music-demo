var ua = window.navigator.userAgent;
if(ua.indexOf('irefox') != -1) {
    isIe = true;
}

var musics = [
  {
      name: 'Play',
      url: 'data/lianlian/music/Play.mp3'
  },
  {
      name: '每个人去自己的未来',
      url: 'data/smi/music/每个人去自己的未来.mp3'
  },
  {
      name: '光',
      url: 'data/smi/music/光.mp3'
  },
  {
      name: '为了那一天',
      url: 'data/qzh/music/为了那一天.mp3'
  },
  {
      name: '给远方的你',
      url: 'data/qzh/music/给远方的你.mp3'
  },
  {
      name: '我只是害怕青春的逝去',
      url: 'data/qzh/music/我只是害怕青春的逝去.mp3'
  }
];

var musicCount = 0;
var getMusic = function() {
    if(musicCount >= musics.length) {
        musicCount = 0;
    }
    var name = musics[musicCount].name;
    var url = musics[musicCount].url;
    console.log(url);
    $('#song').text(name);
    musicCount++;
    return url;
};

if(typeof isIe != "undefined") {
    var urls = [];
    for(var i=0; i<musics.length; i++) {
        urls.push(musics[i].url);
    }
    urls = urls.join('|');
    var html = '<object type="application/x-shockwave-flash" data="flash/dewplayer-multi.swf" width="240" height="20" id="dewplayermulti" name="dewplayermulti"><param name="movie" value="flash/dewplayer-multi.swf" /><param name="flashvars" value="mp3='+urls+'" /></object>';
    $('#player').html(html);
    $('#player').css('background', 'transparent');
    setInterval(function() {
        $('#player').css({width: '270px', 'margin-left': '-135px'});
    }, 50);
} else {
    $("#jp").jPlayer({
        ready: function() {
            $(this).jPlayer("setMedia", {
                mp3: getMusic()
            }).jPlayer("play");
        },
        ended: function() {
            $(this).jPlayer("setMedia", {
                mp3: getMusic()
            }).jPlayer("play");
        },
        swfPath: "http://app.myqsc.com/Public/jPlayer",
        supplied: "mp3"
    });

    $('#next').click(function() {
        $("#jp").jPlayer("setMedia", {
            mp3: getMusic()
        }).jPlayer("play");
    });

    $('#play').click(function() {
        $(this).css({display: 'none'});
        $('#pause').css({display: 'inline-block'});
        $("#jp").jPlayer("play");
    });
    $('#pause').click(function() {
        $(this).css({display: 'none'});
        $('#play').css({display: 'inline-block'});
        $("#jp").jPlayer("pause");
    });
}

$('#avabar li').click(function(){
    var hash = $(this).attr('rel');
    window.location.href = 'detail.html#'+hash;
});

$("#avabar img").hover(
  function() {
      $(this).animate({'opacity': 1});
  },
  function() {
      $(this).animate({'opacity': '.5'});
  }
);


if (window.addEventListener){
    window.addEventListener('resize', function() { updateWidth(); });
} else if (window.attachEvent){
    // for ie
    window.attachEvent('resize', function() { updateWidth(); });
}

function updateWidth() {
    var width = $(window).width(),
        height = $(window).height(),
        scale = width / height,
        w = width /6 - 1,
        bgScale = 1600 / 832;

    if(scale < bgScale) {
        $('#bg').css({width: 'auto', height: height});
        var bgWidth = $('#bg').width();
        var leftOffset = (bgWidth - width) / 2 * -1;
        $('#bg').css({position: 'absolute', left: leftOffset});
    } else {
        $('#bg').css({width: width, height: 'auto', left: 0});
    }

    $('#avabar img').css({width: w});


    if(width < 1200) {
        $('#player').css({width: '52px', height: '16px', 'margin-left': '-40px'});
        $('#song').css({display: 'none'});
    } else {
        $('#song').css({display: 'inline-block'});
        $('#player').css({width: '210px', height: '16px', 'margin-left': '-115px'});
    }

    setTimeout(function() {
        var bgHeight = $('#bg').height();
        var playerOffset = 375 / 832 * bgHeight;
        $('#player').css({top: playerOffset});
    }, 20);
}
updateWidth();

$(document).ready(function() {
    setTimeout(function() {
        $("#jp").jPlayer("setMedia", {
            mp3: getMusic()
        }).jPlayer("play");
    }, 100);
});