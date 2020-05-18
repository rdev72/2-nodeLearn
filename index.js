const express = require('express');           //require express
const bodyParser = require('body-Parser')
const mongoose = require('mongoose')
const session = require('express-session')

const articleSchema = require('./models/articleSchema')
const commentSchema = require('./models/commentSchema')

const ensureLoggedIn = require ('./ensureLoggedIn')

const auth = require('./routes/auth')
const article = require('./routes/article')


const port = 3000;    

//Middleware

//for express
const app = express();
//for templetEngine
app.set('view engine','ejs')  //keep all files in views directory 
//for Body Parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

//for mongoose
mongoose.connect('mongodb://localhost:27017/nodekb', {
 useNewUrlParser : true,
 useFindAndModify : false,
 useCreateIndex : true ,
 useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open',()=>console.log('mongo connected'));
db.on('error', err => console.log(err));

//for session
app.use(session({
    secret : "i love programming",
    resave: true,
    saveUninitialized: true,
    //cookie : {maxAge:1000*20}
}))

//using inherited Routes
app.use('/auth',auth)
app.use('/article',article)


app.get('/',(req,res)=>{
    articleSchema.find().populate('auther','Name -_id ').exec()                       // finds everthing(no condition)
    .then(article=>{
        let data = [];
        let n = article.length;
        article.forEach(e => {
            commentSchema.find({article:mongoose.Types.ObjectId(e._id)}).select('-article -__v')
            .populate('auther','Name')
            .then(comment => {
                data.push({
                    title: e.title,
                    name: e.auther.Name,
                    description: e.description,
                    comment:comment
                    
                });
                n--;
                if (n == 0) {
                    console.log(data);
                    res.render('index',{title:'Root', data:data, user:req.session.user})
                }
            })
        });
        

    })
    .catch(err=>console.log(err))
});  

// for comment
app.post('/comment/add/:aid',ensureLoggedIn,(req,res)=>{
    commentSchema.create({
        comment: req.body.comment,
        auther:req.session.user._id,
        article: req.params.aid

    })
    .then(c => res.redirect('/'))
    .catch(err=>console.log(err))
})

// app.get('/',(req,res)=> res.send('hellow World'))           //only for Testing purpose (not working/1st rout working)
app.get('/about',(req,res)=> res.send('hellow about'));

app.get('/console',ensureLoggedIn,(req,res)=>{
    // if cut pasted to ensureLoggedIn
        articleSchema.find({auther:req.session.user._id})  // find article having auther = loggedin User _id
        .exec().then(userArticles=>{
            // console.log(userArticles),              //no need 31.27
            res.render('console',{user:req.session.user,userArticles:userArticles});
        })
        .catch(err=>console.log(err))
    //else cut pasted to ensureLoggedIn   
})
app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>console.log(err))
    res.redirect('/')
})



app.listen(port,()=>console.log(`server is running at ${port}`))