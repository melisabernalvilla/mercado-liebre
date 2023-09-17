const express = require ("express");
const path = require ("path");
const dotenv = require("dotenv").config();
const app = express();
const methodOverride = require('method-override');

const mainRouter = require('./routes/mainRouter');
const userRoutes = require('./routes/userRouter');
const productRouter = require('./routes/productRouter')
/* const productRouter = require('./routes/productRouter');*/
 
app.set('view engine', 'ejs'); //configuracion del ejs los html se deben cambiar a ejs ademas de instalar el paquete en node.
app.set('views', [
    path.join(__dirname, './views')
]);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride('_method'));


app.use('/', mainRouter);
app.use('/users', userRoutes)
app.use('/products', mainRouter)
app.use('/products/', productRouter)

//permite ingresar a lo que el usuario ingreso en un formulario atraves de req.body


app.listen(process.env.PORT, () => 
console.log('Servidor abierto en el puerto 3001' + process.env.PORT + 'http://localhost:3001')
);

