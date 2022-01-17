const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware');


const app = express();

// mongoDB connection 
// const dbURI = "mongodb+srv://ravindu0504:test123@helpworth.wt1pj.mongodb.net/Helpworth?retryWrites=true&w=majority"

// connecting the database
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedtopology:true})
  .then((result) => {  
    app.listen(3000);
    console.log('db connected')
  })
  .catch((err) => {console.log(err)});


// declare view engile
app.set('view engine', 'ejs');


// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/projects',projectRoutes);
app.use(authRoutes);
app.use(cookieParser());


// home page route
app.get('/', requireAuth, (req, res) => {
   res.redirect('/projects'); 
});

// about page route
app.get('/about', (req, res)=> {
  res.render('about');
});



// dummy cookie routes
// app.get('/set-cookies', (req, res)=>{
//   res.cookie('myLife', false);
//   res.cookie('isPlaying', true, {maxAge: 1000 * 60 * 60, httpOnly:true});
//   res.send('you get the cookie')
// })

// app.get('/read-cookies', (req, res)=>{
//   const cookies  = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// })


// 404 page route - middleware 
app.use((req, res)=>{
  res.render('404');
});