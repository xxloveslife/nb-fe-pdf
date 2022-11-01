"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const index_2 = require("../index");
const utils_1 = require("./utils");
const DfsChild_1 = __importDefault(require("./DfsChild"));
const const_1 = __importDefault(require("./const"));
/**
 * 主要思想：发布订阅
 *  将动态创建的wraper 订阅到deps里面, 下载的时候统一发布deps里面的wraper；
 */
class PdfPage {
    constructor() {
        this.deps = document.createElement("div");
        this.wraper = null;
        this.tbWraper = null;
        this.mainHeigth = 0;
        this.base = {};
        this.pageInfo = {};
        this.pageHeight = 0;
        this.headerTplMap = DfsChild_1.default.headerTplMap;
        this.footerTplMap = DfsChild_1.default.footerTplMap;
        this.deps = document.createElement("div");
    }
    createWraper(ele) {
        var _a;
        this.ele = ele;
        this.initPage();
        this.curPage = this.wraper;
        (_a = this.deps) === null || _a === void 0 ? void 0 : _a.appendChild(this.curPage);
        return this.mainHeigth;
    }
    /**
     * 初始化 imgPageWraper 和普通页面的wraper
     */
    initPage() {
        var _a;
        if (this.ele) {
            const pageType = this.getPageType(this.ele);
            if ((_a = this.ele) === null || _a === void 0 ? void 0 : _a.classList.contains(const_1.default.printImg)) {
                this.ele.classList.add(const_1.default.printImgHeight);
                this.wraper = this.createPageWraper(const_1.default.printImgWraper, pageType);
            }
            else {
                this.wraper = this.createPageWraper(const_1.default.printPageWraper, pageType);
            }
            let header;
            let main;
            let footer;
            if (pageType === index_2.PrintType.NORMAL_TYPE) {
                this.mainHeigth = this.pageHeight;
                main = this.createModule(const_1.default.printMainName, this.pageHeight);
            }
            if (pageType === index_2.PrintType.HEADER_TYPE) {
                const { tpl, heigth: pHeaderH } = this.cloneTpl(this.ele, this.headerTplMap, const_1.default.printHeaderName);
                header = tpl;
                this.mainHeigth = this.pageHeight - pHeaderH;
                main = this.createModule(const_1.default.printMainName, this.mainHeigth);
            }
            if (pageType === index_2.PrintType.FOOTER_TYPE) {
                const { tpl, heigth: pFooterH } = this.cloneTpl(this.ele, this.footerTplMap, const_1.default.printFooterName);
                footer = tpl;
                this.mainHeigth = this.pageHeight - pFooterH;
                main = this.createModule(const_1.default.printMainName, this.mainHeigth);
            }
            if (pageType === index_2.PrintType.HEADER_FOOTER_TYPE) {
                const { tpl: HTpl, heigth: pHeaderH } = this.cloneTpl(this.ele, this.headerTplMap, const_1.default.printHeaderName);
                header = HTpl;
                const { tpl: FTpl, heigth: pFooterH } = this.cloneTpl(this.ele, this.footerTplMap, const_1.default.printFooterName);
                footer = FTpl;
                this.mainHeigth = this.pageHeight - pHeaderH - pFooterH;
                main = this.createModule(const_1.default.printMainName, this.mainHeigth);
            }
            header && this.wraper.appendChild(header);
            main && this.wraper.appendChild(main);
            footer && this.wraper.appendChild(footer);
        }
    }
    getPageType(ele) {
        const TYPES = Object.values(index_2.PrintType);
        const type = Array.from(ele.classList).find((item) => TYPES.includes(item));
        return type || this.pageInfo.defaultType || index_2.PrintType.NORMAL_TYPE;
    }
    cloneTpl(ele, map, className) {
        const flag = (0, utils_1.findTplTag)(ele);
        let cloneTpl;
        let cloneheight = 0;
        let tplMap;
        if (this.pageInfo.needTpl) {
            if (map.size === 0) {
                console.error(`needTpl：true，需要传入对应的template!`);
            }
            if (map.size > 0) {
                if (flag && map.has(flag)) {
                    tplMap = map.get(flag);
                }
                else {
                    tplMap =
                        className === const_1.default.printHeaderName
                            ? map.get(index_1.PrintTemplatesTag.printPdfTplHeaderDefault)
                            : map.get(index_1.PrintTemplatesTag.printPdfTplFooterDefault);
                }
                cloneTpl = tplMap.tpl.cloneNode(true);
                cloneTpl.classList.add(className);
                cloneheight = tplMap.height;
                cloneTpl.style.height = cloneheight + "px";
            }
        }
        return {
            tpl: cloneTpl,
            heigth: cloneheight,
        };
    }
    /**
     * 动态创建 pdf A4 page wraper
     * @param name "print-img-wraper" 图片页面标记类;  "print-page-wraper"普通页面标记类
     * @param pageType PrintType
     * @returns
     */
    createPageWraper(name, pageType) {
        const wraper = document.createElement("div");
        wraper.classList.add(pageType);
        wraper.classList.add(name);
        return wraper;
    }
    /**
     * 创建 pdf A4纸张中的 一个个模块 header footer main
     * @param name header/footer/main 的class 类名
     * @param height header/footer/main 高度
     * @returns 创建好的模块
     */
    createModule(name, height) {
        const module = document.createElement("div");
        module.style.height = height + "px";
        module.classList.add(name);
        return module;
    }
    /**
     * 往page里面添加模块 模块类型有： 1.单独的img 2. 独立的module 3. tableModule 4.table tbody 5. table row
     * @param ele 要添加的元素 ModuleType
     * @param height 元素的高度
     * @param type  ModuleType
     * @returns 返回当前页面剩余的高度
     */
    appendModule(ele, height, type) {
        var _a, _b, _c;
        if (ele) {
            if (type === index_2.ModuleType.ROW) {
                const main = (_a = this.wraper) === null || _a === void 0 ? void 0 : _a.querySelector(`.${const_1.default.printMainName}`);
                let wr = main.querySelectorAll(`.${const_1.default.cardTableWraper}`);
                wr = wr[Array.from(wr).length - 1];
                const by = wr.querySelector(`${const_1.default.elTbody}`);
                by.appendChild(ele);
            }
            else {
                (_c = (_b = this.wraper) === null || _b === void 0 ? void 0 : _b.querySelector(`.${const_1.default.printMainName}`)) === null || _c === void 0 ? void 0 : _c.appendChild(ele);
            }
            this.mainHeigth = this.mainHeigth - height;
        }
        return this.mainHeigth;
    }
}
exports.default = PdfPage;
