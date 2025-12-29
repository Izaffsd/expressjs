const express = require('express')
const app = express()
const port = 3000
const db = require('./connection')
const response = require('./response')



app.get('/', (req, res) => {
    res.send( `main landing page !`)
})

// app.get('/student/:name', (req, res) => {
//     const studentName = req.params.name
//     res.send( `Welcome ${studentName} !`)
// })

const allQuery = "SELECT * FROM student"

app.get('/student', (req, res) => {
    db.query(allQuery, (err, result) => {
        console.log('result', result)
        response(200, result, 'message succcess', res)
    })
})

app.get('/student/:studentId', (req, res) => {
    const studentId = req.params.studentId
    const nokpQuery = `SELECT no_kp FROM student WHERE student_id = ?`
    db.query(nokpQuery, [studentId], (err, result) => {
        response(200, result, 'success', res)
    })
})

app.post('/student', (req, res) => {
    response('success', 200, res)
})

app.put('/student', (req, res) => {
    response('updated', 200, res)
})

app.delete('/student', (req, res) => {
    response('deleted', 200, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


