"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("payload/config");
const db_postgres_1 = require("@payloadcms/db-postgres");
const richtext_slate_1 = require("@payloadcms/richtext-slate");
const bundler_webpack_1 = require("@payloadcms/bundler-webpack");
const path_1 = __importDefault(require("path"));
const Users_1 = require("./collections/Users");
const dotenv_1 = __importDefault(require("dotenv"));
const Products_1 = require("./collections/Products/Products");
const Media_1 = require("./collections/Media");
const Operations_1 = require("./collections/Operations");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users_1.Users, Products_1.Products, Media_1.Media, Operations_1.Operations],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: '- Digital',
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_postgres_1.postgresAdapter)({
        pool: {
            connectionString: process.env.DATABASE_URL,
        }
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "cms-types.ts"),
    }
});
