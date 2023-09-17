const express = require('express');
const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController')
const router = express.Router();
const multer = require('multer');

//se crea un storage de multer
const storage = multer.diskStorage({
    destination: (req,file, cb) => { //se setea el destination y filename (se gurda la imagen y su nombre)
        cb(null, './public/img/products')//donde se va a guardar
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname ) //le da un nombre en miles segundos
    }
});

const upload = multer({storage})


// @get /products
router.get('/products', mainController.index);

//@get /products/:id/detail
router.get('/:id/detail', productController.detailProduct);

router.get('/create', productController.createProduct);//sube una sola imagen(single)/ varias (any) 
//post donde se recibe la informacion utilizamos para el multer
router.post('/',upload.single('img'), productController.postProduct);

router.get('/:id/edit', productController.editProduct);

router.put('/:id/edit', productController.updateProduct)

//@ delete /products/:id/delete
router.delete('/:id/delete', productController.deleteProduct)


module.exports = router;