// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebModel = require("../models/Celebrity.model");

// all your routes here
//create a new celebrity

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  console.log("req body:", req.body);
  CelebModel.create({ name, occupation, catchPhrase })
    .then((createdCeleb) => {
      //  console.log("celeb bd", createdCeleb);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      res.render("celebrities/new-celebrity");
    });
});

//Display Celeb
router.get("/", (req, res) => {
  CelebModel.find()
    .then((allCelebrities) => {
      // console.log("here is an array of all celebs:", allCelebrities);
      res.render("celebrities/celebrities", { allCelebrities });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
