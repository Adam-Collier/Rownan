const fs = require('fs');
const Prism = require('prismjs');
const {dialog} = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
const cheerio = require('cheerio');
const cleaner = require('clean-html');
const mobileSize = require('./js/mobileSize.js');
const openFile = require('./js/openFile.js');
const showInputs = require('./js/showInputs.js');

function customEditors(currArea){
  var customEditor = currArea.querySelector('.custom');
    CodeMirror.fromTextArea(customEditor, {
      matchBrackets: true,
      mode: "htmlmixed",
      theme: "one-dark",
      autoCloseBrackets: true,
      autoCloseTags: true
  });
}

function drop(sel) {
  console.log(sel.value);
  var s = sel.parentNode.querySelector('div');
  ind = Array.prototype.slice.call(document.querySelectorAll('select')).indexOf(sel);
  showInputs(ind, sel.value, s);
}
var button = document.querySelector(".button");
button.addEventListener("click", function() {
  document.querySelector('.container').insertAdjacentHTML('beforeend', dropdown);
});

document.querySelector('.container').addEventListener('click', function(e){
  if(e.target.matches('.remove')){
    console.log("clicked");
    e.target.parentNode.remove();
  }
});


var dropdown = `
  <div class="selection">
    <select onchange="drop(this)">
      <option value="general">Please Select</option>
      <option value="full">Full Width</option>
      <option value="center">Center</option>
      <option value="left">Left</option>
      <option value="right">Right</option>
      <option value="two">Two Column</option>
      <option value="three">Three Column</option>
      <option value="custom">Custom</option>
    </select>
    <a href='#' class='remove'>Remove</a>
    <div class="inputs">
    </div>
  </div>
`;

var o = {
  "items": []
};

