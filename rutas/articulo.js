const express = require('express');
const router = express.Router();

const ArticuloControlador =require("../controladores/articulo");
//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);
router.post("/crear", ArticuloControlador.crear)
//se entrega parametro opcional "url/:ultimo?" - parametro obligatorio seria "url:ultimo"
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.buscar_articulo);
router.delete("/articulo/:id", ArticuloControlador.borrar_articulo);
router.put("/articulo/:id", ArticuloControlador.editar);

module.exports = router;