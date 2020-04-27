const app = require('./server/app_server')

app.listen(process.env.PORT || 9000, () => {
    console.log('Application is running on port 9000')
})