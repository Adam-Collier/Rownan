let { initOutput } = require("../templateLiterals");
const path = require("path");
const fs = require("fs");

let initHomepage = () => {
  fs.writeFileSync(
    path.join(__dirname, "../../output.html"),
    contentData.styles,
    function() {
      console.log("CSS added");
    }
  );
  // append the basic structure
  fs.appendFileSync(path.join(__dirname, "../../output.html"), initOutput);
};

module.exports = initHomepage;
