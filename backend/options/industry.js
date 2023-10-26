import {Super, Admin}  from './roles.js'
import { ContactUs }   from './navigation.js';
import Industry        from '../collection/industry.mjs'
import componentLoader from "../Component/component.js"
import importExportFeature from "@adminjs/import-export"

const Industries = {
    resource: Industry,
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
            _id:{ isVisible: false },
        },
        filterProperties: ['Name_of_comapny', 'Contact_person_Name'], 
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
        features: [
          importExportFeature({ componentLoader }),
        ],
    },
}

export default Industries



