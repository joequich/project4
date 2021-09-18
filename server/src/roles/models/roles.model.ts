import { model, Schema } from "mongoose";
import { IRole } from "../../interfaces/role.interface";

const RoleSchema = new Schema<IRole>({
    role: { type: String, required: [true, 'Role is required'] }
});

export default model<IRole & Document>('Role', RoleSchema);