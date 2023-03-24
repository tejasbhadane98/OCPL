const express = require("express");
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const app = express();

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}

app.use(express.json());



// Connection To The Databse
mongoose.connect(
    process.env.MONGO_URI
).then(() => console.log('Connected To the Database'));

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

const user = require("./routes/user")
app.use(user);

const task = require("./routes/task")
app.use(task)

const category = require("./routes/categories")
app.use(category)




app.listen(process.env.PORT || 8000, () => {
    console.log("Server running on port 8000");
});