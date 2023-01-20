import companies from "../models/companies";
import { ISingleResponseDto } from "./../types/Response";
import { Request, Response } from "express";
import { IResponseDto } from "../types/Response";
import { IStatsDto } from "../types/Stats";
import products from "../models/products";

let errRes: IResponseDto = {
  message: "An error occured while get stats!",
  success: false,
};

const getAllStats = async (req: Request, res: Response) => {
  try {
    const succRess: ISingleResponseDto<IStatsDto> = {
      data: {
        companiesCount: await companies.count(),
        productsCount: await products.count(),
      },
      message: "Stats created successfully!",
      success: true,
    };
    return res.status(200).json(succRess);
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

export { getAllStats };
