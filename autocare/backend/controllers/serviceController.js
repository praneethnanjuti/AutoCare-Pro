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
          serviceName: "Car Wash",
          description: "Premium exterior & interior cleaning",
          price: 499,
          duration: "1 hour",
          image: "🚗",
        },
        {
          serviceName: "Oil Change",
          description: "Engine oil replacement with quality oils",
          price: 999,
          duration: "45 mins",
          image: "🛢️",
        },
        {
          serviceName: "Engine Repair",
          description: "Professional engine diagnostics & repair",
          price: 4999,
          duration: "2 Days",
          image: "🔧",
        },
        {
          serviceName: "Wheel Alignment",
          description: "Improve safety and tire life",
          price: 799,
          duration: "30 mins",
          image: "⚙️",
        },
      ];
    }

    res.status(200).json({
      success: true,
      count: services.length,
      services,
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
// Update Service
// ==========================
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service Updated Successfully",
      service,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
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