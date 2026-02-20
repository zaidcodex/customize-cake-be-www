const mongoose = require("mongoose");
const {Schema} = mongoose

const SubCategorySchema = new Schema({
     categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
    metaTitle: {
        type: String,
        require: true
    },
    metaDescription: {
        type: String,
        require: true
    },
    subCategoryName: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('SubCategory', SubCategorySchema)