import { mongoose } from 'mongoose';
 
const TechnologySchema = new mongoose.Schema(
    { 
        NameOfTechnology:   {type: String, required: true},         // TechnologyTitle
        CentreName:         {type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCenters', required: true},        // ResearchCentre
        ResearchAreas:      {type: Array, required: false,},         // Researcharea
        Keywords:           {type: Array, required: false, default: "Not Available",},         // Keyword
        Description:        {type: String, required: true},         // TechnologyDescription
        TypeOfWork:         {type: String, required:false},         // Typeofwork
        CurrentStateOfWork: {type: String, required: false},        // Currentstateofwork
        PotentialApplication: {type: Array, required: false},       // Potentialapplicationareas
        RelatedPublication: {type: Array, required: false},         // RelatedPublications
        DemoLink:           {type: String, required: false},        // DemoVideo
        FacultyName:        {type: Array, required: false, default: "Not Available",},         // FacultyName
        TechnologyImage: {
            file:       {type: String,},
            filePath:   {type: String, default: "https://tto-asset.s3.ap-south-1.amazonaws.com/DummyImage/64b6398d1ec817dc6200abe4/technology-default.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3BOLL3RQYEWKMV4B%2F20230718%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230718T070446Z&X-Amz-Expires=86400&X-Amz-Signature=655c2c59d266661a39378b3161be63112023049869f0c848609617f4ee7eed1b&X-Amz-SignedHeaders=host&x-id=GetObject"},
            key:        {type: String, default: "DummyImage/64b6398d1ec817dc6200abe4/technology-default.png"},
            bucket:     {type: String, default: "tto-asset"},
            mimeType:   {type: String, default: "image/png"},
            filesToDelete: {type: String, default: "TechnologyImage"},
        },
        TechnologyVideo: {
            file:       {type: String,},
            filePath:   {type: String,},
            key:        {type: String,},
            bucket:     {type: String,},
            mimeType:   {type: String,},
            filesToDelete: {type: String, default: "TechnologyVideo",},
        },
    },
    { 
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} 
    }
    );
const Technology = mongoose.model("technologies", TechnologySchema);
export default Technology;
 