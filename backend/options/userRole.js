import { Super }        from './roles.js'
import {UserManagement} from './navigation.js'
import UserRole         from '../collection/userRole.mjs'

const UserRoles = {
    resource: UserRole,
    options: {
        navigation: UserManagement,
        actions: {
            new: {
                isAccessible:  function ({ currentAdmin }) {
                  const myObjectId = currentAdmin.role;
                  const myObjectIdString = myObjectId.toString()
                  return currentAdmin.role == Super;
                },
            },
            edit: {
                isAccessible:  function ({ currentAdmin }) {
                  const myObjectId = currentAdmin.role;
                  const myObjectIdString = myObjectId.toString()
                  return currentAdmin.role == Super;
                },
            },
            list: {
                isAccessible:  function ({ currentAdmin }) {
                  const myObjectId = currentAdmin.role;
                  const myObjectIdString = myObjectId.toString()
                  return currentAdmin.role == Super;
                },
            },
        },
    },
} 
export default UserRoles; 