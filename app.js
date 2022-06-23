const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// to use all the methods from express
const app = express();

//set templating engine as ejs
app.set('view engine','ejs');

//serving static files
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());

//database url
const databaseUrl = 'mongodb+srv://Ingrid:12345@cluster0.da12qgo.mongodb.net/?retryWrites=true&w=majority';

//connect application with the database
mongoose.connect(databaseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Mongo DB Connected"))
.catch(err => console.error(err));

//create a server
app.listen(3000, ()=>{
    console.log('server listening on port 3000');
})

//import Diary Model 
const diary = require('./models/Diary');

//ROUTING

//route for /
app.get('/',(req,res)=>{
    res.render('Home');
})


//route for diary page
app.get('/diary',(req,res)=>{
    diary.find().then(data =>{
        res.render('Diary',{data:data});
    }).catch(err => console.error(err))
    
})

//route for adding records
app.get('/add',(req,res)=>{

    res.render('Add');
})

//route for saving data
app.post('/add-to-diary',(req,res)=>{
    //save data on the database
    const data = new diary({
        title: req.body.title,
        description:req.body.description,
        date:req.body.date
    })

    data.save().then(()=>{
        res.redirect('/diary');
    }).catch(err => console.log(err));
});
