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


app.get('/students', (req, res) => {
    const queryAllStudent = `SELECT * FROM student`
    db.query(queryAllStudent, (err, result) => {
        if (err) {
            console.error(`ERROR: ${err.message}`)
            return response(500, null, 'Server error', res, 'SERVER_ERROR')
        }
        response(200, result, 'message succcess all student', res)
    })
})

app.get('/students/:studentId', (req, res) => {
    const student_Id = req.params.studentId
    const queryNoKp = `SELECT no_kp FROM student WHERE student_id = ?`
    db.query(queryNoKp, [student_Id], (err, result) => {
        if (isNaN(student_Id)) {
            return response(400, null, 'Invalid student id', res, 'INVALID_STUDENT_ID')
        }
        if (err) {
            console.error(`ERROR: ${err.message}`)
            return response(500, null, 'Server error', res, 'SERVER_ERROR')
        }
        if (result.length === 0) {
            return response(404, result, 'Student not found', res, 'STUDENT_NOT_FOUND')
        }

        response(200, result, 'message ok', res)
    })
})


app.post('/students', (req, res) => {

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
        return response(400, null, 'Invalid input', res, 'REQUIRED_ERROR')
    }

    if(!validEmail(email)) {
        return response(400, null, 'Invalid email input', res, 'INVALID_EMAIL')
    }

    if(!validNoKp(no_kp)) {
        return response(400, null, 'Invalid No KP input', res, 'INVALID_NO_KP')
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
                if (err.code === 'ER_DUP_ENTRY') {
                    console.error(`ERROR: ${err.message}`)
                    return response(409, null, 'Unable, Please check your information.', res, 'DUPLICATE_STUDENT')
                }
                console.error(`ERROR: ${err.message}`)
                return response(500, null, `error `, res, 'SERVER_ERROR')
            }
        
        if (result.affectedRows !== 1) {
            console.error(`ERROR: ${err.message}`)
            return response(400, null, 'Student not created', res, 'STUDENT_NOT_CREATED')
        }
        
        const dataResult = {
            dataRows: result.affectedRows,
            dataId: result.insertId
        }
        return response(201, dataResult, 'created ok', res)
    })
})


app.get('/courses', (req, res) => {
    const queryAllCourse = `SELECT  * FROM courses`
    db.query(queryAllCourse, (err, result) => {
        if (err) {
            console.error(`ERROR: ${err.message}`)
            return response(500, null, 'Server error', res, 'SERVER_ERROR')
        }
        response(200, result, 'succcess all course', res)
    })
})

app.get('/courses/:courseCode', (req, res) => {
    const paramas_course_code = req.params.courseCode
    const queryCourseNo = `SELECT * FROM courses WHERE course_code = ?`
    db.query(queryCourseNo, [paramas_course_code], (err, result) => {
        if (err) {
            console.error(`ERROR: ${err.message}`)
            return response(500, null, 'Server error', res, 'SERVER_ERROR')
        }
        if (result.length === 0) {
            return response(404, result, 'Course not found', res, 'COURSE_NOT_FOUND')
        }
        response(200, result, 'succcess', res)
    })
})

// [studentId]	Ganti ? (placeholders)
// ? = Array
// Array	    Support multiple placeholders

app.get('/ndp/:matricNo', (req, res) => {
    const params_ndp = req.params.matricNo
    const queryNdp = `
        SELECT matric_no, student_name
        FROM student
        WHERE matric_no = ?`
        // ${ndp} -> ? placeholder

    db.query(queryNdp, [params_ndp], (err, result) => {
        if (err) {
            console.error(`ERROR: ${err.message}`)
            return response(500, null, 'Server error', res, 'SERVER_ERROR')
        }
        if (result.length === 0) {
            return response(404, result, 'Student not found', res, 'STUDENT_NOT_FOUND')
        }
        response(200, result, 'by ndp', res)
    })
})


// app.post('/students', (req, res) => {
//     response(200, 'DATA', 'success',  res)
// })

app.put('/students', (req, res) => {
       response(200, 'put', 'success',  res)

})

app.delete('/students', (req, res) => {
    response(200, 'delete', 'success',  res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


