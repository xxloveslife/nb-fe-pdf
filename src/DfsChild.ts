import Const from "./const";
import { calcHeight, findTplTag } from "./utils";
import {
  CurrentStyleElement,
  PrintTemplatesTag,
  TbModuleInfo,
  TplMap,
} from "../index";
import PdfPage from "./PdfPage";

export default class DfsChild extends PdfPage {
  constructor() {
    super();
  }
  childMap = new Map();
  static headerTplMap = new Map();
  static footerTplMap = new Map();
  flagNum = 0; // 只是为了方便 排查分页后的打印数据 中的模块 和页面元素的 之间的对应关系
  time = 1;
  walk(ele: HTMLElement) {
    this.time++;
    if (ele.hasChildNodes()) {
      const nodeQueue = Array.from(ele.children);
      while (nodeQueue.length > 0) {
        const node = nodeQueue.shift();
        if (node?.classList.contains(Const.spliteFlag)) {
          this.setPagesMap(node as HTMLElement);
          continue;
        } else {
          this.walk(node as HTMLElement);
        }
      }
    } else {
      this.setPagesMap(ele as HTMLElement);
    }
  }

  setPagesMap(ele: HTMLElement) {
    if (ele.classList.contains(Const.spliteFlag) && !this.childMap.has(ele)) {
      ele.classList.add(`flagNum-${this.flagNum++}`);
      this.childMap.set(ele, this.getModuleInfo(ele));
    }
  }

  getModuleInfo(ele: HTMLElement) {
    const isTable = ele.classList.contains(Const.tableClass);
    const moduleInfo = {
      height: calcHeight(ele),
      isTable,
      tableModuleInfo: {},
    };
    if (isTable) {
      moduleInfo.tableModuleInfo = this.getTableModuleInfo(
        ele,
        moduleInfo.height
      );
    }
    return moduleInfo;
  }

  getTableModuleInfo(ele: HTMLElement, height: number) {
    const tbModuleInfo = {
      tbTopInfo: this.getEleHeight(ele, Const.cardTableTopWraper),
      tbHeader: this.getEleHeight(ele, Const.cardTableTBHeaderWraper),
      table: this.getEleHeight(ele, Const.cardTableWraper),
      tbBomInfo: this.getEleHeight(ele, Const.cardTableBomWraper),
      minHeight: 0,
      marginPadHeight: 0,
    };
    // console.log("getMinHeight tbModuleInfo", tbModuleInfo);
    tbModuleInfo.minHeight = this.getMinHeight(
      ele,
      tbModuleInfo as TbModuleInfo,
      height
    );
    let marginPadHeight =
      height -
      (tbModuleInfo.tbTopInfo.height +
        tbModuleInfo.table.height +
        tbModuleInfo.tbBomInfo.height);
    tbModuleInfo.marginPadHeight = marginPadHeight;
    return tbModuleInfo;
  }
  /**
   * minHeight 最小高度 = topInfoHeight + tbHeaderheight + row * minRowsCount
   */
  getMinHeight(ele: HTMLElement, tbModuleInfo: TbModuleInfo, height: number) {
    // console.log("getMinHeight ele", ele);
    const nodes = ele.querySelectorAll("." + Const.cardElRowClass);
    const { tbTopInfo, tbHeader } = tbModuleInfo;
    let threeRowHeight = 0;

    if (nodes.length > Const.minRowsCount) {
      nodes.forEach((node, index) => {
        console.log("node.clientHeight", node.clientHeight);
        console.log(
          "calcHeight(node as HTMLElement)",
          calcHeight(node as HTMLElement)
        );
        if (index < Const.minRowsCount) {
          threeRowHeight += calcHeight(node as HTMLElement) || 0;
        }
        (node as CurrentStyleElement).calcHeight = node.clientHeight;
      });
      return tbTopInfo.height + tbHeader.height + threeRowHeight;
    } else {
      nodes.forEach((node, index) => {
        (node as CurrentStyleElement).calcHeight = node.clientHeight;
      });
      return height;
    }
  }

  getEleHeight(ele: HTMLElement, className: string) {
    const module: HTMLElement = ele.querySelector(
      "." + className
    ) as HTMLElement;
    // console.log(" getMinHeight module", module);
    if (ele && module) {
      return {
        module,
        height: calcHeight(module),
      };
    } else {
      return {
        module,
        height: 0,
      };
    }
  }

  static getTpl() {
    const headerTpls = this.getChildTpls(
      PrintTemplatesTag.printHeadertemplates
    );
    const footerTpls = this.getChildTpls(
      PrintTemplatesTag.printFooterTemplates
    );
    this.headerTplMap.size === 0 &&
      this.setTplFunc(headerTpls as Element[], this.headerTplMap);
    this.footerTplMap.size === 0 &&
      this.setTplFunc(footerTpls as Element[], this.footerTplMap);

    // console.log("this.headerTplMap", this.headerTplMap);
    // console.log("this.headerTplMap", this.footerTplMap);
  }

  static setTplFunc(tpls: Element[], map: TplMap) {
    tpls.forEach((tpl: ChildNode) => {
      const flag = findTplTag(tpl as Element);
      if (flag && !map.has(flag)) {
        map.set(flag, {
          tpl: tpl as Element,
          height: (tpl as HTMLDivElement).offsetHeight,
        });
      }
    });
  }
  static getChildTpls(flag: string) {
    const ele = document.getElementById(flag);
    if (ele) {
      return ele.childNodes;
    }
    return [];
  }
}
