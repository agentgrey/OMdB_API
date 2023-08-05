/* ---------- IMPORTING PACKAGES ---------- */
const mongoose = require('mongoose');


/* Creating Private Playlist */
/* Private Playlist Schema consist of: movie id , User*/
const privatePlaylist = new mongoose.Schema({
    name: {
        type: String
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


/* ---------- EXPORTING MODULES ---------- */
const PrivatePlaylist = mongoose.model("PrivatePlaylist", privatePlaylist);
module.exports = PrivatePlaylist;