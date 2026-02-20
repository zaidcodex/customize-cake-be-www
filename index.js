const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const connectToMongo = require('./db')
connectToMongo()
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true
}));
app.use(express.json())
app.use(cors({ origin: true }))

// app.use('/api/sendmessage', require('./routes/twilio'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/category', require('./routes/category'))
app.use('/api/subcategory', require('./routes/subcat'))
app.use('/api/product', require('./routes/products'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

router.get("/", ()=>{
    console.log("app is running")
})