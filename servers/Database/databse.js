import mongoose from "mongoose";

const ConnectionDB = () => {
  const URl = process.env.DB_URL

  try {
    mongoose.connect(URl)
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error in connecting with Database",error)
  }
}

export default ConnectionDB