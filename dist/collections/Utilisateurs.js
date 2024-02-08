"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const anyone_1 = require("./anyone");
const admins = ({ req: { user } }) => {
    if (user.role === 'agent' || 'admin' || 'topadmin')
        return true;
    return {
        user: {
            equals: user.id
        }
    };
};
exports.Users = {
    slug: "users",
    labels: {
        singular: {
            en: 'User',
            fr: 'Utilisateur'
        },
        plural: {
            en: 'Users',
            fr: 'Utilisateurs'
        }
    },
    admin: {
        hidden: ({ user }) => user.role === 'client',
        useAsTitle: 'Utilisateurs',
    },
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-client?token=${token}'>Verify Client</a>`;
            },
        }
    },
    access: {
        create: anyone_1.anyone,
        read: admins,
        update: ({ req }) => req.user.role === 'admin' || req.user.role === 'topadmin',
        delete: ({ req }) => req.user.role === 'admin' || req.user.role === 'topadmin',
    },
    fields: [
        {
            name: 'role',
            defaultValue: 'client',
            required: true,
            type: 'select',
            options: [
                { value: 'topadmin', label: 'TopAdmin' },
                { value: 'admin', label: 'Admin' },
                { value: 'agent', label: 'Agent' },
                { value: 'client', label: 'Client' },
            ],
        },
        {
            name: 'nom',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'prenom',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'tel',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'points',
            defaultValue: 0,
            required: false,
            type: "number",
        },
        {
            name: 'matricule',
            label: {
                en: 'Immatriculation',
                fr: 'Immatriculation',
            },
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'marque',
            defaultValue: 'Select',
            required: true,
            type: 'text',
        },
        {
            name: 'type',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'carburant',
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'kilometrage',
            defaultValue: '0',
            required: true,
            type: 'text',
        },
        {
            name: 'lubrifiantMoteur',
            label: {
                en: 'Lubrifiant moteur préconisé',
                fr: 'Lubrifiant moteur préconisé',
            },
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'DateDeMiseEnCirculation',
            label: {
                en: 'Date 1er mise en circulation',
                fr: 'Date 1er mise en circulation',
            },
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'DateVisiteTechnique',
            label: {
                en: 'Date Visite Technique',
                fr: 'Date Visite Technique',
            },
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        {
            name: 'DateValiditeAssurance',
            label: {
                en: 'Date Validité Assurance',
                fr: 'Date Validité Assurance',
            },
            defaultValue: 'N/A',
            required: true,
            type: 'text',
        },
        // {
        //     name: 'selectedImages',
        //     label: {
        //         en: 'Car Images',
        //         fr: 'Images de la voiture',
        //     },
        //     type: 'array',
        //     minRows: 1,
        //     maxRows: 4,
        //     required: true,
        //         labels: {
        //         singular: 'Image',
        //         plural: 'Images',
        //         },
        //         fields: [
        //             {
        //                 name: 'selectedImage',
        //                 type: 'upload',
        //                 relationTo: 'mediaClient',
        //                 required: true,
        //             }
        //         ],
        // },
    ]
};
