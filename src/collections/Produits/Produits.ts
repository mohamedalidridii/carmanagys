
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Produits: CollectionConfig = {
    slug: "products",
    labels:{
        singular:{
            en:'Product',
            fr:'Produit'
        },
        plural:{
            en:'Products',
            fr:'Produits'
        }

    },
    admin: {
        group: 'Categories',
        useAsTitle: "name",
    },
    access:{
        read: ({req}) => req.user.role === 'topadmin' || req.user.role === 'admin',
        update: ({req}) => req.user.role === 'topadmin' || req.user.role === 'admin',
        create: ({req}) => req.user.role === 'topadmin' || req.user.role === 'admin',
        delete: ({req}) => req.user.role === 'topadmin' || req.user.role === 'admin',
    },
    fields: [
        {name: "users",
        label: {
            en: 'users',
            fr: 'Utilisateurs',
          },
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin:{
                condition: ()=> false,
            },
        },
        {name: "name",
        label: {
            en: 'Name',
            fr: 'Nom',
          },
        type: "text",
        required: true,
        },
        {name: "description",
        label: {
            en: 'description',
            fr: 'description',
          },
        type: "textarea",
        },
        {name: 'price',
        label: {
            en: 'Price in DT',
            fr: 'Prix en DT',
          },
        min: 0,
        max: 1000,
        type: "number",
        required: true,
        },
        {name: "subcategory",
        label: 'Sous-categories',
        type: "select",
        options: PRODUCT_CATEGORIES.map(({label, value}) => ({label, value})),
        required: true,
        },
        {name: "points",
            label: 'Points de fidélité',
            min: 0,
            max: 10000000,
            type: "number",
            required: true,
        },
        {name: "priceId",
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
        {name: "stripeId",
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
        {name: 'images',
        type: 'array',
        label: {
            en: 'Product Image',
            fr: 'Image',
          },
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
    

}