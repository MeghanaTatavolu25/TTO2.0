import { HomePage }        from './navigation.js';
import Patent              from '../collection/patent.mjs';
import importExportFeature from "@adminjs/import-export"
import componentLoader     from "../Component/component.js"

const Patents = {
    resource: Patent,
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
            _id: { isVisible: false},
        },
        filterProperties: ['Title', 'Patent_Number'], 
    },
    features: [
        importExportFeature({ componentLoader }),
      ],
} 
export default Patents