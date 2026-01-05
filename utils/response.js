const response = (statusCode, data, message, res) => {
    // func status ( http code ) dari express = Network -> Headers 
    res.status(statusCode).json({
        payload: data,
        message,
        metadata: {
            prev: "",
            next: "",
            current: ""
        },
    })
    // res.send(statusCode, message)
}


// res.json(statusCode, [ ... ])
// res.json() tak terima status code

// statusCode dianggap sebagai data

// HTTP response tetap 200 OK


// // Status code tak boleh kawal
// const response = (statusCode, data, message, res) => {
//     // func status ( http code ) dari express = Network -> Headers 
//     res.json([
//         {
//             payload: {
//                 // statusCodes: statusCode,
//                 data,
//                 message,
//             },
//             metadata: {
//                 prev: "",
//                 next: "",
//                 current: ""
//             },
//         }
//     ])
//     // res.send(statusCode, message)
// }




// const response = (message, statusCode, res) => {
//     res.json(message, [
//         {
//         statusCode: statusCode,
//         }
//     ]
//     )
// }

module.exports = response