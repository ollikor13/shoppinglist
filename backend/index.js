const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json()) 
const List = require('./models/list')

const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Nothing here!</h1>')
})

app.get('/api/lists', (request, response) => {
  console.log("Kaikki haettiin")
  response.header('Access-Control-Allow-Origin', '*')
  List.find({}).then(lists => {
    response.json(lists)
  })
})

app.get('/api/lists/:code', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  List.findById(request.params.code)
    .then(list => {
      if (list) {
        response.json(list.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/lists/:code', (request, response) => {
  List.findByIdAndRemove(request.params.code)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    // eslint-disable-next-line no-undef
    .catch(error => next(error))
})

app.post('/api/lists', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  const body = request.body


  const list = new List({
    content: body.content,
    code: body.code
  })

  console.log('Attempting to post: ', list)
    list
      .save()
      .then(savedList => {
        response.json(savedList.toJSON())
      })

})

app.put('/api/lists/:code', async (request, response, next) => {
  const body = request.body


  List.findOneAndUpdate({code: request.params.code}, {$set:{content: body}}, {new: true, upsert: true}, (err, doc) => {
    if(err) {
      console.log("Jotai meni pielee")
    }
    console.log(doc)
  });

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.use(unknownEndpoint)