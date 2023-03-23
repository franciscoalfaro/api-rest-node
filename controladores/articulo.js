const fs = require("fs")
const path = require("path")
const {validarArticulo}= require("../helpers/validar")
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


//end-point para crear dato en BD

const crear=(req, res)=>{

    //recoger los datos por post para ser guardados. 
    let parametros= req.body;

    //validacion de datos a guardar
    try{
        validarArticulo(parametros);
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
    articulo.save((error, articuloGuardado)=>{
        if( error || !articuloGuardado){
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

// end-piont para listar datos de la BD
const listar = (req, res) =>{
    setTimeout(()=>{
        let consulta = Articulo.find({})
        //flag devuelve la cantidad de datos a solicitar
        if (req.params.ultimos) {
            consulta.limit(3);
        }

        consulta.sort({fecha:-1}).exec((error, articulos)=>{
            if(error|| !articulos){
                return res.status(404).json({
                    status:"error",
                    mensaje:"articulo no encontrado"
        
                })
            }

            return res.status(200).send({
                status:"success",
    	    contador:articulos.length,
                articulos,
            });
        });
    },1000)
}

// end-piont para buscar 1 dato en la BD

const buscar_articulo = (req, res)=>{

    //recoger ID

    let id= req.params.id;

    console.log(id)

    //buscar el articulo
    Articulo.findById(id, (error, articulo)=>{    
        //devolver error
        if(error|| !articulo){
            return res.status(404).json({
                status:"error",
                mensaje:"articulo no encontrado"
    
            })
        }

        //devolver resultado
        return res.status(200).json({
            status:"success",
            articulo
        });

    })



}


//end-point para borrar dato de BD

const borrar_articulo = (req, res)=>{

    let id = req.params.id;

    Articulo.findOneAndDelete({_id:id}, (error, articuloBorrado)=>{

        if( error || !articuloBorrado){
            return res.status(400).json({
                status:"error",
                mensaje:"Error al borrar Articulo."
            })
        }

        return res.status(200).json({
            status:"success",
            articulo:articuloBorrado,
            mensaje:"Articulo Borrado"
        })

    })



}



const editar=(req, res)=>{
    //recoger ID del articulo a editar
    let id = req.params.id;

    //recoger datos del body
    let parametros = req.body;

    //validar datos
    try{
        validarArticulo(parametros);
    } catch (error) {
    return res.status(400).json({
        status:"error",
        mensaje:"faltan datos por enviar",
    });
    
}
    
    //buscar y actualizar

    Articulo.findOneAndUpdate({_id:id}, parametros,{new:true}, (error, articuloActualizado)=>{

        if( error || !articuloActualizado){
            return res.status(500).json({
                status:"error",
                mensaje:"Error al actualizar Articulo."
            })
        }

        return res.status(200).json({
            status:"success",
            articulo:articuloActualizado,
            mensaje:"Articulo Actualizado"
        })

    })

    //devolver respuesta. 


}

const subir = (req, res)=>{

    //connfigurar multer

    //recoger archivo de imagen 
    if(!req.file && !req.files){
        return res.status(404).json({
            status:"error",
            mensaje:"peticion no valida"
        })

    }

    console.log(req.file)
    
    //nombre del archivo
    let nombreArchivo = req.file.originalname;
    let archivo_split = nombreArchivo.split("\.");
    let extension = archivo_split[1].toLowerCase();

    //comprobar extencion
    if(extension !="png" &&  extension !="jpg" && extension !="jpeg" && extension !="gif"){

        //borrar archivo con extension erronea. 
        fs.unlink(req.file.path,(error)=>{
            return res.status(400).json({
                status:"error",
                mensaje:"Extension no invalida"
            })
        })

    }else{

        let id = req.params.id;       
        //buscar y actualizar
    
        Articulo.findOneAndUpdate({_id:id}, {imagen:req.file.filename},{new:true}, (error, articuloActualizado)=>{
    
            if( error || !articuloActualizado){
                return res.status(500).json({
                    status:"error",
                    mensaje:"Error al actualizar Articulo."
                })
            }
    
            return res.status(200).json({
                status:"success",
                articulo:articuloActualizado,
                fichero:req.file
            })
    
        })
        
    }


}

const imagen = (req,res)=>{
    let fichero = req.params.fichero;
    let rutaFisica = "./imagenes/articulos/"+fichero

    fs.stat(rutaFisica,(error, existe)=>{
        if(existe){
            return res.sendFile(path.resolve(rutaFisica));
        }else{
            return res.status(404).json({
                status:"error",
                mensaje:"La imagen no existe"
            })

        }
    })

}


const buscador = (req, res)=>{

    //sacar el string de la busqueda
    let busqueda = req.params.busqueda;

    // Find OR
    Articulo.find({"$or": [
        {"titulo":{"$regex":busqueda, "$options":"i"}},
        {"contenido":{"$regex":busqueda, "$options":"i"}},
    ]})
    .sort({fecha:-1})
    .exec((error, articuloEncontrados)=>{
        if(error || !articuloEncontrados || articuloEncontrados.length <=0 ){
            return res.status(404).json({
                status:"error",
                mensaje:"no se han encontrado articulos"
            });
        }
        
        return res.status(200).json({
            status:"success",
            articulos:articuloEncontrados
        })

    })

}


module.exports = {
    prueba,
    curso,
    crear,
    listar,
    buscar_articulo,
    borrar_articulo,
    editar,
    subir,
    imagen,
    buscador

}