const express = require ('express');
// const userSchema = require('../models/userSchema');
const articleSchema = require('../models/articleSchema')
const ensureLoggedIn = require ('../ensureLoggedIn')
const ensureCorrectAid = require('../ensureCorrectAid')
const router = express.Router();

//for Article add in console.js
router.post('/add',ensureLoggedIn,(req,res)=>{
    articleSchema.create({
        title: req.body.title,
        auther:req.session.user._id,
        description:req.body.description

    }).then(article=>{
        // console.log(article),            //printing as an object (no need) 31.20
        res.redirect('/console');
    }).catch(err=>console.log(err))
})
router.get('/Edit/:aid',ensureLoggedIn,ensureCorrectAid,(req,res)=>{
    articleSchema.findById(req.params.aid).exec()
    .then(article=>{
        if(article && article.auther == req.session.user._id){
            res.render('editArticles',{article:article,user:req.session.user})
        }else{
            res.render('editArticles',{user:req.session.user,msg:'article not present or not authorised'})
        }
        // res.render('editAricles',{article:article})
    })
    .catch(err=>console.log(err))
})

router.post('/Edit/:aid',ensureLoggedIn,ensureCorrectAid,(req,res)=>{
    let toUpdate = {};
    req.body.title ? toUpdate['title'] = req.body.title :'';
    req.body.description ? toUpdate['description'] = req.body.description :'';
    articleSchema.findByIdAndUpdate(req.params.aid,{$set :toUpdate}).exec()
    .then(article=>res.redirect('/console'))
    .catch(err=>console.log(err))
})

router.get('/Delete/:aid',ensureLoggedIn,ensureCorrectAid,(req,res)=>{
    articleSchema.findByIdAndDelete(req.params.aid).exec()
    .then(article=> res.redirect('/console'))
    .catch(err=>console.log(err))})

module.exports = router;