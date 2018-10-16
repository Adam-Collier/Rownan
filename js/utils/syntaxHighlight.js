const { app } = require("electron").remote;
let cheerio = require("cheerio");

let syntaxHighlight = () => {
  let html = fs.readFileSync(`${app.getPath("userData")}/output.html`, "utf-8");

  // Returns a highlighted HTML string
  let highlightedCode = Prism.highlight(html, Prism.languages.markup);

  let syntax = document.getElementsByTagName("code")[0];
  syntax.innerHTML = highlightedCode;

  fs.readFile(`${app.getPath("userData")}/preview.html`, function(err, data) {
    if (err) console.log(err);

    let $ = cheerio.load(data);

    $(".preview-container").html(html);
    fs.writeFile(`${app.getPath("userData")}/preview.html`, $.html(), function(
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
