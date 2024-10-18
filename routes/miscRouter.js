const express = require('express')
const router = express.Router()
const instockController = require('../controllers/instockController')
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const {pool} = require('../dbConfig')
const methodOverride = require('method-override')
router.use(methodOverride('_method'))
router.use(express.urlencoded({ extended: true }));



// router.get('/users/profile',(req,res)=>{
//     res.render('profile')

//     let email = [req.params.email]
//     const query = 'SELECT * FROM users where email=$1';
//     pool.query(query,[email], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error querying database');
//     } else {
//       const emailData = result.rows; 
//       if (!emailData || emailData.length === 0) {
//         res.render('avionics', { emailData: [] }); 
//       } else {
//         res.render('avionics', { emailData: emailData });
//       }
//     }
//   });
// })



module.exports = router