let writeOutputJSON = () => {
  // create object to store category links
  let cats = {};

  document
    .querySelectorAll('.categories input[type="text"]')
    .forEach(function(el) {
      // if there are any spaces, remove them
      el.className.includes("url")
        ? (el.value = el.value.replace(/\s/g, ""))
        : null;
      cats["" + el.className] = "" + el.value;
    });
  contentData.categories.push(cats);

  document
    .querySelectorAll('.promo-strip input[type="text"]')
    .forEach((x, i) => {
      i == 0
        ? (contentData.promoStrip = x.value)
        : (contentData.promoUrl = x.value);
    });

  // create object to store input values

  // create an object with key items to hold array
  var elements = document.querySelectorAll(".selection");
  // get each selection in an array
  Array.prototype.forEach.call(elements, function(el) {
    console.log(el);
    let obj = {};
    // loop through the inputs in that section
    // uses class names for obj property names
    el.querySelectorAll('input[type="text"]').forEach(function(el) {
      // if there are any rogue spaces at the end, remove them
      el.className == "url" || el.className == "url2"
        ? (el.value = el.value.replace(/\s/g, ""))
        : null;

      obj[el.className] = el.value;
      // console.log(obj);
    });

    // if there is custom code add to custom property
    if (el.querySelector(".CodeMirror")) {
      obj.custom = "" + el.querySelector(".CodeMirror").CodeMirror.getValue();
    }

    // push object to contentData
    contentData.items.push(obj);
  });

  console.log(contentData);

  // var selected = [];
  // push dropdown values to contentData
  document.querySelectorAll("option").forEach(function(x) {
    if (x.selected == true) {
      contentData.options.push(x.value);
    }
  });

  //push style contents to the object;
  contentData.styles = document
    .querySelector(".CodeMirror")
    .CodeMirror.getValue();

  // write the JSON file
  fs.writeFile(
    path.join(__dirname, "../../output.json"),
    JSON.stringify(contentData, null, 2),
    function(err, data) {
      if (err) {
        console.log(error);
      }
      console.log("JSON file created");
    }
  );
};

module.exports = writeOutputJSON;
