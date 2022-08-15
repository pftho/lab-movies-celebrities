const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: "celeb" }],
  },
  {
    timestamps: true,
  }
);

const MovieModel = model("movie", movieSchema);

module.exports = MovieModel;
