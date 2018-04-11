const { dialog } = require("electron").remote;
const fs = require("fs");

function openFile() {
  dialog.showOpenDialog({ filters: [{ extensions: ["json"] }] }, function(
    fileNames
  ) {
    fs.readFile(fileNames[0], "utf8", function(err, data) {
      // console.log(err);
      // remove existing inputs
      if (document.querySelector(".selection")) {
        document.querySelectorAll(".selection").forEach(function(x) {
          x.remove();
        });
      }
      // parse the read data
      data = JSON.parse(data);
      // add the styles to the top editor
      // console.log(data.styles);
      document.querySelector(".CodeMirror").CodeMirror.setValue(data.styles);

      document.querySelectorAll(".categories").forEach(function(x, i) {
        console.log(x);
        x.querySelectorAll("input[type=text]").forEach(function(input) {
          console.log(data.categories[i]);
          input.value = data.categories[i][input.className];
        });
      });

      document.querySelector(".promo-strip input[type=text]").value =
        data.promoStrip;

      var rowOptions = data.options;
      // console.log(rowOptions);
      rowOptions.forEach(function(x, index) {
        document
          .querySelector(".container")
          .insertAdjacentHTML("beforeend", dropdown);

        var rowVal = document.querySelectorAll("select");

        rowVal = rowVal[rowVal.length - 1];
        rowVal.querySelectorAll("option").forEach(function(v, i) {
          if (v.value == x) {
            rowVal.selectedIndex = i;
          }
        });

        var addInputs = rowVal.parentNode.querySelector("div");

        showInputs(index, x, addInputs);
      });
      document.querySelectorAll(".selection").forEach(function(x, i) {
        // console.log(x);

        x.querySelectorAll("input[type=text]").forEach(function(input) {
          // console.log(data.items[i]);
          input.value = data.items[i][input.className];
        });

        Array.prototype.slice
          .call(x.querySelectorAll("input[type=radio]"))
          .forEach(function(input) {
            if (input.value == data.items[i].vertical) {
              input.checked = true;
            }
            if (input.value == data.items[i].radio) {
              input.checked = true;
            }
          });

        if (x.querySelector(".CodeMirror")) {
          x
            .querySelector(".CodeMirror")
            .CodeMirror.setValue(data.items[i].custom);
        }
      });
    });
  });
}
module.exports = openFile;