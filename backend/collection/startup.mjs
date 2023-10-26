import { mongoose } from 'mongoose';

const startupSchema = new mongoose.Schema(
    {
        StartUp_Name:    {type: String, required: true },
        Idea_Description:{type: String, required: false, default: 'Idea Description'}, //true
        StartUpLogo: {
            file:       {type: String,},
            key:        {type: String, default: 'DummyImage/64acddd2055d2cf043b5cefb/startup-default.png'},
            bucket:     {type: String, default: "tto-asset",},
            mimeType:   {type: String, default: "image/image/png"},
            filePath:   {type: String,},
        },
        Website:         {type: String, required: false},
        Founder_Name:    {type: String, required: true, default: "Not Available",},
        CoFounder_Name:  {type: String, required: false,},
        Centre_Name:     {type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCenters', required: true},
        Professor_Name:  {type: String, required: false, default: "Not Available",},
    },
    { 
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} 
    }
);

const StartUp = mongoose.model("StartUp", startupSchema);
export default StartUp;
