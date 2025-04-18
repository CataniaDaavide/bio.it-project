import mongoose, { mongo } from "mongoose";

export default async function connectDB(){
    const url = process.env.DB_URL
    await mongoose.connect(url).then(() => {})
}
