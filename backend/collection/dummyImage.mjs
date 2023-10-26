import { mongoose } from 'mongoose';

const dummyImageSchema = new mongoose.Schema(
    {
        name: {type: String, required: true,},
        DummyImage: {
            file:       {type: String,},
            filePath:   {type: String,},
            key:        {type: String,},
            bucket:     {type: String,},
            mimeType:   {type: String,},
            filesToDelete: {type: String},
        },
    },
);

const DummyImage = mongoose.model("DummyImages", dummyImageSchema);
export default DummyImage;
