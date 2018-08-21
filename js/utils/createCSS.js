let createCSS = () => {
  contentData.items.map((x, i) => {
    // loop through items in the top slider
    if (x.mobile) {
      // create template literals of the css
      let desktop = `.row${i + 1} { background: url("${
        x.squipimage
      }"); background-size: contain; background-repeat: no-repeat;
        }`;

      let mobile = `.row${i + 1} { background: url("${
        x.squipmobile
      }"); background-size: contain; background-repeat: no-repeat;}`;

      // parse the content styles into dom elements
      let parser = new DOMParser();
      let doc = parser.parseFromString(contentData.styles, "text/html");

      // grab the style tag
      let styleElement = doc.getElementsByTagName("style")[0].sheet;
      console.log(styleElement.cssRules[0]);
      // insert the template literals into the parsed dom element
      // to keep in order i is passed in the as index argument
      styleElement.cssRules[0].insertRule(desktop, i);
      styleElement.cssRules[1].insertRule(mobile, i);

      // create an empty style tag
      let blah = document.createElement("style");

      // add each media query to the empty style tag
      blah.innerHTML += styleElement.cssRules[0].cssText;
      blah.innerHTML += styleElement.cssRules[1].cssText;

      // change the style property values in contentData
      contentData.styles = blah.outerHTML;
    }
  });

  // fs.writeFileSync(
  //   path.join(__dirname, "../../output.json"),
  //   JSON.stringify(contentData, null, 2)
  // );
  console.log("this has been written;");

  // console.log(contentData.styles);
};

module.exports = createCSS;
