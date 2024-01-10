"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSmsRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const trpc_1 = require("./trpc");
const twilio_1 = require("../lib/twilio");
const t = server_1.initTRPC.context().create();
exports.sendSmsRouter = (0, trpc_1.router)({
    sendSms: trpc_1.publicProcedure.input(zod_1.z.object({
        phoneNumber: zod_1.z.string(), // Validate phone number format
        message: zod_1.z.string(),
    }))
        .mutation(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        // Access Twilio credentials
        const { phoneNumber, message } = input;
        return yield twilio_1.twimClient.messages.create({
            body: message,
            from: '+16073043341', // Replace with your Twilio number
            to: phoneNumber,
            // statusCallback: `${process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`: "http://localhost:3000"}/api/sms/sms-callback`
            statusCallback: `${process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_SERVER_URL}` : `${process.env.NEXT_PUBLIC_SERVER_URL}`}/api/sms/sms-callback`
        }).then(message => {
            console.log(message);
            return message;
        });
    }))
});
