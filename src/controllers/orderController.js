const Order_Product = require("../models/oder_product")
const Order_ProductModel = require("../models/oder_product")
exports.getAllOrder = async (req, res) =>{
    const orders = await Order_ProductModel.find();
    if(orders){
        res.json({message:"Get Orders Successfully", data:orders})
    }else{
        res.json({message:"Get Orders Failed", data:[]})
    }
}
exports.createOrderProduct = async (req,res)=>{
    try {
        const idUser = req.params.id;
        const {
          address,
          listProduct,
          phone,
          paymentMethods,
          shippingMethod,
          status,
          totalPrice,
          customerName,
        } = req.body;
        let totalProduct = 0
        for(const product of listProduct){
            totalProduct += product.quantity
        }
        const newOrder = new Order_ProductModel({
            address,
            listProduct,
            idUser,
            phone,
            paymentMethods,
            shippingMethod,
            totalProduct,
            totalPrice,
            status,
            customerName,
          });
        const result = await newOrder.save();
        if(result){
            res.json({message:"Create Order Successfully", data: result})
        }else{
            res.json({message:"Create Order Failed", data:{}})
        }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}
exports.getOrderByOrderId = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order_ProductModel.findById(orderId);
      if (!order) {
        return res.status(404).json({
          status: 404,
          message: "Order Not Found",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Order Retrieved Successfully",
        order: order,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  };
  
  exports.updateOrderStatus = async (req, res) => {
    try {
      const orderId = req.params.id;
      const { status } = req.body;
      const order = await Order_ProductModel.findById(orderId);
  
      if (!order) {
        return res.status(404).json({
          status: 404,
          message: "Order not found",
        });
      }
  
      const oldStatus = order.status;
      order.status = status;
      switch (status) {
        case "confirmed":
          order.time_confirmed = new Date();
          break;
        case "completed":
          order.time_completed = new Date();
          break;
        case "canceled":
          order.time_canceled = new Date();
          break;
          for (const product of order.listProduct) {
            await Product.findByIdAndUpdate(product.idProduct, {
              $inc: {
                quantity: -product.soLuong,
                soldQuantity: +product.soLuong,
              },
            });
          }
          break;
      }
  
      await order.save();
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
      }
}  