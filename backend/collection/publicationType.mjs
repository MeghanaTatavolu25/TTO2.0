import { mongoose } from 'mongoose';
 
const publicationTypeSchema = new mongoose.Schema({
    PublicationType: { type: String, },
});
const PublicationType = mongoose.models.PublicationType || mongoose.model("PublicationType", publicationTypeSchema);
export default PublicationType; 