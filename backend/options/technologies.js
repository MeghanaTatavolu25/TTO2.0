import { HomePage }    from './navigation.js'
import uploadFeature   from '@adminjs/upload'
import Technology      from '../collection/technologies.mjs'
import componentLoader from "../Component/component.js"
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
 
const Technologies = {
    resource: Technology,
    options: {
        id: 'Technologies',
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
            _id:                            {isVisible: false,},
            TechnologyImage:                {isVisible: false,},
            "TechnologyImage.key":          {isVisible: false,},
            "TechnologyImage.bucket":       {isVisible: false,},
            "TechnologyImage.mimeType":     {isVisible: false,},
            "TechnologyImage.filePath":     {isVisible: false,},
            "TechnologyImage.filesToDelete":{isVisible: false,},
            TechnologyVideo:                {isVisible: false,},
            "TechnologyVideo.key":          {isVisible: false,},
            "TechnologyVideo.bucket":       {isVisible: false,},
            "TechnologyVideo.mimeType":     {isVisible: false,},
            "TechnologyVideo.filePath":     {isVisible: false,},
            "TechnologyVideo.filesToDelete":{isVisible: false,},
            updated_at:                     {isVisible: false,},
        },
        filterProperties: ['NameOfTechnology', 'CentreName'], 
    },
    features: [
        importExportFeature({ componentLoader }),
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
                    'video/3gpp2'
                ],
            },
            properties: {
                file:       'TechnologyImage.file',        
                filePath:   'TechnologyImage.filePath',      //
                key:        'TechnologyImage.key',       //
                bucket:     'TechnologyImage.bucket',    //
                mimeType:   'TechnologyImage.mimeType',  //
                filesToDelete: 'TechnologyImage.filesToDelete',
            },
            uploadPath: (record, filename) => {
                return `Technologies/${record.id()}/${filename}`
            }, 
        }),
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
                file:       'TechnologyVideo.file',        
                filePath:   'TechnologyVideo.filePath',      //
                key:        'TechnologyVideo.key',       //
                bucket:     'TechnologyVideo.bucket',    //
                mimeType:   'TechnologyVideo.mimeType',  //
                filesToDelete: 'TechnologyVideo.filesToDelete',
            },
            uploadPath: (record, filename) => {
                return `Technologies/${record.id()}/${filename}`
            },
        }),
    ], 
}

export default Technologies