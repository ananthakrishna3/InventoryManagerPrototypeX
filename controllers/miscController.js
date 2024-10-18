const express = require('express')
const router = express.Router()
const methodOverride= require('method-override')




router.use(methodOverride('_method'))