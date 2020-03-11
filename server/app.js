require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.send("HELLO WORLD")
    //res.status(200).json({message: "HELLO WORLD"})
}) 

const KanbanRouter = require('./routes/kanbanRouter')
const UserRouter = require('./routes/userRouter')

app.use('/', KanbanRouter)
app.use('/user', UserRouter)

app.use(errorHandler)

app.listen(port, ()=>console.log(`listening on port ${port}`))