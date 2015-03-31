var STREAMIMG_BASE_URL="http://gaana.com/streamprovider/";
var JSON_TO_JSONP='http://json2jsonp.com/?url=';
var url_p = STREAMIMG_BASE_URL + 'gs2.php?action=freedownload&';

if(!jQuery)
{
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "jquery-2.1.3.min.js";
  document.getElementsByTagName('head')[0].appendChild(script);
}

$(".downloadp").attr('onclick','');

$(".downloadp").unbind('click');

$("#downloadp").attr('onclick','');

$("#downloadp").unbind('click');

$("#downloadp").attr("id", "my_download_div");
$("#my_download_div").attr("class", "my_download_div");

$("#my_download_div").css("padding-left", "18px");;

var _qual = ["normal", "medium", "high"];
function getbitrate() {
  if (_qual.indexOf(readCookie("songquality")) > -1) {
    return readCookie("songquality");
  } else {
    return 'medium';
  }
}

function cbfunc (data) {
  //console.log(data);

  if (data.status == 0) {
    console.log("something broke!");
    return;
  }

  if (data.stream_path.indexOf("mp3") < 0) {
    alert("file type not mp3\n you can't handle this!");
    console.log("file type not mp3\n you can't handle this!");
    console.log(data.stream_path);
    return;
  }

  if (data.stream_path.substr(0, 4) != "http") {
    alert("file type not mp3\n you can't handle this!");
    console.log("file type not mp3\n you can't handle this!");
    console.log(data.stream_path.substr(0, 4));
    return;
  }

  //console.log("checkpt 1");

  var f_url = gaanaMaster.getCurrentInfo().title + ' - ' + gaanaMaster.getCurrentInfo().artist.replace(/#[^ ]*/g, "") /*+ '.mp3'*/;

  prompt("Song name; save file with this name maybe(?)\nCopy to clipboard: Ctrl+C, Enter", f_url);

  //console.log(f_url);

  var link = document.createElement('a');
  link.href = data.stream_path;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  //console.log(link);
  //alert(f_url);

};

function my_func() {
  // remove popup first!
  $('.ui-front').hide();
  $('.userlogin').hide();

  // if no song playing, return!
  if (_activeSongID == "0") {
    //console.log("no song playing!");
    alert("no song playing");
    return;
  }

  //console.log(_activeSongID);

  var url_g = url_p + 'track_id=' + gaanaMaster.getCurrentInfo().id + '&quality=' + getbitrate();

  console.log(url_g);

  url_g = encodeURIComponent(url_g);

  var url_cc_encode = JSON_TO_JSONP + url_g + '&callback=cbfunc';

  //console.log(url_cc_encode);

  $.ajax({
    url: url_cc_encode,
    dataType: 'jsonp',
    jsonp: true,
    jsonpCallback: "cbfunc"
  }).success( function (response) {
    ; // do nothing? we'll callback :)
  });

}

$("#my_download_div").click( function() {

  setTimeout( my_func, 1000 );

});


//console.log();
