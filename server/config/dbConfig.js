
import {config} from "dotenv"
config({
    path:"./.env"
});

import {connect} from "mongoose";

const connectDB=()=>{
    if (!process.env.MONGO_URI) {
        console.error(" MONGO_URI is missing");
        process.exit(1); 
    }
    connect(process.env.MONGO_URI, {dbName:"chatApp6PP"})
    .then((data)=>console.log(`connected to DB:${data.connection.host}`))
    .catch((err)=>{
        throw err;
    })
}


export {connectDB}
