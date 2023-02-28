const { conexion } = require("./database/conexion")

const express = require("express")
const cors = require("cors")

//nicializar app
console.log("conectado")

//conectar a la base de datos
conexion()


// crear servidor de node
 const app = express();
 const puerto = 3900;

 //Configurar cors
 app.use(cors());

 //convertir body a objeto JS
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//crear rutas
const rutas_articulos = require("./rutas/articulo");
//cargando las rutas
app.use("/api",rutas_articulos);


//crear ruta de guardado



//Pruebas de rutas
app.get("/probando", (req, res) =>{
    console.log("se ha ejecutado el endpoint desde la consola. ");
    
    return res.status(200).send({curso:"React", autor:"francisco alfaro" , url:"franciscoalfar@gmail.com" })

});

//crear servidor y escuchar peticiones
app.listen(puerto, () =>{
    console.log("servidor corriendo en puerto :" +puerto)
});
