import path                 from 'path'
import cors                 from 'cors'                                     
import dotnev               from 'dotenv'
import AdminJS              from 'adminjs'
import express              from 'express'
import session              from 'express-session'
import * as url             from 'url'                      
import MongoDBStore         from 'connect-mongodb-session'
import AdminJSExpress       from '@adminjs/express'
import { fileURLToPath }    from 'url';
import * as AdminJSMongoose from '@adminjs/mongoose'

import connectDB       from './config/db.mjs'
import authenticate    from './config/adminauthentication.js'
import { apiRouter }   from './api.js'
import componentLoader from "./Component/component.js"
// import {Components} from "./Component/component.js"

// For Resources
import Teams           from './options/team.js'
import Patents         from './options/patent.js'
import Statuses        from './options/status.js'
import StartUPs        from './options/startup.js'
import UserRoles       from './options/userRole.js'
import Industries      from './options/industry.js'
import JobSeekers      from './options/jobSeeker.js'
import DummyImages     from './options/dummyImage.js'
import ProductLabs     from './options/productLab.js'
import Technologies    from './options/technologies.js'
import ResearchLabs    from './options/researchLabs.js'
import userResource    from './options/userResources.js'
import Entrepreneurs   from './options/entrepreneur.js'
import PublicationType from './options/publicationType.js'

dotnev.config("./.env")
const PORT = process.env.PORT || 3002

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const MongoStore = MongoDBStore(session);
connectDB()

const sessionStore = new MongoStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions', // Name of the collection to store sessions
});

sessionStore.on('error', (error) => {
  console.error('MongoDB session store error:', error);
});

const Locale = {
  locale: { 
    language: 'en',
    availableLanguages: ['en'],
    translations: { 
      en: { 
        messages:{
          welcomeOnBoard_title: 'Welcome to Product Lab - Admin',
          welcomeOnBoard_subtitle:'Use this website to manage content of Product Lab Website.',
        },
        components: {
          Login:{
            welcomeHeader: "Product Lab - Admin",
            welcomeMessage: "Product labs is the market relevant product engineering arm of technology transfer office (TTO). This Admin websiter of Product Lab is used to manage content.",
          },
        }
      }, 
    }, 
  },
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const start = async () => {
  const app = express()
  app.use(express.static(path.join(__dirname, "./public")));
  app.use(express.static(path.join(__dirname, './PDFs/')))

  const admin = new AdminJS({
      resources: [ 
        ResearchLabs,
        Technologies,
        ProductLabs,
        Patents,
        StartUPs,
        Teams,

        JobSeekers,
        Entrepreneurs,
        Industries,
        
        Statuses,
        PublicationType,
        UserRoles,
        userResource,
        DummyImages,
      ],
      componentLoader,
      rootPath: '/admin',
      loginPath: '/admin/login',
      logoutPath: '/admin/logout',
      locale: Locale.locale,      // or ...Locale, 
      branding: {
        companyName: 'TTO',
        logo: "https://www.iiit.ac.in/img/iiit-new.png",
        withMadeWithLove: false,
        favicon: "https://www.iiit.ac.in/img/iiit-new.png",
      },
      assets: {
        styles: ["/font2.css"],
      },
    })

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    }, 
    null, 
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: process.env.secret,
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production', // 'production',
        secure: process.env.NODE_ENV === 'production'    // 'production'
      },
      name: 'adminjs',
    }
  ); 
  app.enable('trust proxy');
  app.use(cors({ credentials: true, origin: ["*","http://localhost:3000", "https://tto.iiit.ac.in"]}));
  app.use(admin.options.rootPath, adminRouter)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));  
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
  
  app.use('/api', apiRouter);
}

start()
 