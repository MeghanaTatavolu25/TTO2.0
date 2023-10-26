import { Super, Admin} from './roles.js'
import uploadFeature   from '@adminjs/upload'
import { HomePage }    from './navigation.js'
import Team            from '../collection/team.mjs'
import componentLoader from "../Component/component.js"
import importExportFeature from "@adminjs/import-export"

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

const Teams = {
    resource: Team,
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
            _id:                    {isVisible: false},
            // Sequence:               {isVisible: false},
            ProfilePhoto:           {isVisible: false},
            "ProfilePhoto.key":     {isVisible: false},
            "ProfilePhoto.bucket":  {isVisible: false},
            "ProfilePhoto.mimeType":{isVisible: false},
            "ProfilePhoto.filePath":{isVisible: false},
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
        filterProperties: ['Name'], 
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
                file:       'ProfilePhoto.file',        
                key:        'ProfilePhoto.key',       //
                bucket:     'ProfilePhoto.bucket',    //
                mimeType:   'ProfilePhoto.mimeType',  //
                filePath:   'ProfilePhoto.filePath',
            },  
            uploadPath: (record, filename) => {
                return `Teams/${record.id()}/${filename}`
            },
        }),
    ],
}

export default Teams