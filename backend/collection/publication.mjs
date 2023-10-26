import { mongoose } from 'mongoose';
 
const publicationSchema = new mongoose.Schema({
    Title:          {type: String, required: true, },
    Report_Number:  {type: String, required: true, },
    Author:         {type: Array, required: true, },
    Published_Date: {type: Date, required: true, },
    Location:       {type: String, required: true, },
    Publication_Type: {type: mongoose.Schema.Types.ObjectId, ref: 'PublicationType', required: true, }, // Dropdown(Books, Journal Papers, Conference Papers, Technical Reports, Master Theses, PHD Thesis)
    CenterName:     {type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCenters', required: true},
    Publisher:      {type: String, required: true, },
    PublicationImage: {
        file:       {type: String,},
        key:        {type: String,},
        bucket:     {type: String,},
        mimeType:   {type: String,},
        filePath:   {type: String,},
    },
});
const Publication = mongoose.models.Publication || mongoose.model("Publication", publicationSchema);
export default Publication;
