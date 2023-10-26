import { HomePage }    from './navigation.js'
import uploadFeature   from '@adminjs/upload'
import componentLoader from "../Component/component.js"
import ProductLab      from '../collection/productlab.mjs'
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
 
const ProductLabs = {
    resource: ProductLab,
    options: {
        id: 'Products',
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
            ProductLabImage:                {isVisible: false,},
            "ProductLabImage.key":          {isVisible: false,},
            "ProductLabImage.bucket":       {isVisible: false,},
            "ProductLabImage.mimeType":     {isVisible: false,},
            "ProductLabImage.filePath":     {isVisible: false,},
            "ProductLabImage.filesToDelete":{isVisible: false,},
            ProductLabVideo:                {isVisible: false,},
            "ProductLabVideo.key":          {isVisible: false,},
            "ProductLabVideo.bucket":       {isVisible: false,},
            "ProductLabVideo.mimeType":     {isVisible: false,},
            "ProductLabVideo.filePath":     {isVisible: false,},
            "ProductLabVideo.filesToDelete":{isVisible: false,},
            updated_at:                     {isVisible: false,},
        },
        filterProperties: ['NameOfProduct', 'CentreName'],
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
                file:       'ProductLabImage.file',        
                filePath:   'ProductLabImage.filePath',   
                key:        'ProductLabImage.key',       //
                bucket:     'ProductLabImage.bucket',    //
                mimeType:   'ProductLabImage.mimeType',  //
                filesToDelete: 'ProductLabImage.filesToDelete',
            },
            uploadPath: (record, filename) => {
                return `Product_Lab/${record.id()}/${filename}`
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
                file:       'ProductLabVideo.file',        
                filePath:   'ProductLabVideo.filePath',      //
                key:        'ProductLabVideo.key',       //
                bucket:     'ProductLabVideo.bucket',    //
                mimeType:   'ProductLabVideo.mimeType',  //
                filesToDelete: 'ProductLabVideo.filesToDelete',
            },
            uploadPath: (record, filename) => {
                return `Products/${record.id()}/${filename}`
            },
        }),
    ], 
}

export default ProductLabs