import { buildConfig } from "payload/config";
import { postgresAdapter } from '@payloadcms/db-postgres'
import {slateEditor} from '@payloadcms/richtext-slate'
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";

import dotenv from "dotenv";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { Operations } from "./collections/Operations";

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
})


export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Products, Media, Operations],
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