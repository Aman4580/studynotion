const mongoose = require('mongoose');

require('dotenv').config();


const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => {
        console.log(" Database Connection successful");
    })
    .catch((error) => {
        console.log("Received an error:", error.message);
        process.exit(1);
    });
}

module.exports = dbConnect;