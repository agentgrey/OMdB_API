/* ---------- IMPORTING PACKAGES ---------- */
const express = require('express');
const router = express.Router();
/* ---------- IMPORTING CONTROLLERS ---------- */
const homeController = require('../controller/homeController');



/** ---------- MAKING ROUTES ---------- **/
router.get('/', homeController.home);
router.get('/signIn', homeController.signIn);
router.get('/signUp', homeController.signUp);

router.use('/users', require('./user'));
router.use('/playlist', require('./playlist'));


/* ---------- EXPORTING ROUTER ---------- */
module.exports = router;