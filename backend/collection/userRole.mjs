import { mongoose } from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    role: { type: String, required: true },
});

const UserRole = mongoose.models.UserRole || mongoose.model("UserRole", RoleSchema);
export default UserRole;