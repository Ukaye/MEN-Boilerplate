import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

const DB_URI = "mongodb+srv://zeedas:Z33das123@zeedas.sszfq.mongodb.net/Zeedas-Production?retryWrites=true&w=majority"
mongoose.connect(DB_URI, options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));