const mongoose = require("mongoose");

// Define the schema for Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model("Person", personSchema);
