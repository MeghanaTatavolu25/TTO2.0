import { mongoose } from 'mongoose';

const IndustrySchema = new mongoose.Schema({
    Name_of_comapny:        {type: String, required: true},
    Contact_person_Name:    {type: String, required: true},
    Position:               {type: String, required: true},
    Email_Id:               {type: String, required: true},
    PhoneNumber:            {type: Number, required: true, minLength:10, maxLength:10},
    Query:                  {type: String, required: true},
});
const Industry = mongoose.model("Industry", IndustrySchema);
export default Industry;
 