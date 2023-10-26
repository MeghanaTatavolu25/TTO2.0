import { HomePage }    from './navigation.js'
import uploadFeature   from '@adminjs/upload'
import StartUp         from '../collection/startup.mjs'
import componentLoader from "../Component/component.js"
import {Super, Admin, CIE} from './roles.js'
import importExportFeature from "@adminjs/import-export"
import pdfGenerator from '../Component/pdfgenerator.js'
import ShortenedParagraph from '../Component/shortenParagraph.js'

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

const StartUPs = {
    resource: StartUp,
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
            "StartUpLogo.key":      {isVisible: false,},
            "StartUpLogo.bucket":   {isVisible: false,},
            "StartUpLogo.mimeType": {isVisible: false,},
            "StartUpLogo.filePath": {isVisible: false,},
            // StartUpLogo:            {isVisible: false,},
            updated_at:             {isVisible: false,},
        },
        filterProperties: ['StartUp_Name'], 
        actions: {
            new: {
              isAccessible:  function ({ currentAdmin }) {
                return currentAdmin.role == Super || currentAdmin.role == Admin || currentAdmin.role == CIE;
              },
            },
            edit: {
              isAccessible:  function ({ currentAdmin }) {
                return currentAdmin.role == Super || currentAdmin.role == Admin || currentAdmin.role == CIE;
              },
            },
            list: {
              isAccessible:  function ({ currentAdmin }) {
                return currentAdmin.role == Super || currentAdmin.role == Admin || currentAdmin.role == CIE;
              },
            },
          },
        // actions: {
        //     PDFGenerator: {
        //         actionType: 'record',
        //         icon: 'GeneratePdf',
        //         component: Components.PDFGenerator,
        //         handler: (request, response, context) => {
        //             const { record, currentAdmin } = context
        //             return {
        //                 record: record.toJSON(currentAdmin),
        //                 url: pdfgenerator(record.toJSON(currentAdmin))
        //             }
        //         }
        //     }
        // }
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
                file:       'StartUpLogo.file',        
                key:        'StartUpLogo.key',       //
                bucket:     'StartUpLogo.bucket',    //
                mimeType:   'StartUpLogo.mimeType',  //
                filePath:   'StartUpLogo.filePath',
            },  
            uploadPath: (record, filename) => {
                return `StartUp/${record.id()}/${filename}`
            },
        }),
    ],
}

export default StartUPs