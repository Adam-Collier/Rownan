const cheerio = require("cheerio");

let {
  initOutput,
  initStyles,
  mainSlide,
  contentSlide
} = require("./templateLiterals");

function generate() {
  // create object to store all content
  contentData = {
    categories: [],
    items: []
  };

  // create object to store category links
  var catObj = {};
  document
    .querySelectorAll('.categories input[type="text"]')
    .forEach(function(el) {
      catObj["" + el.className] = "" + el.value;
    });
  contentData.categories.push(catObj);

  // create an object with key items to hold array
  var elements = document.querySelectorAll(".selection");
  Array.prototype.forEach.call(elements, function(el) {
    // console.log(elements);
    var obj = {};

    // loop through the inputs in that section
    // uses class names for obj property names
    var content = el.querySelectorAll('input[type="text"]');
    content.forEach(function(el) {
      obj["" + el.className] = "" + el.value;
    });

    // if there is custom code add to custom property
    if (el.querySelector(".CodeMirror")) {
      obj.custom = "" + el.querySelector(".CodeMirror").CodeMirror.getValue();
    }

    // not really applicable anymore
    var radio = el.querySelectorAll('input[type="radio"]');
    // console.log(radio);
    radio.forEach(function(x) {
      console.log(x.name);
      if (x.name.indexOf("radio") !== -1 && x.checked === true) {
        console.log(x);
        obj["radio"] = "" + x.value;
      }
      if (x.name.indexOf("vertical") !== -1 && x.checked === true) {
        console.log(x);
        obj["vertical"] = "" + x.value;
        if (x.value == "banner_content") {
          obj["color"] = " white";
        } else {
          obj["color"] = "";
        }
      }
    });

    // push the obj to contentData
    // console.log(obj);
    contentData.items.push(obj);

    // write all of contentData to output.json (this is repeated because of the loop)
    fs.writeFileSync(
      path.join(__dirname, "../output.json"),
      JSON.stringify(contentData, null, 2),
      "utf-8"
    );

    fs.readFile(path.join(__dirname, "../output.json"), "utf8", function(
      err,
      data
    ) {
      if (err) {
        throw err;
      }
      var selected = [];
      document.querySelectorAll("option").forEach(function(x) {
        if (x.selected == true) {
          selected.push(x.value);
        }
      });
      // parse the data into JSON format
      data = JSON.parse(data);
      //push to the object
      data.options = selected;
      //push style contents to the object;
      data.styles = document.querySelector(".CodeMirror").CodeMirror.getValue();
      // console.log(data.styles);

      fs.writeFile(
        path.join(__dirname, "../output.json"),
        JSON.stringify(data, null, 2),
        function(err, data) {
          if (err) {
            console.log(error);
          }
          console.log("JSON file created");
        }
      );
    });
  });

  var blocker = `
    <div class="blocker"></div>
  `;
  var slick = `
    <script src="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
  `;

  var nav = `
  <div id="homeSlider-nav">
    <a href="${contentData.categories[0].url1}">${
    contentData.categories[0].cat1
  }</a>
    <a href="${contentData.categories[0].url2}">${
    contentData.categories[0].cat2
  }</a>
    <a href="${contentData.categories[0].url3}">${
    contentData.categories[0].cat3
  }</a>
    <a href="${contentData.categories[0].url4}">${
    contentData.categories[0].cat4
  }</a>
  </div>
`;

  fs.writeFileSync(path.join(__dirname, "../output.html"), initStyles);
  fs.appendFileSync(
    path.join(__dirname, "../output.html"),
    myCodeMirror.getValue(),
    function() {
      console.log("CSS added");
    }
  );
  fs.appendFileSync(path.join(__dirname, "../output.html"), initOutput);

  var addNav = fs.readFileSync(path.join(__dirname, "../output.html"), "utf-8");
  var $ = cheerio.load(addNav);
  $("#homeSlider").prepend(nav);
  fs.writeFileSync(path.join(__dirname, "../output.html"), $.html());

  var inputs = document.querySelectorAll("select");

  Array.prototype.forEach.call(inputs, function(el, i) {
    // console.log(el.options[el.selectedIndex].value, i);

    mainSlide(i);
    contentSlide(i);

    var cu = `
${contentData.items[i].custom}
`;

    var output = fs.readFileSync(
      path.join(__dirname, "../output.html"),
      "utf-8"
    );
    // console.log(output);
    var $ = cheerio.load(output);

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
        fs.appendFileSync(path.join(__dirname, "../output.html"), cu);
        break;
    }
    fs.writeFileSync(path.join(__dirname, "../output.html"), $.html());
  });
  fs.readFile(path.join(__dirname, "../output.html"), "utf8", function(
    err,
    data
  ) {
    if (err) {
      throw err;
    }
    do {
      temp = data;
      data = data.replace(
        /<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/gi,
        ""
      ); //removing more than one white space
    } while (data !== temp);

    data = data.replace(/^\s*\n/gm, "");

    var $ = cheerio.load(data);
    $(".slick-three").prepend(blocker);
    $(slick).insertAfter(".container");
    $("#homeSlider").prepend();

    data = $.html();

    fs.writeFile(path.join(__dirname, "../output.html"), data, function(
      err,
      data
    ) {
      if (err) {
        console.log(error);
      }
      console.log("clean html written");
    });

    // The code snippet you want to highlight, as a string
    var code = data;

    // console.log(code);

    // Returns a highlighted HTML string
    var html = Prism.highlight(code, Prism.languages.markup);
    var syntax = document.getElementsByTagName("code")[0];
    syntax.innerHTML = html;

    fs.readFile(path.join(__dirname, "../preview.html"), function(err, data) {
      var $ = cheerio.load(data);
      $(".preview-container").html(code);
      fs.writeFile(path.join(__dirname, "../preview.html"), $.html(), function(
        err
      ) {
        if (err) {
          return console.log(err);
        }
        document.querySelector("iframe").src += "";
        console.log("iframe refresh");
      });
    });
  });
  var m = document.querySelectorAll(".pupil, .iris");
  m.forEach(function(x) {
    x.style.webkitAnimation = "generate 500ms forwards";
    x.addEventListener(
      "webkitAnimationEnd",
      function() {
        this.style.webkitAnimation = "";
      },
      false
    );
  });
}
module.exports = generate;
