import { CollectionConfig } from "payload/types";


export const Users: CollectionConfig ={
    slug: "users",
    auth: {
        verify:{
            generateEmailHTML: ({token}) => {
                return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-client?token=${token}'>Verify Client</a>`
            },
        }
    },
    access:{
        read: () => true,
        create: () => true,

    },
    fields: [
        { name: 'role',
        defaultValue: 'user',
        required: true ,
        // admin:{
        //     condition: ({req}) => false,
        // },
        type:'select',
        options: [
            { value: 'topadmin', label: 'TopAdmin' },
            { value: 'admin', label: 'Admin' },
            { value: 'agent', label: 'Agent' },
            { value: 'client', label: 'client' },
        ],
    },
    ]
}