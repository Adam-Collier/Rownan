const {dialog} = require('electron').remote;
const fs = require('fs');

function openFile () {
  dialog.showOpenDialog({ filters: [{ name: 'text', extensions: ['html'] }]}, function (fileNames) {
    console.log("window open");
  });
}
module.exports = openFile;
