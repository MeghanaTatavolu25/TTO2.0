import { mongoose } from 'mongoose';
 
const ProductLabSchema = new mongoose.Schema(
    { 
        NameOfProduct:      {type: String, required: true},         // TechnologyTitle
        CentreName:         {type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCenters', required: true},        // ResearchCentre
        ResearchAreas:      {type: Array, required: false},         // Researcharea
        Keywords:           {type: Array, required: false, default: "Not Available",},         // Keyword
        TechnologyUsed:     {type: mongoose.Schema.Types.ObjectId, ref: 'Technologies', required: true },
        Description:        {type: String, required: true},         // TechnologyDescription
        TypeOfWork:         {type: String, required:false},         // Typeofwork
        CurrentStateOfWork: {type: String, required: false},        // Currentstateofwork
        PotentialApplication: {type: Array, required: false},       // Potentialapplicationareas
        RelatedPublication: {type: Array, required: false},         // RelatedPublications
        DemoLink:           {type: String, required: false},        // DemoVideo
        FacultyName:        {type: Array, required: false, default: "Not Available",},         // FacultyName
        ProductLabImage: {
            file:       {type: String,},
            filePath:   {type: String, default: "https://tto-asset.s3.ap-south-1.amazonaws.com/DummyImage/64c3792ab7e2070545dacb8d/product-default.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3BOLL3RQYEWKMV4B%2F20230728%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230728T081540Z&X-Amz-Expires=86400&X-Amz-Signature=a13c0779e389a1c4948cfd8c7db40ad4299ee28a1306061f5e7bb26591942fd9&X-Amz-SignedHeaders=host&x-id=GetObject"},
            key:        {type: String, default: "DummyImage/64c3792ab7e2070545dacb8d/product-default.png"},
            bucket:     {type: String, default: "tto-asset"},
            mimeType:   {type: String, default: "image/png"},
            filesToDelete: {type: String, default: "ProductLabImage"},
        },
        ProductLabVideo: {
            file:       {type: String,},
            filePath:   {type: String,},
            key:        {type: String,},
            bucket:     {type: String,},
            mimeType:   {type: String,},
            filesToDelete: {type: String,default: "ProductLabVideo"},
        },
    },
    { 
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} 
    }
    );
const ProductLab = mongoose.model("ProductLab", ProductLabSchema);
export default ProductLab;
 