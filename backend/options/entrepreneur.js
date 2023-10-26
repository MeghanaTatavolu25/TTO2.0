import { ContactUs }       from './navigation.js';
import Entrepreneur        from '../collection/entrepreneur.mjs';
import {Super, Admin}      from './roles.js'
import componentLoader     from "../Component/component.js"
import importExportFeature from "@adminjs/import-export"

const Entrepreneurs = {
    resource: Entrepreneur,
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
        filterProperties: ['StartUp_Name', 'Founder_Name'], 
        properties: {
            _id: { isVisible: false },
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
        features: [
          importExportFeature({ componentLoader }),
        ],
    },
}
export default Entrepreneurs