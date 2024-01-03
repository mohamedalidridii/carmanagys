import { ExpressContext } from "@/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import twilio from 'twilio';
import { twimClient } from "../lib/twilio";

const t = initTRPC.context<ExpressContext>().create();

export const sendSmsRouter = router({
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
        statusCallback: `${process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`: "http://localhost:3000"}/api/sms/sms-callback`
      }).then( message => {
        console.log(message)
        return message;
      })
    })
  })