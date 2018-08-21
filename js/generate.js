let writeOutputJSON = require("./utils/writeOutputJSON");
let initHomepage = require("./utils/initHomepage");
let injectContent = require("./utils/injectContent");
let syntaxHighlight = require("./utils/syntaxHighlight");
let squipImages = require("./utils/squipImages");
let createCSS = require("./utils/createCSS");

function generate(command) {
  // create object to store all content
  contentData = { categories: [], items: [], options: [] };
  if (command === "sqip") {

    writeOutputJSON();

    squipImages().then(() => {
      document.querySelector(".loader").classList.remove("loader-show");

      createCSS();

      initHomepage();

      injectContent();

      syntaxHighlight();
    });
  } else {
    writeOutputJSON();

    initHomepage();

    injectContent();

    syntaxHighlight();
  }
}
module.exports = generate;
