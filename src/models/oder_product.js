const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
      },
      listProduct: [
        {
          idProduct: {
            type: mongoose.Schema.Types.ObjectId,
          },
          name: {
            type: String,
            default: "Name Product",
          },
          soLuong: {
            type: Number,
            default: 1,
          },
          price: {
            type: Number,
            default: 0.0,
          },
          image: {
            type: String,
          },
        },
      ],
      idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      totalProduct: {
        type: Number,
        default: 1,
      },
      totalPrice: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      paymentMethods: {
        type: String,
        enum: ["COD", "Sandbox"],
        default: "COD",
      },
      shippingMethod: {
        type: String,
        enum: ["standard", "express"],
        default: "standard",
      },
      timeOrder: {
        type: Date,
        default: Date.now,
      },
      timeConfirm: {
        type: Date,
      },
      timeDelivery: {
        type: Date,
      },
      timeCancel: {
        type: Date,
      },
      timeSuccess: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["active", "deactive", "pending", "trading", "delivered"],
        default: "pending",
        required: true,
      },
      user_voucher_id: {
        type: mongoose.Schema.Types.ObjectId, // Giả sử user_voucher_id là một ObjectId từ model khác
        default: null, // Có thể không có voucher
    },
});

// Tạo model từ schema
const Order_Product = mongoose.model('Order_Product', orderProductSchema);

module.exports = Order_Product;