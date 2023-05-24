require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorMiddleware')
mongoose.set('strictQuery', true);
const connectDb = require('./db');


const app = express();
const port = 5000;

connectDb();

  //Middlewares
  app.use(express.json());
  app.use(express.urlencoded({extended: false}))
  app.use(cookieParser())
  app.use(bodyParser.json())
  
  app.use(
       cors({
              origin:["http://localhost:3000", "http://99Store.com"],
              Credentials: true,
       })
       );


//Routes
app.use('/api/users', userRoute)

app.get('/', (req, res) =>{
    res.send("Home Page");
})

//Error Handler
app.use(errorHandler);

app.listen(port,()=>
    console.log(`Server started on ${port}`)
)


