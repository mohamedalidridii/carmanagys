"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produits = void 0;
const config_1 = require("../../config");
exports.Produits = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: ({ req }) => req.user.role === 'topadmin' || req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'topadmin' || req.user.role === 'admin',
        create: ({ req }) => req.user.role === 'topadmin' || req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'topadmin' || req.user.role === 'admin',
    },
    fields: [
        { name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
        { name: "name",
            label: 'Name',
            type: "text",
            required: true,
        },
        { name: "description",
            label: 'Description',
            type: "textarea",
        },
        { name: 'price',
            label: 'Price in USD',
            min: 0,
            max: 1000,
            type: "number",
            required: true,
        },
        { name: "category",
            label: 'Categories',
            type: "select",
            options: config_1.PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
            required: true,
        },
        { name: "points",
            label: 'Points de fidélité',
            min: 0,
            max: 10000000,
            type: "number",
            required: true,
        },
        { name: "priceId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            }
        },
        { name: "stripeId",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        { name: 'images',
            type: 'array',
            label: 'Product images',
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: 'Image',
                plural: 'Images',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ],
        }
    ],
};
