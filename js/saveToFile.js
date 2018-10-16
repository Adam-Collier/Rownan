const { dialog } = require("electron").remote;

function saveToFile() {
  var s = document.querySelectorAll(".save-icon");

  // init svg animation
  s.forEach(function(x) {
    var rect = x.getBoundingClientRect();

    if (rect.width === 0) {
      x.style.webkitAnimation = "save 800ms forwards";
    }
  });

  // open the save dialog
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
      // once save has been clicked

      // reverse the animation
      s.forEach(function(x) {
        var rect = x.getBoundingClientRect();
        if (rect.width > 0) {
          x.style.webkitAnimation = "save-reverse 800ms forwards";
        }
      });

      // return if no file selected
      if (fileName === undefined) return;

      //create jsonDir file and get fileName after last slash
      var filePath = fileName.match(/^(.*[\/])/);
      jsonDir = filePath[1] + "savedFiles/";
      // remove html extension
      var jsonFile = fileName.match(/[^/]+$/);
      jsonFile = jsonFile[0].slice(0, -5);

      fs.readFile(`${app.getPath("userData")}/output.json`, "utf8", function(
        err,
        jsonData
      ) {
        if (err) console.log(err);

        // check if json directory exists
        if (fs.existsSync(jsonDir)) {
          // if directory exists write file
          fs.writeFile(jsonDir + "/" + jsonFile + ".json", jsonData, function(
            err
          ) {
            if (err) {
              console.log(err);
            } else {
              console.log("json file created");
            }
          });
        } else {
          // if directory doesnt exist create it then write the json
          fs.mkdir(jsonDir, function(err) {
            if (err) {
              console.log(err);
            } else {
              fs.writeFile(
                jsonDir + "/" + jsonFile + ".json",
                jsonData,
                function(err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("json file created");
                  }
                }
              );
            }
            console.log("json directory created");
          });
        }
      });

      fs.readFile(`${app.getPath("userData")}/output.html`, "utf8", function(
        err,
        data
      ) {
        if (err) {
          throw err;
        }
        var saveFile = data;
        fs.writeFile(fileName, saveFile, function(err, data) {
          //write the new JSON to the file
          if (err) console.log(err);

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
