export var Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-client?token=").concat(token, "'>Verify Client</a>");
            },
        }
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
    },
    fields: [
        { name: 'role',
            defaultValue: 'client',
            required: true,
            // admin:{
            //     condition: ({req}) => false,
            // },
            type: 'select',
            options: [
                { value: 'topadmin', label: 'TopAdmin' },
                { value: 'admin', label: 'Admin' },
                { value: 'agent', label: 'Agent' },
                { value: 'client', label: 'Client' },
            ],
        },
        { name: 'nom',
            defaultValue: 'nom',
            required: true,
            type: 'text',
        },
        { name: 'prenom',
            defaultValue: 'prenom',
            required: true,
            type: 'text',
        },
        { name: 'tel',
            defaultValue: 'tel',
            required: true,
            type: 'text',
        },
        { name: 'points',
            defaultValue: '0',
            required: false,
            type: 'text',
        },
        { name: 'matricule',
            defaultValue: 'matricule',
            required: true,
            type: 'text',
        },
        { name: 'marque',
            defaultValue: 'Select',
            required: true,
            type: 'text',
            // options: CARS_LIST.map(({label, value}) => ({label, value})),
        },
        { name: 'type',
            defaultValue: 'marque',
            required: true,
            type: 'text',
        },
        { name: 'carburant',
            defaultValue: 'marque',
            required: true,
            type: 'text',
        },
        { name: 'kilometrage',
            defaultValue: 'marque',
            required: true,
            type: 'text',
        },
    ]
};
