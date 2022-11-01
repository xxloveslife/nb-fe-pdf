import { PrintPageDeclare, ModuleInfo, PageInfo, Print } from "../index";
import Const from "./const";
import SplitePage from "./SplitePage";

export default class Compose extends SplitePage implements PrintPageDeclare {
  constructor(module: ModuleInfo) {
    super();
    this.pageInfo = module.pageInfo;
    console.log("this.pageInfo", this.pageInfo);
    const { deviceParams, needTpl } = this.pageInfo;
    const { height, width } = deviceParams || { width: 0, height: 0 };
    this.pageHeight = height;
    this.pageWidth = width;
    this.needTpl = needTpl as boolean;
    this.moduleId = module.moduleId;
    this.init(this.moduleId);
  }
  rootWraperEle: HTMLElement | null = null;
  wraperDiv = [];
  moduleId: string;
  pageInfo: PageInfo;
  pageHeight = 0;
  pageWidth = 0;
  dfsChild = null;
  needTpl = false;
  init(ele: string) {
    this.rootWraperEle = document.querySelector(ele);
    if (this.rootWraperEle == null) {
      if (process.env.NODE_ENV === "production") {
        console.error(`找不到${ele}包裹元素！`);
      } else {
        throw new Error(`找不到${ele}包裹元素！`);
      }
      return;
    }

    this.needTpl && Compose.getTpl();
    console.log("Compose.tplMap", Compose.headerTplMap);
    this.walk(this.rootWraperEle as HTMLElement);
    console.log("this.childMap", this.childMap);
  }

  print() {
    return new Promise(
      (resolve: (value: boolean) => void, reject: (value: boolean) => void) => {
        this.splitPage(this.pageInfo);
        console.log("this.pageInfo111", this.pageInfo);
        console.log("this.deps", this.deps);
        if (this.rootWraperEle) {
          this.clearContainer();
          this.appendPage(this.deps as HTMLElement);
          this.deps = null;
          Print.completedModule(this.moduleId);
          resolve(true);
        } else {
          reject(false);
          throw new Error("布局失败");
        }
      }
    );
  }

  clearContainer() {
    Array.from((this.rootWraperEle as HTMLElement)?.children).forEach(
      (eleItem) => {
        this.rootWraperEle?.removeChild(eleItem);
      }
    );
  }

  appendPage(nodes: HTMLElement) {
    if (this.pageInfo.lastModule) {
      const lastChild = nodes.lastElementChild;
      if (lastChild) {
        lastChild.classList.remove(Const.printImgWraper);
        lastChild.classList.remove(Const.printPageWraper);
        lastChild.classList.add(Const.printLastWraper);
      }
    }
    Array.from(nodes.children).forEach((node, index, arr) => {
      this.rootWraperEle?.appendChild(node);
    });
  }
}
