require('dotenv/config');
const express = require('express')
const router = express.Router()
const {pool} = require('../dbConfig')
const redis = require('redis')
const client = redis.createClient()
const bodyParser = require('body-parser')
const loginController = require('../controllers/loginController')
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())
const session = require('express-session');
const { ClientBase } = require('pg');
router.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { cookie } = require('express/lib/response');



const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken; 
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, 'sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh', (err, email) => {
      if (err) return res.sendStatus(403); 
      req.email = email;
      next(); 
    });
    
  };

router.get('/users/login',(req,res)=>{
    res.render('login')
})

router.post('/users/checkmember',async (req,res)=>{
    const {email,pass} = req.body
    const loginDATA = await loginController.loginCheck(req,res)
    
}

    
)


//loggin' out
router.get('/users/logout',async (req,res)=>{

    const logOut = await loginController.logout(req,res)
    
})








module.exports = router