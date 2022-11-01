import { CurrentStyleElement, PrintTemplatesTag } from "../index";

export function getDeviceParams() {
  // 获取屏幕分辨率dpi(一英寸展示多少个像素)
  const dpiEle = document.createElement("div");
  dpiEle.setAttribute("style", "width:1in;height:1in;overflow:hidden;");
  const body = document.querySelector("body");
  body?.appendChild(dpiEle);
  const offsetWidth = dpiEle.offsetWidth;
  const width = Math.round(8.27 * offsetWidth);
  const height = Math.ceil(11.69 * offsetWidth);
  body?.removeChild(dpiEle);
  return {
    width,
    height,
  };
}

export function calcHeight(ele: HTMLElement | CurrentStyleElement) {
  return (
    (ele as HTMLElement).offsetHeight +
    getStyle(ele as CurrentStyleElement, "marginTop") +
    getStyle(ele as CurrentStyleElement, "marginBottom")
  );
}

export let getStyle = function (
  ele: CurrentStyleElement,
  attr: string
): number {
  if (typeof getComputedStyle !== "undefined") {
    getStyle = function (ele: CurrentStyleElement, attr: string) {
      return parseInt(
        (document.defaultView as Window).getComputedStyle(ele as Element, null)[
          attr
        ]
      );
    };
  } else {
    getStyle = function (ele: CurrentStyleElement, attr: string) {
      return parseInt(ele.currentStyle[attr]);
    };
  }
  return getStyle(ele, attr);
};

export function findTplTag(tpl: Element) {
  return Array.prototype.find.call((tpl as Element).classList, (item) =>
    item.startsWith(PrintTemplatesTag.printPdfTpl)
  );
}
