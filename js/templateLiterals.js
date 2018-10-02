let initOutput = `
<div class="container">
<div id="homeSlider">
</div>
<div class="slick-three">
</div>
</div>
  `;

var mainSlide = i => {
  return `
  <div class="row fullwidth row${i + 1}">
    <a href="${contentData.items[i].url}" class="tracking">
        <picture>
            <source media="(max-width: 767px)" sizes="(max-width: 767px) 100vw, 767px" data-srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_300${
              contentData.items[i].mobile
            } 300w, https://media.missguided.co.uk/image/upload/w_402,q_70${
    contentData.items[i].mobile
  } 402w, https://media.missguided.co.uk/image/upload/w_491,q_70${
    contentData.items[i].mobile
  } 491w, https://media.missguided.co.uk/image/upload/w_569,q_70${
    contentData.items[i].mobile
  } 569w, https://media.missguided.co.uk/image/upload/w_639,q_70${
    contentData.items[i].mobile
  } 639w, https://media.missguided.co.uk/image/upload/w_711,q_70${
    contentData.items[i].mobile
  } 711w, https://media.missguided.co.uk/image/upload/w_756,q_70${
    contentData.items[i].mobile
  } 756w, https://media.missguided.co.uk/image/upload/w_767,q_70${
    contentData.items[i].mobile
  } 767w">
            <source sizes="(max-width: 1920px) 100vw, 1920px" data-srcset="https://media.missguided.co.uk/image/upload/w_768,q_70${
              contentData.items[i].image
            } 768w, https://media.missguided.co.uk/image/upload/w_937,q_70${
    contentData.items[i].image
  } 937w, https://media.missguided.co.uk/image/upload/w_1086,q_70${
    contentData.items[i].image
  } 1086w, https://media.missguided.co.uk/image/upload/w_1226,q_70${
    contentData.items[i].image
  } 1226w, https://media.missguided.co.uk/image/upload/w_1353,q_70${
    contentData.items[i].image
  } 1353w, https://media.missguided.co.uk/image/upload/w_1474,q_70${
    contentData.items[i].image
  } 1474w, https://media.missguided.co.uk/image/upload/w_1582,q_70${
    contentData.items[i].image
  } 1582w, https://media.missguided.co.uk/image/upload/w_1686,q_70${
    contentData.items[i].image
  } 1686w, https://media.missguided.co.uk/image/upload/w_1792,q_70${
    contentData.items[i].image
  } 1792w, https://media.missguided.co.uk/image/upload/w_1905,q_70${
    contentData.items[i].image
  } 1905w, https://media.missguided.co.uk/image/upload/w_1920,q_70${
    contentData.items[i].image
  } 1920w" alt="image failed">
            <img class="lazyload" data-expand="-50" data-src="https://media.missguided.co.uk/image/upload/w_1920,q_70${
              contentData.items[i].image
            }" src="${
    contentData.items[i].squipimage
      ? contentData.items[i].squipimage
      : "https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70" +
        contentData.items[i].image
  }" alt="backup">
        </picture>
        <div class="banner_content center">
            ${contentData.items[i].svg}
            <h2 class="title1 white">${contentData.items[i].title}</h2>
            <h4 class="subtitle1 white">${contentData.items[i].subtitle}</h4>
            <div class="more-buttons">
                <button class="button">${contentData.items[i].cta}</button>
                <a href="${contentData.items[i].url2}">
                    <button class="button">${contentData.items[i].cta2}</button>
                </a>
            </div>
        </div>
    </a>
</div>
`;
};

var contentSlide = i => {
  return `
  <div>
    <a href="${contentData.items[i].url}" class="tracking">
      <div class="imgContainer">
        <img class="lazyload" data-expand="-50" data-src="https://media.missguided.co.uk/image/upload/w_600,q_70${
          contentData.items[i].image
        }" src="${
    contentData.items[i].squipimage
      ? contentData.items[i].squipimage
      : "https://media.missguided.co.uk/image/upload/c_scale,w_600,q_70" +
        contentData.items[i].image
  }" alt="backup_img">
      </div>
      <div class="title-below">
        <h2 class="title3">${contentData.items[i].title}</h2>
        <h4 class="subtitle3">${contentData.items[i].subtitle}</h4>
        <button class="button">${contentData.items[i].cta}</button>
      </div>
    </a>
  </div>
`;
};

let blocker = () => {
  return `
  <div class="blocker"></div>`;
};

let nav = () => {
  return `
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
  </div>`;
};

let promoStrip = () => {
  return `
<a href="${contentData.promoUrl}">
  <div class="row fullwidth" id="banner" style="background: #F3D0D2">
    <div class="title-center-row" style="padding: 0px 20px 0px 20px;">
      <h3 class="black" style="margin: 10px 0px 14px 0px; padding:0px; font-size:1.125rem; text-align:center;">
            ${contentData.promoStrip}
      </h3>
    </div>
  </div>
</a>`;
};

module.exports = {
  initOutput,
  mainSlide,
  contentSlide,
  nav,
  blocker,
  promoStrip
};
