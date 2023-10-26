import mongoose     from "mongoose"
import {RoleSchema} from "../collection/userRole.mjs"
import {userSchema} from "../collection/userSchema.mjs"

const FindUserRole = (email) => {
  const user = mongoose.model('CreateUser', userSchema);
  const roleschema = mongoose.model('UserRole', RoleSchema);
  const user1 = user?.findOne({email});
  const role1 = roleschema?.findById(user1.role.valueOf());
  const rol = role1.role;
  return rol;
}
export default FindUserRole;