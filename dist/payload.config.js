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
const Utilisateurs_1 = require("./collections/Utilisateurs");
const dotenv_1 = __importDefault(require("dotenv"));
const Produits_1 = require("./collections/Produits/Produits");
const Media_1 = require("./collections/Media");
const Operations_1 = require("./collections/Operations");
const Logo_1 = __importDefault(require("./graphics/Logo"));
const Icon_1 = __importDefault(require("./graphics/Icon"));
const MediaClient_1 = require("./collections/MediaClient");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
exports.default = (0, config_1.buildConfig)({
    // serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    collections: [Utilisateurs_1.Users, Produits_1.Produits, Media_1.Media, MediaClient_1.MediaClient, Operations_1.Operations],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: '- CarManagys',
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.jpg",
        },
        components: {
            graphics: {
                Logo: Logo_1.default,
                Icon: Icon_1.default,
            },
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
