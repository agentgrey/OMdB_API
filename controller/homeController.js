/* ---------- IMPORTING PACKAGES ---------- */
const axios = require('axios');
const PublicPlaylist = require('../model/publicPlaylist');
const User = require('../model/user');

const apiKey = '93059205';

/* ---------- EXPORTING FUNCTIONS ---------- */

/* Opens home page */
module.exports.home = async function(req, res) {
    try {
        let publicPlaylists = await PublicPlaylist.find();
        let moviesData = [];
        // Fetch movie details from OMDB API
        for (let i = 0; i < publicPlaylists.length; i++) {
            let user = await User.findById(publicPlaylists[i].user);
            let movieId = publicPlaylists[i].id; 
            let response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
            let movieDetails = response.data;

            if (movieDetails && movieDetails.Poster && movieDetails.Title) {
                moviesData.push({
                    id: movieId,
                    user: user.name,
                    poster: movieDetails.Poster,
                    title: movieDetails.Title
                });
            }
        }

        return res.render('home', {
            title: 'Home',
            user: res.locals.user,
            moviesData: moviesData
        });
    } catch (err) {
        console.log('Error in homeController/home', err);
        return res.redirect('back');
    }
}

/* Opens sign in page */
module.exports.signIn = async function(req, res) {
    try {
        return res.render('signIn', {
            title: 'Sign In'
        });
    } catch (err) {
        console.log('Error in homeController/signIn', err);
        return res.redirect('back');
    }
}

/* Opens sign up page */
module.exports.signUp = async function(req, res) {
    try {
        return res.render('signUp', {
            title: 'Sign Up'
        });
    } catch (err) {
        console.log('Error in homeController/signUp', err);
        return res.redirect('back');
    }
}