function generate(){

  o = {
    "items": []
  };

 // create an object with key items to hold array
  var elements = document.querySelectorAll('.selection');
  Array.prototype.forEach.call(elements, function(el) {
    // loop in to the input's wrapper
    // console.log(elements);
    var obj = {};

    var content = el.querySelectorAll('input[type="text"]');
    content.forEach(function(el) {
      obj["" + el.className] = "" + el.value;
    });

    if(el.querySelector('.CodeMirror')){
      obj.custom = "" + el.querySelector('.CodeMirror').CodeMirror.getValue();
    }

    var radio = el.querySelectorAll('input[type="radio"]');
    console.log(radio);
    radio.forEach(function(x) {
      console.log(x.name);
      if(x.name.indexOf('radio') !== -1 && x.checked === true){
        console.log(x);
        obj["radio"] = "" + x.value;
      }
      if(x.name.indexOf("vertical") !== -1 && x.checked === true){
        console.log(x);
        obj["vertical"] = "" + x.value;
        if(x.value == "banner_content"){
          obj["color"] = " white";
        }else{
          obj["color"] = "";
        }
      }
    });

    console.log(obj);
    o.items.push(obj); // push in the "o" object created
    fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(o, null, 2), 'utf-8')

    fs.readFile(path.join(__dirname, 'output.json'),'utf8', function(err,data) {
      if (err) {
          throw err;
      }
      var selected = [];
      document.querySelectorAll('option').forEach(function(x){
        if(x.selected == true){
          selected.push(x.value);
        }
      });
      data = JSON.parse(data);
      //push to the object
      data.options = selected;
      //push style contents to the object;
      data.styles = document.querySelector('.CodeMirror').CodeMirror.getValue();
      console.log(data.styles);

      fs.writeFile(path.join(__dirname, 'output.json'),  JSON.stringify(data, null, 2), function(err, data) {
        if (err) {
          console.log(error);
        }
        console.log("JSON file created");
      });
    });
  });

  // $('#console').text(JSON.stringify(o)); // strigify to show
  fs.writeFile(path.join(__dirname, 'output.html'), '', function(){console.log('empty');});

  var inputs = document.querySelectorAll('select');
  Array.prototype.forEach.call(inputs, function(el, i) {
  // console.log(el.options[el.selectedIndex].value, i);

    var f = `
<div class="row fullwidth" id="row${i+1}">
  <a href="${o.items[i].url}" class="tracking">
    <picture>
      <!-- desktop -->
      <source media="(min-width: 768px)" srcset="https://media.missguided.co.uk/image/upload/c_scale,w_768,q_70/${o.items[i].image} 768w, https://media.missguided.co.uk/image/upload/c_scale,w_967,q_70/${o.items[i].image} 967w, https://media.missguided.co.uk/image/upload/c_scale,w_1147,q_70/${o.items[i].image} 1147w, https://media.missguided.co.uk/image/upload/c_scale,w_1294,q_70/${o.items[i].image} 1294w, https://media.missguided.co.uk/image/upload/c_scale,w_1453,q_70/${o.items[i].image} 1453w, https://media.missguided.co.uk/image/upload/c_scale,w_1591,q_70/${o.items[i].image} 1591w, https://media.missguided.co.uk/image/upload/c_scale,w_1718,q_70/${o.items[i].image} 1718w, https://media.missguided.co.uk/image/upload/c_scale,w_1856,q_70/${o.items[i].image} 1856w, https://media.missguided.co.uk/image/upload/c_scale,w_1919,q_70/${o.items[i].image} 1919w, https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image} 1920w">
      <!-- mobile -->
      <source media="(max-width: 767px)"  srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_320/${o.items[i].mobile} 320w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_375,dpr_1/${o.items[i].mobile} 375w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_414,dpr_1/${o.items[i].mobile} 414w"
      src="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_768,dpr_1/${o.items[i].mobile}" sizes="100vw">
      <img src="https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image}" alt="backup">
    </picture>
    <div class="${o.items[i].vertical} ${o.items[i].radio}">
      <h2 class="title2${o.items[i].color}">${o.items[i].title}</h2>
      <h4 class="subtitle1${o.items[i].color}">${o.items[i].subtitle}</h4>
      <button class="button">${o.items[i].cta}</button>
    </div>
  </a>
</div>
    `;

    var c= `
<div class="row" id="row${i+1}">
  <a href="${o.items[i].url}" class="tracking">
    <picture>
      <!-- desktop -->
      <source media="(min-width: 768px)" srcset="https://media.missguided.co.uk/image/upload/c_scale,w_768,q_70/${o.items[i].image} 768w, https://media.missguided.co.uk/image/upload/c_scale,w_967,q_70/${o.items[i].image} 967w, https://media.missguided.co.uk/image/upload/c_scale,w_1147,q_70/${o.items[i].image} 1147w, https://media.missguided.co.uk/image/upload/c_scale,w_1294,q_70/${o.items[i].image} 1294w, https://media.missguided.co.uk/image/upload/c_scale,w_1453,q_70/${o.items[i].image} 1453w, https://media.missguided.co.uk/image/upload/c_scale,w_1591,q_70/${o.items[i].image} 1591w, https://media.missguided.co.uk/image/upload/c_scale,w_1718,q_70/${o.items[i].image} 1718w, https://media.missguided.co.uk/image/upload/c_scale,w_1856,q_70/${o.items[i].image} 1856w, https://media.missguided.co.uk/image/upload/c_scale,w_1919,q_70/${o.items[i].image} 1919w, https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image} 1920w">
      <!-- mobile -->
      <source media="(max-width: 767px)"  srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_320/${o.items[i].mobile} 320w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_375,dpr_1/${o.items[i].mobile} 375w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_414,dpr_1/${o.items[i].mobile} 414w"
      src="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_768,dpr_1/${o.items[i].mobile}" sizes="100vw">
      <img src="https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image}" alt="backup">
    </picture>
    <div class="${o.items[i].vertical} ${o.items[i].radio}">
      <h2 class="title2${o.items[i].color}">${o.items[i].title}</h2>
      <h4 class="subtitle2${o.items[i].color}">${o.items[i].subtitle}</h4>
      <div class="more-buttons">
        <button class="button">${o.items[i].cta}</button>
        <a href="${o.items[i].url2}">
          <button class="button">${o.items[i].cta2}</button>
        </a>
      </div>
    </div>
  </a>
</div>
    `;

    var l= `
<div class="row fullwidth" id="row${i+1}">
  <a href="${o.items[i].url}" class="tracking">
    <div class="feature-row">
      <div class="imgContainer left">
        <img src="https://media.missguided.co.uk/image/upload/q_70/${o.items[i].image}">
      </div>
      <div class="title-right">
        <h2 class="title2">${o.items[i].title}</h2>
        <h4 class="subtitle2">${o.items[i].subtitle}</h4>
        <div class="more-buttons">
          <button class="button">${o.items[i].cta}</button>
          <a href="${o.items[i].url2}">
            <button class="button">${o.items[i].cta2}</button>
          </a>
        </div>
      </div>
    </div>
  </a>
</div>
    `;

    var r= `
<div class="row fullwidth" id="row${i+1}">
  <a href="${o.items[i].url}" class="tracking">
    <div class="feature-row">
      <div class="imgContainer right">
        <img src="https://media.missguided.co.uk/image/upload/q_70/${o.items[i].image}">
      </div>
      <div class="title-left">
        <h2 class="title2">${o.items[i].title}</h2>
        <h4 class="subtitle2">${o.items[i].subtitle}</h4>
        <div class="more-buttons">
          <button class="button">${o.items[i].cta}</button>
          <a href="${o.items[i].url2}">
            <button class="button">${o.items[i].cta2}</button>
          </a>
        </div>
      </div>
    </div>
  </a>
</div>
    `;
    var tw= `
<div class="row" id="row${i+1}">
  <div class="two-col">
    <div>
      <a href="${o.items[i].url}" class="tracking">
        <div class="imgContainer"><img src="https://media.missguided.co.uk/image/upload/q_70/${o.items[i].image}">  </div>
        <div class="title-below">
          <h2 class="title2">${o.items[i].title}</h2>
          <h4 class="subtitle2">${o.items[i].subtitle}</h4>
          <div class="more-buttons">
            <button class="button">${o.items[i].cta}</button>
            <a href = "${o.items[i].url2}">
              <button class="button">${o.items[i].cta2}</button>
            </a>
          </div>
        </div>
      </a>
    </div>
    <div>
      <a href="${o.items[i].url3}" class="tracking">
        <div class="imgContainer"><img src="https://media.missguided.co.uk/image/upload/q_70/${o.items[i].image2}"></div>
        <div class="title-below">
          <h2 class="title2">${o.items[i].title2}</h2>
          <h4 class="subtitle2">${o.items[i].subtitle2}</h4>
          <div class="more-buttons">
            <button class="button">${o.items[i].cta3}</button>
            <a href = "${o.items[i].url4}">
              <button class="button">${o.items[i].cta4}</button>
            </a>
          </div>
        </div>
      </a>
    </div>
  </div>
</div>
`;

    var th =`
<div class="row" id="row${i+1}">
  <div class="three-col">
    <div>
      <a href="${o.items[i].url}" class="tracking">
        <div class="imgContainer">
          <img src="https://media.missguided.co.uk/image/upload/w_300,q_70/${o.items[i].image}">
        </div>
        <div class="title-below">
          <h2 class="title4">${o.items[i].title}</h2>
          <h4 class="subtitle3">${o.items[i].subtitle}</h4>
          <button class="button">${o.items[i].cta}</button>
        </div>
      </a>
    </div>
    <div>
      <a href="${o.items[i].url2}" class="tracking">
        <div class="imgContainer">
          <video playsinline="" autoplay loop muted>
            <source type="video/webm" src="http://media.missguided.co.uk/video/upload/${o.items[i].vid}.webm">
            <source type="video/mp4" src="http://media.missguided.co.uk/video/upload/${o.items[i].vid}.mp4" onerror="fallback(parentNode)">
            <img src="http://media.missguided.co.uk/video/upload/${o.items[i].vid}.jpg">
          </video>
        </div>
        <div class="title-below">
          <h2 class="title4">${o.items[i].title2}</h2>
          <h4 class="subtitle3">${o.items[i].subtitle2}</h4>
          <button class="button">${o.items[i].cta2}</button>
        </div>
      </a>
    </div>
    <div>
      <a href="${o.items[i].url3}" class="tracking">
        <div class="imgContainer">
          <img src="https://media.missguided.co.uk/image/upload/w_300,q_70/${o.items[i].image2}">
        </div>
        <div class="title-below">
          <h2 class="title4">${o.items[i].title3}</h2>
          <h4 class="subtitle3">${o.items[i].title3}</h4>
          <button class="button">${o.items[i].cta3}</button>
        </div>
      </a>
    </div>
  </div>
</div>
`;
    var cu=`
${o.items[i].custom}
`;

    fs.appendFileSync(path.join(__dirname, 'output.html'), myCodeMirror.getValue(), function(){console.log('CSS added');});

    switch(el.options[el.selectedIndex].value){
      case 'full':
        fs.appendFileSync(path.join(__dirname, 'output.html'), f);
        break;
      case 'center':
        fs.appendFileSync(path.join(__dirname, 'output.html'), c);
        break;
      case 'left':
        fs.appendFileSync(path.join(__dirname, 'output.html'), l);
        break;
      case 'right':
        fs.appendFileSync(path.join(__dirname, 'output.html'), r);
        break;
      case 'two':
        fs.appendFileSync(path.join(__dirname, 'output.html'), tw);
        break;
      case 'three':
        fs.appendFileSync(path.join(__dirname, 'output.html'), th);
        break;
      case 'custom':
        fs.appendFileSync(path.join(__dirname, 'output.html'), cu);
        break;
    }
  });
  fs.readFile(path.join(__dirname, 'output.html'),'utf8', function(err,data) {
    if (err) {
      throw err;
    }
    do{
      temp = data;
      data = data.replace(/<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/gi, '');//removing more that one white space
    }while(data !== temp);

    data = data.replace(/^\s*\n/gm, '');

    fs.writeFile(path.join(__dirname, 'output.html'), data, function(err, data) {
      if (err) {
        console.log(error);
      }
      console.log("clean html written");
    });

    // The code snippet you want to highlight, as a string
    var code = data;

    console.log(code);

    // Returns a highlighted HTML string
    var html = Prism.highlight(code, Prism.languages.markup);
    var syntax = document.getElementsByTagName("code")[0];
    syntax.innerHTML = html;

    fs.readFile(path.join(__dirname, 'preview.html'), function(err, data){
      var $ = cheerio.load(data);
      $('.preview-container').html(code);
      fs.writeFile(path.join(__dirname, 'preview.html'), $.html(), function(err){
        if(err) {
          return console.log(err);
        }
        document.querySelector('iframe').src += '';
        console.log("iframe refresh");
      });
    });
  });
  var m = document.querySelectorAll('.pupil, .iris');
    m.forEach(function(x){
      x.style.webkitAnimation = 'blink 500ms forwards';
      x.addEventListener('webkitAnimationEnd', function(){
      this.style.webkitAnimationName = '';
    }, false);
  });
}

