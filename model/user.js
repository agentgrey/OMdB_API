/* ---------- IMPORTING PACKAGES ---------- */
const mongoose = require('mongoose');


/* Creating User Schema */
/* User Schema consist of: name, email, password, private playlist, public playlist */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


/* ---------- EXPORTING MODEL ---------- */
const User = mongoose.model("User", userSchema);
module.exports = User;