const express = require('express') // function
const app = express()
const port = 3000
const bodyParser = require('body-parser') // Middleware = function yang duduk di tengah-tengah request & response
// app.use(express.json());
const db = require('./connection')
const response = require('./utils/response')

// user sign up ( FE ) -> response -> ( BE ) request -> dapat data -> ( JSON )
// Middleware to read JSON / req.body
app.use(bodyParser.json())

const allQuery = "SELECT * FROM student"

app.get('/', (req, res) => {
    // db.query(allQuery, (err, result) => {
    //     console.log('result', result)
    //     response(200, result, 'message succcess', res)
    // })
        res.send(404)
})

app.get('/signin', (req, res) => {
    
console.log('params:', req.params);
console.log('query:', req.query);
console.log('body:', req.body);
console.log('headers:', req.headers);
console.log('method:', req.method);
console.log('url:', req.originalUrl);
// yang penting in req

// req.params	Identiti spesifik	/matric/CS10123
// req.query	Filter / optional	/matric?course=SE
// req.body	    Data besar / POST	JSON dari form

    res.send(404)
})

app.get('/matric/:matric_no', (req, res) => {
                // : = variable
    const matricNo = req.params.matric_no // params datangS dari url
    const sql = 'SELECT no_kp FROM student WHERE matric_no = ?' // auto data = string / number
    // Sentiasa guna ? placeholder untuk elak SQL Injection dan string
    
  db.query(sql, [matricNo], (err, result) => {
    if (err) {
      return response(500, 'result = null', `error 500 =${err.message}`, res)
    }

    response(200, result, req.headers, res)
    console.log('test', req.headers)
  })
})

app.get('/students/:id', (req, res) => {
    const studentId = req.params.id
    res.send(`this is ${studentId}`, res)
})

// app.get('/matric', (req, res) => {
//   const matricNo = req.query.matric_no // /matric?matric_no=CS10123
//   const sql = `SELECT no_kp FROM student WHERE matric_no = '${matricNo}'` //  ${matricNo} = number = SQL syntax
// // Sentiasa guna ? placeholder untuk elak SQL Injection dan string

//   db.query(sql, (err, result) => {
//     if (err) {
//       return response(500, null, err.message, res);
//     }

//     response(200, result, 'message success', res);
//   })
// })


app.post('/signup/:student_id', (req, res) => {
    // console.log(req.body) undefined
    const studentId = req.params.student_id
    console.log( { requestFromOutside: req.body } ) // shows full request object
    res.send(`sign up successful hi ${studentId} !`)
})

app.delete('/replace/:id', (req, res) => {
    const studentId = req.params.id

    res.send('put request successful '+ studentId + { requestFromOutside: req.body.password })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


