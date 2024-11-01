const mongoose = require("mongoose");

// Định nghĩa schema cho Notifications
const notificationSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  // Liên kết với bảng User
    required: true 
  },
  relates_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true  // Liên kết với một bảng nào đó (ví dụ: review_id, barber_id, v.v.)
  },
  type: { 
    type: String, 
    enum: ["review", "booking", "promotion", "general"],  // Các loại thông báo
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["unread", "read"],  // Trạng thái đọc thông báo
    default: "unread" 
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
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
