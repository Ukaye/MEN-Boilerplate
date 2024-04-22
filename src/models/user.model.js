 //
 // ─── USER MODEL ─────────────────────────────────────────────────────────
 //
 
 //setup dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isActive: {
        type: Number,
        default: 1
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String
        },
        agent: {
            type: String
        }
    }]
},
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

export default User;