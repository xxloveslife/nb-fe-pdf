"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const const_1 = __importDefault(require("./const"));
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
        (_a = table.querySelector("." + const_1.default.elTbody)) === null || _a === void 0 ? void 0 : _a.appendChild(row);
    }
    /**
     * 拆分table
     */
    splitTable(ele, distance) {
        const moduleInfo = this.childMap.get(ele);
        const { tbTopInfo, table, tbBomInfo, minHeight, marginPadHeight, } = moduleInfo.tableModuleInfo;
        const tbQueue = [tbTopInfo, table, tbBomInfo].filter((item) => item.height > 5);
        if (distance < minHeight) {
            distance = this.createWraper(ele) - marginPadHeight;
        }
        else {
            distance = distance - marginPadHeight;
        }
        while (tbQueue.length > 0) {
            let item = tbQueue.shift();
            let flag = false;
            if (item.module.classList.contains(const_1.default.cardTableTopWraper) &&
                distance > minHeight) {
                flag = true;
            }
            if (item.module.classList.contains(const_1.default.cardTableWraper) &&
                distance > item.height) {
                flag = true;
            }
            if (item.module.classList.contains(const_1.default.cardTableBomWraper) &&
                distance > item.height) {
                flag = true;
            }
            if (flag) {
                distance = this.appendModule(item.module, item.height, index_1.ModuleType.TB_MODULE);
            }
            else {
                if (item.module.classList.contains(const_1.default.cardTableWraper)) {
                    const module = item.module;
                    const rowQueue = this.findRows(module);
                    this.cleanTbody(module);
                    this.cloneTable(module);
                    if (distance < minHeight) {
                        distance = this.createWraper(module);
                    }
                    distance = this.appendModule(this.createTBModule(this.cloneEmptyTable), 100, index_1.ModuleType.TBODY);
                    let tbBomHeight = tbBomInfo.height;
                    while (rowQueue.length > 0) {
                        let row = rowQueue.shift();
                        const height = row.calcHeight;
                        if (distance > height + tbBomHeight) {
                            distance = this.appendModule(row, height, index_1.ModuleType.ROW);
                        }
                        else {
                            distance = this.createWraper(module);
                            distance = this.appendModule(this.createTBModule(this.cloneEmptyTable), 100, index_1.ModuleType.TBODY);
                            distance = this.appendModule(row, height, index_1.ModuleType.ROW);
                        }
                    }
                }
                else {
                    distance = this.createWraper(ele);
                    distance = this.appendModule(item.module, item.height, index_1.ModuleType.TB_MODULE);
                }
            }
        }
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
            if (ele.classList.contains(const_1.default.printImg)) {
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
        this.removeStyleHeight();
    }
    removeStyleHeight() {
        const next = (node) => {
            if (!node ||
                (node.classList && node.classList.contains(const_1.default.elTableBodyWraper)))
                return;
            const height = node.style && node.style.height;
            if (height) {
                node.style.height = "auto";
            }
            if (node.hasChildNodes()) {
                const nodeQueue = Array.from(node.children);
                while (nodeQueue.length > 0) {
                    const curNode = nodeQueue.shift();
                    next(curNode);
                }
            }
        };
        next(this.cloneEmptyTable);
    }
    findRows(ele) {
        const rows = ele.querySelectorAll("." + const_1.default.cardElRowClass);
        return Array.from(rows);
    }
    cleanTbody(ele) {
        var _a;
        const rows = ele.querySelectorAll("." + const_1.default.cardElRowClass);
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
/**
 * 拆分table tbody
 */
// splitTbody(tbody: TbQueueItem, distance: number, tbBomHeight: number) {
//   if (tbBomHeight == null) tbBomHeight = 0;
//   const module = tbody.module;
//   const rowQueue = this.findRows(module);
//   let idx = 0;
//   this.cleanTbody(module);
//   this.cloneTable(module as HTMLElement);
//   distance = this.appendModule(
//     this.createTBModule(this.cloneEmptyTable as Element),
//     100,
//     ModuleType.TBODY
//   );
//   const next = () => {
//     if (idx >= rowQueue.length) return;
//     const row = rowQueue[idx++];
//     const height = (row as CurrentStyleElement).calcHeight;
//     if (distance > height + tbBomHeight) {
//       distance = this.appendModule(row, height, ModuleType.ROW);
//     } else {
//       distance = this.createWraper(module);
//       distance = this.appendModule(
//         this.createTBModule(this.cloneEmptyTable as Element),
//         100,
//         ModuleType.TBODY
//       );
//       distance = this.appendModule(row, height, ModuleType.ROW);
//     }
//     next();
//   };
//   next();
//   return distance;
// }
