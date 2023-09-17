const productModel = require('../models/productModel');


const controller = {
    detailProduct: (req,res)=>{
        const productId = req.params.id;

       const selectedProduct = productModel.findById(productId);

        res.render('productDetail', { product: selectedProduct })
    },

    createProduct: (req,res)=>{
        res.render('createProduct')
    },

    postProduct: (req,res)=>{
        

        const newProduct = {
            title: req.body.title,
            price: req.body.price,
            img: req.file.filename
        }
        productModel.createProduct(newProduct)
        
        // desde los post no se renderiza vistas solo se redirecciona
        res.redirect('/products');
    },
    deleteProduct: (req, res) => {
        productModel.delete(Number(req.params.id))

        /* res.send('se esta eliminando el producto ' + req.params.id);  NO SE PUEDE ENVIAR DOS MENSAJES AL USUARIO*/

        res.redirect('/products')
      },

    editProduct: (req,res) => {
        const product = productModel.findById(Number(req.params.id));
        res.render('editProducts', { product })
    },

    updateProduct: (req, res) => {
        const update = req.body;
         
        update.id = Number(req.params.id)

        /* let update = {
            id: Number(req.params.id)
        };
        update = {
            ...update,
            ...req.body
        }  ESTA ES UNA FORMA PARA AGREGAR EL ID DE PRIMERAS EN EL OBJETO JSON*/

        res.redirect('/products/' + update.id + '/detail' )

        /* res.send('actualizamos el producto ' + req.params.id) */
    }


}

module.exports = controller;