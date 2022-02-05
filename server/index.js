const express = require('express')
const app = express()
const port = 3001

app.get('/test', (req, res) => res.send('hello world'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))