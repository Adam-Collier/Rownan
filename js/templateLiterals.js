let initOutput = `
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
        $(window).on('resize orientationchange', function () {
            $('#homeSlider').slick('resize');
            $('.slick-three').slick('resize');
        });
        $(window).scroll(_.debounce(function () {
            if ($(window).width() < 767) {
                var wScroll = $(this).scrollTop();
                console.log(wScroll);
                if (wScroll > $('.slick-three').offset().top - 400) {
                    $('.slick-three .slick-slide').css('animation', 'swipe 1200ms ease-in-out forwards');
                    setTimeout(function () {
                        $('.blocker').css('display', 'none');
                    }, 1600);
                }
            }
        }, 100));
    })(jQuery);
</script>
  `;

let initStyles = `
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css" />
<style>
  .container {
        overflow: hidden;
    }
    .slick-slide,
    .slick-slide * {
        outline: none !important;
    }
    .slick-dotted.slick-slider {
        margin-bottom: 0px;
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
        padding-bottom: 50px;
    }
    .slick-three .slick-slide {
        padding: 20px;
    }
    .slick-three div {
        height: auto;
        padding: 0px;
    }
    .slick-three .button {
        margin-top: 12px;
    }
    .slick-three h2 {
        margin-bottom: 12px;
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
    @media only screen and (min-width:768px) {
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
        #homeSlider-nav a {
            color: white;
            text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
            letter-spacing: 0.9px;
        }
        #homeSlider-nav a:hover {
            color: rgba(250, 250, 250, 0.8);
            text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
        }
        #text-accordion{
            padding: 0;
            padding-top: 65px;
        }
        .slick-three {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            padding-top: 55px;
            padding-bottom: 50px;
        }
        .slick-three ul.slick-dots {
            display: none !important;
        }
        .slick-three .imgContainer {
            margin-bottom: 6%;
        }
        .subtitle3 {
            padding: 0px 20px;
        }
    }
    @media only screen and (max-width: 767px) {
        .container {
            display: flex;
            flex-direction: column;
        }
        .row:not(:first-child) {
            margin-bottom: 6vw;
        }
        #homeSlider .row:nth-of-type(2) {
            margin-bottom: 6px;
        }
        #homeSlider {
            display: flex;
            flex-direction: column;
        }
        .banner_content .title1 {
            color: #474747;
        }
        #homeSlider .banner_content {
            margin: 0;
            position: relative;
            width: 100%;
            background: none;
            padding: 5% 10%;
        }
        #homeSlider .banner_content .button {
            background: transparent;
            border: #323232 2px solid;
            color: #323232;
            margin-top: 10px;
        }
        #homeSlider .banner_content .button:hover {
            background: #323232;
            border: #323232 2px solid;
            color: #FFFFFF;
        }
        #homeSlider div:nth-child(n+3) {
            order: 2;
        }
        #homeSlider-nav {
            position: relative;
            text-align: center;
            font-size: 30px;
            font-weight: 700;
            padding: 0px 0px 30px 0px;
            order: 1;
        }
        #homeSlider-nav a {
            padding-bottom: 6px;
            display: block;
        }
        #homeSlider-nav a:hover {
            color: rgba(71, 71, 71, 0.6);
            text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
        }
        #text-accordion{
            padding: 0;
            padding-top: 40px;
        }
        .accordion--content {
            padding-bottom: 20px;
        }
        .blocker {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }
        .slick-three .slick-slide {
            padding: 10px;
        }
        .slick-three div {
            height: auto;
            padding-top: 5%;
        }
        .slick-three .title3 {
            font-size: 1.6rem;
            margin-bottom: 4%
        }
        .slick-next {
            right: 0px;
            top: 32.5%;
        }
        .slick-prev {
            left: 13px;
            top: 32.5%;
            z-index: 2;
        }
        .more-buttons {
            margin-top: 1em;
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
    .lazyload,
    .lazyloading {
        opacity: 0;
    }

    .lazyloaded {
        opacity: 1;
        transition: opacity 800ms;
    }
</style>
`;

var mainSlide = i => {
  return `
  <div class="row fullwidth row${i + 1}">
    <a href="${contentData.items[i].url}" class="tracking">
        <picture>
            <source media="(max-width: 767px)" sizes="(max-width: 767px) 100vw, 767px" data-srcset="https://media.missguided.co.uk/image/upload/c_fill,c_scale,w_300${
              contentData.items[i].mobile
            } 300w, https://media.missguided.co.uk/image/upload/w_402${
    contentData.items[i].mobile
  } 402w, https://media.missguided.co.uk/image/upload/w_491${
    contentData.items[i].mobile
  } 491w, https://media.missguided.co.uk/image/upload/w_569${
    contentData.items[i].mobile
  } 569w, https://media.missguided.co.uk/image/upload/w_639${
    contentData.items[i].mobile
  } 639w, https://media.missguided.co.uk/image/upload/w_711${
    contentData.items[i].mobile
  } 711w, https://media.missguided.co.uk/image/upload/w_756${
    contentData.items[i].mobile
  } 756w, https://media.missguided.co.uk/image/upload/w_767${
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
      : " https://media.missguided.co.uk/image/upload/c_scale,w_1920,q_70 " +
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

let slick = () => {
  return `
  <script src="https://cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.0.1/lazysizes.min.js " async=" "></script>`;
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
<a href="https://itunes.apple.com/gb/app/missguided/id842503500?mt=8">
  <div class="row fullwidth" id="banner" style="background: #F3D0D2;margin-bottom: 0px;">
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
  initStyles,
  mainSlide,
  contentSlide,
  nav,
  blocker,
  slick,
  promoStrip
};
