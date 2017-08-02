var editor = document.querySelector('.CodeMirror');

var resizer = document.createElement('div');
resizer.className = 'resizer';
editor.appendChild(resizer);
resizer.addEventListener('mousedown', initDrag, false);

var startX, startY, startWidth, startHeight;

function initDrag(e) {
  //  startX = e.clientX;
   startY = e.clientY;
   startHeight = parseInt(document.defaultView.getComputedStyle(editor).height, 10);
   document.documentElement.addEventListener('mousemove', doDrag, false);
   document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
  console.log(editor.style.height);
  //  editor.style.height = (startHeight + e.clientY - startY) + 'px';
   editor.style.height = editor.style.height <= '400px' ? (startHeight + e.clientY - startY) + 'px' : '400px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}
