import uploadFeature        from '@adminjs/upload'
import importExportFeature  from "@adminjs/import-export"

import {HomePage}       from './navigation.js';
import Faculty          from '../collection/faculties.mjs';
import componentLoader  from "../Component/component.js"

const AWS_S3_BUCKET="tto-asset"
const AWS_S3_REGION="ap-south-1"
const AWS_ACCESS_KEY_ID= "AKIA3BOLL3RQYEWKMV4B"
const AWS_ACCESS_KEY_SECRET= "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"

const AWSOptions = {
    bucket: AWS_S3_BUCKET,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_ACCESS_KEY_SECRET,
    },
    region: AWS_S3_REGION,
}

const Faculties = {
    resource: Faculty,
    options: {
        navigation: HomePage,
        bio: {
            isVisible: {
                edit: true,
                show: true,
                list: true,
                filter: true,
            },
        },
        properties: {
            _id:                    {isVisible: false,},
            FacultyImage:           {isVisible: false,},
            "FacultyImage.key":     {isVisible: false,},
            "FacultyImage.bucket":  {isVisible: false,},
            "FacultyImage.mimeType":{isVisible: false,},
            "FacultyImage.filePath":{isVisible: false,},
            updated_at:             {isVisible: false,},
        },
    },
    features: [
        importExportFeature({ componentLoader }),
        uploadFeature({
            componentLoader,
            provider: { aws: AWSOptions },
            validation: {
                mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
            },
            properties: {
                key: 'FacultyImage.key',
                file: 'FacultyImage.file',
                bucket: 'FacultyImage.bucket',
                mimeType: 'FacultyImage.type',
                filePath: 'FacultyImage.filePath',
            },
            uploadPath: (record, filename) => {
                return `Faculties/${record.id()}/${filename}`
            },
        }),
    ], 
}

export default Faculties