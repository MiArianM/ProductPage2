const videos = [
  "../Media/FirstIntro.mp4",
  "../Media/SecondIntro.mp4",
  "../Media/ThirdIntro.mp4",
  "../Media/FourthIntro.mp4",
];
const Loaded = () => {
  videoElement.addEventListener("ended", playNextVideo);
  videoElement.src = videos[currentVideoIndex];
  videoElement.classList.add("fade-in-out");
  videoElement.play();
};
const videoElement = document.getElementById("clipped-video");
let currentVideoIndex = 0;
function playNextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  videoElement.src = videos[currentVideoIndex];
  videoElement.classList.remove("fade-in-out");
  void videoElement.offsetWidth;
  videoElement.classList.add("fade-in-out");
  videoElement.play();
}
document.addEventListener("DOMContentLoaded", Loaded);
let i = 2;

$(document).ready(function () {
  var radius = 200;
  var fields = $(".itemDot");
  var container = $(".dotCircle");
  var width = container.width();
  radius = width / 2.5;

  var height = container.height();
  var angle = 0,
    step = (2 * Math.PI) / fields.length;
  fields.each(function () {
    var x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2
    );
    var y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2
    );
    if (window.console) {
      console.log($(this).text(), x, y);
    }

    $(this).css({
      left: x + "px",
      top: y + "px",
    });
    angle += step;
  });

  $(".itemDot").click(function () {
    var dataTab = $(this).data("tab");
    $(".itemDot").removeClass("active");
    $(this).addClass("active");
    $(".CirItem").removeClass("active");
    $(".CirItem" + dataTab).addClass("active");
    i = dataTab;

    $(".dotCircle").css({
      transform: "rotate(" + (360 - (i - 1) * 36) + "deg)",
      transition: "2s",
    });
    $(".itemDot").css({
      transform: "rotate(" + (i - 1) * 36 + "deg)",
      transition: "1s",
    });
  });

  setInterval(function () {
    var dataTab = $(".itemDot.active").data("tab");
    if (dataTab > 6 || i > 6) {
      dataTab = 1;
      i = 1;
    }
    $(".itemDot").removeClass("active");
    $('[data-tab="' + i + '"]').addClass("active");
    $(".CirItem").removeClass("active");
    $(".CirItem" + i).addClass("active");
    i++;

    $(".dotCircle").css({
      transform: "rotate(" + (360 - (i - 2) * 36) + "deg)",
      transition: "2s",
    });
    $(".itemDot").css({
      transform: "rotate(" + (i - 2) * 36 + "deg)",
      transition: "1s",
    });
  }, 5000);
});
