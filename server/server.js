const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);
//
const { User } = require('./models/user');
const { UserGearItem } = require('./models/UserGearItem');
const { MasterGearItem } = require('./models/MasterGearItem');
const { Genre } = require('./models/Genre');

const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// app.use(express.static('client/build'))

 // GET //

app.get('/api/auth', auth,(req,res)=>{
  res.json({
    isAuth: true,
    id:req.user._id,
    email:req.user.email,
    firstName: req.user.firstName,
    lastName:req.user.lastName
  })
})

app.get('/api/logout',auth,(req,res)=>{
  req.user.deleteToken(req.token,(err,user)=>{
    if(err) return res.status(400).send(err);
    res.sendStatus(200);
  })
})

app.get('/api/usergearitem',(req,res)=>{
  let id = req.query.id;

  UserGearItem.findById(id,(err, doc)=> {
    if(err) return res.status(400).send(err);
    res.send(doc);
  })
})

app.get('/api/gearlist',(req,res)=>{
  // localhost:3001/api/gearList?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  UserGearItem.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=> {
    if(err) return res.status(400).send(err);
    res.send(doc);
  })
})

app.get('/api/users',(req,res)=>{
  User.find({},(err, users)=>{
    if(err) return res.status(400).send(err);
    res.status(200).send(users)
  })
})

// // POST //

app.post('/api/usergearitem',(req, res)=> {
  MasterGearItem.findOrCreate({
    category: req.body.category,
    specificType: req.body.specificType,
    make: req.body.make,
    model: req.body.model
  },(err, result)=>{
    if(err) throw err;
  });
  const gearItem = new UserGearItem(req.body);

  gearItem.save((err, item)=>{
    if(err) return res.status(400).send(err);
    User.findByIdAndUpdate(req.body.ownerId,
      {$push: {"gearList": item._id}},
      {new: true},
      (err,user) => {
        if(err) return res.status(400).send(err);
        console.log(user.gearList);
    })
    res.status(200).json({
      post: true,
      gearItem: item
    })
  })
})

app.post('/api/mastergearitem',(req,res)=> {
  const gearItem = new MasterGearItem(req.body);

  gearItem.save((err,item)=>{
    if(err) {
      return res.json({success: false})
    };
    res.status(200).json({
      success: true,
      user: item
    })
  })
})

app.post('/api/register',(req,res)=> {
  const user = new User(req.body);
  user.save((err,doc)=>{
    if(err) {
      return res.json({success: false, msg: err.errmsg})
    };
    user.genres.forEach(genre =>{
      Genre.findOrCreate({
        genre: genre.toLowerCase()
      },(err, result)=>{
        if(err) throw err;
      })
    })
    res.status(200).json({
      success: true,
      user: doc
    })
  })
})

app.post('/api/genre',(req,res)=>{
  const genre = new Genre(req.body);
  genre.save((err,doc)=>{
    if(err){
      return res.json({success: false})
    };
    res.status(200).json({
      success: true,
      user: doc
    })
  })
})

app.post('/api/login',(req,res)=> {
  User.findOne({'email': req.body.email})
    .populate('gearList')
    .exec((err,user)=>{
    if(!user) return res.json({isAuth:false, message: 'Auth failed - email not found'});

    console.log(user);
    user.comparePassword(req.body.password,(err, isMatch)=>{
      if(!isMatch) return res.json({
        isAuth: false,
        message: 'Wrong password'
      });
      user.generateToken((err,user)=> {
        if(err) return res.status(400).send(err);
        res.cookie('auth',user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email,
          gearList: user.gearList
        })
      })
    })
  })
})

// UPDATE //

app.post('/api/usergearitem',(req,res)=> {
  UserGearItem.findByIdAndUpdate(req.body._id, req.body, {new: true},(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
})

app.post('/api/update_user',(req,res)=> {
  User.findByIdAndUpdate(req.body._id, req.body, {new: true},(err,doc)=>{
    if(err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    })
  })
})

// DELETE //

app.delete('/api/update_usergearitem',(req,res)=>{
  let id = req.query.id;
  console.log(id);
  UserGearItem.findOne({_id: id},(err,item)=>{
    if(err) return res.status(400).send(err);
    User.findByIdAndUpdate(item.ownerId,
      {$pull: {gearList: id}}, {new: true}, (err, user)=>{
        if(err) return res.status(400).send(err);
        item.remove();
        res.json(true);
      })
  })
})

// PRODUCTOIN BUILD SET UP
if(process.env.NODE_ENV === 'production'){
  const path = require('path');
  app.get('/*',(req,res)=>{
    res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
  })
}

const port = process.env.PORT || 3001;
app.listen(port,()=> {
  console.log(`SERVER RUNNING ON PORT ${port}`);
})
