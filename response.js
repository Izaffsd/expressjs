const response = (statusCode, data, message, res) => {
    // func status ( http code ) dari express = Network -> Headers 
    res.status(statusCode).json({
        payload: {
            statusCodes: statusCode,
            datas: data,
        },
        message: message,
        pagination: {
            prev: "",
            next: "",
            total: ""
        },
    })
    // res.send(statusCode, message)
}

// const response = (message, statusCode, res) => {
//     res.json(message, [
//         {
//         statusCode: statusCode,
//         }
//     ]
//     )
// }

module.exports = response