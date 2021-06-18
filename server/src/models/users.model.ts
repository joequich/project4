import { Schema, model, Document } from "mongoose";
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>({
    name: { type: String, required: [true, 'Name is required'] },
    
});

export default model<IUser & Document>('User', UserSchema);