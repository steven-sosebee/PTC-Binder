const router = require("express").Router();
const { request } = require("express");
const got = require("got");

router.get("/", async (req, res) => {
  res.status(200).render("searchResults");
});

// pulls cards when loading searchResults screen
router.get("/results", async (req, res) => {
  try {
    const keys = Object.keys(req.session.searchParams);
    const values = Object.values(req.session.searchParams);
    const baseApiURL = `https://api.pokemontcg.io/v2/cards/?q=`;
    let apiURL = "";
    for (let [key, value] of Object.entries(req.session.searchParams)) {
      if (apiURL.length === 0) {
        apiURL = `${baseApiURL}${key}:${value}`;
      } else {
        apiURL = `${apiURL} ${key}:${value}`;
      }
    }

    const response = await got(apiURL, {
      responseType: "json",
    });
    const searchResults = response.body.data;
    res.status(200).render("searchResults", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      searchResults,
    });
  } catch (err) {
    res.status(500);
  }
});

// search results after form submission
router.post("/results", async (req, res) => {
  try {
    // const keys = Object.keys(req.body);
    // const values = Object.values(req.body);
    // const baseApiURL = `https://api.pokemontcg.io/v2/cards/?q=`;
    // let apiURL = "";
    // for (let [key, value] of Object.entries(req.body)) {
    //   if (apiURL.length === 0) {
    //     apiURL = `${baseApiURL}${key}:${value}`;
    //   } else {
    //     apiURL = `${apiURL} ${key}:${value}`;
    //   }
    // }

    // const response = await got(apiURL, {
    //   responseType: "json",
    // });
    console.log(req.body);

    req.session.save(() => {
      req.session.searchParams = req.body;
      res.status(200).json(req.body);
    });
    // const searchResults = await req.body;
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/results/test", async (req, res) => {
  try {
    // const keys = Object.keys(req.body);
    // const values = Object.values(req.body);
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
    // console.log(req.body);
    const searchResults = response.body.data;
    console.log(searchResults);
    req.session.save(() => {
      req.session.searchParams = req.body;
      res.render("searchResults", {
        // logged_in: req.session.logged_in,
        // user_name: req.session.user_name,
        // user_id: req.session.user_id,
        searchResults,
      });
      // .status(200);
      // res.json(req.body);
    });
    // res.render("searchResults", {
    //   logged_in: req.session.logged_in,
    //   user_name: req.session.user_name,
    //   user_id: req.session.user_id,
    //   searchResults,
    // });
    // const searchResults = await req.body;
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
