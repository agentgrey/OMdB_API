/* ---------- IMPORTING PACKAGES ---------- */
const mongoose = require('mongoose');

// const DB = 'mongodb://127.0.0.1/omdbApi';
// Storing the DB on mongo atlas
const DB = "mongodb+srv://himadrinayak:12345@cluster0.h7n86ah.mongodb.net/omdb-api?retryWrites=true&w=majority";

const db = mongoose.connection; 


/* ---------- MAKING CONNECTION ---------- */
mongoose.connect(DB).then(() => {
    console.log('Connection Successful!');
}).catch((err) => {
    console.log('No Connection ', err);
})


/* ---------- CHECKING CONNECTION ---------- */
db.on('error', console.error.bind(console, "Error connecting to DB"));
db.once('open', function(){
    console.log("Sucessfully connected to the DB");
})


/* ---------- EXPORTING MODULES ---------- */
module.exports = db;