import { z } from "zod";



export const OperationValidator = z.object({
    userId: z.string(),
    agent: z.string(),
    produit: z.string(),
    lubrifiant: z.string(),
    pointsadded: z.coerce.number().min(1),
    total: z.coerce.number().positive().min(1),
  });
  export type XOperationValidator = z.infer<typeof OperationValidator>