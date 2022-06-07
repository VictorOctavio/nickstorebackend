const Product = require('../models/Product');

const cloudinary = require('cloudinary');
const fs = require('fs-extra');
//Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Controlador
const controller = {
    
    //GUARDAR PRODUCTO
    save_product: async(req, res) => {
        try{
            //Obtenemos data body
            const {title, description, price, category, marca, model, stock} = req.body;

            //Creamos objeto producto
            const product = new Product({
                title: title.toLowerCase(), description, price, category: category.toLowerCase(), state: false, information: {marca: marca.toLowerCase(), model, stock, 
                oferta: {active: false, priceSale: null}}
            });

            //Guadamos images cloudinary
            for(let i=0; i<req.files.length; i++){
                const data = await cloudinary.v2.uploader.upload(req.files[i].path, {
                    folder: 'Tienda'
                });
                
                //Asigamos url al objeto
                product.imageURL.push(data.url);

                //Eliminar images public upload
                fs.unlink(req.files[i].path);
            };

            //Guardar product
            const savedProduct = await product.save();

            if(!savedProduct) return res.json({err: true, message: 'no se ha podido guardar, intente nuevamente!', data: null});

            return res.json({err: null, message: `${savedProduct.title} creado con éxito`, data: product});
            
        }catch(err){return res.json({err: true, message: 'Algo salió mal al intentar guardar'})};
    },


    //Update Producto
    update_product: async(req, res) => {
        try{
            const update = req.body;

            //Updated product
            const productUpdate = await Product.findOneAndUpdate({_id: req.params.id}, update, {new: true});
       
            if(!productUpdate) return res.json({err: true, message: 'no se ha podido actualizar, intente nuevamente'});

            return res.json({err: null, data: productUpdate, message: 'producto actualizado :)'});

        }catch(err){return res.json({err: true, message: 'Algo salió mal al intentar actualizar'})};
    },


    //DELETED PRODUCT
    delete_product: async(req, res) => {
        try{
            //Deleted product
            const deletedProduct = await Product.findOneAndRemove({_id: req.params.id}, {new: true});
            if(!deletedProduct) return res.json({err: true, message: 'no se ha podido completar la eliminacion, intente nuevamente'});

            return res.json({err: null, data: deletedProduct, message: 'producto eliminado exitosamente'});
        }catch(err){return res.json({err: true, message: 'Algo salió mal al intentar eliminar'})};
    },
    
    
    //GET PRODUCT ID
    get_product: async(req, res) => {
        try{
            const product = await Product.findOne({_id: req.params.id});
            if(!product) return res.json({err: true, data: null, message: 'No se ha podido encontrar el producto solicitado'});

            //Recomendados
            const recomendados = await Product.paginate({"information.marca": product.information.marca}, {sort: '-createdAt', limit: 7})

            recomendados.docs = recomendados.docs.filter(item => {
                return item._id.toString() !== product._id.toString()
            })

            return res.json({err: null, data: product, imgActive:product.imageURL[0],  message: 'producto encontrado', recomendados});
        
        }catch(err){return res.json({err: true, message: 'Algo salió mal al buscar producto'})}
    },


    //GET PRODUCTS LIST
    products: async(req,res) => {
        try{
            let sort = req.query.sort || '-createdAt';          
            let limit = parseInt(req.query.limit) || 21;
            let page = parseInt(req.query.page) || 1;
            let category = req.query.category || undefined;

            if(category !== null && category && category !== 'undefined'){
                let products;

                //Productos Ofertas
                if(category === 'ofertas' || category === 'oferta'){
                    products = await Product.paginate({"information.oferta.active": true}, {page, limit, sort});
                    return res.json({err: null, data: products, message: 'listado de productos encontrado con exito!'});
                }

                //Productos Categoria
                products = await Product.paginate({$or: [{category}, {"information.marca": category}]},  {page, limit, sort});
                
                // console.log(products)
                return res.json({err: null, data: products, message: 'listado de productos encontrado con exito!'});
            }

            const products = await Product.paginate({}, {page, limit, sort});
            return res.json({err: null, data: products, message: 'listado de productos encontrado con exito!'});

        }catch(err){return res.json({err: true, data: null, message: 'Algo salió mal al intentar buscar productos'})};
    },


    create_oferta: async(req, res) => {
        try{
            const {active, priceSale} = req.body;
            
            const update = await Product.findOneAndUpdate({_id: req.params.id}, {
                "information.oferta.active": active,  "information.oferta.priceSale": parseInt(priceSale) || null
            }, {new: true});

            return res.json({err: null, data: update, message: 'Cambios Realizados con Éxito'})

        }catch(err){return res.json({err:true, message: 'Algo ha salido mal'})}
    }

}

module.exports = controller;