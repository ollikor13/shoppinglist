/* eslint-disable no-undef */
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to url')

mongoose
  .connect(url, { useNewUrlParser: true })
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const listSchema = new mongoose.Schema({
  content: { type: Array, required: true},
  code: { type: String, required: true}
})

listSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('List', listSchema)