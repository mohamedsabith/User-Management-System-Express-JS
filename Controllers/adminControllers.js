const adminModel = require('../Models/adminSchema')
const userModal = require('../Models/userSchema')
const uservalidation = require('../Validations/userValidation')

//admin login
const adminLogin = (data) =>{
   return new Promise(async(resolve,reject)=>{
      let admin=await adminModel.findOne({username:data.username})
      if(admin){
          if(admin.password==data.password){
              resolve({status:true,data,loginSuccess:"Login SuccessFully"})
          }else{
              reject({status:false,loginError:"You have entered an invalid password"})
          }
      }else{
        reject({status:false,loginError:"You have entered an invalid username"})
      }
   })
}

const userPending = (id) =>{
    return new Promise(async(resolve,reject)=>{
       await userModal.findByIdAndUpdate({_id:id},{$set:{status:"Pending"}})
        resolve({status:true,msge:"Account is Pending"})
        reject({status:false})
    })
}

const activationAccount = (id) =>{
    return new Promise(async(resolve,reject)=>{
        await userModal.findByIdAndUpdate({_id:id},{$set:{status:"Activated"}})
         resolve({status:true,msge:"Account Activated Successfully"})
         reject({status:false})
     })
}
const blockAccount=(id) =>{
    return new Promise(async(resolve,reject)=>{
        await userModal.findByIdAndUpdate({_id:id},{$set:{status:"Blocked"}})
         resolve({status:true,msge:"Account is Blocked"})
         reject({status:false})
     })
}
const deleteAccount = (id) =>{
   return new Promise(async(resolve,reject)=>{
      await userModal.findByIdAndDelete({_id:id})
      resolve({status:true,msge:"Deleted Account"})
   })
}

const getUser = (id) =>{
  return new Promise(async(resolve,reject)=>{
      await userModal.findOne({_id:id}).then((user)=>{
         resolve(user)
      })
  })
}

const editUser = (id,data) =>{
    return new Promise(async(resolve,reject)=>{
          console.log(data);
          console.log(id);
          await userModal.updateOne({_id:id},{
            $set:{
                usernme:data.username,
                email:data.email,
                password:data.password
            }
            }).then(()=>{
                resolve({status:true,msge:"successfully edited"})
            }).catch(()=>{
                reject({status:false,msge:"Another account is using this email."})
            })
    })
}

const addUser = (data) =>{
    return new Promise(async(resolve,reject)=>{

        const user = await userModal.findOne({email:data.email})
              
           const Validations=await uservalidation(data)
    
           if(Validations.error){
            return reject({status:false,errorMsge: Validations.error.details[0].message.replace(/"/g,'')});
           }
    
            if(user){
            reject({status:false,errorMsge:'Another account is using this email.'})
            }
            else{
            const newUser=new userModal({
                username:data.username,
                email:data.email,
                password:data.password
            })
            await newUser.save(async(err,result)=>{
                if(err){
                    return reject({status:false,errorMsge:'Something went wrong try again'})
                }else{
                   return resolve({status:true,data,Successignup:'Account Created Successfully'})
                }
            })
       
        }
        })
}

module.exports={adminLogin,userPending,activationAccount,blockAccount,deleteAccount,getUser,editUser,addUser};