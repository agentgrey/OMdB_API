/* ---------- IMPORTING PACKAGES ---------- */
const User = require('../model/user');


/* ---------- EXPORTING FUNCTIONS ---------- */

/* Create a new User */
module.exports.create = async function(req, res) {
    try {
        // if password does not match
        if(req.body.password!=req.body.confirmPassword) {
            console.log("Password mismatch!");
            return res.redirect('back');
        }
        let user = await User.findOne({email : req.body.email});
        // if user is not present
        if(!user) {
            await User.create(req.body);
            return res.redirect('/signIn');
        }
        // user already present
        console.log('User Exists!');
        return res.redirect('back');
    } catch (err) {
        console.log('Error in userController/create ', err);
        return res.redirect('back');
    }
}

/* Crete a user Session */
module.exports.createSession = async function(req, res) {
    try {
        let user = await User.findOne({email: req.body.email});
        // if password does not match
        if(user.password !== req.body.password) {
            console.log('Wrong password');
            return res.redirect('back');
        }
        // logs in and goes to home page
        req.session.user = {
            name: user.name,
            email: user.email
        };
        return res.redirect('/');
    } catch (err) {
        console.log('Error in userController/createSession ', err);
        return res.redirect('back');
    }
}

/* Delete a user Session */
module.exports.destroySession = async function(req, res, done) {
    req.session.destroy(function(err) {
        if (err) {
        console.error('Error destroying session:', err);
        }
    });
    return res.redirect('/signIn')
}