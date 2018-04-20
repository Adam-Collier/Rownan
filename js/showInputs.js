function showInputs(ind, x, addInputs) {
  addInputs.addEventListener(
    "webkitAnimationEnd",
    function() {
      this.style.webkitAnimationName = "";
    },
    false
  );

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
    <span>../image/upload/q_70</span><input type="text" class="image"><br>
    <label>Mobile Image</label><br>
    <span>../image/upload/q_70</span><input type="text" class="mobile"><br>
    <label>SVG</label><br>
    <input type="text" class="svg"><br>
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
    <textarea class="custom"></textarea>
  `;

  var three = `
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
    <span>../image/upload/q_70</span><input type="text" class="image"><br>
    <label>Title</label><br>
    <input type="text" class="title"><br>
    <label>Subtitle</label><br>
    <input type="text" class="subtitle"><br>
  `;

  var custom = `
  <textarea class="custom"></textarea>
  `;

  switch (x) {
    case "full":
      console.log(x);
      addInputs.innerHTML = full;
      addInputs.style.webkitAnimationName = "show";
      break;
    case "center":
      console.log(x);
      addInputs.innerHTML = center;
      customEditors(addInputs);
      addInputs.style.webkitAnimationName = "show";
      break;
    case "left":
      console.log(x);
      addInputs.innerHTML = left;
      addInputs.style.webkitAnimationName = "show";
      break;
    case "right":
      console.log(x);
      addInputs.innerHTML = right;
      addInputs.style.webkitAnimationName = "show";
      break;
    case "two":
      console.log(x);
      addInputs.innerHTML = two;
      addInputs.style.webkitAnimationName = "show";
      break;
    case "three":
      console.log(x);
      addInputs.innerHTML = three;
      addInputs.style.webkitAnimationName = "show";
      break;
    case "custom":
      console.log(x);
      addInputs.innerHTML = custom;
      customEditors(addInputs);
      addInputs.style.webkitAnimationName = "show";
      break;
    default:
      addInputs.innerHTML = "";
  }
}

module.exports = showInputs;
