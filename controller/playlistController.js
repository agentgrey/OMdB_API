/* ---------- IMPORTING PACKAGES ---------- */
const axios = require('axios');
const User = require('../model/user');
const PrivatePlaylist = require('../model/privatePlaylist');
const PublicPlaylist = require('../model/publicPlaylist');

const apiKey = '93059205';

/* ---------- EXPORTING FUNCTIONS ---------- */

/* Show PRIVATE Playlist*/
module.exports.showPrivatePlaylist = async function(req, res) {
    try {
        let user = await User.findOne({email : res.locals.user.email});
        let movies = await PrivatePlaylist.find({user : user});

        let list = [];
        // Fetch movie details from OMDB API 
        for (let i = 0; i < movies.length; i++) {
            let movieId = movies[i].id; 
            let response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
            let movieDetails = response.data;

            if (movieDetails && movieDetails.Poster && movieDetails.Title) {
                list.push({
                    poster: movieDetails.Poster,
                    title: movieDetails.Title
                });
            }
        }

        return res.render('privatePlaylist', {
            title: 'Private Playlist',
            movieList: list
        })
    } catch (err) {
        console.log('Error in playlistController/private ', err);
        return;
    }
}

/* Show PUBLIC Playlist*/
module.exports.showPublicPlaylist = async function(req, res) {
    try {
        let user = await User.findOne({email : res.locals.user.email});
        let movies = await PublicPlaylist.find({user : user});

        let list = [];
        // Fetch movie details from OMDB API
        for (let i = 0; i < movies.length; i++) {
            let movieId = movies[i].id; 
            let response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
            let movieDetails = response.data;
            
            if (movieDetails && movieDetails.Poster && movieDetails.Title) {
                list.push({
                    poster: movieDetails.Poster,
                    title: movieDetails.Title
                });
            }
        }

        return res.render('publicPlaylist', {
            title: 'Public Playlist',
            movieList: list
        })
    } catch (err) {
        console.log('Error in playlistController/public ', err);
        return;
    }
}

/* Add Movie to PRIVATE Playlist */
module.exports.addToPrivate = async function(req, res) {
    try {
        console.log(req.params);

        const privatePlaylist = await PrivatePlaylist.findOne({id: req.params.id});
        if(!privatePlaylist) {
            await PrivatePlaylist.create({
                id: req.params.id,
                user: await User.findOne({email : res.locals.user.email})
            })
            return res.redirect('back');
        } else {
            console.log('Already Present');
            return;
        }
    } catch (err) {
        console.log('Error in playlistController/addToPrivate ', err);
        return ;
    }
}

/* Add Movie to PUBLIC Playlist */
module.exports.addToPublic = async function(req, res) {
    try {
        console.log(req.params);

        const publicPlaylist = await PublicPlaylist.findOne({id: req.params.id});
        if(!publicPlaylist) {
            await PublicPlaylist.create({
                id: req.params.id,
                user: await User.findOne({email : res.locals.user.email})
            })
            return res.redirect('back');
        } else {
            console.log('Already Present');
            return;
        }
    } catch (err) {
        console.log('Error in playlistController/addToPublic ', err);
        return ;
    }
}

/* Remove movie from PRIVATE Playlist*/
module.exports.removePrivate = async function(req, res) {
    try {
        let user = await User.findOne({email : res.locals.user.email});
        if(user) {
            await PrivatePlaylist.deleteOne({user: user}, {id: req.params.id});
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in playlistController/removePrivate ', err);
        return;
    }
}

/* Remove movie from PUBLIC Playlist*/
module.exports.removePublic = async function(req, res) {
    try {
        let user = await User.findOne({email : res.locals.user.email});
        if(user) {
            await PublicPlaylist.deleteOne({user: user}, {id: req.params.id});
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in playlistController/removePublic', err);
        return;
    }
}