// document.querySelector('#preview').addEventListener('click', generate());
ipcRenderer.on('generate', function() {
  generate();
});
ipcRenderer.on('save', function() {
  saveToFile();
});
ipcRenderer.on('preview', function() {
  preview();
});
ipcRenderer.on('mobileView', function() {
  mobileSize();
});
ipcRenderer.on('openFile', function() {
  openFile();
});

function saveToFile () {

  var s = document.querySelectorAll('.save-icon');

  s.forEach(function(x){
    var rect = x.getBoundingClientRect();
    console.log(rect);
    if(rect.width === 0){
      x.style.webkitAnimation = 'save 800ms forwards';
    }
  });

  dialog.showSaveDialog({ filters:[{name:'Custom File Type', extensions: ['html']}
]}, function(fileName) {

    s.forEach(function(x){
      var rect = x.getBoundingClientRect();
      if(rect.width > 0){
        x.style.webkitAnimation = 'save-reverse 800ms forwards';
      }
    });

    if (fileName === undefined) return;

    //create temp file and get fileName after last slash
    var temp = fileName.match(/^(.*[\/])/);
    temp = temp[1] + "savedFiles/";
    var jsonFile = fileName.match(/[^/]+$/);
    jsonFile = jsonFile[0].slice(0, -5);

    fs.readFile(path.join(__dirname, 'output.json'),'utf8', function(err,jsonData) {
      console.log(jsonFile);
      if (fs.existsSync(temp)) {
      // Do something
        fs.writeFile(temp+"/"+jsonFile+".json", jsonData, function(err, data) {
          if(err){
            console.log(err);
          }else{
            console.log("json file created");
          }
        });
      }else{
      fs.mkdir(temp, function(err){
        if (err) {
          console.log(err);
        }else{
          fs.writeFile(temp+"/"+jsonFile+".json", jsonData, function(err, data) {
            if(err){
              console.log(err);
            }else{
              console.log("json file created");
            }
        });
        }
          console.log("temp created");
        });
      }
    });

    fs.readFile(path.join(__dirname, 'output.html'),'utf8', function(err,data) {
      if (err) {
          throw err;
      }
      var saveFile = data;
      fs.writeFile(fileName, saveFile, function(err, data) { //write the new JSON to the file
        if (err) {
          console.log(error);
        }
        console.log("file saved");
        const notification = {
          title: 'File Saved',
          body: 'Saved to: '+fileName
        }
        // const notificationButton = document.getElementById('basic-noti')
        const myNotification = new window.Notification(notification.title, notification)

        myNotification.onclick = () => {
          console.log('Notification clicked')
        }
      });
    });
  });
}

function preview(){
  var preview = document.querySelector('.preview');
  if(preview.style.display === 'none'){
    preview.style.display = 'block';
  }else{
    preview.style.display = 'none';
  }
  var m = document.querySelectorAll('.switch');
    m.forEach(function(x){
      if(x.style.fill === 'rgb(160, 160, 160)'){
        x.style.fill = 'none';
      }else{
        x.style.fill = 'rgb(160, 160, 160)';
      }
  });
}

document.querySelector('svg.preview-button').addEventListener("click", function(){
  preview();
});

document.querySelector('.resize-icon').addEventListener("click", function(){
  var m = document.querySelector('.resize');
  mobileSize(m);
});
