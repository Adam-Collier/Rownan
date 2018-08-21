const { dialog } = require("electron").remote;

function openFile(dropdown) {
  dialog.showOpenDialog({ filters: [{ extensions: ["json"] }] }, function (
    fileNames
  ) {
    fs.readFile(fileNames[0], "utf8", function (err, data) {
      if (err) console.log(err)
      // remove existing inputs
      if (document.querySelector(".selection")) {
        document.querySelectorAll(".selection").forEach(function (x) {
          x.remove();
        });
      }
      // parse the read data
      data = JSON.parse(data);
      // add the styles to the CodeMirror editor
      document.querySelector(".CodeMirror").CodeMirror.setValue(data.styles);
      // add categories
      document.querySelectorAll(".categories").forEach(function (x, i) {
        console.log(x);
        x.querySelectorAll("input[type=text]").forEach(function (input) {
          input.value = data.categories[i][input.className];
        });
      });
      // add promo strip
      document.querySelector(".promo-strip input[type=text]").value = data.promoStrip;

      var rowType = data.options;
      console.log(rowType);
      rowType.forEach(function (x, index) {
        document
          .querySelector(".container")
          .insertAdjacentHTML("beforeend", dropdown);

        var rowVal = document.querySelectorAll("select");

        rowVal = rowVal[rowVal.length - 1];
        rowVal.querySelectorAll("option").forEach(function (v, i) {
          if (v.value == x) {
            rowVal.selectedIndex = i;
          }
        });

        var addInputs = rowVal.parentNode.querySelector("div");

        showInputs(x, addInputs);
      });
      document.querySelectorAll(".selection").forEach(function (x, i) {

        x.querySelectorAll("input[type=text]").forEach(function (input) {
          input.value = data.items[i][input.className];
        });

        if (x.querySelector(".CodeMirror")) {
          x.querySelector(".CodeMirror")
            .CodeMirror.setValue(data.items[i].custom);
        }
      });
    });
  });
}
module.exports = openFile;
