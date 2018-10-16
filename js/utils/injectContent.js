const cheerio = require("cheerio");
const { app } = require("electron").remote;

let {
  mainSlide,
  contentSlide,
  nav,
  blocker,
  promoStrip
} = require("../templateLiterals");

let injectContent = () => {
  let output = fs.readFileSync(
    `${app.getPath("userData")}/output.html`,
    "utf-8"
  );
  let $ = cheerio.load(output);

  let inputs = document.querySelectorAll("select");
  Array.prototype.forEach.call(inputs, function(el, i) {
    console.log(el.options[el.selectedIndex].value, i);

    // grab the template literals
    mainSlide(i);
    contentSlide(i);

    var cu = `
  ${contentData.items[i].custom}
  `;

    switch (el.options[el.selectedIndex].value) {
      case "center":
        if (contentData.items[i].custom !== "") {
          $("#homeSlider").append(cu);
        } else {
          $("#homeSlider").append(mainSlide(i));
        }
        break;
      case "three":
        $(".slick-three").append(contentSlide(i));
        break;
      case "custom":
        fs.appendFileSync(`${app.getPath("userData")}/output.html`, cu);
        break;
    }
  });

  // start to clean the data!
  let uglyHTML = $.html();

  do {
    temp = uglyHTML;
    uglyHTML = uglyHTML.replace(
      /<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/gi,
      ""
    ); //removing more than one white space
  } while (uglyHTML !== temp);

  let cleanHTML = uglyHTML.replace(/^\s*\n/gm, "");

  $ = cheerio.load(cleanHTML);

  if (contentData.categories[0].cat1 !== "") {
    $("#homeSlider").prepend(nav);
  }

  $(".slick-three").prepend(blocker);

  if (contentData.promoStrip !== "") {
    $(promoStrip()).insertAfter("#homeSlider");
  }

  fs.writeFileSync(`${app.getPath("userData")}/output.html`, $.html());
  console.log("clean HTML written");
};

module.exports = injectContent;
