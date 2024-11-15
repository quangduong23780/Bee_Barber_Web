const User = require("../models/user")
const UserModel = require("../models/user")
const bcrypt = require('bcrypt')
const SECRETKEY = "BeeBarber-Fpoly";
const JWT = require("jsonwebtoken");
exports.getAllUser = async (req,res)=>{
    const users = await UserModel.find()
    if(users){
        
    }
}
exports.SigupUser = async (req, res, next) => {
    try {
      const {
        name,
        phone,
        email,
        image,
        role,
        loyaltyPoints,
        password,
        status,
        deviceTokens,
      } = req.body;

      const userExists = await UserModel.findOne({email:email})
      const phoneNumberExists = await UserModel.findOne({phone:phone})
      if(userExists){
        return res.status(409).json({status:409, message:"Email already exists"})
      }
      if(phoneNumberExists){
      return res.status(409).json({status:409, message:"Phone number already exists"})
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        phone,
        email,
        image,
        role: "user",
        loyaltyPoints,
        password: hashedPassword, // Mật khẩu mã hóa
        status,
        deviceTokens,
      });
  
      const result = await newUser.save();
  
      // Tạo token sau khi đăng ký thành công
      const accessToken = JWT.sign({ id: result._id }, SECRETKEY, {
        expiresIn: "1d",
      });
      const refreshToken = JWT.sign({ id: result._id }, SECRETKEY, {
        expiresIn: "7d",
      });
  
      const userWithoutPassword = {
        _id: result._id,
        name: result.name,
        phone: result.phone,
        email: result.email,
        image: result.image,
        role: result.role,
        loyaltyPoints: result.loyaltyPoints,
        status: result.status,
        deviceTokens: result.deviceTokens,
      };
  
      // Trả về phản hồi với token và dữ liệu người dùng (không có password)
      res.status(201).json({
        status: 200,
        message: "Đăng ký thành công",
        data: userWithoutPassword,
        token: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Server Error" });
    }
  };
exports.signin = async (req,res) =>{
    try {
        const{email, password} = req.body
        const userExists = await UserModel.findOne({email:email})
        if(!userExists){
            res.status(401).json({status:404, message:"User Not Found"})
        }else{
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if(!isPasswordValid){
                res.status(401).json({status:404, message:"Password Is Incorrect"})
            }else{
                res.status(200).json({status:200, message:"Login success", data:userExists})
            }
        }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}
exports.getUser = async (req,res)=>{
    const phone = req.params
    const user = await UserModel.findOne({phone:phone})
    if(user){
        res.status(200).json({status:200, message:"Get User Success", data: user})
    }else{
        res.status(401).json({status:404, message:"User Not Found"})
    }
}