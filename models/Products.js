const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategories",
    required: true
  },

  productName: {
    type: String,
    required: true
  },
  productDesc: {
    type: String,
    required: true
  },

  metaTitle: {
    type: String,
    required: true
  },

  metaDesc: {
    type: String,
    required: true
  },

   images: [
    {
      url: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      }
    }
  ],

  sizes: [{
    size: String,
    price: Number
  }],

  flavours: [String],

  shapes: [String],

  eggType: {
    type: String,
    enum: ["egg", "eggless"],
    default: "egg"
  },

  customMessageAllowed: {
    type: Boolean,
    default: true
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  preparationTime: {
    type: Number // hours
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
