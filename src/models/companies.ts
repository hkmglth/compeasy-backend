import { ICompanyDto } from "./../types/Companies";
import mongoose from "mongoose";

const companySchema: mongoose.SchemaDefinitionProperty<ICompanyDto> = {
  id: {
    type: "number",
    unique: true,
    required: true,
  },
  key: {
    type: "number",
    index: true,
    required: true,
  },
  companyName: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
  },
  companyPhone: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
  },
  companyPic: {
    type: "string",
    trim: true,
    default: "https://robohash.org/mollitiaundeest.png?size=120x120&set=set1",
  },
  vatNumber: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
  },
  country: {
    type: "string",
    required: true,
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
};

const CompanySchema = new mongoose.Schema(companySchema);

export default mongoose.model("companies", CompanySchema);
