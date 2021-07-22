require('./db/connection');
const yargs = require('yargs');
const { addUser, addFilm, addWatch, listUser, listFilms, updateRating, updateUser, delInfo, delWatched} = require('./utils');
const command = process.argv[2];
const username = yargs.argv.user;
const password = yargs.argv.pass;
const title = yargs.argv.title;
const year = yargs.argv.year;
const description = yargs.argv.desc;
const category = yargs.argv.cat;
const rating = yargs.argv.rating;
const newUsername = yargs.argv.newuser;
const newPassword = yargs.argv.newpass;


const app = () => {
    if (command === 'add user') {
        addUser(username, password)
    } else if (command === 'add movie') {
        addFilm(title, year, description, category)
    } else if (command === 'add watched') {
        addWatch(username, password, title) 
    } else if (command === 'list user') {
        listUser(username) 
    } else if (command === 'list all') {
        listFilms()
    } else if (command === 'update rating') {
        updateRating(username, password, title, rating)
    }else if (command === 'update user') {
        updateUser(username, password, newPassword, newUsername)
    } else if ( command === 'delete user') {
        delInfo(username, password)
    } else if (command === 'delete watched') {
        delWatched(username, password, title)
    };

};

app();

