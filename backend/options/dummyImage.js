import { Dropdown }     from './navigation.js'
import uploadFeature    from '@adminjs/upload'
import componentLoader  from "../Component/component.js"
import DummyImage       from '../collection/dummyImage.mjs'
import { Super }        from './roles.js'
import { after as uploadAfterHook, before as uploadBeforeHook } from '../actions/upload-image.hook.js'

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

const DummyImages = {
    resource: DummyImage,
    options: {
        navigation: Dropdown,
        actions: {
            new: {
                isAccessible:  function ({ currentAdmin }) {
                  return currentAdmin.role == Super;
                },
                after: uploadAfterHook,
                before: uploadBeforeHook,
            },
            edit: {
                isAccessible:  function ({ currentAdmin }) {
                  return currentAdmin.role == Super;
                },
                after: uploadAfterHook,
                before: uploadBeforeHook,
            },
            list: {
                isAccessible:  function ({ currentAdmin }) {
                  return currentAdmin.role == Super;
                },
            },
        },
        properties: {
            _id:                    {isVisible: false,},
            DummyImage:             {isVisible: false,},
            "DummyImage.key":       {isVisible: false,},
            "DummyImage.bucket":    {isVisible: false,},
            "DummyImage.mimeType":  {isVisible: false,},
            "DummyImage.filePath":  {isVisible: false,},
            "DummyImage.filesToDelete": {isVisible: false,},
        },
    },
    features: [
        uploadFeature({
            componentLoader,
            provider: { aws: AWSOptions },
            validation: {
                mimeTypes: [
                    'image/jpeg', 
                    'image/jpg', 
                    'image/png', 
                    'video/x-msvideo',
                    'video/mpeg',
                    'video/ogg',
                    'video/mp2t',
                    'video/webm',
                    'video/3gpp',
                    'video/3gpp2',
                ],
            },
            properties: {
                file:       'DummyImage.file',        
                filePath:   'DummyImage.filePath',  //
                key:        'DummyImage.key',       //
                bucket:     'DummyImage.bucket',    //
                mimeType:   'DummyImage.mimeType',  //
                filesToDelete:  'DummyImage.filesToDelete',
            },  
            uploadPath: (record, filename) => {
                return `DummyImage/${record.id()}/${filename}`
            },
        }),
    ],
}

export default DummyImages