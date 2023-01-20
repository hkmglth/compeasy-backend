import { IProductDto } from "./../types/Products";
import { ICompanyDto } from "./../types/Companies";
import mongoose from "mongoose";

const productSchema: mongoose.SchemaDefinitionProperty<IProductDto> = {
  id: {
    type: "number",
    index: true,
    required: true,
  },
  companyId: {
    type: "number",
    required: true,
  },
  productName: {
    type: "string",
    required: true,
    trim: true,
  },
  productAmount: {
    type: "number",
    required: true,
  },
  productPrice: {
    type: "string",
    required: true,
    trim: true,
  },
  productPic: {
    type: "string",
    trim: true,
  },
  website: {
    type: "string",
    required: true,
    trim: true,
  },
  fields: {
    type: "string",
    required: true,
    trim: true,
  },
  status: {
    type: "boolean",
    required: true,
  },
};

const ProductSchema = new mongoose.Schema(productSchema);

export default mongoose.model("products", ProductSchema);
