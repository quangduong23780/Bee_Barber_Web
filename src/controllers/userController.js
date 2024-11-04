const User = require("../models/user")
const UserModel = require("../models/user")

exports.getAllUser = async (req,res)=>{
    const users = await UserModel.find()
    if(users){
        
    }
}
exports.signin = async (req,res) =>{
    try {
        const{number_phone, password} = req.body
        const userExists = await UserModel.findOne({phone:number_phone})
        if(!userExists){
            res.status(404).json({status:404, message:"User Not Found"})
        }else{
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if(!isPasswordValid){
                res.status(404).json({status:404, message:"Password Is Incorrect"})
            }else{
                res.status(200).json({status:200, message:"Login success"})
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
        res.status(404).json({status:404, message:"User Not Found"})
    }
}