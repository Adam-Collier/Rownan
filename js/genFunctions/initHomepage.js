let { initOutput, initStyles, nav } = require("../templateLiterals");

let initHomepage = () => {
  // write styles
  // fs.writeFileSync(path.join(__dirname, "../output.html"), initStyles);
  // add codemirrror styles
  // append styles from contentData with squipped background images
  fs.writeFileSync(
    path.join(__dirname, "../output.html"),
    contentData.styles,
    function() {
      console.log("CSS added");
    }
  );
  // append the basic structure
  fs.appendFileSync(path.join(__dirname, "../output.html"), initOutput);

  let outputHTML = fs.readFileSync(
    path.join(__dirname, "../output.html"),
    "utf-8"
  );
};

module.exports = initHomepage;