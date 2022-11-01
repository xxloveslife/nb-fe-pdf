import { ModuleType, PageInfo } from "../index";
import Const from "./const";
import {
  TbModuleInfoItem,
  CurrentStyleElement,
  Ele,
  TbQueueItem,
} from "../index";
import DfsChild from "./DfsChild";

export default class SplitePage extends DfsChild {
  constructor() {
    super();
  }
  completeSplit = false;
  tBody: HTMLElement[] | null = null;
  cloneEmptyTable: HTMLElement | null = null;

  tbodyAppendChild(table: HTMLElement, row: HTMLElement) {
    table.querySelector("." + Const.elTbody)?.appendChild(row);
  }

  /**
   * 拆分table
   */
  splitTable(ele: Ele, distance: number) {
    const moduleInfo = this.childMap.get(ele);
    const {
      tbTopInfo,
      table,
      tbBomInfo,
      minHeight,
      marginPadHeight,
    } = moduleInfo.tableModuleInfo;
    const tbQueue: TbModuleInfoItem[] = [tbTopInfo, table, tbBomInfo].filter(
      (item) => item.height > 5
    );

    if (distance < minHeight) {
      distance = this.createWraper(ele) - marginPadHeight;
    } else {
      distance = distance - marginPadHeight;
    }

    while (tbQueue.length > 0) {
      let item: TbModuleInfoItem = tbQueue.shift() as TbModuleInfoItem;
      let flag = false;
      if (
        item.module.classList.contains(Const.cardTableTopWraper) &&
        distance > minHeight
      ) {
        flag = true;
      }

      if (
        item.module.classList.contains(Const.cardTableWraper) &&
        distance > item.height
      ) {
        flag = true;
      }

      if (
        item.module.classList.contains(Const.cardTableBomWraper) &&
        distance > item.height
      ) {
        flag = true;
      }

      if (flag) {
        distance = this.appendModule(
          item.module,
          item.height,
          ModuleType.TB_MODULE
        );
      } else {
        if (item.module.classList.contains(Const.cardTableWraper)) {
          const module = item.module;
          const rowQueue = this.findRows(module);
          this.cleanTbody(module);
          this.cloneTable(module as HTMLElement);
          if (distance < minHeight) {
            distance = this.createWraper(module);
          }
          distance = this.appendModule(
            this.createTBModule(this.cloneEmptyTable as Element),
            100,
            ModuleType.TBODY
          );
          let tbBomHeight = tbBomInfo.height;
          while (rowQueue.length > 0) {
            let row = rowQueue.shift();
            const height = (row as CurrentStyleElement).calcHeight;

            if (distance > height + tbBomHeight) {
              distance = this.appendModule(
                row as Element,
                height,
                ModuleType.ROW
              );
            } else {
              distance = this.createWraper(module);
              distance = this.appendModule(
                this.createTBModule(this.cloneEmptyTable as Element),
                100,
                ModuleType.TBODY
              );
              distance = this.appendModule(
                row as Element,
                height,
                ModuleType.ROW
              );
            }
          }
        } else {
          distance = this.createWraper(ele);
          distance = this.appendModule(
            item.module,
            item.height,
            ModuleType.TB_MODULE
          );
        }
      }
    }
    return distance;
  }

  /**
   * 拆分页面
   */
  splitPage(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    let distance = 0;
    let idx = 0;
    const stack = [...(this.childMap.keys() as any)];
    let flag = true;
    const next = () => {
      if (idx >= stack.length) return;
      const ele = stack[idx++];
      if (ele.classList.contains(Const.printImg)) {
        this.createWraper(ele);
        this.appendModule(ele, 0, ModuleType.IMG);
        if (!flag) {
          flag = true;
        }
      } else {
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
          } else {
            // 重新创建页面
            this.createWraper(ele);
            distance = this.appendModule(
              ele,
              nodeInfo.height,
              ModuleType.MODULE
            );
          }
        } else {
          // 能放下
          distance = this.appendModule(ele, nodeInfo.height, ModuleType.MODULE);
        }
      }
      next();
    };
    next();
  }

  cloneTable(table: HTMLElement) {
    this.cloneEmptyTable = table.cloneNode(true) as HTMLElement;
    this.removeStyleHeight();
  }

  removeStyleHeight() {
    const next = (node: HTMLElement) => {
      if (
        !node ||
        (node.classList && node.classList.contains(Const.elTableBodyWraper))
      )
        return;
      const height = node.style && node.style.height;
      if (height) {
        node.style.height = "auto";
      }
      if (node.hasChildNodes()) {
        const nodeQueue = Array.from(node.children);
        while (nodeQueue.length > 0) {
          const curNode = nodeQueue.shift();
          next(curNode as HTMLElement);
        }
      }
    };
    next(this.cloneEmptyTable as HTMLElement);
  }

  findRows(ele: HTMLElement) {
    const rows = ele.querySelectorAll("." + Const.cardElRowClass);
    return Array.from(rows);
  }

  cleanTbody(ele: HTMLElement) {
    const rows = ele.querySelectorAll("." + Const.cardElRowClass);
    Array.from(rows)?.forEach((row) => {
      row.parentNode?.removeChild(row);
    });
  }

  createTBModule(cloneEmptyTable: Element) {
    const moduleTbWraper = document.createElement("div");
    // moduleTbWraper.setAttribute("style", "border: 3px solid yellow");
    const emptyTable = cloneEmptyTable?.cloneNode(true) as HTMLElement;
    moduleTbWraper.appendChild(emptyTable as HTMLElement);
    return moduleTbWraper;
  }
}
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
