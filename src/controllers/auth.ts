import { IUserInfoDto } from "./../types/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "../models/user";
import { Request, Response } from "express";
import { ITokenDto } from "../types/Auth";
import { IResponseDto, ISingleResponseDto } from "../types/Response";

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, surName, email, password } = req.body;
    const emailCheck = await users.findOne({ email });

    if (emailCheck) {
      const tempRes: IResponseDto = {
        success: false,
        message: "This email already used!",
      };
      return res.status(500).json(tempRes);
    } else {
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = await users.create({
        email: email,
        firstName: firstName,
        password: passwordHash,
        role: "user",
        surName: surName,
        token: "",
        userPic: "",
      });
      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.SECRET_TOKEN!,
        {
          expiresIn: "99999999999999hr",
        }
      );
      users.updateOne({ email }, { $set: { token: token } }, (err: any) =>
        console.log(err)
      );
      const successRes: IResponseDto = {
        message: "Registered successfully, please login!",
        success: true,
      };
      return res.status(200).json(successRes);
    }
  } catch (err) {
    const tempRes: IResponseDto = {
      success: false,
      message: "An error occured!",
    };
    return res.status(500).json(tempRes);
  }
};

const login = async (req: Request, res: Response) => {
  const errRes: IResponseDto = {
    success: false,
    message: "User not found!",
  };

  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(500).json(errRes);
    } else {
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(500).json(errRes);
      } else {
        const successRes: ISingleResponseDto<ITokenDto> = {
          data: {
            token: user.token!,
          },
          message: "Logged successfully!",
          success: true,
        };
        return res.status(200).json(successRes);
      }
    }
  } catch (error) {
    return res.status(500).json(errRes);
  }
};

const getUserByToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const errRes: IResponseDto = {
    success: false,
    message: "Please login for this action!",
  };
  if (token && token.length !== 0) {
    const parsedToken = token.split(" ")[1];
    users.findOne({ token: parsedToken }).exec((err, result) => {
      if (err || !result) {
        return res.status(500).json(errRes);
      } else {
        const succRes: ISingleResponseDto<IUserInfoDto> = {
          data: {
            email: result.email,
            firstName: result.firstName,
            surName: result.surName,
            role: result.role,
            userPic: result.userPic,
          },
          message: "Logged success!",
          success: true,
        };
        return res.status(200).json(succRes);
      }
    });
  } else {
    return res.status(500).json(errRes);
  }
};

export { register, login, getUserByToken };
