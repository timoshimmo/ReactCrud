const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB: process.env.MONGOLAB_URI
}
