const Service = require("../models/Service");

// ==========================
// Add Service
// ==========================
const addService = async (req, res) => {
  try {
    const { serviceName, description, price, duration, image } = req.body;

    if (!serviceName || !description || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const service = await Service.create({
      serviceName,
      description,
      price,
      duration,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Service Added Successfully",
      service,
    });

  } catch (error) {
    console.error("Add Service Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Services
// ==========================
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });

  } catch (error) {
    console.error("Get Services Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Service By ID
// ==========================
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });

  } catch (error) {
    console.error("Get Service Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Service
// ==========================
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Updated Successfully",
      service,
    });

  } catch (error) {
    console.error("Update Service Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Service
// ==========================
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service Deleted Successfully",
    });

  } catch (error) {
    console.error("Delete Service Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};