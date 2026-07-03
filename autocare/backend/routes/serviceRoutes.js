const express = require("express");
const router = express.Router();

const {
  addService,
  getServices,
  getServiceById,
  deleteService,
} = require("../controllers/serviceController");

router.post("/add", addService);

router.get("/", getServices);

router.get("/:id", getServiceById);

router.delete("/delete/:id", deleteService);

module.exports = router;