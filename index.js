const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')

// user sign up ( FE ) -> response -> ( BE ) request -> dapat data -> ( JSON )

app.use(bodyParser.json())

const name = 'Iskan'

app.get('/', (req, res) => {
    db.query("SELECT * FROM student", (err, result) => {
        console.log(result, 'dd')
        // console.log(err)
    })
    res.send('Hessllo', db)
})

app.get('/signin', (req, res) => {

    res.send('sign in successful')
})

app.post('/signup', (req, res) => {
    // console.log(req.body) undefined
    console.log( { requestFromOutside: req.body } ) // shows full request object
    res.send('sign up successful')
})

app.put('/replace', (req, res) => {
    res.send('put request successful', { requestFromOutside: req.body.password })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


