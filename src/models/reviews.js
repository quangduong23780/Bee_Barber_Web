const mongoose = require("mongoose");

// Định nghĩa schema cho Review
const reviewSchema = new mongoose.Schema({
  barber_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Barber", 
    required: true 
  },
  services_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Service",  
    required: true 
  },
  comment: { 
    type: String, 
    trim: true 
  },
  rating_barber: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  rating_services: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date 
  }
});

// Tạo model từ schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
