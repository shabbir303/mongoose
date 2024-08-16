const express = require('express');
const applyMiddleware = require('./middleware/applyMiddleware');
const connectDB = require('./db/connectDB');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

applyMiddleware(app);


app.get("/health", (req, res) => {
    
    res.send("Server is running!");
    
})



// app.all("*") kono route e match na korle star e ese hit korbe

app.all("*", (req,res, next)=>{
    const error = new Error (`The request url is invalid: [${req.url}]`);
    error.status = 404;
    next(error);
})

app.use ( (err, req, res, next) => {
    // console.log("form line 24");
    res.status(err.status || 500).json({
        message:err.message
    })
})






const main = async()=>{
    await connectDB();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
main();
