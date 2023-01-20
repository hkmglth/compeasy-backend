import {
  getAllCompanies,
  getLastActionCompanies,
  addCompany,
  deleteCompanies,
  updateCompany,
  getCompanyById,
  getCompaniesDropdown,
} from "../controllers/companies";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/getAllCompanies", auth, getAllCompanies);
router.get("/getLastActionCompanies", auth, getLastActionCompanies);

router.post("/addCompany", auth, addCompany);
router.post("/deleteCompanies", auth, deleteCompanies);
router.post("/updateCompany", auth, updateCompany);
router.post("/getCompanyById", auth, getCompanyById);
router.get("/getCompaniesDropdown", auth, getCompaniesDropdown);
export default router;
