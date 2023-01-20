import { DefaultOptionType } from "./../types/Fields";
import { IResponseDto, ISingleResponseDto } from "./../types/Response";
import {
  ICompaniesDto,
  ICompanyDto,
  ICompanyUpdateDto,
} from "./../types/Companies";
import { IMultiResponseDto } from "./../types/Response";
import { Request, Response } from "express";
import companies from "../models/companies";
import { CallbackError } from "mongoose";
let errRes: IResponseDto = {
  message: "An error occures while get companies",
  success: false,
};
const getAllCompanies = async (req: Request, res: Response) => {
  try {
    companies.find().exec((err, result) => {
      if (err) {
        return res.status(500).json(errRes);
      } else {
        const successRes: IMultiResponseDto<ICompanyDto> = {
          data: result as ICompaniesDto,
          message: "Companies retrieved successfully",
          success: true,
        };
        return res.status(200).json(successRes);
      }
    });
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const getCompanyById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    companies.findOne({ id }).exec((err, result) => {
      if (err || result === null) {
        return res.status(500).json(errRes);
      } else {
        const successRes: ISingleResponseDto<ICompanyDto> = {
          data: result as ICompanyDto,
          message: "Company found successfully!",
          success: true,
        };
        return res.status(200).json(successRes);
      }
    });
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const getLastActionCompanies = async (req: Request, res: Response) => {
  try {
    companies
      .find()
      .sort()
      .limit(4)
      .exec((err, result) => {
        if (err) {
          return res.status(500).json(errRes);
        } else {
          const successRes: IMultiResponseDto<ICompanyDto> = {
            data: result as ICompaniesDto,
            message: "Companies retrieved successfully",
            success: true,
          };
          return res.status(200).json(successRes);
        }
      });
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const addCompany = async (req: Request, res: Response) => {
  const { companyName, companyPhone, vatNumber, country, website, fields } =
    req.body;
  try {
    const count = await companies.count();
    await companies.findOne({
      $or: [
        { companyName },
        { companyPhone },
        { vatNumber },
        { country },
        { website },
      ],
    });

    await companies.create({
      id: count + 1,
      key: count + 1,
      companyName,
      companyPhone,
      vatNumber,
      country,
      website,
      fields,
    });
    const succRes: IResponseDto = {
      message: "Company added successfully!",
      success: true,
    };
    return res.status(200).json(succRes);
  } catch (error) {
    errRes.message = "This company already exist.";
    return res.status(500).json(errRes);
  }
};

const deleteCompanies = async (req: Request, res: Response) => {
  const { ids }: { ids: number[] } = req.body;
  try {
    companies.deleteMany(
      { id: { $in: ids } },
      (err: CallbackError, result: any) => {
        if (err) {
          return res.status(500).json(errRes);
        } else {
          const successRes: IResponseDto = {
            message: "Companies deleted successfully!",
            success: true,
          };
          return res.status(200).json(successRes);
        }
      }
    );
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const updateCompany = async (req: Request, res: Response) => {
  const { companyData }: { companyData: ICompanyUpdateDto } = req.body;
  try {
    companies.findOneAndUpdate(
      { id: companyData.id },
      {
        companyName: companyData.companyName,
        companyPhone: companyData.companyPhone,
        vatNumber: companyData.vatNumber,
        country: companyData.country,
        website: companyData.website,
        fields: companyData.fields,
      },
      (err: CallbackError, result: any) => {
        if (err) {
          return res.status(500).json(errRes);
        } else {
          const successRes: IResponseDto = {
            message: "Company updated successfully!",
            success: true,
          };
          return res.status(200).json(successRes);
        }
      }
    );
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const getCompaniesDropdown = async (req: Request, res: Response) => {
  try {
    let tempOptions: DefaultOptionType[] = [];

    (await companies.find({})).map((company) =>
      tempOptions.push({
        label: company.companyName,
        value: company.id,
      })
    );
    if (tempOptions.length > 0) {
      const successRes: IMultiResponseDto<DefaultOptionType> = {
        data: tempOptions,
        message: "Companies retrieved successfully!",
        success: true,
      };
      return res.status(200).json(successRes);
    }
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

export {
  getAllCompanies,
  getLastActionCompanies,
  addCompany,
  deleteCompanies,
  updateCompany,
  getCompanyById,
  getCompaniesDropdown,
};
