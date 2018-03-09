const resize = require('electron').remote;

function mobileSize(viewPort){
  var win = resize.getCurrentWindow();
  var size = win.getSize();
  console.log(resize.getCurrentWindow().getSize())
  if(size[0] > 750){
    win.setSize(540, size[1]);
  }else{
    win.setSize(1125, size[1]);
  }
  var rect = viewPort.getBoundingClientRect();
  if(rect.width === 0){
    viewPort.style.webkitAnimation = 'resize 800ms forwards';
  }else{
    viewPort.style.webkitAnimation = 'resize-reverse 800ms forwards';
  }
}

module.exports = mobileSize;
