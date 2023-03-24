const mongoose = require("mongoose");

const conexion = async()=>{

    try {

        await mongoose.connect(mongosh "mongodb://mongo:PfRhZWszXIujXj8EfO9W@containers-us-west-47.railway.app:7988");

        //paramtros dentro de obejeto en caso de problemas de conexion
        //use NewUrlParser:true
        //useUnifiedTopology:true
        //useCreateIndex:true

        console.log("conectado a la BD mi Blog")
        
    } catch (error) {
        console.log(error);
        throw new Error(" No se ha podido iniciar la conexion/.");
        
    }

}


module.exports ={
    conexion
}
