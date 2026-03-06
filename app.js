const dotenv = require('dotenv').config()
const express = require('express')
const path = require('path')
const dbcon = require('./app/config/dbcon')
const cors = require('cors')



const app = express()
dbcon()

const allowedOrigins = [
  "https://react-assignment-3-student-manageme.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

app.use(express.json())
app.use(express.static('public'))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:true}))

const StudentRoute = require("./app/routes/studentRouter")
app.use("/api",StudentRoute)

const port = 3025

app.listen(port, () => {
    console.log(`Server running successfully at ${port}`)
})