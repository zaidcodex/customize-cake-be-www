const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

router.post("/create", async (req, res)=>{
    console.log(req.body)
    try{
        const {categoryId, subCategoryId, metaTitle, metaDesc, productName, productDesc, images, sizes, flavours, shapes, eggType, customMessageAllowed, isAvailable, preparationTime} = req.body;
    const product = new Product({
        categoryId,
        subCategoryId,
        metaTitle,
        metaDesc,
        productName,
        productDesc,
        images,
        sizes,
        flavours,
        shapes,
        eggType,
        customMessageAllowed,
        isAvailable,
        preparationTime

    })
    const save = await product.save()
    res.status(201).json({message:'Your product creates successfully', save, success:true})}
    catch(error){
    console.log("CREATE PRODUCT ERROR:", error);

    res.status(400).json({
        message: error.message,
        error,
        success:false
    })
}
})

router.post('/update/:id', async (req, res)=>{
    console.log(req.body)
    try{
    const {id} = req.params
    const newProduct = req.body
    console.log(newProduct)
    const updatedProduct = await Product.findByIdAndUpdate(id, 
        {$set: newProduct},
        {new:true}
    )
    res.status(201).json({message:'Your product udpated successfully', updatedProduct, success:true})
}
catch(err)
{
    console.log(err)
        res.status(400).json({message:'Your product updation failed', success:false})

    }
})



router.delete('/delete/:id', async (req, res)=>{
    try{
    const {id} = req.params
    
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.status(201).json({message:'Your product deleted successfully', deleteProduct, success:true})
}
catch(err)
{
    console.log(err)
        res.status(400).json({message:'Your product deletation failed',  success:false})

    }
})


router.get('/get-all-products', async (req, res)=>{
    try{
    const allProducts = await Product.find()
    if(!allProducts){
        res.status(404).json({message:'Product not found',  success:true})
    }
    res.status(201).json({message:'Your product fetched successfully', allProducts, success:true})
}
catch(err)
{
    console.log(err)
        res.status(400).json({message:'Your product fetching failed',  success:false})

    }
})


router.get('/get-product/:id', async (req, res)=>{
    try{
    const {id} = req.params
    
    const product = await Product.findById(id)
    if(!product){
        res.status(404).json({message:'Product not found',  success:false})
    }
    res.status(201).json({message:'Your product find successfully', product, success:true})
}
catch(err)
{
    console.log(err)
        res.status(400).json({message:'Your product not find',  success:false})

    }
})

router.get('/get-product-by-subcat/:id', async (req, res)=>{
    try{
    const {id} = req.params
    
    const products = await Product.find({ subCategoryId: id });
    if(!products){
        res.status(404).json({message:'Product not found',  success:false})
    }
    res.status(201).json({message:'Your product find successfully', products, success:true})
}
catch(err)
{
    console.log(err)
        res.status(400).json({message:'Your product not find',  success:false})

    }
})



module.exports = router