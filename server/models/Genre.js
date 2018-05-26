const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const genreSchema = mongoose.Schema({
  genre: {
    type: String,
    maxlength: 30,
    unique: true
  }
})

genreSchema.plugin(findOrCreate);
const Genre = mongoose.model('Genre', genreSchema);

module.exports = { Genre }
