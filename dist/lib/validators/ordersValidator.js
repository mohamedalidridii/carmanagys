"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidator = void 0;
var zod_1 = require("zod");
exports.OrdersValidator = zod_1.z.object({
    userId: zod_1.z.string(),
    agent: zod_1.z.string(),
    produit: zod_1.z.string(),
    lubrifiant: zod_1.z.string(),
    points: zod_1.z.string(),
    total: zod_1.z.string(),
});
