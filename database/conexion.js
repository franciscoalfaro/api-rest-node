const mongoose = require("mongoose");

const conexion = async()=>{

    try {

        await mongoose.connect("mongodb+srv://franciscoalfar:eEuRBTHQAVaLUrcX@cluster0.017jdov.mongodb.net/?retryWrites=true&w=majority");

        //paramtros dentro de obejeto en caso de problemas de conexion
        //use NewUrlParser:true
        //useUnifiedTopology:true
        //useCreateIndex:true

        console.log("conectado a la BD mi Blog"+mongoose)
        
    } catch (error) {
        console.log(error);
        throw new Error(" No se ha podido iniciar la conexion/.");
        
    }

}


module.exports ={
    conexion
}
