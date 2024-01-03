import { publicProcedure, router } from "./trpc";
import {authRouter} from "./auth-router";
import z from "zod";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";
import { sendSmsRouter } from "./sendSms";

export const appRouter = router({
    auth: authRouter,
    payment: paymentRouter,
    sendSms: sendSmsRouter,
    getInfiniteProducts: publicProcedure.input(z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
    }))
    .query(async ({ input }) => {
        const { query, cursor } = input;
        const { sort, limit, ...queryOpts } = query;

        const payload = await getPayloadClient();

        const parsedQueryOpts: Record<string, { equals: string }> = {};

        Object.entries(queryOpts).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Handle the case where value is an array
                // For simplicity, let's just take the first element of the array
                parsedQueryOpts[key] = { equals: value[0] };
            } else {
                parsedQueryOpts[key] = { equals: value };
            }
        });

        const page = cursor || 1;
        const { docs: items, hasNextPage, nextPage } = await payload.find({
            collection: "products",
            where: {
                ...parsedQueryOpts,
            },
            sort,
            depth: 1,
            limit,
            page,
        });

        return { items, nextPage: hasNextPage ? nextPage : null };
    }),
    
});

export type AppRouter = typeof appRouter;
