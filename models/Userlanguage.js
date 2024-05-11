const mongoose = require('mongoose');

const userLanguageSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    language: { type: String, default: 'en' }
});

const UserLanguage = mongoose.model('Userlanguage', userLanguageSchema);

module.exports = UserLanguage;