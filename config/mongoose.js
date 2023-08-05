/* ---------- IMPORTING PACKAGES ---------- */
const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1/omdbApi';
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