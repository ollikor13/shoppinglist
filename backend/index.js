const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/lists', (request, response) => {
  response.json(lists)
})

app.get('/api/lists/:id', (request, response) => {
  const id = request.params.id
  const list = lists.find(list => list.id === id)
  response.json(list)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})