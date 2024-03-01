import {Access, CollectionConfig } from "payload/types";


const admins: Access = ({req: {user}}) => {
    if(user.role === 'agent' || 'admin' || 'topadmin') return true
    return {
        user: {
            equals: user.id
        }
    }
}

export const Operations: CollectionConfig = {
    slug: 'operations',
    admin: {
        group: 'Operations',
        useAsTitle: 'Operations',
        description:
        'Vos commandes precedents',
    },
    access: {
        read: ({ req }) => req.user.role === 'agent'|| req.user.role === 'admin' || req.user.role === 'client' || req.user.role === 'topadmin',
        update: ({ req }) => req.user.role === 'admin' || req.user.role === 'topadmin',
        delete: ({ req }) => req.user.role === 'admin'|| req.user.role === 'topadmin',
        create: ({ req }) => req.user.role === 'agent'|| req.user.role === 'admin'|| req.user.role === 'topadmin',
      },
    fields:[
        {
            name: "userId",
            type: "text",
            required: true,
            label: {
                en: 'Client ID',
                fr: 'ID Client',
              },
        },
        {
            name: "userName",
            type: "text",
            required: true,
            label: {
                en: 'Client full Name',
                fr: 'Client',
              },
        },
        {
            name: 'agent',
            type: "text",
            required: true,
            label: {
                en: 'Agent ID',
                fr: 'ID Agent',
              },
        },
        {
            name: 'agentName',
            type: "text",
            required: true,
            label: {
                en: 'Agent Name',
                fr: 'Agent',
              },
        },
        {
            name: 'produit',
            type: "text",
            required: true,
            label: {
                en: 'Product Name',
                fr: 'Produit(s)',
              },
        },
        {
            name: 'distributeur',
            type: "text",
            required: true,
            label: {
                en: 'Pompe',
            fr: 'Numero de Pompe',
              },
        },
        {
            name: 'lubrifiant',
            type: "text",
            required: true,
            label: {
                en: 'Carburant en DT',
                fr: 'Carburant en DT',
              },
        },
        {
            name: 'pointsadded',
            type: "number",
            required: true,
            label: {
                en: 'les Points ajoutés',
                fr: 'les Points ajoutés',
              },
        },
        {
            name: 'total',
            type: "number",
            required: true,
        },
    ]
}