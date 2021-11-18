const router = require("express").Router();
const got = require("got");

// Works for basic search:
// router.get("/", async (req, res) => {
//   try {
//     const response = await got(
//       "https://api.pokemontcg.io/v2/cards/?q=name:pikachu",
//       { responseType: "json" }
//     );

//     res.status(200).json(response.body.data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const baseApiURL = `https://api.pokemontcg.io/v2/cards/?q=`;
    let apiURL = "";
    for (let [key, value] of Object.entries(req.body)) {
      if (apiURL.length === 0) {
        apiURL = `${baseApiURL}${key}:${value}`;
      } else {
        apiURL = `${apiURL} ${key}:${value}`;
      }
    }

    const response = await got(apiURL, {
      responseType: "json",
    });
    const cardData = response.body.data;
    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     console.log("Calling api...");
//     let baseApiURL = `https://api.pokemontcg.io/v2/cards/?q=`;

//     const keys = Object.keys(req.body);
//     //   console.log(keys);
//     let apiURL = "";
//     keys.forEach((key, index) => {
//       // console.log(`${key}: ${callParameters[key]}`);
//       if (apiURL.length === 0) {
//         apiURL = `${baseApiURL}${key}:${callParameters[key]}`;
//       } else {
//         apiURL = `${apiURL}&${key}:${callParameters[key]}`;
//       }
//     });
//     console.log(apiURL);
//     const apiData = await fetch(apiURL, {
//       method: "GET",
//       //TODO use variable once server is up and running
//       // headers: { "X-API-KEY": X_API_KEY },
//     });

//     const results = await apiData.json();
//     console.log(results);
//     return results;
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
