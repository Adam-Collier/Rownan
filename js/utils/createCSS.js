let createCSS = () => {
  contentData.items.map((x, i) => {
    // loop through items in the top slider
    // x.mobile property only exists in the top slider
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

      // create array to capture the index of the media queries
      let mediaIndex = [];
      // loop through CSS rules
      // if media exists then push the index to the array
      Array.from(styleElement.cssRules).forEach((x, i) => {
        if (x.media !== undefined) {
          mediaIndex.push(i);
        }
      });

      // insert the template literals into the parsed dom element
      // pass mediaIndex in to correctly insert the rules
      styleElement.cssRules[mediaIndex[0]].insertRule(desktop, i);
      styleElement.cssRules[mediaIndex[1]].insertRule(mobile, i);

      // create an empty style tag
      let styleTags = document.createElement("style");

      // create array from styleElement object
      // loop through and add each set of CSS rules
      Array.from(styleElement.cssRules).forEach(x => {
        styleTags.innerHTML += x.cssText;
      });

      // change the style property values in contentData
      contentData.styles = styleTags.outerHTML;
    }
  });

  console.log("the CSS has been written!");
};

module.exports = createCSS;
