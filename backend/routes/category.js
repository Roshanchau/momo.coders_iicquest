const express = require("express");

const router = express.Router();
const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
} = require("../controllers/categoryController");

// get all categories
router.get("/", getAllCategories);

// get single category
router.get("/:id", getSingleCategory);

// create category
router.post("/", createCategory);

//update category
router.patch("/:id", updateCategory);

// delete category
router.delete("/:id", deleteCategory);

// delete categories
router.delete("/", deleteCategories);

module.exports = router;
