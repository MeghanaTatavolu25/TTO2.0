import uploadFeature   from '@adminjs/upload'
import { ContactUs }   from './navigation.js'
import componentLoader from "../Component/component.js"
import JobSeeker       from '../collection/jobSeeker.mjs'
import { Super, Admin} from './roles.js'
import importExportFeature from "@adminjs/import-export"

const AWS_S3_BUCKET="tto-asset"
const AWS_S3_REGION="ap-south-1"
const AWS_ACCESS_KEY_ID= "AKIA3BOLL3RQYEWKMV4B"
const AWS_ACCESS_KEY_SECRET= "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"

const AWSOptions = {
    region: AWS_S3_REGION,
    bucket: AWS_S3_BUCKET,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_ACCESS_KEY_SECRET,
    },
}

const JobSeekers = {
    resource: JobSeeker,
    options: {
        navigation: ContactUs,
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
            UploadResume:           {isVisible: false,},
            "UploadResume.key":     {isVisible: false,},
            "UploadResume.bucket":  {isVisible: false,},
            "UploadResume.mimeType":{isVisible: false,},
            "UploadResume.filePath":{isVisible: false,},
            updated_at:             {isVisible: false,},
        },
        actions: {
            new: {
              isAccessible:  function ({ currentAdmin }) {
                return currentAdmin.role == Super || currentAdmin.role == Admin;
              },
            },
            edit: {
              isAccessible:  function ({ currentAdmin }) {
                return currentAdmin.role == Super || currentAdmin.role == Admin;
              },
            },
            list: {
              isAccessible:  function ({ currentAdmin }) {
                return currentAdmin.role == Super || currentAdmin.role == Admin;
              },
            },
        },
        filterProperties: ['Name', 'Position'], 
    },
    features: [
        importExportFeature({ componentLoader }),
        uploadFeature({
            componentLoader,
            provider: { aws: AWSOptions },
            validation: {
                mimeTypes: ['application/pdf',],
            },
            properties: {
                file:       'UploadResume.file',        
                key:        'UploadResume.key',       //
                bucket:     'UploadResume.bucket',    //
                mimeType:   'UploadResume.mimeType',  //
                filePath:   'UploadResume.filePath',
            },  
            uploadPath: (record, filename) => {
                return `JobSeeker/${record.id()}/${filename}`
            },
        }),
    ], 
}

export default JobSeekers