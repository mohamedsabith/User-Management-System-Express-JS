const userModel = require('../Models/userSchema')
const uservalidation = require('../Validations/userValidation')

//user Register
const userRegister = (data) =>{
    return new Promise(async(resolve,reject)=>{

    const user = await userModel.findOne({email:data.email})
          
       const Validations=await uservalidation(data)

       if(Validations.error){
        return reject({status:false,errorSignup: Validations.error.details[0].message.replace(/"/g,'')});
       }

        if(user){
        reject({status:false,errorSignup:'Another account is using this email.'})
        }
        else{
        const newUser=new userModel({
            username:data.username,
            email:data.email,
            password:data.password
        })
        await newUser.save(async(err,result)=>{
            if(err){
                return reject({status:false,errorSignup:'Something went wrong try again'})
            }else{
               return resolve({status:true,data,Successignup:'Account Created Successfully'})
            }
        })
   
    }
    })
}

//user login
const userLogin = (data) =>{
  return new Promise(async(resolve,reject)=>{
       var user=await userModel.findOne({email:data.email})
        if(user){
            if(user.password==data.password){
                 let status=user.status
                //  console.log(status);
                 if(status=="Pending"){
                    reject({status:false,status,loginError:"Please login after sometime.You are not authorized by admin."})
                 }else if(status=="Blocked"){
                    reject({status:false,status,loginError:"This Account has been blocked by the Administrator"})
                 }else{
                    resolve({status:true,data,status,loginError:"SuccessFully Logined"})
                 }
                
            }else{
                reject({status:false,loginError:"Your password was incorrect. Please double-check your password."})
            }
        }else{
            reject({status:false,loginError:"The email you entered doesn't belong to an account. Please check your email and try again."})
        }
  })
}

//if user exist or not
const userStatus = (data) =>{
    return new Promise(async(resolve,reject)=>{
        let user=await userModel.findOne({email:data})
        let status=user.status
        if(user&&status!="Blocked"&&status!="Pending"){
             resolve({status:true,loginError:"user is active"})
        }else{
            reject({status:false,loginError:"user is not found"})
        }
    })
}

module.exports={userRegister,userLogin,userStatus}

