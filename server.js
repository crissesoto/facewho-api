const express =  require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// require controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "public"));
app.use(cors());

// connection DB
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'crissesoto',
      password : '',
      database : 'smartBrain'
    }
  });


// Home endpoint
app.get("/", (req, res) => { res.send("Succesfully working")});
//  Signin endpoint
app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
// Register endpoint
app.post("/register", (req, res) => {register.handleRegister(req, res, bcrypt, db)});
// Profile endpoint
app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res, db)});
// image endpoint
app.put("/image", (req, res) => {image.handleImage(req, res, db)});
// imageURL API endpoint
app.post("/imageUrl", (req, res) => {image.handleApiCall(req, res)});



// port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Server started at port: ${PORT}`)
})