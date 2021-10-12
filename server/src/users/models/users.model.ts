import mongoose from '../../common/services/mongoose.service';
import { IUser } from '../../interfaces/user.interface';
import { Roles, DefaultRole } from "../../constants";


const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: [true, 'User Name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    image: { type: String, required: false },
    role: { type: String, default: DefaultRole.DEFAULT_ROLE, enum: Roles },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.__v;
    delete user.password;
    return user;
};

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);