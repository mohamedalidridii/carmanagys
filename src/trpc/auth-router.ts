import { getPayloadClient } from "../get-payload";
import { publicProcedure, router } from "./trpc"; 
import { AuthLoginValidator, AuthSignupValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import payload from "payload";
import  {OperationValidator}  from "../lib/validators/ordersValidator";
import { twimClient } from "../lib/twilio";



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
                },
                matricule: {
                    equals: matricule,
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
    sendSms: publicProcedure.input(z.object({
        phoneNumber: z.string(), // Validate phone number format
        message: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
    
        // Access Twilio credentials
    
    
          const { phoneNumber, message } = input;
          return await twimClient.messages.create({
            body: message,
            from: '+16073043341', // Replace with your Twilio number
            to: phoneNumber,
          }).then( message => {
            console.log(message)
            return message;
          })
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

    createOperation: publicProcedure
    .input(OperationValidator).mutation( async ({ input }) =>{
        const {userId,
            agent, produit, lubrifiant, pointsadded, total
                 }= input
        const payload = await getPayloadClient()
        console.log('Lubrifiant Value on Server:', lubrifiant);
        console.log('Input Data:', { userId, agent, produit, lubrifiant, pointsadded, total });
        try {
            // Attempt to create the operation
            const user = await payload.findByID({
                collection: 'users',
                id: userId,
                
            });

            // Extract points from the user data
            const points = user?.points || 0;

            await payload.create({
              collection: "operations",
              data: {
                userId,
                agent,
                produit,
                lubrifiant,
                pointsadded,
                total,
              },
            });
            await payload.update({
                collection: 'users',
                id: userId,
                data: {
                    points: points + pointsadded,
                },
            });
            // Log success message
            console.log("the user's points:",points)
            console.log('Operation created successfully.');
            return undefined;
          }
           catch (error) {
            // Log any errors that occur during the creation
            console.error('Error creating operation:', error);
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
          }
    })
    
})