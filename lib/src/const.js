"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Const {
    static setTableClass(classnames) {
        for (const classname in classnames) {
            this[classname] = classnames[classname];
        }
    }
}
exports.default = Const;
// defaut use elementui table component classnames
Const.cardTableTBHeaderWraper = "el-table__header-wrapper"; // table header wraper classname
Const.cardElRowClass = "el-table__row"; // table body row  classname
Const.elTableBodyWraper = "el-table__body-wrapper"; // table body wraper classname
Const.spliteFlagWraper = "page-splite-flag-wraper";
Const.spliteFlag = "page-splite-flag"; // 固定模块flag class标识
Const.tableClass = "card-table"; // table class 标识
Const.cardTableTopWraper = "card-table-top-wraper";
Const.cardTableWraper = "card-table-wraper";
Const.cardTableBomWraper = "card-table-bom-wraper";
Const.printImg = "print-img";
Const.printImgHeight = "print-img-height";
Const.elTbody = "tbody";
Const.minRowsCount = 3;
Const.rowHeight = 40;
Const.headerHeight = 40;
Const.wrapePadTop = 20;
// 展示页面标记
Const.printNormalTag = "print-normal-tag";
Const.printHeaderTag = "print-header-tag";
Const.printFooterTag = "print-footer-tag";
Const.printHeaderFooterTag = "print-header-footer-tag";
Const.pHeaderH = 50; // header高度
Const.pFooterH = 44; // 尾部高度
// 下载页面标记
//  一个下载页面有 header + main + footer 组成
Const.printPageWraper = "print-page-wraper"; // 普通页面标记类
Const.printImgWraper = "print-img-wraper"; // 图片页面标记类
Const.printLastWraper = "print-last-wraper"; // 最后一个页面标记class
Const.printHeaderName = "print-header-name"; // header class
Const.printMainName = "print-main-name"; //  主要内容 class
Const.printFooterName = "print-footer-name"; //  footer class
