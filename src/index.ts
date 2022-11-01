import Compose from "./Compose";
import { ModuleMap, ModuleInfo, MarkConfig } from "../index";
import { getDeviceParams } from "./utils";
import waterMark from "./waterMark";
import Const from "./const";

export interface BaseClass {
  cardTableTBHeaderWraper: string;
  cardElRowClass: string;
  elTableBodyWraper: string;
}
export interface PrintParmas {
  moduleMap: ModuleMap | ModuleInfo;
  selectModule?: string[];
  injectClass?: BaseClass;
  callback?: Function;
}
export class Print {
  constructor({ selectModule, moduleMap, injectClass, callback }: PrintParmas) {
    // 多个Map模块下载
    if (selectModule && moduleMap) {
      this.selectModule = selectModule;
      this.needFilter = true;
      this.moduleMap = moduleMap as ModuleMap;
    } else {
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
    this.deviceParams = getDeviceParams();
    this.createPrint();
  }

  needFilter = true;
  selectModule: string[] = [];
  ModuleInfoSet: ModuleInfo[] = [];
  moduleMap = new Map();
  deviceParams = { width: 0, height: 0 };
  injectClass: Partial<BaseClass> = {};
  callback = Function.prototype;

  static completedMap = new Map();
  static completedModule(moduleId: string) {
    this.completedMap.set(moduleId, true);
  }

  async createPrint() {
    this.needFilter && this.filterSelectModule();
    // 注入不同ui组件的table class
    if (this.injectClass && Object.keys(this.injectClass).length > 0) {
      Const.setTableClass(this.injectClass);
    }
    this.ModuleInfoSet.forEach(async (module: ModuleInfo, index) => {
      if (this.ModuleInfoSet.length - 1 === index) {
        module.pageInfo.lastModule = true;
      }
      await this.onPrint(module);
    });

    await this.exitCallback();
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

  async onPrint(module: ModuleInfo) {
    if (Print.completedMap.get(module.moduleId)) {
      console.log(`${module.moduleId} 模块已经分页过了`);
      return;
    }
    module.pageInfo.deviceParams = this.deviceParams;
    await new Compose(module).print();
    this.setWaterMark(module);
  }

  setWaterMark(module: ModuleInfo) {
    setTimeout(() => {
      console.log("waterMark");
      waterMark(module.pageInfo.waterMarkConfig as MarkConfig);
    }, 300);
  }

  filterSelectModule() {
    this.ModuleInfoSet = this.selectModule
      .filter((item) => this.moduleMap.has(item))
      .map((item) => this.moduleMap.get(item));
  }
}
