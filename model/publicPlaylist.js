/* ---------- IMPORTING PACKAGES ---------- */
const mongoose = require('mongoose');


/* Creating Public Playlist */
/* Public Playlist Schema consist of: movie id, User*/
const publicPlaylist = new mongoose.Schema({
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
const PublicPlaylist = mongoose.model("PublicPlaylist",publicPlaylist);
module.exports = PublicPlaylist;