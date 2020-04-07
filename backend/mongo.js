/* eslint-disable no-undef */
const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://OlliFullstack:${password}@cluster0-df9ln.mongodb.net/lists?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const listSchema = new mongoose.Schema({
  content: { type: Array, required: true},
  id: { type: String, required: true}
})