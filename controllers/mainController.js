const productModel = require('../models/productModel')


const controller = {
    index: ('/', (req,res)=>{
        const products = productModel.findAll();
        /* console.log(products); */
        res.render ('index', {products}) //renderiza la vista 
    }) 
}

module.exports = controller