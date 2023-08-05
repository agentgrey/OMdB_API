/* ---------- IMPORTING PACKAGES ---------- */
const express = require('express');
const router = express.Router();
/* ---------- IMPORTING CONTROLLERS ---------- */
const playlistController = require('../controller/playlistController');




/** ---------- MAKING ROUTES ---------- **/
router.get('/:id/private', playlistController.showPrivatePlaylist);
router.get('/private/add/:id', playlistController.addToPrivate);
router.get('/private/remove/', playlistController.removePrivate);
router.post('/private/rename', playlistController.privateRename);

router.get('/:id/public', playlistController.showPublicPlaylist);
router.get('/public/add/:id', playlistController.addToPublic);
router.get('/public/remove/', playlistController.removePublic);
router.post('/public/rename', playlistController.publicRename);


/* ---------- EXPORTING ROUTER ---------- */
module.exports = router;