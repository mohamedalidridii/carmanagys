"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const isAdminOrHasAccessToImages = () => ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user)
        return false;
    if (user.role === 'topadmin')
        return true;
    return {
        user: {
            equals: req.user.id,
        },
    };
});
exports.Media = {
    slug: "media",
    hooks: {
        beforeChange: [({ req, data }) => {
                return Object.assign(Object.assign({}, data), { user: req.user.id });
            },
        ],
    },
    access: {
        read: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const referer = req.headers.referer;
            if (!req.user || !(referer === null || referer === void 0 ? void 0 : referer.includes('sell'))) {
                return true;
            }
            return yield isAdminOrHasAccessToImages()({ req });
        }),
        delete: isAdminOrHasAccessToImages(),
        update: isAdminOrHasAccessToImages()
    },
    admin: {
        hidden: ({ user }) => user.role !== "Topadmin",
    },
    upload: {
        staticURL: "/media",
        staticDir: "media",
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        mimeTypes: ["image/*"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => true,
            },
        }
    ]
};
