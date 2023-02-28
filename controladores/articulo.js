const validator = require("validator")

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
        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo,{min:5, undefined});
        let validar_contenido= !validator.isEmpty(parametros.contenido);

        if(!validar_titulo || !validar_contenido){
        throw new error("no se ha validado la informacion.")
        }

        
    } catch (error) {
        return res.status(400).json({
            status:"error",
            mensaje:"Error Articulo perdido, verifica los datos enviados.",
        });
        
    }

    //crear objeto a guardar

    //asignar valores a objeto basado en el modelo (manual o automatico)

    //guardar datos en la BD

    //confirmar datos guardados 

    return res.status(200).json({
        mensaje:"Articulo guardado",
        parametros
    })
}

module.exports = {
    prueba,
    curso,
    crear

}