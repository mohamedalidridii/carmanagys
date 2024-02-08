"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationValidator = exports.mappedDistributeurs = exports.Distributeurs = void 0;
const zod_1 = require("zod");
exports.Distributeurs = [
    "autre",
    "pompe1",
    "pompe2",
    "pompe3",
    "pompe4",
    "pompe5",
    "pompe6",
    "pompe7",
    "pompe8",
    "pompe9",
    "pompe10",
];
exports.mappedDistributeurs = {
    autre: "Autre",
    pompe1: "pompe-1",
    pompe2: "pompe-2",
    pompe3: "pompe-3",
    pompe4: "pompe-4",
    pompe5: "pompe-5",
    pompe6: "pompe-6",
    pompe7: "pompe-7",
    pompe8: "pompe-8",
    pompe9: "pompe-9",
    pompe10: "pompe-10",
};
exports.OperationValidator = zod_1.z.object({
    userId: zod_1.z.string(),
    userName: zod_1.z.string(),
    agent: zod_1.z.string(),
    agentName: zod_1.z.string(),
    produit: zod_1.z.string(),
    lubrifiant: zod_1.z.string(),
    pointsadded: zod_1.z.coerce.number().min(1),
    distributeur: zod_1.z.enum(exports.Distributeurs),
    total: zod_1.z.coerce.number().positive().min(1),
});
