var express = require('express');
var router = express.Router();
var session = require('express-session')
var {userRegister,userLogin,userStatus}=require('../Controllers/userControllers');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
    
    if(req.session.loggedUser){
      res.redirect('/home');
    }else{
      res.render('users/login',{signinErr:req.session.loginErrormsge});
      req.session.loginError=false
      req.session.loginErrormsge=null
    }

});


router.post('/login',(req,res)=>{

  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');

   userLogin(req.body).then((result)=>{
        req.session.loggedUser=true
        req.session.user=result.data
        res.redirect('/home');
   }).catch((error)=>{
       req.session.loginError=true
       req.session.loginErrormsge=error.loginError
       res.redirect('/');
   })

})

router.get('/register', function(req, res) {

  
  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');
 
  if(req.session.loggedUser){
    res.redirect('/home');
  }else{
    res.render('users/register',{signupErrorMsge:req.session.signupErrorMsge});
      req.session.signupError=false
      req.session.signupErrorMsge=null
  }

});

router.post('/register',(req,res)=>{

  res.header('Cache-control','no-cache,private, no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0');

  userRegister(req.body).then(()=>{
      res.render('users/login')
  }).catch((error)=>{
    req.session.signupError=true
    req.session.signupErrorMsge=error.errorSignup
    res.redirect('/register')
  })

})

router.get('/home',(req,res)=>{
  let products=[
    {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      },
      {
        name:"Galexy M52",
        category:"mobile",
        price:48884,
        image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-e236bzggins/gallery/in-galaxy-f23-4gb-ram-sm-e236bzggins-531512373?$2052_1641_PNG$"
      }
]

if(req.session.user == undefined){
  res.redirect('/');
}

let user=req.session.user.email
   userStatus(user).then((result)=>{
       if(result.status==true){
        res.render('users/home',{products})
       }
   }).catch((err)=>{
        console.log(err);
        req.session.destroy()
        res.redirect('/')
   })
  
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
  res.clearCookie()
})

module.exports = router;
