"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTplTag = exports.getStyle = exports.calcHeight = exports.getDeviceParams = void 0;
const index_1 = require("../index");
function getDeviceParams() {
    // 获取屏幕分辨率dpi(一英寸展示多少个像素)
    const dpiEle = document.createElement("div");
    dpiEle.setAttribute("style", "width:1in;height:1in;overflow:hidden;");
    const body = document.querySelector("body");
    body === null || body === void 0 ? void 0 : body.appendChild(dpiEle);
    const offsetWidth = dpiEle.offsetWidth;
    const width = Math.round(8.27 * offsetWidth);
    const height = Math.ceil(11.69 * offsetWidth);
    body === null || body === void 0 ? void 0 : body.removeChild(dpiEle);
    return {
        width,
        height,
    };
}
exports.getDeviceParams = getDeviceParams;
function calcHeight(ele) {
    return (ele.offsetHeight +
        (0, exports.getStyle)(ele, "marginTop") +
        (0, exports.getStyle)(ele, "marginBottom"));
}
exports.calcHeight = calcHeight;
let getStyle = function (ele, attr) {
    if (typeof getComputedStyle !== "undefined") {
        exports.getStyle = function (ele, attr) {
            return parseInt(document.defaultView.getComputedStyle(ele, null)[attr]);
        };
    }
    else {
        exports.getStyle = function (ele, attr) {
            return parseInt(ele.currentStyle[attr]);
        };
    }
    return (0, exports.getStyle)(ele, attr);
};
exports.getStyle = getStyle;
function findTplTag(tpl) {
    return Array.prototype.find.call(tpl.classList, (item) => item.startsWith(index_1.PrintTemplatesTag.printPdfTpl));
}
exports.findTplTag = findTplTag;
