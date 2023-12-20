import {Access, CollectionConfig } from "payload/types";


const yourOwn: Access = ({req: {user}}) => {
    if(user.role === 'agent' && 'admin' && 'topadmin') return true

    return {
        user: {
            equals: user?.id
        }
    }
}

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Your Orders',
        description:
        'Vos commandes precedents',
    },
    access: {
        read: yourOwn,
        update: ({req}) => req.user.role === 'admin' || req.user.role === 'agent',
        delete: ({req}) => req.user.role === 'admin' || req.user.role === 'agent',
        create: ({req}) => req.user.role === 'admin' || req.user.role === 'agent',
    },
    fields:[
        {
            name: "userId",
            type: "text",
            access: {
                read: ({req}) => req.user.role === 'admin' || req.user.role === 'client',
                create: ({req}) => req.user.role === 'admin',

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
}