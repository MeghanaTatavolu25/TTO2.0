import mongoose from 'mongoose'
const MONGO_URI="mongodb+srv://Developer:Bahubhashak@bahubhashaak-project.ascwu.mongodb.net/TTO-Dev?retryWrites=true&w=majority"
// const MONGO_URI="mongodb://localhost:27017/tto?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongoDB connection: ${error}`);
        process.exit(1);
    }
};
export default connectDB;

