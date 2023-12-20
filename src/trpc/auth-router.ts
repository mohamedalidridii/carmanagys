import { getPayloadClient } from "../get-payload";
import { publicProcedure, router } from "./trpc"; 
import { AuthLoginValidator, AuthSignupValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import payload from "payload";
import  {OrdersValidator}  from "../lib/validators/ordersValidator";



export const authRouter = router({
    
    createPayloadUser: publicProcedure
    .input(AuthSignupValidator)
    .mutation(async ({ input }) => {
        const {email,
            password, nom, prenom, matricule, tel, marque, type, carburant, kilometrage,
                 }= input
        const payload = await getPayloadClient()

        // check if user already exists
        const {docs: users}= await payload.find({
            collection: "users",
            where: {
                email:{
                    equals: email,
                }
            }
        })
        if (users.length !== 0)
            throw new TRPCError({code: 'CONFLICT'})
        // create user


        await payload.create({
            collection:"users",
            data:{
                email,
                password,
                role: "client",
                nom, prenom, tel, matricule, marque, type, carburant, kilometrage, 
            },
        })

        return {success: true, sentToEmail: email}
    }),
    verifyEmail: publicProcedure
    .input(z.object({token: z.string()}))
    .query( async ({input}) => {
        const {token} = input
        const payload = await getPayloadClient()
        const isVerified = await payload.verifyEmail({
            collection: "users",
            token, 
        })

        if(!isVerified) throw new TRPCError({code: "UNAUTHORIZED"})

        return {success: true}
    }),

    signIn: publicProcedure.input(AuthLoginValidator).mutation( async ({input, ctx}) => {
        const {email, password} = input
        const {res} =ctx
        

        const payload = await getPayloadClient()
        try{
            await payload.login ({
                collection: 'users',
                data:{
                    email,
                    password,
                },
                res,
            })

            return {success: true}
        }catch (error){
            throw new TRPCError({code: "UNAUTHORIZED"})
        }
    
    
    }),

    createOrder: publicProcedure
    .input(OrdersValidator)
    .mutation( async ({ input }) =>{
        const {userId,
            agent, produit, lubrifiant, points, total
                 }= input
        const payload = await getPayloadClient()
        await payload.create({
            collection:"orders",
            data:{
                userId,
                agent, produit, lubrifiant, points, total
            },
        })
    })
})