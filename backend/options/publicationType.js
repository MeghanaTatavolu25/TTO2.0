import { Super }        from './roles.js'
import { Dropdown }     from './navigation.js';
import Publication_Type from '../collection/publicationType.mjs';

const PublicationType = {
    resource: Publication_Type,
    options: {
        navigation: Dropdown,
        properties: {
          _id: { isVisible: false },
        }, 
        actions: {
            new: {
                isAccessible:  function ({ currentAdmin }) {
                  return currentAdmin.role == Super;
                },
            },
            edit: {
                isAccessible:  function ({ currentAdmin }) {
                  return currentAdmin.role == Super;
                },
            },
            list: {
                isAccessible:  function ({ currentAdmin }) {
                  return currentAdmin.role == Super;
                },
            },
        },
    },
} 
export default PublicationType;  