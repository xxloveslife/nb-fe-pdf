export default class Const {
  // defaut use elementui table component classnames
  static cardTableTBHeaderWraper = "el-table__header-wrapper"; // table header wraper classname
  static cardElRowClass = "el-table__row"; // table body row  classname
  static elTableBodyWraper = "el-table__body-wrapper"; // table body wraper classname

  static spliteFlagWraper = "page-splite-flag-wraper";
  static spliteFlag = "page-splite-flag"; // 固定模块flag class标识

  static tableClass = "card-table"; // table class 标识
  static cardTableTopWraper = "card-table-top-wraper";
  static cardTableWraper = "card-table-wraper";
  static cardTableBomWraper = "card-table-bom-wraper";

  static printImg = "print-img";
  static printImgHeight = "print-img-height";

  static elTbody = "tbody";
  static minRowsCount = 3;
  static rowHeight = 40;
  static headerHeight = 40;
  static wrapePadTop = 20;
  // 展示页面标记
  static printNormalTag = "print-normal-tag";
  static printHeaderTag = "print-header-tag";
  static printFooterTag = "print-footer-tag";
  static printHeaderFooterTag = "print-header-footer-tag";

  static pHeaderH = 50; // header高度
  static pFooterH = 44; // 尾部高度
  // 下载页面标记
  //  一个下载页面有 header + main + footer 组成
  static printPageWraper = "print-page-wraper"; // 普通页面标记类
  static printImgWraper = "print-img-wraper"; // 图片页面标记类
  static printLastWraper = "print-last-wraper"; // 最后一个页面标记class
  static printHeaderName = "print-header-name"; // header class
  static printMainName = "print-main-name"; //  主要内容 class
  static printFooterName = "print-footer-name"; //  footer class

  static setTableClass(classnames: Object) {
    for (const classname in classnames) {
      this[classname] = classnames[classname];
    }
  }
}
