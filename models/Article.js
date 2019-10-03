var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // headline of the article
  title: {
    type: String,
    required: true
  },
  //summary of the article or body
  summary:{
      type: String,
      required: true
  },
  // link of the article
  link: {
    type: String,
    required: true
  },
  isItSaved:{
      type:Boolean,
      default:false
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  //make it an array for mulitple notes for each object
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
