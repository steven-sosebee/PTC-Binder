const router = require("express").Router();
// const { request } = require("express");
// const got = require("got");

router.post("/results", async (req, res) => {
  try {
    await req.session.save(() => {
      req.session.searchParams = req.body;
      res.status(200).json(req.body);
    });
    // res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
