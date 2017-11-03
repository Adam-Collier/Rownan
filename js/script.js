const fs = require('fs');
const path = require('path');
const Prism = require('prismjs');
const {dialog} = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
const cheerio = require('cheerio');
const cleaner = require('clean-html');
const mobileSize = require('./js/mobileSize.js');
const openFile = require('./js/openFile.js');
const showInputs = require('./js/showInputs.js');
const Sortable = require('sortablejs');

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
  <div class = "selection">
    <select onchange="drop(this)">
      <option value="general" selected>Please Select</option>
      <option value="center">Home Slider</option>
      <option value="three">Three Slider</option>
      <option value="custom">Custom</option>
    </select>
    <a href='#' class='remove'>Remove</a>
    <svg class="handle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 23"><title>Asset 3</title><polyline points="1 5 5 1 9 5" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><polyline points="9 18 5 22 1 18" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/><line x1="5" y1="1.5" x2="5" y2="21.5" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/></svg>
    <div class="inputs">
    </div>
  </div>
`;

var o = {
  "categories": [],
  "items": []
};

function generate(){

  o = {
    "categories":[],
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
    // console.log(radio);
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

    var catObj = {};
    document.querySelectorAll('.categories input[type="text"]').forEach(function (el) {
      catObj["" + el.className] = "" + el.value;
    });

    console.log(obj);
    o.items.push(obj); // push in the "o" object created
    o.categories.push(catObj);
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
      // console.log(data.styles);

      fs.writeFile(path.join(__dirname, 'output.json'),  JSON.stringify(data, null, 2), function(err, data) {
        if (err) {
          console.log(error);
        }
        console.log("JSON file created");
      });
    });
  });

  // $('#console').text(JSON.stringify(o)); // strigify to show
  var initOutput = `
<div class="container">
<div id="homeSlider">
</div>
<div class="slick-three">
</div>
</div>
<script src="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
<script type="text/javascript">
  (function ($) {
    $(document).ready(function () {
      $('#homeSlider').slick({
        infinite: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        dots: true,
        slide: '.fullwidth',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1000,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 768,
            settings: "unslick"
          }
        ]
      });
    });
  }(jQuery));
  (function ($) {
    $(window).on('resize orientationchange', function () {
      $('#homeSlider').slick('resize');
    });
  }(jQuery));
</script>
<script type="text/javascript">
  (function ($) {
    $(document).ready(function () {
      $('.slick-three').slick({
        infinite: true,
        adaptiveHeight: false,
        slide: ':not(.blocker)',
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          },
          centerMode: true,
          centerPadding: '50',
          variableWidth: true,
        }]
      });
    });
  }(jQuery));
  (function ($) {
    $(window).on('resize orientationchange', function () {
      $('.slick-three').slick('resize');
    });
  }(jQuery));
</script>
<script type="text/javascript">
  (function ($) {
    $(window).scroll(_.debounce(function () {

      var wScroll = $(this).scrollTop();
      console.log(wScroll);
      if (wScroll > $('.slick-three').offset().top - 400) {
        $('.slick-slide').css('animation', 'swipe 1200ms ease-in-out forwards');

        setTimeout(function () {
          $('.blocker').css('display', 'none');
        }, 1600);
      }
    }, 100));
  })(jQuery);
