const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:3000/Test")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LogInSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    passwoed:{
        type:String,
        required:true
    }
})


const collection = new mongoose.model("Collection1",LogInSchema)

module.exports = collection