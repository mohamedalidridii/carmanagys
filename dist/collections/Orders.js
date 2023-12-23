"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
var yourOwn = function (_a) {
    var user = _a.req.user;
    if (user.role === 'agent' && 'admin' && 'topadmin')
        return true;
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id
        }
    };
};
exports.Orders = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Your Orders',
        description: 'Vos commandes precedents',
    },
    access: {
        read: yourOwn,
        update: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin' || req.user.role === 'agent';
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin' || req.user.role === 'agent';
        },
        create: function (_a) {
            var req = _a.req;
            return req.user.role === 'admin' || req.user.role === 'agent';
        },
    },
    fields: [
        {
            name: "userId",
            type: "text",
            access: {
                read: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin' || req.user.role === 'client';
                },
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
            },
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
            name: 'points',
            type: "text",
            required: true,
        },
        {
            name: 'total',
            type: "text",
            required: true,
        },
    ]
};
