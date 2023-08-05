/* ---------- IMPORTING PACKAGES ---------- */
const express = require('express');
const router = express.Router();
/* ---------- IMPORTING CONTROLLERS ---------- */
const userController = require('../controller/userController');




/** ---------- MAKING ROUTES ---------- **/
router.post('/create', userController.create);
router.post('/createSession', userController.createSession);
router.get('/destroySession', userController.destroySession);


/* ---------- EXPORTING ROUTER ---------- */
module.exports = router;