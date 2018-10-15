function preview() {
  var preview = document.querySelector(".preview");
  preview.style.visibility === "hidden" ? preview.style.visibility = "visible" : preview.style.visibility = "hidden";

  var a = document.querySelectorAll(".switch");
  a.forEach(function (x) {
    if (x.style.fill === "rgb(160, 160, 160)") {
      x.style.fill = "none";
    } else {
      x.style.fill = "rgb(160, 160, 160)";
      x.style.fillOpacity = "0.5";
    }
  });
}

module.exports = preview;
