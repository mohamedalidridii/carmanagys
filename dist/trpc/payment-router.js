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
exports.paymentRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const trpc_1 = require("./trpc");
const get_payload_1 = require("../get-payload");
const t = server_1.initTRPC.context().create();
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure.input(zod_1.z.object({ productIds: zod_1.z.array(zod_1.z.string()) }))
        .mutation(({ ctx, input }) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = ctx;
        const { productIds } = input;
        if (productIds.length === 0) {
            throw new server_1.TRPCError({ code: 'BAD_REQUEST' });
        }
        const payload = yield (0, get_payload_1.getPayloadClient)();
    })),
});
