const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    fileUrl: {
        type: String,
        required: true
    }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;