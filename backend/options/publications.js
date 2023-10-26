import { HomePage }        from './navigation.js'
import uploadFeature       from '@adminjs/upload'
import componentLoader     from "../Component/component.js"
import Publication         from '/../collection/Publication.mjs'
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

const Publications = {
    resource: Publication,
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
            _id:                        {isVisible: false},
            PublicationImage:           {isVisible: false},
            "PublicationImage.key":     {isVisible: false},
            "PublicationImage.bucket":  {isVisible: false},
            "PublicationImage.mimeType":{isVisible: false},
            "PublicationImage.filePath":{isVisible: false},
        },
    },

    features: [
        importExportFeature({ componentLoader }),
        uploadFeature({
            componentLoader,
            provider: { aws: AWSOptions },
            validation: {
                mimeTypes: ['application/pdf'],
            },
            properties: {
                file:       'PublicationImage.file',        
                key:        'PublicationImage.key',       //
                bucket:     'PublicationImage.bucket',    //
                mimeType:   'PublicationImage.mimeType',  //
                filePath:   'PublicationImage.filePath',
            },
            uploadPath: (record, filename) => {
                return `Publications/${record.id()}/${filename}`
            },
        }),
    ], 
}

export default Publications