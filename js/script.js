// npm packages
const fs = require("fs");
const path = require("path");
const Prism = require("prismjs");
const ipcRenderer = require("electron").ipcRenderer;
const cheerio = require("cheerio");
const cleaner = require("clean-html");

// js files
const mobileSize = require("./js/mobileSize");
const openFile = require("./js/openFile");
const showInputs = require("./js/showInputs");
const Sortable = require("sortablejs");
const saveToFile = require("./js/saveToFile");
const generate = require("./js/generate");
const preview = require("./js/preview");
const browserSync = require("./js/browserSync");

browserSync();

function customEditors(currArea) {
  var customEditor = currArea.querySelector(".custom");
  CodeMirror.fromTextArea(customEditor, {
    matchBrackets: true,
    mode: "htmlmixed",
    theme: "one-dark",
    autoCloseBrackets: true,
    autoCloseTags: true
  });
}

// dropdown menu template literal
var dropdown = `
  <div class = "selection">
    <select onchange="drop(this)">
      <option value="general" selected>Please Select</option>
      <option value="center">Home Slider</option>
      <option value="three">Three Slider</option>
    </select>
    <a href='#' class='remove'>Remove</a>
    <svg class="handle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 23"><title>Asset 3</title><polyline points="1 5 5 1 9 5" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><polyline points="9 18 5 22 1 18" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><line x1="5" y1="1.5" x2="5" y2="21.5" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>
    <div class="inputs">
    </div>
  </div>
`;

// adds a dropdown
var button = document.querySelector(".button");
button.addEventListener("click", function() {
  document
    .querySelector(".container")
    .insertAdjacentHTML("beforeend", dropdown);
});

// removes a dropdown
document.querySelector(".container").addEventListener("click", function(e) {
  if (e.target.matches(".remove")) {
    console.log("clicked");
    e.target.parentNode.remove();
  }
});

// shows the inputs depending on dropdown selection
// gets the value, goes up to the parent div then appends the appropriate template literal
function drop(sel) {
  console.log(sel.value);
  var s = sel.parentNode.querySelector("div");
  console.log(s);
  ind = Array.prototype.slice
    .call(document.querySelectorAll("select"))
    .indexOf(sel);
  showInputs(sel.value, s);
}

// menu functions
ipcRenderer.on("generate", function() {
  console.log(generate);
  generate("sqip");
});
ipcRenderer.on("images", function() {
  generate("images");
});
ipcRenderer.on("save", function() {
  saveToFile();
});
ipcRenderer.on("preview", function() {
  preview();
});
ipcRenderer.on("mobileView", function() {
  mobileSize();
});
ipcRenderer.on("openFile", function() {
  openFile(dropdown);
});

// switches to the code view
document
  .querySelector("svg.preview-button")
  .addEventListener("click", function() {
    preview();
  });

// generated the content
document.querySelector("#preview").addEventListener("click", generate());

// resizes the window to a mobile view
document.querySelector(".resize-icon").addEventListener("click", function() {
  var m = document.querySelector(".resize");
  mobileSize(m);
});

// inputs can be drag and dropped to change position
var container = document.getElementById("container");
Sortable.create(container, {
  animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
  handle: "svg", // Restricts sort start click/touch to the specified element
  draggable: ".selection", // Specifies which items inside the element should be sortable
  onUpdate: function(evt /**Event*/) {
    var item = evt.item; // the current dragged HTMLElement
  }
});
