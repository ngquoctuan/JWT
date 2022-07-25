const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
dotenv.config();

// CONNECT MONGO DATABASE
// mongoose.connect(process.env.MONGODB_URL, () => {
//     console.log('CONNECTED TO MONGODB');
// });
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/user", userRoute);

app.listen(8000, () => {
    console.log('Server is running...');
});