import { IResponseDto } from "../types/Response";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import users from "../models/user";
const authenticate = async (req: any, res: Response, next: any) => {
  const errRes: IResponseDto = {
    message: "Please login for this action!",
    success: false,
  };

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send(errRes);
  }
  try {
    const parsedToken = token.split(" ")[1];
    const decoded: any = jwt.verify(parsedToken, process.env.SECRET_TOKEN);
    const isUser = await users.findOne({ _id: decoded.id });
    if (isUser) {
      next();
    } else {
      return res.status(401).send(errRes);
    }
  } catch (err) {
    return res.status(401).send(errRes);
  }
};

export default authenticate;
