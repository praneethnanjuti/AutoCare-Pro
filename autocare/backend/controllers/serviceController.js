const Service = require("../models/Service");

// ==========================
// Add Service
// ==========================
const addService = async (req, res) => {
  try {
    const { serviceName, description, price, duration, image } = req.body;

    // Check all required fields
    if (!serviceName || !description || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Create Service
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
    console.error(error);

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
    let services = await Service.find();

    // Return default services if database is empty
    if (services.length === 0) {
  services = [
    {
      _id: "1",
      serviceName: "Car Wash",
      description: "Premium exterior & interior cleaning",
      price: 499,
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?w=900",
    },
    {
      _id: "2",
      serviceName: "Oil Change",
      description: "Engine oil replacement with quality oils",
      price: 999,
      duration: "45 mins",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900",
    },
    {
      _id: "3",
      serviceName: "Engine Repair",
      description: "Professional engine diagnostics & repair",
      price: 4999,
      duration: "2 Days",
      image: "https://images.unsplash.com/photo-1613214150384-5c88d0f74f4d?w=900",
    },
    {
      _id: "4",
      serviceName: "Wheel Alignment",
      description: "Improve safety and tire life",
      price: 799,
      duration: "30 mins",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",
    },
  ];
}
// =========================
// Delete Service
// =========================

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
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addService,
  getServices,
  updateService,
  deleteService,
};