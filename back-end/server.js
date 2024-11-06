const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())

const FILE_NAME = path.join(__dirname , 'product.json') 
const PORT = 3000

app.get('/get-products', (req, res) => {
    fs.readFile(FILE_NAME, (err , data) => {
        if (err){
            res.status(500).json({ error: 'this is an error' })
            return
        }
        res.json(JSON.parse(data))
    })
});









app.listen(PORT,  () => {
    console.log(`its lestning to the http://localhost:${PORT}`)
})
