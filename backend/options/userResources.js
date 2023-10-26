import argon2            from 'argon2'
import { Super }         from './roles.js'
import {UserManagement}  from './navigation.js'
import passwordsFeature  from '@adminjs/passwords'
import componentLoader   from "../Component/component.js"
import CreateUser        from '../collection/userSchema.mjs'
import importExportFeature from "@adminjs/import-export"

const userResource = {
  resource: CreateUser,
  options: {
    navigation: UserManagement,
    properties:{
      _id:      {isVisible: false,},
      password: {isVisible: false,},
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
  features: [
    importExportFeature({ componentLoader }),
    passwordsFeature({
      componentLoader,
      properties: { 
        encryptedPassword: 'password',
        password: 'Password', 
      },
      hash: argon2.hash,
    }),
  ],
};

export default userResource;
