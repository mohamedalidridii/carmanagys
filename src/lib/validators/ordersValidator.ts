import { z } from "zod";

export const OrdersValidator = z.object({
    userId: z.string(),
    agent: z.string(),
    produit: z.string(),
    lubrifiant: z.string(),
    points: z.string(),
    total: z.string(), 
  });
  export type XOrdersValidator = z.infer<typeof OrdersValidator>