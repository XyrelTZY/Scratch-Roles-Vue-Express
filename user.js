// const db = require('../config/db');

// const User = 
// {
//     findByUsername: (username, callback) =>
//     {
//         //The login will base on user that will direct according to their roles
//         db.query('SELECT * FROM users WHERE username = ?', [username], callback);
//     },

// };

// module.exports = User;

const db = require('../config/db'); // Adjust the path as necessary

class User {
    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ?';
            db.query(query, [username], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static insert(username, password) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(query, [username, password], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}

module.exports = User;
