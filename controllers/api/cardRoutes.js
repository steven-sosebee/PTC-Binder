const router = require("express").Router();
const session = require("express-session");
const { User, Binder, BinderCard, Card } = require("../../models");

// add card to binder
router.put("/addcard/", async (req, res) => {
  try {
    const cardData = await Card.create({
      binder_id: req.params.binderid,
      card_id: req.params.cardid,
      cardCardId: req.params.cardid,
      binderBinderId: req.params.binderid,
      binder_binder_id: req.params.binderid,
      binder_binderid: req.params.binderid,
    });
    console.log(cardBinderData);
    res.status(200).json({
      message: "Card added to binder...",
      data: { Binder: req.params.binderid, Card: req.params.cardid },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/addcard/", async (req, res) => {
  try {
    const cardData = await Card.create({
      card_name: req.body.card_name,
      description: req.body.description,
      pokemon_id: req.body.pokemon_id,
      card_img_url: req.body.card_img_url,
      card_api_id: req.body.card_api_id,
    });
    // console.log(cardBinderData);
    res.status(200).json({
      message: "Card added...",
      data: { cardData },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
