const Mongoose = require("mongoose")

const userSchema=new Mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true ,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    Created_at:{
        type: Date,
        default: Date.now
    },
    status:{
        type:String,
        default:"Pending"
    }
})

userSchema.index({username:"text",email:"text"})

const userModel = Mongoose.model("User", userSchema);

module.exports=userModel;