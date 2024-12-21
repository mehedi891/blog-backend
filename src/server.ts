import mongoose from "mongoose";
import app from "./app"
import config from "./app/config"

//db connection and server running function
const connectDbFnc = async () =>{
    try {
     await mongoose.connect(config.dbUrl as string)
     app.listen(config.port, () => {
        console.log(`server is runnin at http://localhost:${config.port}`)
      });
    } catch (error) {
        console.log(error)
    }
}

connectDbFnc().catch(err =>{console.log(err)});