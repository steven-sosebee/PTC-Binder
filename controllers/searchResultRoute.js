const router = require("express").Router();
const got = require("got");

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
    const searchResults = response.body.data;
    res.status(200).json(response.body.data).render("shop", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      searchResults,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
