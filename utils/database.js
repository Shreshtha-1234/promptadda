import mongoose from "mongoose";
let isConnected = false;

export const connectDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Mongoose is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        } );
        isConnected = true;
        console.log("db connection successful ");
    } catch (err) {
        console.log("db not connected");
    }
}