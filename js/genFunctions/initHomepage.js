let { initOutput, initStyles, nav } = require("../templateLiterals");

let initHomepage = () => {
  // write styles
  fs.writeFileSync(path.join(__dirname, "../output.html"), initStyles);
  // add codemirrror styles
  fs.appendFileSync(
    path.join(__dirname, "../output.html"),
    myCodeMirror.getValue(),
    function() {
      console.log("CSS added");
    }
  );
  // append the basic structure
  fs.appendFileSync(path.join(__dirname, "../output.html"), initOutput);

  // add the home slider nav
  let outputHTML = fs.readFileSync(
    path.join(__dirname, "../output.html"),
    "utf-8"
  );

  //   // start to inject content
  //   var $ = cheerio.load(addNav);
  //   // add the slider nav
  //   $("#homeSlider").prepend(nav);

  // write the nav
  //   fs.writeFileSync(path.join(__dirname, "../output.html"), $.html());
};

module.exports = initHomepage;
