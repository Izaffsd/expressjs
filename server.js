const express = require('express')
const app = express()
const port = 3000
const db = require('./connection')
const response = require('./utils/response')
const { validNoKp, validEmail} = require('./utils/validator')

app.use(express.json()) // better than body-parser

app.get('/', (req, res) => {
    response(200, 'ini data', 'message success', res)
    // res.status(200)
})

// app.get('/student/:name', (req, res) => {
//     const studentName = req.params.name
//     res.send( `Welcome ${studentName} !`)
// })


app.get('/student', (req, res) => {
    const allStudents = `SELECT * FROM student`
    db.query(allStudents, (err, result) => {
        if (err) {
            return response(500, null, err.message, res)
        }
        response(200, result, 'succcess all student', res)
    })
})

app.get('/student/:studentId', (req, res) => {
    const student_Id = req.params.studentId
    const byNoKp = `SELECT no_kp FROM student WHERE student_id = ?`
    db.query(byNoKp, [student_Id], (err, result) => {
        if (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        })
}
        response(200, result, 'success', res)
    })
})


app.post('/api/student', (req, res) => {

    // conton FE convert data form → JSON
    // FE = Client → HTTP → BE = Server
    // Baris ni ambil data dari FE
     const {
        matric_no,
        no_kp,
        email,
        student_name,
        address,
        gender,
        course_id
    } = req.body
    console.log('body', req.body)

    if (!matric_no || !email || !student_name || !course_id || !no_kp) {
        return response(400, null, 'matric_no, no_kp, email, student_name, and course_id are required', res)
    }

    if(!validEmail(email)) {
        return response(400, null, 'Invalid email format', res)
    }

    if(!validNoKp(no_kp)) {
        return response(400, null, 'Invalid IC number format', res)
    }

    const insertStudent = `
    INSERT INTO student (matric_no, no_kp, email, student_name, address, gender, course_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`

    const values = [
        matric_no,
        no_kp,
        email,
        student_name,
        address || null,
        gender || null,
        course_id || null
    ]
    
    db.query(insertStudent, values,
        (err, result) => {
            if (err) {
                console.error(err)
                if (err.code === 'ER_DUP_ENTRY') {
                    return response(409, null, 'Registration failed', res
                )}
                return response(500, null, `DB Err${err.message}`, res)
            }
        
        if (result.affectedRows !== 1) {
            return response(400, null, 'Student not created', res)
        }
        
        const dataResult = {
            dataRows: result.affectedRows,
            dataId: result.insertId
        }
        return response(201, dataResult, 'created ok', res)
    })
})


app.get('/course', (req, res) => {
    const allCourse = `SELECT  * FROM courses`
    db.query(allCourse, (err, result) => {
        if (err) {
            return response(500, null, err.message, res)
        }
        response(200, result, 'succcess all course', res)
    })
})

app.get('/courses/:courseNo', (req, res) => {
    const course_no = req.params.courseNo
    const byCourseNo = `SELECT * FROM courses WHERE course_no = ?`
    db.query(byCourseNo, [course_no], (err, result) => {
        if (err) {
            return response(500, null, err.message, res)
        }
        response(200, result, 'succcess', res)
    })
})

// [studentId]	Ganti ? (placeholders)
// ? = Array
// Array	    Support multiple placeholders

app.get('/ndp/:valndp', (req, res) => {
    const ndp = req.params.valndp
    const byNdp = `
        SELECT matric_no, student_name
        FROM student
        WHERE matric_no = ?`
        // ${ndp} -> ? placeholder

    db.query(byNdp, [ndp], (err, result) => {
        if (err) {
            return response(500, null, err.message, res)
        }
        response(200, result, 'by ndp', res)
    })
})


app.post('/student', (req, res) => {
    response(200, 'DATA', 'success',  res)
})

app.put('/student', (req, res) => {
       response(200, 'put', 'success',  res)

})

app.delete('/student', (req, res) => {
    response(200, 'delete', 'success',  res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


