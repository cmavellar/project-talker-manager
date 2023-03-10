const crypto = require('crypto');

function randomToken() {
    return crypto.randomBytes(8).toString('hex');
}

module.exports = {
    randomToken,
};

// ReferĂȘncia: https://futurestud.io/tutorials/generate-a-random-string-in-node-js-or-javascript