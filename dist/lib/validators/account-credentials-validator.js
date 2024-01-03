"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSmsValidator = exports.AuthSignupValidator = exports.mappedCarList = exports.carMenu = exports.AuthLoginValidator = void 0;
const zod_1 = require("zod");
exports.AuthLoginValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
});
exports.carMenu = [
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
    "bestune"
];
exports.mappedCarList = {
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
};
exports.AuthSignupValidator = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' }),
    nom: zod_1.z.string(),
    prenom: zod_1.z.string(),
    tel: zod_1.z.string(),
    matricule: zod_1.z.string().min(2, { message: 'la matricule doit comporter au moins 2 caractères.' }),
    marque: zod_1.z.enum(exports.carMenu),
    type: zod_1.z.string(),
    carburant: zod_1.z.string(),
    kilometrage: zod_1.z.string(),
});
exports.SendSmsValidator = zod_1.z.object({
    phoneNumber: zod_1.z.string(),
    message: zod_1.z.string(),
});
