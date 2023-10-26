import { mongoose } from 'mongoose';

const FacultySchema = new mongoose.Schema({
  Name:           {type: String, required: true},
  Designation:    {type: String, required: false},
  Research_Areas: {type: Array, required:false},
  Qualifications: {type: String, required: false},
  // ResearchCenter: [{type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCenters', required: true }],
  FacultyImage: {
    file:       {type: String,},
    key:        {type: String,},
    bucket:     {type: String,},
    mimeType:   {type: String,},
    filePath:   {type: String,},
  },
});

const Faculty = mongoose.model("Faculty", FacultySchema);
export default Faculty; 