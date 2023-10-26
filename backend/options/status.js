import { Super }    from './roles.js'
import { Dropdown } from './navigation.js';
import PatentStatus from '../collection/status.mjs';

const Statuses = {
    resource: PatentStatus,
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
export default Statuses; 