const cheerio = require("cheerio");

let {
  initOutput,
  initStyles,
  mainSlide,
  contentSlide
} = require("./templateLiterals");

let writeOutputJSON = require("./genFunctions/writeOutputJSON");
let initHomepage = require("./genFunctions/initHomepage");
let injectContent = require("./genFunctions/injectContent");
let syntaxHighlight = require("./genFunctions/syntaxHighlight");
let squipImages = require("./genFunctions/squipImages");
let createCSS = require("./genFunctions/createCSS");

function generate(command) {
  // create object to store all content
  contentData = { categories: [], items: [], options: [] };
  if (command === "sqip") {
    writeOutputJSON();

    squipImages().then(() => {
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
