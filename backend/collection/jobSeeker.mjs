import { mongoose } from 'mongoose';
 
const jobSeekerSchema = new mongoose.Schema({
    Name:           {type: String, required: true},
    Position:       {type: String,},
    Email_id:       {type: String, required: true},
    Phone_Number:   {type: Number, required: true, minLength:10, maxLength:10},
    Skills:         {type: Array,},
    UploadResume: {
        file:       {type: String,},
        key:        {type: String,},
        bucket:     {type: String,},
        mimeType:   {type: String,},
        filePath:   {type: String,},
    },
});
const JobSeeker = mongoose.model("Job_Seeker", jobSeekerSchema);
export default JobSeeker;
