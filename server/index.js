const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require ('mysql');
const userRoutes = require('./routes/userRoutes')

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)

    // connection.query('SELECT * FROM wisdomwater_history.t_data_resident_history_detail_2022', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log(results);
    // }
    // )
    // connection.end()
    



mongoose.connect(/*process.env.MONGO_URL*/'mongodb+srv://doadmin:41756g8iGP03AuVd@myMongo-44ee61fc.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=myMongo', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => {console.log("Db connection Successful")
})
.catch((err) =>{console.log(err.message);
});

const server=app.listen(process.env.PORT,()=>{console.log('listening on port '+process.env.PORT)})