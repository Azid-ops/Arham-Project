const express = require('express');
const UserRouter = require('./Routes/UserRoutes');
const { default: mongoose } = require('mongoose');
require("dotenv").config();
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    Credentials: true,
}));

app.use('/user', UserRouter);

mongoose.connect("mongodb://localhost:27017/Practice");

app.listen(process.env.PORT, console.log("Server is Runing"));