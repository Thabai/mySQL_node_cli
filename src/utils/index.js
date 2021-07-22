const sql = require('../db/connection');

exports.addUser = (username, password) => {
    try {
        const user = {
            username: username,
            pass: password
        }
        // insert into users set username = '', pass = ''
        sql.query("INSERT INTO users SET ?", user) 
    } catch (error) {
        console.log(error)
    }
};

exports.addFilm = (title, year, description, category) => {
    try {
        const film = [title, year, description, category]
        // insert into users set username = '', pass = ''
        sql.query("INSERT INTO films SET title = ?, year = ?, description = ?, category = (SELECT catID FROM categories WHERE category= ?)", film) 
    } catch (error) {
        console.log(error)
    }
};


exports.addWatch = (username, password, title) => {
    try {
        const watchedAdd = [title, username, password]
        sql.query("INSERT INTO watched SET watchedList = 'false', movieID = (SELECT movieID FROM films WHERE title = ?), userID = (SELECT id FROM users WHERE username = ? AND password = ?)", watchedAdd); 
        
    } catch (error) {
        console.log(error)
    }
};

exports.listUser = (username) => {
    try {
        sql.query("select watched.rating AS rating, films.title AS title FROM watched inner join films on films.movieID = watched.movieID AND userID = (SELECT id FROM users WHERE username = ?)", username, (err, results, fields) => {

 Object.keys(results).forEach((key) => {
               let output = results[key];
               console.log(`User has added ${output.title} to their watchlist and rated it ${output.rating}*`);
           });
        });
    } catch (error) {
        console.log(error)
    }
};

exports.listFilms = () => {
    try {
        sql.query("select watched.rating AS rating, films.title AS title FROM watched inner join films on films.movieID = watched.movieID", (err, results, fields) => {

 Object.keys(results).forEach((key) => {
               let output = results[key];
               console.log(`${output.title} has a user rating of ${output.rating}*`);
           });
        });
    } catch (error) {
        console.log(error)
    }
};

exports.updateRating = (username, password, title, rating) => {
    try {
        const watchedRating = [rating, title, username, password]
        sql.query("UPDATE watched SET rating = ?, watchedList = 'true' WHERE movieID = (SELECT movieID FROM films WHERE title = ?) AND userID = (SELECT id FROM users WHERE username = ? AND password = ?)", watchedRating); 
        
    } catch (error) {
        console.log(error)
    }
};


exports.delInfo = (username, password) => {
    try {
        const delUser = [username, password]
        sql.query("DELETE FROM users WHERE username = ? AND password = ?", delUser); 
        
    } catch (error) {
        console.log(error)
    }
};

exports.delWatched = (username, password, title) => {
    try {
        const delWatched = [title, username, password]
        sql.query("DELETE FROM watched WHERE movieID = (SELECT movieID FROM films WHERE title = ?) AND userID = (SELECT id FROM users WHERE username = ? AND password = ?)", delWatched); 
        
    } catch (error) {
        console.log(error)
    }
};
