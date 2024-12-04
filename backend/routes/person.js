const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// GET /person - List all people
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve people." });
  }
});

// POST /person - Create a new person
router.post("/", async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const person = new Person({ name, age, email });
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ message: "Failed to create person." });
  }
});

// PUT /person/{id} - Update an existing person
router.put("/:id", async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      { name, age, email },
      { new: true }
    );
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: "Failed to update person." });
  }
});

// DELETE /person/{id} - Delete a person
router.delete("/:id", async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete person." });
  }
});

module.exports = router;
