import { z } from "zod";


export const Distributeurs = [
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
] as const
export const mappedDistributeurs: { [key in TDistributeurs]: string } = {
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
}
export const OperationValidator = z.object({
    userId: z.string(),
    userName: z.string(),
    agent: z.string(),
    agentName: z.string(),
    produit: z.string(),
    lubrifiant: z.string(),
    pointsadded: z.coerce.number().min(1),
    distributeur: z.enum(Distributeurs),
    total: z.coerce.number().positive().min(1),
  });
  export type XOperationValidator = z.infer<typeof OperationValidator>
  export type TDistributeurs = typeof Distributeurs[number]