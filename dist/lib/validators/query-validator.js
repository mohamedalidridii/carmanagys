import { z } from "zod";
export var QueryValidator = z.object({
    category: z.string().optional(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.number().optional(),
});
