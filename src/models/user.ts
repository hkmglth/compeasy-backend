import { IUserDto } from "./../types/User";
import mongoose from "mongoose";

const userSchema: mongoose.SchemaDefinitionProperty<IUserDto> = {
  token: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  surName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPic: {
    type: String,
    trim: true,
    default: "https://robohash.org/dolorutquisquam.png?size=120x120&set=set1",
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
};

const UserSchema = new mongoose.Schema(userSchema);

export default mongoose.model("users", UserSchema);
