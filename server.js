const express = require("express");
const app = express();
const axios = require("axios");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port", server.address().port);
});

// Random number
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//

const randomMovie = (req, res) => {
  const randomNumber = randomIntFromInterval(1, 999);
  console.log(randomNumber);
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${randomNumber}?api_key=0565c72220d110874a5b3f6fd2094dd7`
    )
    .then((response) => {
      const title = response.data.title;
      const note = response.data.vote_average;
      const date = response.data.release_date;

      const result = {
        frames: [
          {
            index: 0,
            text: title,
            icon: "7862",
          },
          {
            index: 1,
            text: "Note : " + note + "/10",
            icon: "626",
          },
          {
            index: 2,
            text: "Date : " + date,
            icon: "626",
          },
        ],
      };
      res.json(result);
    })
    .catch((error) => {
      const result = {
        frames: [
          {
            index: 0,
            text: "Wait few secondes...",
            icon: "626",
          },
        ],
      };
      res.send(result);

    });
};

app.get("/", randomMovie);
