const express = require('express');
const router = express.Router();
const Category = require('../models/Categories')
const SubCategory = require('../models/SubCategories')

router.post("/create", async (req, res)=>{
   try{ 
    // let success =true;
    const {categoryName} = req.body;

    const category = new Category({
        categoryName
    })

    const save = await category.save();
    res.status(201).json({message: "New Category Created", save,success: true})
}catch(err){
    console.error("Category not created", err)
    res.status(500).json({message:'server error', err, success: true})
}
})




router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newCategory } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { $set: { categoryName: newCategory } }, // assuming field is categoryName
      { new: true }
    );

    if (!updateCategory) {
      return res.status(404).json({ message: "Category Not Found", success: false });
    }

    return res.status(200).json({
      message: "Category Updated",
      updateCategory,
      success: true
    });

  } catch (err) {
    console.error("Category not Updated", err);
    return res.status(500).json({ message: 'Server error', err, success: false });
  }
});





router.delete("/delete-category/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
     const deletedSubCategories = await SubCategory.deleteMany({ categoryId: req.params.id});

    return res.status(200).json({
      success: true,
      message: 'Category and its subcategories deleted',
      deletedCategory,
      deletedSubCategoriesCount: deletedSubCategories.deletedCount
    });


  } catch (error) {
    console.error("Category not Deleted", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});





router.get("/get-categories", async (req, res)=>{
   try{ 
    const categories = await Category.find()

    res.status(201).json({message: "all Categories", categories,success:true})
}catch(err){
    console.error("Categories not found", err)
    res.status(500).json({message:'server error', err})
}
})


module.exports = router;