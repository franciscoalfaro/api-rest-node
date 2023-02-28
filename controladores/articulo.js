const validator = require("validator")
const Articulo = require("../modelo/Articulo")

const prueba=(req, res)=>{

    return res.status(200).json({
        mensaje:"Soy una acccion de pruebas."
    });
}

const curso = ((req, res) =>{
    console.log("se ha ejecutado el endpoint desde la consola. ");
    
    return res.status(200).send({curso:"React", autor:"francisco alfaro" , url:"franciscoalfar@gmail.com" })

});

const crear=(req, res)=>{

    //recoger los datos por post para ser guardados. 
    let parametros= req.body;

    //validacion de datos a guardar
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo,{min: 5, max:undefined});
        let validar_contenido= !validator.isEmpty(parametros.contenido);

        if(!validar_titulo || !validar_contenido){
            throw new Error(" informacion no validada");
        }
        else{
            console.log("datos guardados")
        }

        
    } catch (error) {
        return res.status(400).json({
            status:"error",
            mensaje:"faltan datos por enviar",
        });
        
    }

    //crear objeto a guardar
    const articulo = new Articulo(parametros);
    console.log(articulo.titulo)

    //asignar valores a objeto basado en el modelo (manual o automatico)

    //guardar datos en la BD
    articulo.save((err, articuloGuardado)=>{
        if( err || !articuloGuardado){
            return res.status(400).json({
                status:"error",
                mensaje:"no se ha guardado el articulo"

            });
        }

    //confirmar datos guardados 

        return res.status(200).json({
            status:"success",
            articulo:articuloGuardado,
            mensaje:"articulo creado con exito"

        })

    });
    
}

module.exports = {
    prueba,
    curso,
    crear

}