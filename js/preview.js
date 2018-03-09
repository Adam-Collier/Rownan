function preview() {
  var preview = document.querySelector(".preview");
  if (preview.style.visibility === "hidden") {
    preview.style.visibility = "visible";
  } else {
    preview.style.visibility = "hidden";
  }
  var m = document.querySelectorAll(".switch");
  m.forEach(function(x) {
    if (x.style.fill === "rgb(160, 160, 160)") {
      x.style.fill = "none";
    } else {
      x.style.fill = "rgb(160, 160, 160)";
      x.style.fillOpacity = "0.5";
    }
  });
}

module.exports = preview;
