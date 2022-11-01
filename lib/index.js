"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintTemplatesTag = exports.ModuleType = exports.PrintType = exports.Print = void 0;
const DfsChild_1 = __importDefault(require("./src/DfsChild"));
var index_1 = require("./src/index");
Object.defineProperty(exports, "Print", { enumerable: true, get: function () { return index_1.Print; } });
var PrintType;
(function (PrintType) {
    PrintType["NORMAL_TYPE"] = "NORMAL_TYPE";
    PrintType["HEADER_TYPE"] = "HEADER_TYPE";
    PrintType["FOOTER_TYPE"] = "FOOTER_TYPE";
    PrintType["HEADER_FOOTER_TYPE"] = "HEADER_FOOTER_TYPE";
})(PrintType = exports.PrintType || (exports.PrintType = {}));
var ModuleType;
(function (ModuleType) {
    ModuleType["IMG"] = "IMG";
    ModuleType["MODULE"] = "MODULE";
    ModuleType["TB_MODULE"] = "TB_MODULE";
    ModuleType["TBODY"] = "TBODY";
    ModuleType["ROW"] = "ROW";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
var PrintTemplatesTag;
(function (PrintTemplatesTag) {
    PrintTemplatesTag["printHeadertemplates"] = "print-header-templates";
    PrintTemplatesTag["printFooterTemplates"] = "print-footer-templates";
    PrintTemplatesTag["printPdfTpl"] = "print-pdf-tpl";
    PrintTemplatesTag["printPdfTplFooterDefault"] = "print-pdf-tpl-footer-default";
    PrintTemplatesTag["printPdfTplHeaderDefault"] = "print-pdf-tpl-header-default";
})(PrintTemplatesTag = exports.PrintTemplatesTag || (exports.PrintTemplatesTag = {}));
