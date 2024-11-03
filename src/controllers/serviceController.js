const Service = require("../models/service");
const ServiceModel = require("../models/service");

exports.getAllService = async (req,res) =>{
    const services = await ServiceModel.find()
    if(services){
        res.status(200).json({status:200, message:"Get all services success", data:services})
    }else{
        res.status(404).json({status:404, message: "Not found service", data:[]})
    }
}
exports.addService = async (req,res)=>{
    try {
        const {id_category,description,price,duration,name} = req.body
        const serviceExists = await ServiceModel.findOne({name:service.name})
        let image = req.file ? `${req.protocol}://localhost:3030/uploads/${req.file.filename}`: null
        const service = new Service({
            id_category: id_category,
            description: description,
            duration: duration,
            images: image,
            name:name,
            price: price
        })
        if(serviceExists){
            res.status(404).json({status:404, message:"Service already exists"})
        }else{
            const addService = await service.save()
            if(addService){
                res.status(201).json({status:201, message:"Add service success", data:addService})
            }else{
                res.status(404).json({staus:404, message:"Add service fail"})
            }
        }
    } catch (error) {
        res.status(500).json({status:500, message:`${error}`})
    }
}