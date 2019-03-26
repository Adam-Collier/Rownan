let cheerio = require("cheerio");
const Prism = require("prismjs");
const path = require("path");
const fs = require("fs");

let syntaxHighlight = () => {
  let html = fs.readFileSync(
    path.join(__dirname, "../../output.html"),
    "utf-8"
  );

  // Returns a highlighted HTML string
  let highlightedCode = Prism.highlight(html, Prism.languages.markup);

  let syntax = document.getElementsByTagName("code")[0];
  syntax.innerHTML = highlightedCode;

  fs.readFile(path.join(__dirname, "../../preview.html"), function(err, data) {
    let $ = cheerio.load(data);

    $(".preview-container").html(html);
    fs.writeFile(path.join(__dirname, "../../preview.html"), $.html(), function(
      err
    ) {
      if (err) {
        return console.log(err);
      }
      document.querySelector("iframe").src += "";
      console.log("iframe refresh");
    });
  });

  var m = document.querySelectorAll(".pupil, .iris");
  m.forEach(function(x) {
    x.style.webkitAnimation = "generate 500ms forwards";
    x.addEventListener(
      "webkitAnimationEnd",
      function() {
        this.style.webkitAnimation = "";
      },
      false
    );
  });
};

module.exports = syntaxHighlight;
