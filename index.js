const express = require("express")
const { connection } = require("./controllers/connection")
const {JobRouter}=require("./routes/job.route")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())
app.use("/",JobRouter);

app.listen(8012 , async () => {
    try {
        await connection
        console.log("connected")
    } catch (error) {
        console.log(error)
    }   
    console.log("connected to db")
})



