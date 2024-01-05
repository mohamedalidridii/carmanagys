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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const auth_router_1 = require("./auth-router");
const zod_1 = __importDefault(require("zod"));
const query_validator_1 = require("../lib/validators/query-validator");
const get_payload_1 = require("../get-payload");
const payment_router_1 = require("./payment-router");
const sendSms_1 = require("./sendSms");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    payment: payment_router_1.paymentRouter,
    sendSms: sendSms_1.sendSmsRouter,
    getInfiniteProducts: trpc_1.publicProcedure.input(zod_1.default.object({
        limit: zod_1.default.number().min(1).max(100),
        cursor: zod_1.default.number().nullish(),
        query: query_validator_1.QueryValidator,
    }))
        .query(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
        const { query, cursor } = input;
        const { sort, limit } = query, queryOpts = __rest(query, ["sort", "limit"]);
        const payload = yield (0, get_payload_1.getPayloadClient)();
        const parsedQueryOpts = {};
        Object.entries(queryOpts).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Handle the case where value is an array
                // For simplicity, let's just take the first element of the array
                parsedQueryOpts[key] = { equals: value[0] };
            }
            else {
                parsedQueryOpts[key] = { equals: value };
            }
        });
        const page = cursor || 1;
        const { docs: items, hasNextPage, nextPage } = yield payload.find({
            collection: "products",
            where: Object.assign({}, parsedQueryOpts),
            sort,
            depth: 1,
            limit,
            page,
        });
        return { items, nextPage: hasNextPage ? nextPage : null };
    })),
});
