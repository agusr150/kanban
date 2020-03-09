require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send("HELLO WORLD")
    //res.status(200).json({message: "HELLO WORLD"})
}) 

app.listen(port, ()=>console.log(`listening on port ${port}`))