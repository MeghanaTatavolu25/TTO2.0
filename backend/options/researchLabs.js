import uploadFeature   from '@adminjs/upload'
import { HomePage }    from './navigation.js'
import componentLoader from "../Component/component.js"
import Research        from '../collection/research_labs.mjs'
import importExportFeature from "@adminjs/import-export"
import {Admin, Super, LTRC, role} from './roles.js'

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

const ResearchLabs = {
    resource: Research,
    options: {
        id: 'ResearchCenters',
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
            ResearchLogo:           {isVisible: false,}, 
            "ResearchLogo.key":     {isVisible: false,},
            "ResearchLogo.bucket":  {isVisible: false,},
            "ResearchLogo.mimeType":{isVisible: false,},
            "ResearchLogo.filePath":{isVisible: false,},
            "ResearchLogo.filesToDelete":{isVisible: false,},
            "WordCloud.key":        {isVisible: false,},
            "WordCloud.bucket":     {isVisible: false,},
            "WordCloud.mimeType":   {isVisible: false,},
            "WordCloud.filePath":   {isVisible: false,},
            "WordCloud.filesToDelete": {isVisible: false,},
            updated_at:             {isVisible: false,},
        },            
        filterProperties: ['ResearchLabCode', 'Research_Lab',],      
        actions: {
            // new: {
            //   isAccessible:  function ({ currentAdmin }) {
            //     // console.log("New", currentAdmin)
            //     return currentAdmin.role == Super || currentAdmin.role == Admin || currentAdmin.role == role.get();
            //   },
            // },
            // edit: {
            //   isAccessible:  function ({ record, currentAdmin }) {
            //     // console.log("Edit", currentAdmin)
            //     return currentAdmin.role == Super || currentAdmin.role == Admin;
            //   },
            // },
            list: {
              isAccessible:  function (context) {
                const { currentAdmin } = context;
                return currentAdmin.role == Super || currentAdmin.role == Admin || currentAdmin.role == LTRC;
              },
            },
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
                file:       'ResearchLogo.file',        
                key:        'ResearchLogo.key',       //
                bucket:     'ResearchLogo.bucket',    //
                mimeType:   'ResearchLogo.mimeType',  //
                filePath:   'ResearchLogo.filePath',
                filesToDelete: 'ResearchLogo.filesToDelete'
            },
            uploadPath: (record, filename) => {
                return `Research/${record.id()}/${filename}`
            },
        }),
        uploadFeature({
            componentLoader,
            provider: { aws: AWSOptions },
            validation: {
                mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
            },
            properties: {
                file:       'WordCloud.file',        
                key:        'WordCloud.key',       //
                bucket:     'WordCloud.bucket',    //
                mimeType:   'WordCloud.mimeType',  //
                filePath:   'WordCloud.filePath',
                filesToDelete: 'WordCloud.filesToDelete'
            },
            uploadPath: (record, filename) => {
                return `Research/WC/${record.id()}/${filename}`
            },
        }),
    ], 
}

export default ResearchLabs