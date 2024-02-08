import { CARS_LIST } from '@/config';
import { date, z } from 'zod'



export const AuthLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
});

export const carMenu = [
  "audi",
  "kia",
  "bmw",
  "mercedes",
  "volkswagen",
  "jaguar",
  "volvo",
  "porsche",
  "renault",
  "seat",
  "skoda",
  "souest",
  "ssangyong",
  "suzuki",
  "tata",
  "wallys",
  "toyota",
  "peugeot",
  "byd",
  "changan",
  "chery",
  "cupra",
  "dacia",
  "dfsk",
  "soueast",
  "dongfeng",
  "faw",
  "fiat",
  "foday",
  "ford",
  "gac_motor",
  "geeli",
  "gwm",
  "haval",
  "honda",
  "hanghai",
  "hyundai",
  "jeep",
  "land_rover",
  "mahindra",
  "mg",
  "mini",
  "mitsubishi",
  "nissan",
  "opel",
  "tesla",
  "chevrolet",
  "alpha_romeo",
  "bestune"] as const
export const Carburant = [
  "SSP",
  "GSS",
  "GO",
  "SSPPREMIUM",
  "GSSPREMIUM",
] as const
export const mappedCarList: { [key in TCarMenu]: string } = {
  audi: 'Audi',
  bmw: 'Bmw',
  kia: 'Kia',
  mercedes: 'Mercedes',
  volkswagen: 'Volkswagen',
  volvo: 'Volvo',
  porsche: 'Porsche',
  renault: 'Renault',
  seat: 'Seat',
  skoda: 'Skoda',
  soueast: 'Soueast',
  ssangyong: 'Ssangyong',
  suzuki: 'Suzuki',
  tata: 'Tata',
  wallys: 'Wallys',
  hyundai: 'Hyundai',
  toyota: 'Toyota',
  peugeot: 'Peugeot',
  byd: 'Byd',
  changan: 'Changan',
  chery: 'Chery',
  cupra: 'Cupra',
  dacia: 'Dacia',
  dfsk: 'Dfsk',
  dongfeng: 'Dongfeng',
  faw: 'Faw',
  fiat: 'Fiat',
  foday: 'Foday',
  ford: 'Ford',
  gac_motor: 'Gac Motor',
  geeli: 'Geeli',
  gwm: 'Gwm',
  haval: 'Haval',
  honda: 'Honda',
  hanghai: 'Huanghai',
  jaguar: 'Jaguar',
  souest: 'Souest',
  jeep: 'Jeep',
  land_rover: 'Land Rover',
  mahindra: 'Mahindra',
  mg: 'Mg',
  mini: 'Mini',
  mitsubishi: 'Mitsubishi',
  nissan: 'Nissan',
  opel: 'Opel',
  tesla: 'Tesla',
  chevrolet: 'Chevrolet',
  alpha_romeo: 'Alpha Romeo',
  bestune: 'Bestune'
}
export const mappedCarburant: { [key in Tcarburant]: string } = {
  SSP: "SSP",
  GSS: "GSS",
  GO: "GO",
  SSPPREMIUM: "SSP-PREMIUM",
  GSSPREMIUM: "GSS-PREMIUM",
}
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
 'image/jpeg',
 'image/jpg',
 'image/JPG',
 'image/JPEG',
 'image/png',
 'image/PNG',
]

export const AuthSignupValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
  nom: z.string(),
  prenom: z.string(),
  tel: z.string(),
  matricule: z.string().min(2, { message: "l'immatriculation doit comporter au moins 2 caractères." }),
  marque: z.enum(carMenu),
  type: z.string(),
  carburant: z.enum(Carburant),
  kilometrage: z.string(),
  //new ones
  lubrifiantMoteur: z.string(),
  DateDeMiseEnCirculation: z.string().refine((date) => new Date(date).toString() !== 'invalide Date').transform((date) => new Date(date).toString()),
  DateVisiteTechnique: z.string().refine((date) => new Date(date).toString() !== 'invalide Date').transform((date) => new Date(date).toString()),
  DateValiditeAssurance: z.string().refine((date) => new Date(date).toString() !== 'invalide Date').transform((date) => new Date(date).toString()),
});

export const SendSmsValidator = z.object({


  phoneNumber: z.string(),
  message: z.string(),
  
});
export type TAuthCredentialsValidator = z.infer<typeof AuthSignupValidator>
export type SAuthCredentialsValidator = z.infer<typeof AuthLoginValidator>
export type XSendSmsValidator = z.infer<typeof SendSmsValidator>
export type TCarMenu = typeof carMenu[number]
export type Tcarburant = typeof Carburant[number]