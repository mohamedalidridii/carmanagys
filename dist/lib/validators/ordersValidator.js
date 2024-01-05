"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationValidator = void 0;
const zod_1 = require("zod");
exports.OperationValidator = zod_1.z.object({
    userId: zod_1.z.string(),
    agent: zod_1.z.string(),
    produit: zod_1.z.string(),
    lubrifiant: zod_1.z.string(),
    pointsadded: zod_1.z.coerce.number().min(1),
    total: zod_1.z.coerce.number().positive().min(1),
});
