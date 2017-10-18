 
 const id=getValueOfURLParamter("id")==null?"1":getValueOfURLParamter("id");//获取所传索引
var len = 0;
var index = 0;  //图片序号\
 var disTime=0.00;
var playData;
var playTime=0;
 var myAudio;
var adTimer2;
//var data="";
var data=datas[0][id];
 $(document).ready(function(){
    // $.getJSON("data/data.json",function(result){
    //     data=result[0][id];
    //      $("#audio").attr("src",data.audioURL);
    //      $("header").html(data.name.CN);
    //      $("p").html(data.description.CN);
    //      if(data.ImgURL.length>1)
    //      {
    //         var $ul=$("<ul></ul>");
    //           for (var value of data.ImgURL) {
    //           var $img=$("<li><img  class='banner' src='"+value+"'></li>");
    //           $ul.append($img);
    //         }
    //         $(".img").append($ul);
    //         len=data.ImgURL.length;
    //           adTimer = setInterval(function() {
    //           showImg(index)
    //           index++;
    //           if (index == len) {       //最后一张图片之后，转到第一张
    //               index = 0;
    //           }
    //         }, 3000);
    //      }else{
    //          var $img=$("<img  class='banner' src='"+data.ImgURL+"'>");
    //         $(".img").append($img);
    //      }
    // });

       $("#audio").attr("src",data.audioURL);
       $("header").html(data.name.CN);
       $("p").html(data.description.CN);

       if(data.ImgURL.length>1)
       {
          var $ul=$("<ul class='slider'></ul>");
          for (var value of data.ImgURL) {
            var $img=$("<li><img  class='banner' src='"+value+"'></li>");
            $ul.append($img);
          }
            len=data.ImgURL.length;
            $(".img").append($ul);
            adTimer = setInterval(function() {
            showImg(index)
            index++;
            if (index == len) {       //最后一张图片之后，转到第一张
                index = 0;
            }
          }, 3000);
       }else{
           var $img=$("<img  class='banner' src='"+data.ImgURL+"'>");
          $(".img").append($img);
       }


     myAudio = document.getElementById("audio");
     $(audio).on('loadedmetadata',function(){
         playData= Math.floor(myAudio.duration);
         if(myAudio.duration)
            $('.timeshow').text(secondToMin(playData))
     });
});
 //播放处理
function playHandler(){

    if($("#play").hasClass("stop"))
    {
        $("#play").removeClass("stop");
        $("#play").addClass("doing");



        if(myAudio)
            myAudio.play();


        adTimer2 = setInterval(function() {

            playTime=Math.floor(audio.currentTime);
            showProcess(audio.currentTime)

            if (playData == playTime) {
                playTime = 0;
                $(".progress2").css({width:"0px"});

                stopPlay(myAudio)//播放完成停止
            }
        }, 1000);
    }else{
        stopPlay(myAudio)//点击停止
    }

}
 //停止播放
 function  stopPlay(myAudio){

     $("#play").addClass("stop");
     $("#play").removeClass("doing");
     if(myAudio)
        myAudio.pause();
     window.clearInterval(adTimer2)
 }
 //更改文字
 function changeLanguage () {

     if($(".languageName").html()=="简体中文")
     {
         $(".languageName").html("English");
         $("header").html(data.name.EN);
         $("p").html(data.description.EN);

     }else{
         $(".languageName").html("简体中文")
         $("header").html(data.name.CN);
         $("p").html(data.description.CN);
     }
 }
 //进度条显示
 function showProcess(currentTime) {
     var adWidth = $(".progress2").width();

     $(".progress2").css({width:(currentTime/audio.duration).toFixed(4)*100+"%"})

     $(".time").text(secondToMin(currentTime));
 }
 function showImg(index) {
        var adHeight = $(".img>ul>li:first").height();
        $(".slider").stop(true, false).animate({
            "marginTop": -adHeight * index + "px"    //改变 marginTop 属性的值达到轮播的效果
        }, 1000);
        // $(".num li").removeClass("on")
        //     .eq(index).addClass("on");
    }

/* 获取地址栏传递的参数 */
function getValueOfURLParamter(para) {
    var value = '';
    var args = window.location.href.substring(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < args.length; i++) {
        if (args[i].substring(0, args[i].indexOf('=')).toUpperCase() == para.toUpperCase()) {
            value = args[i].substring(args[i].indexOf('=') + 1);
            break;
        }
    }
    return value;
}
 //计算时间
 function secondToMin(s) {
     var MM = Math.floor(s / 60);
     var SS = s % 60;
     if (MM < 10)
         MM = "0" + MM;
     if (SS < 10)
         SS = "0" + SS;
     var min = MM + ":" + SS;
     return min.split('.')[0];
 }