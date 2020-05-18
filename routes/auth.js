const express = require ('express');
const userSchema = require('../models/userSchema');
const router = express.Router();


// For Register
router.post('/register',(req,res)=> {
    // console.log('===>',req.body)                 // removing as no need to log after userSchema creation
   if (req.body.password == req.body.Cpassword){
       userSchema.create({
           Name: req.body.Name,
           Email: req.body.Email,
           password: req.body.password

       })
       .then(user=>{
           console.log(user)
           res.redirect('/');
       })
       .catch(err => console.log(err))

   }else{
       res.send(`<script>alert ('User or Pass invalid')</script>`)
   }
  
});
// For LOGIN
router.post('/login',(req,res)=>{
    userSchema.findOne({Email: req.body.Email}).exec().then(user=>{
        if(user) {
            if(user.password == req.body.password){
                // req.session.loggedIn = true               // loggedIn is user defined Key = value 
                req.session.user = user                      // session gives empty object to store value and maintains it
                console.log('user is LoggedIn')
                res.redirect('/')

            }else{
                res.send(`<script>alert ('Incorrect Password')</script>`)
            }

        }else{
            res.send(`<script>alert ('User not found')</script>`)
        }
    }).catch(err=>console.log(err))
})


module.exports = router;