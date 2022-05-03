const Mongoose = require("mongoose")

const adminSchema=new Mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    lastLogin:{
        type: Date,
        default: Date.now
    }
})

const adminModel = Mongoose.model("Admin", adminSchema);

module.exports=adminModel