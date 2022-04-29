var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var session = require('express-session')
const userModal = require('../Models/userSchema')
var {adminLogin,userPending,activationAccount,blockAccount,deleteAccount,getUser,editUser,addUser} = require('../Controllers/adminControllers')


router.get('/',(req,res,next)=>{
    res.render("admin/adminLogin",{adminLoginErr:req.session.errMsge})
    req.session.adminLoginerr=false
    req.session.errMsge=null
})

router.post('/adminLogin',(req,res)=>{
    adminLogin(req.body).then((result)=>{
      req.session.admin=result.data
      req.session.adminLogin=true
      res.redirect('home')
    }).catch((error)=>{
        req.session.adminLoginerr=true,
        req.session.errMsge=error.loginError
        res.redirect('/admin')
    })
})

router.get('/home',(req,res)=>{
    if(req.session.admin == undefined){
        res.redirect('/admin');
      }
    userModal.find({},(err,user)=>{
     let users=user
     res.render('admin/adminHome',{users})
 })
})

router.get('/pending/:id',(req,res)=>{
    let id = req.params.id
    userPending(id).then((result)=>{
        console.log(result);
       res.redirect('/admin/home')
    }).catch((err)=>{
        console.log(err);
    })
    
})
router.get('/active/:id',(req,res)=>{
    let id = req.params.id
    activationAccount(id).then((result)=>{
        console.log(result);
       res.redirect('/admin/home')
    }).catch((err)=>{
        console.log(err);
    })
})
router.get('/block/:id',(req,res)=>{
    let id = req.params.id
    blockAccount(id).then((result)=>{
        res.redirect('/admin/home')
        console.log(result);
     }).catch((err)=>{
         console.log(err);
     })
})

router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    deleteAccount(id).then((result)=>{
        res.redirect('/admin/home')
        console.log(result);
     }).catch((err)=>{
         console.log(err);
     })
})

router.get('/edit/:id',async(req,res)=>{
    let id = req.params.id
    let user = await getUser(id)
    res.render("admin/editUser",{user,error:req.session.editUserErr})
    req.session.editUserErr=null
})

router.post('/editUser/:id',(req,res)=>{
    let id = req.params.id
    let user = req.body
     editUser(id,user).then((result)=>{
        res.redirect('/admin/home')
   }).catch((err)=>{
       console.log(err);
       req.session.editUserErr=err.msge
       console.log(req.session);
       res.redirect('/admin/edit/' + id )
   })
})

router.get('/addUser',(req,res)=>{
   res.render('admin/addUser',{error:req.session.addUserErr})
   req.session.addUserErr=null
})

router.post('/addUser',(req,res)=>{
    addUser(req.body).then(()=>{
        res.redirect('/admin/home')
    }).catch((err)=>{
         req.session.addUserErr=err.errorMsge
         console.log(req.session);
         res.redirect('/admin/addUser')
    })
})

router.get('/search',async(req,res)=>{
    let key = req.query.search;
    console.log(key);
    let details= await userModal.find(
        {
        "$or":[
            {username:{$regex:key}},
            {email:{$regex:key}}
        ]
       }
    )
    res.render('admin/searchDetails',{details})
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/admin')
    res.clearCookie()
  })

module.exports=router;