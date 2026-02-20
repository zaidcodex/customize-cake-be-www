const express= require("express")
const router = express.Router()
const SubCategory = require('../models/SubCategories')

router.post("/create", async (req, res)=>{
    try{
        const {metaTitle, metaDescription, slug, subCategoryName, categoryId} = req.body;

    const subCategory = new SubCategory(
        {
            categoryId,
            metaTitle,
        metaDescription,
        slug,
        subCategoryName}
    )
    const save = await subCategory.save()
    res.status(201).json({message: "New Category Created", save, success:true})
}catch(err){
    console.error("Category not created", err)
    res.status(500).json({message:'server error', err, success:false})
}

})


router.post("/update/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const {newSubCategory} = req.body;
console.log(newSubCategory)
const updateSubCategory = await SubCategory.findByIdAndUpdate(id,
    {$set:newSubCategory},
    {new: true}
)
console.log(updateSubCategory)

    res.status(201).json({message: "Category Updated", updateSubCategory, success:true})
}catch(err){
    console.error("Category not updated", err)
    res.status(500).json({message:'server error', err, success:false })
}

})

router.delete("/delete-sub-category/:id", async (req, res)=>{
    try{
        const {id} = req.params;

    const deleteSubCategory = await SubCategory.findByIdAndDelete(id)
    if(!deleteSubCategory){
        res.status(404).json({message:"Category Not Found"})
    }

    res.status(201).json({message: "Category Deleted", deleteSubCategory})
}catch(err){
    console.error("Category not Deleted", err)
    res.status(500).json({message:'server error', err})
}

})


router.get("/get-sub-categories", async (req, res)=>{
    try{
    const subCategories = await SubCategory.find()
    res.status(201).json({message: "All Sub Categories", subCategories, success: true})
}catch(err){
    console.error("Category not Deleted", err)
    res.status(500).json({message:'server error', err, success: false})
}

})




module.exports = router;