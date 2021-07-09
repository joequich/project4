import { Schema, model, Document } from "mongoose";
import { IUser } from '../interfaces/user.interface';
import { ROLES, DEFAULT_ROLE } from "../constants";

const UserSchema = new Schema<IUser>({
    username: { type: String, required: [true, 'User Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    image: { type: String, required: false },
    role: { type: String, default: DEFAULT_ROLE, enum: ROLES },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user} = this.toObject();
    return user;
};

export default model<IUser & Document>('User', UserSchema);