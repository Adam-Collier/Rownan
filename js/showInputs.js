function showInputs(ind, x, addInputs){

  addInputs.addEventListener('webkitAnimationEnd', function(){
      this.style.webkitAnimationName = '';
  }, false);

  var full = `
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url"><br>
      </div>
      <div>
        <label>URL2</label><br>
        <input type="text" class="url2"><br>
      </div>
    </div>
    <label>Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="image"><br>
    <label>Mobile Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="mobile"><br>
    <div id="radio">
      <label>Text vertical</label><br>
      <input type="radio" name="vertical${ind}" value="banner_content" checked><p>center</p>
      <input type="radio" name="vertical${ind}" value="title-below"><p>below</p><br>
    </div>
    <div id="radio">
      <label>Text horizontal</label><br>
      <input type="radio" name="radio${ind}" value="center" checked><p>center</p>
      <input type="radio" name="radio${ind}" value="left"><p>left</p>
      <input type="radio" name="radio${ind}" value="right"><p>right</p><br>
    </div>
    <label>Title</label><br>
    <input type="text" class="title"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle"><br>
    <div class="inline">
      <div>
        <label>CTA</label><br>
        <input type="text" class="cta"><br>
      </div>
      <div>
        <label>CTA 2</label><br>
        <input type="text" class="cta2"><br>
      </div>
    </div>
    `;

  var center = `
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url"><br>
      </div>
      <div>
        <label>URL2</label><br>
        <input type="text" class="url2"><br>
      </div>
    </div>
    <label>Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="image"><br>
    <label>Mobile Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="mobile"><br>
    <div id="radio">
      <label>Text vertical</label><br>
      <input type="radio" name="vertical${ind}" value="banner_content" checked><p>center</p>
      <input type="radio" name="vertical${ind}" value="title-below"><p>below</p><br>
    </div>
    <div id="radio">
      <label>Text horizontal</label><br>
      <input type="radio" name="radio${ind}" value="center" checked><p>center</p>
      <input type="radio" name="radio${ind}" value="left"><p>left</p>
      <input type="radio" name="radio${ind}" value="right"><p>right</p><br>
    </div>
    <label>Title</label><br>
    <input type="text" class="title"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle"><br>
    <div class="inline">
      <div>
        <label>CTA</label><br>
        <input type="text" class="cta"><br>
      </div>
      <div>
        <label>CTA 2</label><br>
        <input type="text" class="cta2"><br>
      </div>
    </div>
  `;

  var left = `
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url"><br>
      </div>
      <div>
        <label>URL2</label><br>
        <input type="text" class="url2"><br>
      </div>
    </div>
    <label>Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="image"><br>
    <label>Title</label><br>
    <input type="text" class="title"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle"><br>
    <div class="inline">
      <div>
        <label>CTA</label><br>
        <input type="text" class="cta"><br>
      </div>
      <div>
        <label>CTA 2</label><br>
        <input type="text" class="cta2"><br>
      </div>
    </div>
  `;

  var right = `
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url"><br>
      </div>
      <div>
        <label>URL2</label><br>
        <input type="text" class="url2"><br>
      </div>
    </div>
    <label>Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="image"><br>
    <label>Title</label><br>
    <input type="text" class="title"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle"><br>
    <div class="inline">
      <div>
        <label>CTA</label><br>
        <input type="text" class="cta"><br>
      </div>
      <div>
        <label>CTA 2</label><br>
        <input type="text" class="cta2"><br>
      </div>
    </div>
  `;

  var two = `
    <h3>First column</h3>
      <div class="inline">
        <div>
          <label>URL</label><br>
          <input type="text" class="url"><br>
        </div>
        <div>
          <label>URL2</label><br>
          <input type="text" class="url2"><br>
        </div>
      </div>
      <label>Image</label><br>
      <span>../image/upload/q_70/</span><input type="text" class="image"><br>
      <label>Title</label><br>
      <input type="text" class="title"><br>
      <label>Subtitle</label><br>
      <input type="text" class="subtitle"><br>
      <div class="inline">
        <div>
          <label>CTA</label><br>
          <input type="text" class="cta"><br>
        </div>
        <div>
          <label>CTA 2</label><br>
          <input type="text" class="cta2"><br>
        </div>
      </div>
    <h3>Second column</h3>
      <div class="inline">
        <div>
          <label>URL</label><br>
          <input type="text" class="url3"><br>
        </div>
        <div>
          <label>URL2</label><br>
          <input type="text" class="url4"><br>
        </div>
      </div>
      <label>Image</label><br>
      <span>../image/upload/q_70/</span><input type="text" class="image2"><br>
      <label>Title</label><br>
      <input type="text" class="title2"><br>
      <label>Subtitle</label><br>
      <input type="text" class="subtitle2"><br>
      <div class="inline">
        <div>
          <label>CTA</label><br>
          <input type="text" class="cta3"><br>
        </div>
        <div>
          <label>CTA 2</label><br>
          <input type="text" class="cta4"><br>
        </div>
      </div>
  `;

  var three = `
  <h3>First column</h3>
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url"><br>
      </div>
      <div>
        <label>CTA</label><br>
        <input type="text" class="cta"><br>
      </div>
    </div>
    <label>Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="image"><br>
    <label>Title</label><br>
    <input type="text" class="title"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle"><br>
  <h3>Second column</h3>
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url2"><br>
      </div>
      <div>
        <label>CTA</label><br>
        <input type="text" class="cta2"><br>
      </div>
    </div>
    <label>Video</label><br>
    <span>../video/upload/q_70/</span><input type="text" class="vid"><br>
    <label>Title</label><br>
    <input type="text" class="title2"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle2"><br>
    <h3>Third column</h3>
    <div class="inline">
      <div>
        <label>URL</label><br>
        <input type="text" class="url3"><br>
      </div>
      <div>
      <label>CTA</label><br>
      <input type="text" class="cta3"><br>
      </div>
    </div>
    <label>Image</label><br>
    <span>../image/upload/q_70/</span><input type="text" class="image2"><br>
    <label>Title</label><br>
    <input type="text" class="title3"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle3"><br>
  `;
  var custom = `
  <textarea class="custom"></textarea>
  `;

  switch (x) {
    case 'full':
      console.log(x);
      addInputs.innerHTML = full;
      addInputs.style.webkitAnimationName = 'show';
      break;
    case 'center':
      console.log(x);
      addInputs.innerHTML = center;
      addInputs.style.webkitAnimationName = 'show';
      break;
    case 'left':
      console.log(x);
      addInputs.innerHTML = left;
      addInputs.style.webkitAnimationName = 'show';
      break;
    case 'right':
      console.log(x);
      addInputs.innerHTML = right;
      addInputs.style.webkitAnimationName = 'show';
      break;
    case 'two':
      console.log(x);
      addInputs.innerHTML = two;
      addInputs.style.webkitAnimationName = 'show';
      break;
    case 'three':
      console.log(x);
      addInputs.innerHTML = three;
      addInputs.style.webkitAnimationName = 'show';
      break;
    case 'custom':
      console.log(x);
      addInputs.innerHTML = custom;
      customEditors(addInputs);
      addInputs.style.webkitAnimationName = 'show';
      break;
    default:
      addInputs.innerHTML = "";
  }
}

module.exports = showInputs;
