const { app } = require("electron").remote;
let { initOutput } = require("../templateLiterals");

let initHomepage = () => {
  fs.writeFileSync(
    `${app.getPath("userData")}/output.html`,
    contentData.styles,
    function() {
      console.log("CSS added");
    }
  );
  // append the basic structure
  fs.appendFileSync(`${app.getPath("userData")}/output.html`, initOutput);
};

module.exports = initHomepage;
