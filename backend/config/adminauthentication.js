import argon2d        from "argon2"
import mongoose       from "mongoose"
import { RoleSchema } from "../collection/userRole.mjs";
import { userSchema } from "../collection/userSchema.mjs"

const adminAuthenticate = async (email, password) => {
  const userschema = mongoose.model('CreateUser', userSchema);
  const roleschema = mongoose.model('UserRole', RoleSchema);
  const user1 = await userschema?.findOne({email});
  const role1 = await roleschema?.findById(user1.role.valueOf());
  const rol = role1.role;

  if(user1 && await argon2d.verify(user1.password, password)) {
    return Promise.resolve(user1);
  }
  return null
}
export default adminAuthenticate;
