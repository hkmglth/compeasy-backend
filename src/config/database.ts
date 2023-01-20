import mongoose from "mongoose";

const db = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
    })
    .catch((err: any) => {
    });
};

export default db;
