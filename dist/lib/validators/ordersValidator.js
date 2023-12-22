import { z } from "zod";
export var OrdersValidator = z.object({
    userId: z.string(),
    agent: z.string(),
    produit: z.string(),
    lubrifiant: z.string(),
    points: z.string(),
    total: z.string(),
});
