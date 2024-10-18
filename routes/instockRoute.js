require('dotenv/config');

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


router.get('/users/instock',async (req,res)=>{
    res.render('instock')
})

router.get('/users/avionics', async (req, res) => {
  try {
    // Execute both queries in parallel using Promise.all
    const [motorsResult, htservoResult] = await Promise.all([
      pool.query('SELECT * FROM motors'),
      pool.query('SELECT * FROM htservo')
    ]);

    const m_data = motorsResult.rows;
    const ht_data = htservoResult.rows;

    
    res.render('avionics', { m_data: m_data || [], ht_data: ht_data || [] });
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error querying database');
  }
});



router.get('/users/avionics',async (req,res)=>{


 

})


//motors
router.post('/users/motors',async (req,res) => {
    const motorData = await instockController.motors(req,res)
})
router.post('/users/htservo',async(req,res)=>{
  const htData = await instockController.htservo(req,res)
})

router.post('/users/plservo',async(req,res)=>{
  const htData = await instockController.plservo(req,res)
})

router.delete('/users/avionics/:motornumber',async (req,res)=>{
  let motornumber = [req.params.motornumber]

  console.log(typeof(motornumber))
  pool.query('delete from motors where motornumber=$1',[motornumber],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).send('error deleting motor')
    }
    else{
      res.redirect('/users/avionics')
    }
  })
})


//high torque servo



module.exports = router