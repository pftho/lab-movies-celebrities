// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movies = require("../models/Movie.model");
const CelebModel = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  CelebModel.find()
    .then((DbCelebs) => {
      //  console.log("celebs", DbCelebs);
      res.render("movies/new-movie", { DbCelebs });
    })
    .catch((err) => console.log(err));
});

router.post("/create", (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movies.create({ title, genre, plot, cast })
    .then(() => {
      //console.log("here is the new movie", newMovie);
      res.redirect("/movies");
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Movies.find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((err) => console.log(err));
});

router.get("/:movieId", (req, res) => {
  const { movieId } = req.params;
  Movies.findById(movieId)
    .populate("cast")
    .then((requestedMovie) => {
      console.log("movie searched", requestedMovie);
      res.render("movies/movie-details", requestedMovie);
    })
    .catch((err) => console.log(err));
});

router.post("/:movieId/delete", (req, res) => {
  const { movieId } = req.params;
  Movies.findByIdAndDelete(movieId)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => console.log("qdqed", err));
});

router.get("/:movieId/edit", (req, res) => {
  const { movieId } = req.params;

  const searchedMovie = Movies.findById(movieId);
  const movieCast = CelebModel.find();

  Promise.all([searchedMovie, movieCast])
    .then(([searchedMovie, movieCast]) => {
      console.log([searchedMovie, movieCast]);
      res.render("movies/edit-movie", {
        movieToEdit: searchedMovie,
        DbCelebs: movieCast,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
