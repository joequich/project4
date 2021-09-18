import mongoose from '../../common/services/mongoose.service';
import { IRole } from "../../interfaces/role.interface";

const RoleSchema = new mongoose.Schema<IRole>({
    role: { type: String, required: [true, 'Role is required'] }
});

export default mongoose.model<IRole & mongoose.Document>('Role', RoleSchema);