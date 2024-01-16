"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Logo = () => (react_1.default.createElement("div", { className: "logocms" },
    react_1.default.createElement("img", { src: "/nav/logo.png", alt: "TRBL Design Logo" })));
exports.default = Logo;
