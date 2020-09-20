const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
   
    Good: Number,
    Neutral: Number,
    Bad: Number,
    Total: Number,
    Average: Number,
    reset: Number
},
{ timestamps: true}
)

feedSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Feed', feedSchema)