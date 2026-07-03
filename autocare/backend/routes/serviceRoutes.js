const express = require("express");
const router = express.Router();

const {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.post("/add", addService);

router.get("/", getServices);

router.get("/:id", getServiceById);

router.put("/update/:id", updateService);

router.delete("/delete/:id", deleteService);

module.exports = router;