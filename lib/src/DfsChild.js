"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = __importDefault(require("./const"));
const utils_1 = require("./utils");
const index_1 = require("../index");
const PdfPage_1 = __importDefault(require("./PdfPage"));
class DfsChild extends PdfPage_1.default {
    constructor() {
        super();
        this.childMap = new Map();
        this.flagNum = 0; // 只是为了方便 排查分页后的打印数据 中的模块 和页面元素的 之间的对应关系
        this.time = 1;
    }
    walk(ele) {
        this.time++;
        if (ele.hasChildNodes()) {
            const nodeQueue = Array.from(ele.children);
            while (nodeQueue.length > 0) {
                const node = nodeQueue.shift();
                if (node === null || node === void 0 ? void 0 : node.classList.contains(const_1.default.spliteFlag)) {
                    this.setPagesMap(node);
                    continue;
                }
                else {
                    this.walk(node);
                }
            }
        }
        else {
            this.setPagesMap(ele);
        }
    }
    setPagesMap(ele) {
        if (ele.classList.contains(const_1.default.spliteFlag) && !this.childMap.has(ele)) {
            ele.classList.add(`flagNum-${this.flagNum++}`);
            this.childMap.set(ele, this.getModuleInfo(ele));
        }
    }
    getModuleInfo(ele) {
        const isTable = ele.classList.contains(const_1.default.tableClass);
        const moduleInfo = {
            height: (0, utils_1.calcHeight)(ele),
            isTable,
            tableModuleInfo: {},
        };
        if (isTable) {
            moduleInfo.tableModuleInfo = this.getTableModuleInfo(ele, moduleInfo.height);
        }
        return moduleInfo;
    }
    getTableModuleInfo(ele, height) {
        const tbModuleInfo = {
            tbTopInfo: this.getEleHeight(ele, const_1.default.cardTableTopWraper),
            tbHeader: this.getEleHeight(ele, const_1.default.cardTableTBHeaderWraper),
            table: this.getEleHeight(ele, const_1.default.cardTableWraper),
            tbBomInfo: this.getEleHeight(ele, const_1.default.cardTableBomWraper),
            minHeight: 0,
            marginPadHeight: 0,
        };
        // console.log("getMinHeight tbModuleInfo", tbModuleInfo);
        tbModuleInfo.minHeight = this.getMinHeight(ele, tbModuleInfo, height);
        let marginPadHeight = height -
            (tbModuleInfo.tbTopInfo.height +
                tbModuleInfo.table.height +
                tbModuleInfo.tbBomInfo.height);
        tbModuleInfo.marginPadHeight = marginPadHeight;
        return tbModuleInfo;
    }
    /**
     * minHeight 最小高度 = topInfoHeight + tbHeaderheight + row * minRowsCount
     */
    getMinHeight(ele, tbModuleInfo, height) {
        // console.log("getMinHeight ele", ele);
        const nodes = ele.querySelectorAll("." + const_1.default.cardElRowClass);
        const { tbTopInfo, tbHeader } = tbModuleInfo;
        let threeRowHeight = 0;
        if (nodes.length > const_1.default.minRowsCount) {
            nodes.forEach((node, index) => {
                console.log("node.clientHeight", node.clientHeight);
                console.log("calcHeight(node as HTMLElement)", (0, utils_1.calcHeight)(node));
                if (index < const_1.default.minRowsCount) {
                    threeRowHeight += (0, utils_1.calcHeight)(node) || 0;
                }
                node.calcHeight = node.clientHeight;
            });
            return tbTopInfo.height + tbHeader.height + threeRowHeight;
        }
        else {
            nodes.forEach((node, index) => {
                node.calcHeight = node.clientHeight;
            });
            return height;
        }
    }
    getEleHeight(ele, className) {
        const module = ele.querySelector("." + className);
        // console.log(" getMinHeight module", module);
        if (ele && module) {
            return {
                module,
                height: (0, utils_1.calcHeight)(module),
            };
        }
        else {
            return {
                module,
                height: 0,
            };
        }
    }
    static getTpl() {
        const headerTpls = this.getChildTpls(index_1.PrintTemplatesTag.printHeadertemplates);
        const footerTpls = this.getChildTpls(index_1.PrintTemplatesTag.printFooterTemplates);
        this.headerTplMap.size === 0 &&
            this.setTplFunc(headerTpls, this.headerTplMap);
        this.footerTplMap.size === 0 &&
            this.setTplFunc(footerTpls, this.footerTplMap);
        // console.log("this.headerTplMap", this.headerTplMap);
        // console.log("this.headerTplMap", this.footerTplMap);
    }
    static setTplFunc(tpls, map) {
        tpls.forEach((tpl) => {
            const flag = (0, utils_1.findTplTag)(tpl);
            if (flag && !map.has(flag)) {
                map.set(flag, {
                    tpl: tpl,
                    height: tpl.offsetHeight,
                });
            }
        });
    }
    static getChildTpls(flag) {
        const ele = document.getElementById(flag);
        if (ele) {
            return ele.childNodes;
        }
        return [];
    }
}
exports.default = DfsChild;
DfsChild.headerTplMap = new Map();
DfsChild.footerTplMap = new Map();
