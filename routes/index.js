const express = require("express");
const router = express.Router();

const userRoutes = require("./userroutes");
router.use('/user',userRoutes)
router.use('/rooms', require('./roomroutes'));
router.use('/classes', require('./classesroutes'));
router.use('/attendance', require('./attendanceroutes'));

module.exports =router