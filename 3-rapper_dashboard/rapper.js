
const mods = '../../node_modules';
const mongoose = require(`${mods}/mongoose`);
const moment = require(`${mods}/moment`);

function invalidDate(date) {
    return moment(date).isValid()
}

function futureDate(date) {
    if(moment(date).isAfter(moment())){
        return false;
    } return true;
}

const dateCheckers = [
    {validator: invalidDate, message: 'Date format is invalid'},
    {validator: futureDate, message: 'Date must be in the past'}
];

module.exports = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Missed field: Name'],
        minlength: [3, 'Name must be 3 characters min.']
    },
    amtOfHits: {
        type: Number,
        required: [true, 'Missed field: Number of singles'],
        maxlength: [2, 'Number of singles takes 2 digits max.'],
    },
    topAlbum: {
        type: String,
        required: [true, 'Missed field: Top album'],
        minlength: [3, 'Top album must be 3 characters min.']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Missed field: Date released'],
        validate: dateCheckers
    },
    votes: {
        type: Number,
        required: [false]
    }
}, {timestamps: true});