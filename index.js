import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import user from './routes/user.js';


const app = express();


app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}));
app.use(cors());

app.use('/user',user)

const CONNECTION_URL = "mongodb+srv://GOMOBIT:gomobit013@cluster0.z5wrob1.mongodb.net/?retryWrites=true&w=majority "
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useUnifiedTopology: true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));