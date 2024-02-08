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
exports.authRouter = void 0;
const get_payload_1 = require("../get-payload");
const trpc_1 = require("./trpc");
const account_credentials_validator_1 = require("../lib/validators/account-credentials-validator");
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const ordersValidator_1 = require("../lib/validators/ordersValidator");
const twilio_1 = require("../lib/twilio");
exports.authRouter = (0, trpc_1.router)({
    createPayloadUser: trpc_1.publicProcedure
        .input(account_credentials_validator_1.AuthSignupValidator)
        .mutation(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, nom, prenom, matricule, tel, marque, type, carburant, kilometrage, lubrifiantMoteur, DateDeMiseEnCirculation, DateVisiteTechnique, DateValiditeAssurance, } = input;
        const payload = yield (0, get_payload_1.getPayloadClient)();
        // check if user already exists
        const { docs: users } = yield payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                },
                matricule: {
                    equals: matricule,
                }
            }
        });
        if (users.length !== 0)
            throw new server_1.TRPCError({ code: 'CONFLICT' });
        // create user
        yield payload.create({
            collection: "users",
            data: {
                email,
                password,
                role: "client",
                nom, prenom, tel, matricule, marque, type, carburant, kilometrage, lubrifiantMoteur, DateDeMiseEnCirculation, DateVisiteTechnique, DateValiditeAssurance,
            },
        });
        return { success: true, sentToEmail: email };
    })),
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
        }).then(message => {
            console.log(message);
            return message;
        });
    })),
    verifyEmail: trpc_1.publicProcedure
        .input(zod_1.z.object({ token: zod_1.z.string() }))
        .query(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = input;
        const payload = yield (0, get_payload_1.getPayloadClient)();
        const isVerified = yield payload.verifyEmail({
            collection: "users",
            token,
        });
        if (!isVerified)
            throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
        return { success: true };
    })),
    signIn: trpc_1.publicProcedure.input(account_credentials_validator_1.AuthLoginValidator).mutation(({ input, ctx }) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = input;
        const { res } = ctx;
        const payload = yield (0, get_payload_1.getPayloadClient)();
        try {
            yield payload.login({
                collection: 'users',
                data: {
                    email,
                    password,
                },
                res,
            });
            return { success: true };
        }
        catch (error) {
            throw new server_1.TRPCError({ code: "UNAUTHORIZED" });
        }
    })),
    createOperation: trpc_1.publicProcedure
        .input(ordersValidator_1.OperationValidator).mutation(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, userName, agent, agentName, produit, distributeur, lubrifiant, pointsadded, total, } = input;
        const payload = yield (0, get_payload_1.getPayloadClient)();
        console.log('Lubrifiant Value on Server:', lubrifiant);
        console.log('Input Data:', { userId, userName, agent, agentName, produit, lubrifiant, distributeur, pointsadded, total, });
        try {
            // Attempt to create the operation
            const user = yield payload.findByID({
                collection: 'users',
                id: userId,
            });
            // Extract points from the user data
            const points = (user === null || user === void 0 ? void 0 : user.points) || 0;
            yield payload.create({
                collection: "operations",
                data: {
                    userId,
                    userName,
                    agent,
                    agentName,
                    produit,
                    distributeur,
                    lubrifiant,
                    pointsadded,
                    total,
                },
            });
            yield payload.update({
                collection: 'users',
                id: userId,
                data: {
                    points: points + pointsadded,
                },
            });
            // Log success message
            console.log("the user's points:", points);
            console.log('Operation created successfully.');
            return undefined;
        }
        catch (error) {
            // Log any errors that occur during the creation
            console.error('Error creating operation:', error);
            throw new server_1.TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        }
    }))
});
