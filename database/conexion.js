const mongoose = require('mongoose')
require('dotenv').config();

const conexion = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,)
        console.log("Connection success BD")
        
    } catch (error) {
        console.log(error);
        console.log('Intentando nuevamente la conexión en 2 segundos...');
        setTimeout(conexion, 2000);
        
    }
}



module.exports ={
    conexion
}
