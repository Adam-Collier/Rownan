let sqip = require("sqip");
let svgToMiniDataURI = require("mini-svg-data-uri");
let request = require("request-promise-native");
let { errorStrip } = require("./error.js");

let squipImages = () => {
  document.querySelector(".loader").classList.add("loader-show");

  return new Promise((resolve, reject) => {
    let arr = ["image", "mobile"];

    Promise.all(
      arr.map(s => {
        return Promise.all(
          contentData.items.map((x, i) => {
            if (contentData.items[i].mobile === undefined && s === "mobile") {
              return;
            } else if (
              contentData.items[i].custom !== undefined &&
              contentData.items[i].custom !== ""
            ) {
              return;
            } else {
              return new Promise((resolve, reject) => {
                request
                  .get({
                    url: `https://media.missguided.co.uk/image/upload/w_300,q_70/${
                      x[s]
                    }`,
                    encoding: "binary"
                  })
                  .then(response => {
                    console.log("got image", i);
                    fs.writeFile(
                      `./tempImages/sqip-${s}-temp${i + 1}.jpeg`,
                      response,
                      {
                        encoding: "binary"
                      },
                      function(err) {
                        if (err) throw err;

                        const result = sqip({
                          filename: path.join(
                            __dirname,
                            `../../tempImages/sqip-${s}-temp${i + 1}.jpeg`
                          ),
                          numberOfPrimitives: 8
                        });

                        console.log("this has been sqipped", i);

                        var svg = result.final_svg;

                        var optimizedSVGDataURI = svgToMiniDataURI(svg);

                        contentData.items[i]["squip" + s] = optimizedSVGDataURI;
                        resolve(contentData.items[i]["squip" + s]);
                      }
                    );
                  })
                  .catch(err => {
                    console.log(err);
                    document
                      .querySelector(".loader")
                      .classList.remove("loader-show");

                    errorStrip(
                      "You are missing an image or the image no longer exists"
                    );
                  });
              });
            }
          })
        );
      })
    ).then(() => {
      // write the JSON file
      fs.writeFile(
        path.join(__dirname, "../../output.json"),
        JSON.stringify(contentData, null, 2),
        function(err, data) {
          if (err) {
            console.log(error);
          }
          document.querySelector(".loader").classList.remove("loader-show");
          resolve(console.log("JSON file created"));
        }
      );
    });
  });
};

module.exports = squipImages;
