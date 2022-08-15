// //  Add your code here
// const mongoose = require("mongoose"); // require mongoose because we need it to create the model
// const Schema = mongoose.Schema; // Defining the Schema so we can use it

// const celebritySchema = new Schema({
//   name: { Type: String },
//   occupation: { Type: String },
//   catchPhrase: { Type: String },
// });

// const Celebrity = mongoose.model("Celebrities", celebritySchema); // Creating the model, naming the collection and assigning the schema to define the filds

// module.exports = Celebrity;

const { Schema, model } = require("mongoose");

const celebSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
);

const CelebModel = model("celeb", celebSchema);

module.exports = CelebModel;
