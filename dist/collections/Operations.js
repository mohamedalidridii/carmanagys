"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operations = void 0;
const yourOwn = ({ req: { user } }) => {
    if (user.role === 'agent' || 'admin' || 'topadmin')
        return true;
    return {
        user: {
            equals: user.id
        }
    };
};
exports.Operations = {
    slug: 'operations',
    admin: {
        useAsTitle: 'Operations',
        description: 'Vos commandes precedents',
    },
    access: {
        read: ({ req }) => req.user.role === 'agent' || req.user.role === 'admin' || req.user.role === 'client',
        update: ({ req }) => req.user.role === 'admin' || req.user.role === 'topadmin',
        delete: ({ req }) => req.user.role === 'admin' || req.user.role === 'topadmin',
        create: ({ req }) => req.user.role === 'admin' || req.user.role === 'topadmin',
    },
    fields: [
        {
            name: "userId",
            type: "text",
            required: true,
        },
        {
            name: 'agent',
            type: "text",
            required: true,
        },
        {
            name: 'produit',
            type: "text",
            required: true,
        },
        {
            name: 'lubrifiant',
            type: "text",
            required: true,
        },
        {
            name: 'pointsadded',
            type: "number",
            required: true,
        },
        {
            name: 'total',
            type: "number",
            required: true,
        },
    ]
};
