var fs = require('fs');
var cheerio = require('cheerio');


var o = {"items":[{"url":"ehdvjhsdvjhsdv","image":"dsjhvbsjhvdb","mobile":"djvhbsdjhvbs","title":"adjchvbsjhvbs","subtitle":"dvjhbsdjkhvbs","cta":"vdajhbsjhvdbsdkj","url2":"vdbsdkjvhbsdk","cta2":"fkjbvdfkjbkj"},{"url":"bkvsjbvjksbfdk","image":"dkjvbskdjbv","mobile":"fksjbvksfj","title":"kdsjbvkfjb","subtitle":"kvbksjfbs","cta":"kdvbskdjvb","url2":"dkjvbdfkjb","cta2":"kcjvbfkxj"}]};

console.log(o.items[i].url);


var f= `
  <div class="row fullwidth" id="row${i+1}">
    <a href="${o.items[i].url}" class="tracking">
      <picture>
        <!-- desktop -->
        <source media="(min-width: 768px)" srcset="https://media.missguided.co.uk/image/upload/c_scale,w_768,q_70/${o.items[i].url} 768w, https://media.missguided.co.uk/image/upload/c_scale,w_967,q_70/${o.items[i].image} 967w, https://media.missguided.co.uk/image/upload/c_scale,w_1147,q_70/${o.items[i].image} 1147w, https://media.missguided.co.uk/image/upload/c_scale,w_1294,q_70/${o.items[i].image} 1294w, https://media.missguided.co.uk/image/upload/c_scale,w_1453,q_70/${o.items[i].image} 1453w, https://media.missguided.co.uk/image/upload/c_scale,w_1591,q_70/${o.items[i].image} 1591w, https://media.missguided.co.uk/image/upload/c_scale,w_1718,q_70/${o.items[i].image} 1718w, https://media.missguided.co.uk/image/upload/c_scale,w_1856,q_70/${o.items[i].image} 1856w, https://media.missguided.co.uk/image/upload/c_scale,w_1919,q_70/${o.items[i].image} 1919w, https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image} 1920w">
        <!-- mobile -->
        <source media="(max-width: 767px)"  srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_320/${o.items[i].mobile} 320w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_375,dpr_1/${o.items[i].mobile} 375w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_414,dpr_1/${o.items[i].mobile} 414w"
        src="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_768,dpr_1/${o.items[i].mobile}" sizes="100vw">
        <img src="https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/${o.items[i].image}" alt="backup">
      </picture>
      <div class="banner_content">
        <h2 class="title1 white">${o.items[i].title}</h2>
        <h4 class="subtitle1 white">${o.items[i].subtitle}</h4>
        <button class="button">${o.items[i].cta}</button>
      </div>
    </a>
  </div>
`;



// fs.readFile('generated.html', function(err, index){
//   var $ = cheerio.load(index);
//
//   $('.container').html(f);
//
//   fs.writeFile('output.html', $.html());
//   console.log("Its fuckin magic mert!!");
//
// });

fs.writeFile('output.html',f , function(err, data) { //write the new JSON to the file
  if (err) {
    console.log(error);
  }
  console.log("fucking mint mate");
});




















var c =`
<div class="row" id="row$1">
  <a href="$2" class="tracking">
      <picture>
       <!-- desktop -->
        <source media="(min-width: 768px)" srcset="https://media.missguided.co.uk/image/upload/c_scale,w_768,q_70/$3 768w, https://media.missguided.co.uk/image/upload/c_scale,w_967,q_70/$3 967w, https://media.missguided.co.uk/image/upload/c_scale,w_1147,q_70/$3 1147w, https://media.missguided.co.uk/image/upload/c_scale,w_1294,q_70/$3 1294w, https://media.missguided.co.uk/image/upload/c_scale,w_1453,q_70/$3 1453w, https://media.missguided.co.uk/image/upload/c_scale,w_1591,q_70/$3 1591w, https://media.missguided.co.uk/image/upload/c_scale,w_1718,q_70/$3 1718w, https://media.missguided.co.uk/image/upload/c_scale,w_1856,q_70/$3 1856w, https://media.missguided.co.uk/image/upload/c_scale,w_1919,q_70/$3 1919w, https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/$3 1920w">
         <!-- mobile -->
        <source media="(max-width: 767px)" srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_320/$4 320w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_375,dpr_1/$4 375w, https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_414,dpr_1/$4 414w" src="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_768,dpr_1/$4" sizes="100vw">
        <img src="https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70/$3" alt="backup">
    </picture>
    <div class="title-below">
      <h1 class="title2">$5</h1>
       <!--<h4 class="subtitle1">$6</h4>-->
      <button class="button">$7</button>
    </div>
  </a>
</div>
`;

var l=`
<div class="row fullwidth" id="row$1">
  <a href="$2" class="tracking">
    <div class="feature-row">
      <div class="imgContainer left">
        <img src="https://media.missguided.co.uk/image/upload/q_70/$3">
      </div>
      <div class="title-right">
        <h2 class="title3">$4</h2>
        <h4 class="subtitle2">$5</h4>
        <button class="button">$6</button>
      </div>
    </div>
  </a>
</div>
`;

var r=`
<div class="row fullwidth" id="row$1">
  <a href="$2" class="tracking">
    <div class="feature-row">
      <div class="imgContainer right">
        <img src="https://media.missguided.co.uk/image/upload/q_70/"+o.items[i].url>
      </div>
      <div class="title-left">
        <h2 class="title3">$4</h2>
        <h4 class="subtitle2">$5</h4>
        <button class="button">$6</button>
      </div>
    </div>
  </a>
</div>
`;
