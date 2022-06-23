const mongoose = require('mongoose');

//create the schema
const diarySchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Diary',diarySchema);