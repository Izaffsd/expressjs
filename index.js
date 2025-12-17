const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// user sign up ( FE ) -> response -> ( BE ) request -> dapat data -> ( JSON )

app.use(bodyParser.json())

const name = 'Iskan'

app.get('/', (req, res) => {
    res.send('Hessllo')
})

app.get('/signin', (req, res) => {

    res.send('sign in successful')
})

app.post('/signup', (req, res) => {
    // console.log(req.body) undefined
    console.log( { requestFromOutside: req } ) // shows full request object
    res.send('sign up successful')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


