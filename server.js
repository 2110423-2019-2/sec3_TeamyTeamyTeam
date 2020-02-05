const express = require('express')
const app = require("./server/app_server");
const app = express()



app.listen(9000, () => {
    console.log('Application is running on port 9000')
})