</script>
  `
  var blocker = `
    <div class="blocker"></div>
  `
  var slick = `
    <script src="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
  `
  var initStyles = `
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css" />
<style>
    .container {
        overflow: hidden;
    }

    .slick-dotted.slick-slider {
        margin-bottom: 0px;
    }

    .slick-three .slick-slide {
        padding: 20px;
    }

    .slick-three {
        padding-bottom: 50px;
    }

    #homeSlider {
        position: relative;
    }

    #homeSlider .button {
        background: transparent;
        border: white 2px solid;
        color: #FFFFFF;
    }

    #homeSlider .button:hover {
        background: white;
        border: white 2px solid;
        color: #323232
    }

    .slick-next:before {
        content: "";
    }

    .slick-next {
        background: url(https://media.missguided.co.uk/image/upload/v1501081056/chevron-right_x8qrqm.png);
        background-size: contain;
        background-repeat: no-repeat;
        height: 30px;
        width: 30px;
        right: -35px;
        top: 37%;
    }

    .slick-prev:before {
        content: "";
    }

    .slick-prev {
        background: url(https://media.missguided.co.uk/image/upload/v1501081056/chevron-left_pbhwk0.png);
        background-size: contain;
        background-repeat: no-repeat;
        height: 30px;
        width: 30px;
        top: 37%;
    }

    .slick-prev:hover,
    .slick-prev:focus {
        background: url(https://media.missguided.co.uk/image/upload/v1501081056/chevron-left_pbhwk0.png);
        background-size: contain;
        background-repeat: no-repeat;
    }

    .slick-next:hover,
    .slick-next:focus {
        background: url(https://media.missguided.co.uk/image/upload/v1501081056/chevron-right_x8qrqm.png);
        background-size: contain;
        background-repeat: no-repeat;
    }

    .slick-three {
        height: auto;
    }

    .slick-three div {
        height: auto;
        padding: 0px;
        padding-top: 10px;
    }

    .slick-three .button {
        margin-top: 12px;
    }

    .slick-three h2 {
        margin-bottom: 22px;
    }

    .gradient {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.4));
        pointer-events: none;
    }

    #promo {
        margin-bottom: 50px;
        padding: 6px 0px;
    }

    #promo h3 {
        font-size: 20px;
    }

    .title-below .button {
        background: transparent;
        border: #323232 2px solid;
        color: #323232;
    }

    .title-below .button:hover {
        background: #323232;
        color: #ffffff;
    }

    .slick-slide,
    .slick-slide * {
        outline: none !important;
    }

    .londunn {
        width: 30vw;
        max-width: 600px;
        margin: 0 auto;
    }

    @media only screen and (min-width:768px) {
        #banner {
            margin-bottom: 65px;
        }
        #homeSlider,
        .slick-three {
            visibility: hidden;
        }
        #homeSlider.slick-initialized,
        .slick-three.slick-initialized {
            visibility: visible;
        }
        #homeSlider .row {
            margin-bottom: 0;
            height: auto;
        }
        #homeSlider img,
        #homeSlider picture {
            width: 100%;
            height: auto;
        }
        #homeSlider .banner_content {
            transform: translate(-50% -50%);
            -webkit-transform: translate(-50%, -50%);
        }
        #homeSlider-nav {
            position: absolute;
            top: 6%;
            left: 2%;
            font-size: 30px;
            font-weight: 700;
            padding: 15px;
            z-index: 5;
            display: flex;
            flex-direction: column;
        }
        #homeSlider-nav a:hover {
            color: rgba(250, 250, 250, 0.8);
            text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
        }
        #homeSlider-nav a {
            color: white;
            text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
            letter-spacing: 0.9px;
        }
        ul.slick-dots {
            bottom: 25px;
        }
        .slick-dots li button {
            font-family: 'slick';
        }
        .slick-dots li button:before {
            font-size: 14px;
            line-height: 14px;
            color: #404040;
            opacity: 1;
        }
        .slick-dots li.slick-active button:before {
            color: white;
        }
        .three-col .button {
            margin-top: 10px;
        }
        .three-col h2 {
            margin-bottom: 20px;
        }
        .subtitle3 {
            padding: 0px 30px;
        }
        .slick-three {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            padding-bottom: 50px;
        }
        .slick-three div {
            height: auto;
            /*padding: 18px;*/
        }
        .slick-three ul.slick-dots {
            display: none !important;
        }
    }

    @media only screen and (max-width: 1100px) {
        #row3 br,
        #row2 br {
            display: none;
        }
    }

    @media only screen and (max-width: 767px) {
        #homeSlider .banner_content {
            margin: 0;
            position: relative;
            width: 100%!important;
            background: none;
        }
        #homeSlider .button {
            margin-top: 10px;
        }
        .banner_content .title1 {
            color: #474747;
        }
        #homeSlider .banner_content .button {
            background: transparent;
            border: #323232 2px solid;
            color: #323232;
        }
        #homeSlider .banner_content .button:hover {
            background: #323232;
            border: #323232 2px solid;
            color: #FFFFFF;
        }
        .container {
            display: flex;
            flex-direction: column;
        }
        #homeSlider {
            display: flex;
            flex-direction: column;
        }
        #homeSlider div:nth-of-type(1) {
            order: 4;
        }
        #homeSlider div:nth-of-type(2) {
            order: 3;
            margin-bottom: 0px;
        }
        #homeSlider div:nth-of-type(3) {
            order: 5;
        }
        #homeSlider div:nth-of-type(4) {
            order: 6;
        }
        #homeSlider div:nth-of-type(5) {
            order: 7;
            margin-bottom: 0px;
        }
        #homeSlider-nav {
            position: relative;
            text-align: center;
            font-size: 30px;
            font-weight: 700;
            padding: 30px 0px;
        }
        #homeSlider-nav a {
            padding-bottom: 6px;
            display: block;
        }
        #homeSlider-nav a:hover {
            color: rgba(71, 71, 71, 0.6);
            text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
        }
        #banner {
            margin-top: 30px;
            margin-bottom: 40px;
        }
        .gradient {
            background: linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.3));
            pointer-events: none;
            display: none;
        }
        .row:not(:last-child) {
            margin-bottom: 6vw;
        }
        .slick-three .slick-slide {
            padding: 10px;
        }
        .blocker {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }
        .slick-next {
            right: 0px;
            top: 29.5%;
        }
        .slick-prev {
            left: 13px;
            top: 29.5%;
            z-index: 2;
        }
        #promo {
            margin-bottom: 35px;
        }
        #promo h3 {
            font-size: 16px;
        }
        .accordion--content {
            padding-bottom: 20px;
        }
        @keyframes swipe {
            0% {
                transform: translateX(0px);
            }
            40% {
                transform: translateX(-80px);
            }
            70% {
                transform: translateX(-80px);
            }
            100% {
                transform: translateX(0px);
            }
        }
    }
