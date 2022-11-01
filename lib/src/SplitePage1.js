"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const const_1 = require("./const");
const DfsChild_1 = __importDefault(require("./DfsChild"));
class SplitePage extends DfsChild_1.default {
    constructor() {
        super();
        this.completeSplit = false;
        this.tBody = null;
        this.cloneEmptyTable = null;
    }
    tbodyAppendChild(table, row) {
        var _a;
        (_a = table.querySelector("." + const_1.elTbody)) === null || _a === void 0 ? void 0 : _a.appendChild(row);
    }
    /**
     * 拆分table tbody
     */
    splitTbody(tbody, distance, tbBomHeight) {
        if (tbBomHeight == null)
            tbBomHeight = 0;
        const module = tbody.module;
        const rowQueue = this.findRows(module);
        let idx = 0;
        this.cleanTbody(module);
        this.cloneTable(module);
        distance = this.appendModule(this.createTBModule(this.cloneEmptyTable), 100, index_1.ModuleType.TBODY);
        const next = () => {
            if (idx >= rowQueue.length)
                return;
            const row = rowQueue[idx++];
            const height = row.calcHeight;
            if (distance > height + tbBomHeight) {
                distance = this.appendModule(row, height, index_1.ModuleType.ROW);
            }
            else {
                distance = this.createWraper(module);
                distance = this.appendModule(this.createTBModule(this.cloneEmptyTable), 100, index_1.ModuleType.TBODY);
                distance = this.appendModule(row, height, index_1.ModuleType.ROW);
            }
            next();
        };
        next();
        return distance;
    }
    /**
     * 拆分table
     */
    splitTable(ele, distance) {
        const moduleInfo = this.childMap.get(ele);
        const { tbTopInfo, table, tbBomInfo, minHeight, marginPadHeight } = moduleInfo.tableModuleInfo;
        const tbQueue = [tbTopInfo, table, tbBomInfo].filter((item) => item.height > 0);
        if (distance < minHeight) {
            distance = this.createWraper(ele) - marginPadHeight;
        }
        else {
            distance = distance - marginPadHeight;
        }
        let idx = 0;
        const next = () => {
            if (idx >= tbQueue.length)
                return;
            let item = tbQueue[idx++];
            if (distance > item.height) {
                if (distance > minHeight) {
                    if (item.module.classList.contains(const_1.cardTableTopWraper)) {
                        distance = this.appendModule(item.module, item.height, index_1.ModuleType.TB_MODULE);
                        item = tbQueue[idx++];
                    }
                    if (item.module.classList.contains(const_1.cardTableWraper)) {
                        distance = this.splitTbody(item, distance, tbBomInfo.height);
                    }
                    if (item.module.classList.contains(const_1.cardTableBomWraper)) {
                        distance = this.appendModule(item.module, item.height, index_1.ModuleType.TB_MODULE);
                    }
                }
                else {
                    distance = this.createWraper(ele);
                    --idx;
                    next();
                }
            }
            else {
                distance = this.createWraper(ele);
                distance = this.appendModule(item.module, item.height, index_1.ModuleType.TB_MODULE);
            }
            next();
        };
        next();
        return distance;
    }
    /**
     * 拆分页面
     */
    splitPage(pageInfo) {
        this.pageInfo = pageInfo;
        let distance = 0;
        let idx = 0;
        const stack = [...this.childMap.keys()];
        let flag = true;
        const next = () => {
            if (idx >= stack.length)
                return;
            const ele = stack[idx++];
            if (ele.classList.contains(const_1.printImg)) {
                this.createWraper(ele);
                this.appendModule(ele, 0, index_1.ModuleType.IMG);
                if (!flag) {
                    flag = true;
                }
            }
            else {
                if (flag) {
                    distance = this.createWraper(ele);
                    flag = false;
                }
                const nodeInfo = this.childMap.get(ele);
                // 剩余距离小于 元素的高度 放不下
                if (distance < nodeInfo.height) {
                    // 是table
                    if (nodeInfo.isTable) {
                        distance = this.splitTable(ele, distance);
                    }
                    else {
                        // 重新创建页面
                        this.createWraper(ele);
                        distance = this.appendModule(ele, nodeInfo.height, index_1.ModuleType.MODULE);
                    }
                }
                else {
                    // 能放下
                    distance = this.appendModule(ele, nodeInfo.height, index_1.ModuleType.MODULE);
                }
            }
            next();
        };
        next();
    }
    cloneTable(table) {
        this.cloneEmptyTable = table.cloneNode(true);
    }
    findRows(ele) {
        const rows = ele.querySelectorAll("." + const_1.cardElRowClass);
        return Array.from(rows);
    }
    cleanTbody(ele) {
        var _a;
        const rows = ele.querySelectorAll("." + const_1.cardElRowClass);
        (_a = Array.from(rows)) === null || _a === void 0 ? void 0 : _a.forEach((row) => {
            var _a;
            (_a = row.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(row);
        });
    }
    createTBModule(cloneEmptyTable) {
        const moduleTbWraper = document.createElement("div");
        // moduleTbWraper.setAttribute("style", "border: 3px solid yellow");
        const emptyTable = cloneEmptyTable === null || cloneEmptyTable === void 0 ? void 0 : cloneEmptyTable.cloneNode(true);
        moduleTbWraper.appendChild(emptyTable);
        return moduleTbWraper;
    }
}
exports.default = SplitePage;
