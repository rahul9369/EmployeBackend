const express = require("express");
const router = express.Router();
const {
  AllEmpolye,
  addEmploye,
  getEmploye,
  editEmploye,
  deleteEmploye,
} = require("../controller/employerouterController");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

//All Products router
router.get("/employe", AllEmpolye);

//create the product
router.post("/employe", upload.single("img"), addEmploye);

// show a particular Product
router.get("/employe/:id", getEmploye);

//Edit the Product
router.put("/employe/edit/:id", upload.single("file"), editEmploye);

//DElete the product
router.delete("/employe/delete/:id", deleteEmploye);

module.exports = router;