</style>
  `

var nav = `
  <div id="homeSlider-nav">
    <a href="${o.categories[0].url1}">${o.categories[0].cat1}</a>
    <a href="${o.categories[0].url2}">${o.categories[0].cat2}</a>
    <a href="${o.categories[0].url3}">${o.categories[0].cat3}</a>
    <a href="${o.categories[0].url4}">${o.categories[0].cat4}</a>
  </div>
`
  fs.writeFileSync(path.join(__dirname, 'output.html'), initStyles)
  fs.appendFileSync(path.join(__dirname, 'output.html'), myCodeMirror.getValue(), function () {
    console.log('CSS added');
  });
  fs.appendFileSync(path.join(__dirname, 'output.html'), initOutput);

  var addNav = fs.readFileSync(path.join(__dirname, 'output.html'), 'utf-8');
  var $ = cheerio.load(addNav);
  $("#homeSlider").prepend(nav);
  fs.writeFileSync(path.join(__dirname, 'output.html'), $.html())

  var inputs = document.querySelectorAll('select');

  Array.prototype.forEach.call(inputs, function(el, i) {
  // console.log(el.options[el.selectedIndex].value, i);

    var c= `
  <div class= "row fullwidth row${i + 1}">
      <a href="${o.items[i].url}" class="tracking">
        <picture>
          <!-- desktop -->
          <source media="(min-width: 768px)" srcset="https://media.missguided.co.uk/image/upload/c_scale,w_768,q_70/${o.items[i].image} 768w, https://media.missguided.co.uk/image/upload/c_scale,w_967,q_70/${o.items[i].image} 967w, https://media.missguided.co.uk/image/upload/c_scale,w_1147,q_70/${o.items[i].image} 1147w, https://media.missguided.co.uk/image/upload/c_scale,w_1294,q_70/${o.items[i].image} 1294w, https://media.missguided.co.uk/image/upload/c_scale,w_1453,q_70/${o.items[i].image} 1453w, https://media.missguided.co.uk/image/upload/c_scale,w_1591,q_70/${o.items[i].image} 1591w, https://media.missguided.co.uk/image/upload/c_scale,w_1718,q_70/${o.items[i].image} 1718w, https://media.missguided.co.uk/image/upload/c_scale,w_1856,q_70/${o.items[i].image} 1856w, https://media.missguided.co.uk/image/upload/c_scale,w_1919,q_70/${o.items[i].image} 1919w, https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image} 1920w">
          <!-- mobile -->
          <source media="(max-width: 767px)" srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_320/${o.items[i].mobile} 320w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_400,q_70/${o.items[i].mobile} 375w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_600,q_70/${o.items[i].mobile} 414w"
            src="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_768,dpr_1/${o.items[i].mobile}"
            sizes="100vw">
          <img src="https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image}" alt="backup">
        </picture>
        <div class="banner_content center">
          ${o.items[i].svg}
          <h2 class="title2 white">${o.items[i].title}</h2>
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

    var th =`
  <div>
    <a href="${o.items[i].url}" class="tracking">
      <div class="imgContainer">
        <img src="https://media.missguided.co.uk/image/upload/w_600,q_70/${o.items[i].image}" alt="backup_img">
      </div>
      <div class="title-below">
        <h2 class="title3">${o.items[i].title}</h2>
        <h4 class="subtitle3">${o.items[i].subtitle}</h4>
        <button class="button">${o.items[i].cta}</button>
      </div>
    </a>
  </div>
`;
    var cu=`
${o.items[i].custom}
`;

      var output = fs.readFileSync(path.join(__dirname, 'output.html'), 'utf-8');
      // console.log(output);
      var $ = cheerio.load(output);

      switch (el.options[el.selectedIndex].value) {
        case 'center':
          if(o.items[i].custom !== ""){
            $('#homeSlider').append(cu);
          }else{
            $('#homeSlider').append(c);
          }
          break;
        case 'three':
          $('.slick-three').append(th);
          break;
        case 'custom':
          fs.appendFileSync(path.join(__dirname, 'output.html'), cu);
          break;
      }
      fs.writeFileSync(path.join(__dirname, 'output.html'), $.html())
  });
  fs.readFile(path.join(__dirname, 'output.html'),'utf8', function(err,data) {
    if (err) {
      throw err;
    }
    do{
      temp = data;
      data = data.replace(/<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/gi, '');//removing more than one white space
    }while(data !== temp);

    data = data.replace(/^\s*\n/gm, '');

    var $ = cheerio.load(data);
    $(".slick-three").prepend(blocker);
    $(slick).insertAfter('.container');
    $("#homeSlider").prepend()

    data = $.html();

    fs.writeFile(path.join(__dirname, 'output.html'), data, function(err, data) {
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
      x.style.webkitAnimation = 'generate 500ms forwards';
      x.addEventListener('webkitAnimationEnd', function(){
      this.style.webkitAnimation = '';
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
  if(preview.style.visibility === 'hidden'){
    preview.style.visibility = 'visible';
  }else{
    preview.style.visibility = 'hidden';
  }
  var m = document.querySelectorAll('.switch');
    m.forEach(function(x){
      if(x.style.fill === 'rgb(160, 160, 160)'){
        x.style.fill = 'none';
      }else{
        x.style.fill = 'rgb(160, 160, 160)';
        x.style.fillOpacity = '0.5';
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

var container = document.getElementById("container");
var sort = Sortable.create(container, {
  animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
  handle: "svg", // Restricts sort start click/touch to the specified element
  draggable: ".selection", // Specifies which items inside the element should be sortable
  onUpdate: function (evt/**Event*/){
     var item = evt.item; // the current dragged HTMLElement
  }
});



