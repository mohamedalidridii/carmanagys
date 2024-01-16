import { buildConfig } from "payload/config";
import { postgresAdapter } from '@payloadcms/db-postgres'
import {slateEditor} from '@payloadcms/richtext-slate'
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Utilisateur } from "./collections/Utilisateurs";

import dotenv from "dotenv";
import { Produits } from "./collections/Produits/Produits";
import { Media } from "./collections/Media";
import { Operations } from "./collections/Operations";
import Logo from './graphics/Logo';
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
})


export default buildConfig({
    // serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ,
    collections: [Utilisateur, Produits, Media, Operations],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- Digital',
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
    },
    components: {
        graphics: {
          Logo,
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