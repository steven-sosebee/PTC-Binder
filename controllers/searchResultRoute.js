const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.render("searchResults", {
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
