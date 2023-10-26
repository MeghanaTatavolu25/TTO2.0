import { mongoose } from 'mongoose';
 
const researchSchema = new mongoose.Schema({
        ResearchLabCode: {type: String, required: true},
        Research_Lab:    {type: String, required: true},
        Description:     {type: String, default: "No Description", required: true},
        CurrentResearchAreas: {type: Array, required: true},
        Technologies:    {type: Array, required: true},
        ResearchLogo: {
            file:       {type: String,},
            key:        {type: String, default: "DummyImage/64ae6cc2fe23b9cab2c1baf0/research-defaut.png"},
            bucket:     {type: String, default: "tto-asset"},
            mimeType:   {type: String, default: "image/png"},
            filePath:   {type: String,},
            filesToDelete:{type: String, default: "ResearchLogo"},
        },
        WordCloud: {
            file:       {type: String,},
            key:        {type: String,},
            bucket:     {type: String,},
            mimeType:   {type: String,},
            filePath:   {type: String,},
            filesToDelete:{type: String, default: "WordCloud"},
        }
    },
    { 
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} 
    }
);
const Research = mongoose.model("Research", researchSchema);
export default Research;
