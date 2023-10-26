import { mongoose } from 'mongoose';

export const userSchema = new mongoose.Schema({
  Name:{ type: String, required: true },
  MobileNumber: { type: String, required: true, minLength: 10, maxLength:10},
  email:    { type: String, required: true },
  role:     [{type: mongoose.Schema.Types.ObjectId, ref: 'UserRole', required: true }],
  password: { type: String, required: true },
});

const CreateUser = mongoose.model('CreateUser', userSchema);
export default CreateUser;

