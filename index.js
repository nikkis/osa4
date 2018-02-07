const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.logger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.error)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*
app.get('/test', (request, response) => {
  response.send('moi')
})


app.get('/info', (request, response) => {
  Person
    .find({})
    .then(result => {
      const text = `puhelinluettelossa ${result.length} henkilön tiedot<br/>${new Date()}`
      response.send(text)
    })
    .catch(error => {
      console.log('ei onnannu')
      console.log(error)
      response.status(400).send({ error: 'ei onnaa' })
    })

})
*/







