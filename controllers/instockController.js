require('dotenv').config();

const express = require('express')
const router = express.Router()
const { pool } = require('../dbConfig')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const alert = require('alert-node')
const jwt = require('jsonwebtoken')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))
router.use(express.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


const cookieParser = require('cookie-parser');
router.use(cookieParser())
const { cookie } = require('express/lib/response');


module.exports.motors = async (req,res) =>{
    console.log('Adding new motor')
    const {motornumber,company,kvrating,Modelnumber,namedon}= req.body
    console.log({motornumber,company,kvrating,Modelnumber,namedon})

    //converting the form-data into array
    const motorNumber = [motornumber]
    const Company = [company]
    const kvRating = [kvrating]
    const modelNumber = [Modelnumber]
    const namedOn = [namedon]

    try{
        pool.query(
            `SELECT * FROM motors WHERE motornumber=$1`,[motorNumber],
            (err,results)=>{
                if(err){
                    throw err
                }
                console.log(results.rows)
                if(results.rows.length>0) {
                   
                    return res.render('avionics', { "success_message": "email already registered!" })
                }else{
                    pool.query(
                        `INSERT INTO motors(motornumber,company,kvrating,Modelnumber,namedon) VALUES ($1,$2,$3,$4,$5) `,
                        [motorNumber,Company,kvRating,modelNumber,namedOn],
                        (err,results)=>{
                            if(err){
                                console.log(`Error while inserting new motor`)
                                alert('This motor already exists!')
                                res.render('avionics')
                                console.error(err)
                                
                            }else{
                            alert('Entered new motor successfully')
                            res.redirect('/users/avionics')}
                        }
                    )
                }
            }
        )
    }catch(err){
        console.log('Cannot add new motor!',err)
    }

}

module.exports.htservo= async(req,res)=>{

    
    console.log('Adding new high torque servo')
    const {htservonumber,htservocompany,htstatus,htmodel,htnamedon}= req.body
    console.log({htservonumber,htservocompany,htstatus,htmodel,htnamedon})

    const htservoNumber=[htservonumber]
    const htservoCompany=[htservocompany]
    const htStatus = [htstatus]
    const htModel = [htmodel]
    const htNamedon = [htnamedon]

    try{
    pool.query(`SELECT * FROM htservo WHERE htservonumber=$1`,[htservoNumber],
        (err,results)=>
    {
        if (err) {
            console.error("Error executing query:", query, err);
            throw err;
        }
        
        if(results.rows.length>0){
            alert('This servo already exists!')
            return res.render('avionics',{'success_message':'servo already exists'})
        }else{
            pool.query(`insert into htservo(htservonumber,htservocompany,htstatus,htmodel,htnamedon) values ($1,$2,$3,$4,$5)`,
                [htservoNumber,htservoCompany,htStatus,htModel,htNamedon],(err,results)=>{
                    if(err){
                        console.log(`Error while inserting new htservo`)
                        alert('This servo already exists!')
                        res.render('avionics')
                        console.error(err)
                        
                    }else{
                    alert('Entered new htservo successfully')
                    res.redirect('/users/avionics')}
                })
        }
    }

    )}
    catch(err){
        console.log('Cannot add new servo!',err)
    }

}

module.exports.plservo= async(req,res)=>{

    
    console.log('Adding new plastic servo')
    const {plservonumber,plservocompany,plstatus,plmodel,plnamedon}= req.body
    console.log({plservonumber,plservocompany,plstatus,plmodel,plnamedon})

    const plservoNumber=[plservonumber]
    const plservoCompany=[plservocompany]
    const plStatus = [plstatus]
    const plModel = [plmodel]
    const plNamedon = [plnamedon]

    try{
    pool.query(`SELECT * FROM plasticservo WHERE plservonumber=$1`,[plservoNumber],
        (err,results)=>
    {
        if (err) {
            console.error("Error executing query:", query, err);
            throw err;
        }
        
        if(results.rows.length>0){
            alert('This servo already exists!')
            return res.render('avionics',{'success_message':'servo already exists'})
        }else{
            pool.query(`insert into plasticservo(plservonumber,plservocompany,plstatus,plmodel,plnamedon) values ($1,$2,$3,$4,$5)`,
                [plservoNumber,plservoCompany,plStatus,plModel,plNamedon],(err,results)=>{
                    if(err){
                        console.log(`Error while inserting new plservo`)
                        alert('This servo already exists!')
                        res.render('avionics')
                        console.error(err)
                        
                    }else{
                    alert('Entered new plastic servo successfully')
                    res.redirect('/users/avionics')}
                })
        }
    }

    )}
    catch(err){
        console.log('Cannot add new plservo!',err)
    }

}