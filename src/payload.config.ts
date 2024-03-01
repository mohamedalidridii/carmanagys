import { buildConfig } from "payload/config";
import { postgresAdapter } from '@payloadcms/db-postgres'
import {slateEditor} from '@payloadcms/richtext-slate'
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Utilisateurs";

import dotenv from "dotenv";
import { Produits } from "./collections/Produits/Produits";
import { Media } from "./collections/Media";
import { Operations } from "./collections/Operations";
import Logo from './graphics/Logo';
import Icon from './graphics/Icon';
import { MediaClient } from "./collections/MediaClient";

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
})

export default buildConfig({
    // serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ,
    collections: [Users, Produits, Media, MediaClient, Operations],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- CarManagys',
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
    },
    components: {
        views:{
            

        },
        graphics: {
          Logo: Logo,
          Icon: Icon,
        },
      },
    
},
rateLimit: {
    max: 2000,
},
    editor: slateEditor({}),
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL,
        }
    }),
    typescript:{
        outputFile: path.resolve(__dirname,"cms-types.ts"),
    }
})