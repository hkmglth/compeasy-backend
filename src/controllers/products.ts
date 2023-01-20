import { ICompaniesDto } from "./../types/Companies";
import { IProductDto, IProductsDto } from "./../types/Products";
import {
  IMultiResponseDto,
  IResponseDto,
  ISingleResponseDto,
} from "./../types/Response";
import { Request, Response } from "express";
import products from "../models/products";
import companies from "../models/companies";

let errRes: IResponseDto = {
  message: "An error occured while get products!",
  success: false,
};

const getProductsByCompanyId = async (req: Request, res: Response) => {
  const { companyId } = req.body;

  try {
    const productsByCompanyId: IProductDto[] = await products.find({
      companyId,
    });
    const company = await companies.findOne({ id: companyId });

    const tempRes: IProductsDto = [];

    productsByCompanyId.map((prod, index) => {
      tempRes.push({
        companyId: prod.companyId,
        companyName: company.companyName,
        id: prod.id,
        key: prod.id,
        productAmount: prod.productAmount,
        productName: prod.productName,
        productPic: prod.productPic,
        productPrice: prod.productPrice,
        status: prod.status,
        website: prod.website,
      });
    });
    let succRes: IMultiResponseDto<IProductDto> = {
      data: tempRes,
      message: "Products retrieved successfully!",
      success: true,
    };
    if (productsByCompanyId.length === 0) {
      succRes.message = "No products with this company yet!";
    }
    return res.status(200).json(succRes);
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const prods: IProductDto[] = await products.find();
    const companys: ICompaniesDto = await companies.find();
    const companiesById: ICompaniesDto = companys.reduce(
      (obj: any, company) => {
        obj[company.id] = company;
        return obj;
      },
      {}
    );

    const result: IProductsDto = [];
    prods.map((prod, index) =>
      result.push({
        key: prod.id,
        id: prod.id,
        companyId: prod.companyId,
        companyName: companiesById[prod.companyId].companyName,
        productAmount: prod.productAmount,
        productName: prod.productName,
        productPic: prod.productPic,
        productPrice: prod.productPrice,
        status: prod.status,
        website: prod.website,
      })
    );

    const succRes: IMultiResponseDto<IProductDto> = {
      data: result,
      message: "Products retrieved successfully!",
      success: true,
    };
    return res.status(200).json(succRes);
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { productIds } = req.body;
  try {
    await products.deleteMany({ id: { $in: productIds } });

    const succRes: IResponseDto = {
      message: "Products removed successfully!",
      success: true,
    };
    return res.status(200).json(succRes);
  } catch (error) {
    errRes.message = "Error occured while delete products!";
    return res.status(500).json(errRes);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const {
    productName,
    productAmount,
    productPrice,
    website,
    status,
    companyId,
    fields,
  } = req.body;

  try {
    const prodCount = await products.count();

    await products.create({
      id: prodCount + 2,
      key: prodCount + 2,
      productName,
      productAmount,
      productPrice,
      website,
      status,
      companyId,
      fields,
    });
    const succRes: IResponseDto = {
      message: "Product added successfully!",
      success: true,
    };
    return res.status(200).json(succRes);
  } catch (error) {
    errRes.message = "Error occured while add company!";
    return res.status(500).json(errRes);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const {
    id,
    productName,
    productAmount,
    productPrice,
    website,
    status,
    companyId,
    fields,
  } = req.body;

  try {
    await products.findOneAndUpdate(
      { id: id },
      {
        $set: {
          productName,
          productAmount,
          productPrice,
          website,
          status,
          companyId,
          fields,
        },
      }
    );
    const succRes: IResponseDto = {
      message: "Product updated successfully!",
      success: true,
    };
    return res.status(200).json(succRes);
  } catch (error) {
    errRes.message = "Error occured while update company!";
    return res.status(500).json(errRes);
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const prod: IProductDto = await products.findOne({ id });
    if (Object.values(prod).length > 0) {
      const succRes: ISingleResponseDto<IProductDto> = {
        data: prod,
        message: "Product updated successfully!",
        success: true,
      };
      return res.status(200).json(succRes);
    }
  } catch (error) {
    errRes.message = "Error occured while get company!";
    return res.status(500).json(errRes);
  }
};

export {
  getProductsByCompanyId,
  getAllProducts,
  deleteProductById,
  addProduct,
  updateProduct,
  getProductById,
};
