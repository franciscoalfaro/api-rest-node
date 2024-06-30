const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', false)

const conexion = async()=>{

    try {
        //conexion mediante url a la BD mongo

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("conectado a la BD mi Blog")
        
    } catch (error) {
        console.log(error);
        throw new Error(" No se ha podido iniciar la conexion/.");
        
    }

}


module.exports ={
    conexion
}
