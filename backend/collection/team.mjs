import { mongoose } from 'mongoose';

const teamSchema = new mongoose.Schema(
    {
        Sequence:   {type: Number, required: true,},
        Name:       {type: String, required: true,},
        Designation:{type: String, required: true,},
        EmailId:    {type: String, required: true,},
        LinkedinId: {type: String, required: false, default: "Not Available",},
        ProfilePhoto: {
            file:       {type: String,},
            key:        {type: String, defualt: "DummyImage/64c37c0eb97b01707d1f1bb3/User.png"},
            bucket:     {type: String, default: "tto-asset"},
            mimeType:   {type: String, default: "image/png"},
            filePath:   {type: String,},
        },
        FacultyUrl:  {type: String, required: false, default: ""},
    }
);

const Team = mongoose.model("Teams", teamSchema);
export default Team;
