"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const const_1 = __importDefault(require("./const"));
const SplitePage_1 = __importDefault(require("./SplitePage"));
class Compose extends SplitePage_1.default {
    constructor(module) {
        super();
        this.rootWraperEle = null;
        this.wraperDiv = [];
        this.pageHeight = 0;
        this.pageWidth = 0;
        this.dfsChild = null;
        this.needTpl = false;
        this.pageInfo = module.pageInfo;
        console.log("this.pageInfo", this.pageInfo);
        const { deviceParams, needTpl } = this.pageInfo;
        const { height, width } = deviceParams || { width: 0, height: 0 };
        this.pageHeight = height;
        this.pageWidth = width;
        this.needTpl = needTpl;
        this.moduleId = module.moduleId;
        this.init(this.moduleId);
    }
    init(ele) {
        this.rootWraperEle = document.querySelector(ele);
        if (this.rootWraperEle == null) {
            if (process.env.NODE_ENV === "production") {
                console.error(`找不到${ele}包裹元素！`);
            }
            else {
                throw new Error(`找不到${ele}包裹元素！`);
            }
            return;
        }
        this.needTpl && Compose.getTpl();
        console.log("Compose.tplMap", Compose.headerTplMap);
        this.walk(this.rootWraperEle);
        console.log("this.childMap", this.childMap);
    }
    print() {
        return new Promise((resolve, reject) => {
            this.splitPage(this.pageInfo);
            console.log("this.pageInfo111", this.pageInfo);
            console.log("this.deps", this.deps);
            if (this.rootWraperEle) {
                this.clearContainer();
                this.appendPage(this.deps);
                this.deps = null;
                index_1.Print.completedModule(this.moduleId);
                resolve(true);
            }
            else {
                reject(false);
                throw new Error("布局失败");
            }
        });
    }
    clearContainer() {
        var _a;
        Array.from((_a = this.rootWraperEle) === null || _a === void 0 ? void 0 : _a.children).forEach((eleItem) => {
            var _a;
            (_a = this.rootWraperEle) === null || _a === void 0 ? void 0 : _a.removeChild(eleItem);
        });
    }
    appendPage(nodes) {
        if (this.pageInfo.lastModule) {
            const lastChild = nodes.lastElementChild;
            if (lastChild) {
                lastChild.classList.remove(const_1.default.printImgWraper);
                lastChild.classList.remove(const_1.default.printPageWraper);
                lastChild.classList.add(const_1.default.printLastWraper);
            }
        }
        Array.from(nodes.children).forEach((node, index, arr) => {
            var _a;
            (_a = this.rootWraperEle) === null || _a === void 0 ? void 0 : _a.appendChild(node);
        });
    }
}
exports.default = Compose;
