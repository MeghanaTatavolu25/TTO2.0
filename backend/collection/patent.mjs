import { mongoose } from 'mongoose';

const patentSchema = new mongoose.Schema({
  Title:                        {type: String, required: true, },
  Description:                  {type: String,},
  Application_Number:           {type: String, required: true, default: "Not Available",}, //
  Patent_Number:                {type: String, required: false, default: "Not Available",}, //
  Reference_Number:             {type: String, required: false, },
  Inventor_List :               {type: Array, required: false, default: "Not Available",}, //
  Faculty_List:                 {type: Array, required: false, default: "Not Available",}, //
  Center_Name:                  {type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCenters', required: false}, //
  Published_Date:               {type: Date, required: false,}, //
  FilledInCountry:              {type: String, required: false, },
  PatentStatusComment:          {type: String,}, 
  URL:                          {type: String, required: false, },  //
  ProvisionalFilingDate:        {type: String,},
  FullFilingDate:               {type: String,},
  YearOfProvisionalFiling:      {type: Number,},
  YearOfFullFiling:             {type: Number,},
  YearOfGrant :                 {type: Number,},
  Status:                       {type: mongoose.Schema.Types.ObjectId, ref: 'PatentStatus', required: false }, // 
  Funding :                     {type: String,},
  CollaboratorsEmailId :        {type: String,},
  NumberOfStudentInventors :    {type: Number,},    // Changed
  IDFSubmissionDate  :          {type: String,},
  IDFSerachReportDate  :        {type: String,},
  ApprovalDateforApplication:   {type: String,},
  FirstDraft  :                 {type: String,},
  ProvisionalCompleteDraftdate: {type: String,},
  TotalCost  :                  {type: String,},
  Comments  :                   {type: String,},
});
const Patent = mongoose.model("Patent", patentSchema);
export default Patent;
