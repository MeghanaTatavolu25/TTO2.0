import { mongoose } from 'mongoose';

const statusSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const PatentStatus = mongoose.model("PatentStatus", statusSchema);
export default PatentStatus;