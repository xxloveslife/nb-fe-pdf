"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Compose_1 = __importDefault(require("./Compose"));
const utils_1 = require("./utils");
const waterMark_1 = __importDefault(require("./waterMark"));
const const_1 = __importDefault(require("./const"));
class Print {
    constructor({ selectModule, moduleMap, injectClass, callback }) {
        this.needFilter = true;
        this.selectModule = [];
        this.ModuleInfoSet = [];
        this.moduleMap = new Map();
        this.deviceParams = { width: 0, height: 0 };
        this.injectClass = {};
        this.callback = Function.prototype;
        // 多个Map模块下载
        if (selectModule && moduleMap) {
            this.selectModule = selectModule;
            this.needFilter = true;
            this.moduleMap = moduleMap;
        }
        else {
            // 单个object模块下载
            this.ModuleInfoSet = [arguments[0]];
            this.needFilter = false;
        }
        if (injectClass) {
            this.injectClass = injectClass;
        }
        if (callback) {
            this.callback = callback;
        }
        this.deviceParams = (0, utils_1.getDeviceParams)();
        this.createPrint();
    }
    static completedModule(moduleId) {
        this.completedMap.set(moduleId, true);
    }
    createPrint() {
        return __awaiter(this, void 0, void 0, function* () {
            this.needFilter && this.filterSelectModule();
            // 注入不同ui组件的table class
            if (this.injectClass && Object.keys(this.injectClass).length > 0) {
                const_1.default.setTableClass(this.injectClass);
            }
            this.ModuleInfoSet.forEach((module, index) => __awaiter(this, void 0, void 0, function* () {
                if (this.ModuleInfoSet.length - 1 === index) {
                    module.pageInfo.lastModule = true;
                }
                yield this.onPrint(module);
            }));
            yield this.exitCallback();
        });
    }
    exitCallback() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("callback");
                this.callback && this.callback();
                resolve(true);
            }, 0);
        });
    }
    onPrint(module) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Print.completedMap.get(module.moduleId)) {
                console.log(`${module.moduleId} 模块已经分页过了`);
                return;
            }
            module.pageInfo.deviceParams = this.deviceParams;
            yield new Compose_1.default(module).print();
            this.setWaterMark(module);
        });
    }
    setWaterMark(module) {
        setTimeout(() => {
            console.log("waterMark");
            (0, waterMark_1.default)(module.pageInfo.waterMarkConfig);
        }, 300);
    }
    filterSelectModule() {
        this.ModuleInfoSet = this.selectModule
            .filter((item) => this.moduleMap.has(item))
            .map((item) => this.moduleMap.get(item));
    }
}
exports.Print = Print;
Print.completedMap = new Map();
