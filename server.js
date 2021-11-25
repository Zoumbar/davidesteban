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
      const data = response.data.title;
      const result = {
        frames: [
          {
            index: 0,
            text: data,
            icon: "i5162",
          },
        ],
      };
      res.json(result);
    })
    .catch((error) => {
      const errorMovie = [
        "Shrek",
        "Spider-Man",
        "Mortal Kombat",
        "Inception",
        "Interstellar",
        "Jurassic Park",
        "Star Wars : Attack of the clones",
        "Rush Hour",
        "The Incredible Hulk",
        "Snowpiercer",
        "21 Jump Street",
        "Avatar",
        "Scary Movie",
        "Toy Story",
        "Cars",
        "Scream",
        "Invisible-man",
        "Easter Egg : david esteban les beaugoss",
        "22 Jump Street",
        "Cinderella",
        "Karate Kid",
      ];
      const unfound = randomIntFromInterval(0, errorMovie.length);
      const result = {
        frames: [
          {
            index: 0,
            text: errorMovie[unfound],
            icon: "i5162",
          },
        ],
      };
      res.send(result);
      console.log("eror lllol");
    });
};

app.get("/", randomMovie);
