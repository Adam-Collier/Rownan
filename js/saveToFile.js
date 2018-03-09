const { dialog } = require("electron").remote;

function saveToFile() {
  var s = document.querySelectorAll(".save-icon");

  s.forEach(function(x) {
    var rect = x.getBoundingClientRect();
    console.log(rect);
    if (rect.width === 0) {
      x.style.webkitAnimation = "save 800ms forwards";
    }
  });

  dialog.showSaveDialog(
    {
      filters: [
        {
          name: "Custom File Type",
          extensions: ["html"]
        }
      ]
    },
    function(fileName) {
      s.forEach(function(x) {
        var rect = x.getBoundingClientRect();
        if (rect.width > 0) {
          x.style.webkitAnimation = "save-reverse 800ms forwards";
        }
      });

      if (fileName === undefined) return;

      //create temp file and get fileName after last slash
      var temp = fileName.match(/^(.*[\/])/);
      temp = temp[1] + "savedFiles/";
      var jsonFile = fileName.match(/[^/]+$/);
      jsonFile = jsonFile[0].slice(0, -5);

      fs.readFile(path.join(__dirname, "../output.json"), "utf8", function(
        err,
        jsonData
      ) {
        console.log(jsonFile);
        if (fs.existsSync(temp)) {
          // Do something
          fs.writeFile(temp + "/" + jsonFile + ".json", jsonData, function(
            err,
            data
          ) {
            if (err) {
              console.log(err);
            } else {
              console.log("json file created");
            }
          });
        } else {
          fs.mkdir(temp, function(err) {
            if (err) {
              console.log(err);
            } else {
              fs.writeFile(temp + "/" + jsonFile + ".json", jsonData, function(
                err,
                data
              ) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("json file created");
                }
              });
            }
            console.log("temp created");
          });
        }
      });

      fs.readFile(path.join(__dirname, "../output.html"), "utf8", function(
        err,
        data
      ) {
        if (err) {
          throw err;
        }
        var saveFile = data;
        fs.writeFile(fileName, saveFile, function(err, data) {
          //write the new JSON to the file
          if (err) {
            console.log(error);
          }
          console.log("file saved");
          const notification = {
            title: "File Saved",
            body: "Saved to: " + fileName
          };
          // const notificationButton = document.getElementById('basic-noti')
          const myNotification = new window.Notification(
            notification.title,
            notification
          );

          myNotification.onclick = () => {
            console.log("Notification clicked");
          };
        });
      });
    }
  );
}

module.exports = saveToFile;
