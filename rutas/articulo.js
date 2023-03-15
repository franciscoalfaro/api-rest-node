const express = require('express');
const router = express.Router();
const multer = require("multer");
const ArticuloControlador = require("../controladores/articulo");

const almacenamiento = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, './imagenes/articulos/')

    },
    filename:(req,file,cb)=>{
        cb(null, "articulo"+Date.now()+file.originalname)

    }
})

const subida = multer({storage:almacenamiento})



//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);
router.post("/crear", ArticuloControlador.crear)
//se entrega parametro opcional "url/:ultimo?" - parametro obligatorio seria "url:ultimo"
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.buscar_articulo);
router.delete("/articulo/:id", ArticuloControlador.borrar_articulo);
router.put("/articulo/:id", ArticuloControlador.editar);
router.post("/subir-imagen/:id",[subida.single("file0")], ArticuloControlador.subir)
router.get("/imagen/:fichero", ArticuloControlador.imagen);
router.get("/buscar/:busqueda", ArticuloControlador.buscador);

module.exports = router;