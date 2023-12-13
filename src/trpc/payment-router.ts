import { ExpressContext } from "@/server"
import { TRPCError, initTRPC } from "@trpc/server"
import { z } from "zod"
import { privateProcedure, router } from "./trpc"
import { getPayloadClient } from "../get-payload"

const t=initTRPC.context<ExpressContext>().create()

export const paymentRouter = router({
    createSession: privateProcedure.input(z.object({productIds: z.array(z.string())}))
    .mutation( async ({ctx, input}) => {
        const {user} = ctx
        const {productIds} = input
        if(productIds.length === 0) {
            throw new TRPCError({code: 'BAD_REQUEST'})
        }
        const payload = await getPayloadClient()
    }),

})