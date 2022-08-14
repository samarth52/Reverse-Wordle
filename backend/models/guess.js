/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const guessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  attempts: [mongoose.Schema.Types.Mixed],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

guessSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Guess', guessSchema)
