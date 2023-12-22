import { PRODUCT_CATEGORIES } from "../../config";
export var Products = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: function (_a) {
            var req = _a.req;
            return req.user.role === 'topadmin';
        },
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'topadmin';
        },
        create: function (_a) {
            var req = _a.req;
            return req.user.role === 'topadmin';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'topadmin';
        },
    },
    fields: [
        { name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
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
            options: PRODUCT_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true, },
        { name: "points",
            label: 'Points de fidélité',
            min: 0,
            max: 10000000,
            type: "number",
            required: true,
        },
        { name: "priceId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            } },
        { name: "stripeId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            }, },
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
