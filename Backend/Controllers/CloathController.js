const Cloath = require("../Models/CloathModel")
const fs =require("fs");

// Add a new clothing item
const addCloath = async (req, res) => {
  try {
    const { name, brand, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newCloath = new Cloath({
      name,
      brand,
      description,
      price,
      image,
      category,
    });

    await newCloath.save();
    res.status(201).json(newCloath);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
};

// Remove a clothing item by ID
const removeCloath = async (req, res) => {
  try {
    const cloathId = req.params.id;
    const cloath = await Cloath.findByIdAndDelete(cloathId);

    if (!cloath) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Optionally: Remove the image file from the server
    // const fs = require('fs');
    // fs.unlink(`uploads/${cloath.image}`, (err) => {
    //   if (err) console.log("Image file deletion error:", err);
    // });

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing product" });
  }
};

// Get all clothing products
const getAllCloaths = async (req, res) => {
  try {
    const cloaths = await Cloath.find();
    res.status(200).json(cloaths);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

module.exports = {
  addCloath,
  removeCloath,
  getAllCloaths
};

