import { MarkConfig } from "../index";

function waterMark(markConfig: MarkConfig) {
  const baseConfig = {
    // waterMarkId: markConfig.waterMarkId,
    waterMarkContent: "水印内容",
    waterMarkX: -10,
    waterMarkY: 40,
    waterMarkRows: 1000,
    waterMarkCols: 200,
    waterMarkXSpace: 140,
    waterMarkYSpace: 80,
    waterMarkColor: "#999999",
    waterMarkAlpha: 0.2,
    waterMarkFontSize: "25px",
    waterMarkFont: "微软雅黑",
    waterMarkWidth: 150,
    waterMarkHeight: 100,
    waterMarkAngle: 15,
  };
  const settings = Object.assign({}, baseConfig, markConfig);
  if (arguments.length === 1 && typeof arguments[0] === "object") {
    const src = arguments[0] || {};
    for (const key in src) {
      if (src[key] && settings[key] && src[key] === settings[key]) continue;
      else if (src[key]) settings[key] = src[key];
    }
  }
  const obj = document.getElementById(settings.waterMarkId);

  if (!obj) {
    throw new Error(`${markConfig.waterMarkId} must be exist in document`);
  }

  const tmpObj = document.createDocumentFragment();
  const pageWidth = obj.clientWidth;
  console.log("pageWidth", pageWidth);
  const pageHeight = obj.offsetHeight;
  const r1 =
    settings.waterMarkX +
    settings.waterMarkWidth * settings.waterMarkCols +
    settings.waterMarkXSpace * (settings.waterMarkCols - 1);
  if (settings.waterMarkCols == 0 || parseInt(String(r1)) > pageWidth) {
    const r2 =
      (pageWidth - settings.waterMarkX + settings.waterMarkXSpace) /
      (settings.waterMarkWidth + settings.waterMarkXSpace);
    settings.waterMarkCols = parseInt(String(r2));
    const r3 =
      (pageWidth -
        settings.waterMarkX -
        settings.waterMarkWidth * settings.waterMarkCols) /
      (settings.waterMarkCols - 1);
    settings.waterMarkXSpace = parseInt(String(r3));
  }
  if (
    settings.waterMarkRows == 0 ||
    parseInt(
      String(
        settings.waterMarkY +
          settings.waterMarkHeight * settings.waterMarkRows +
          settings.waterMarkYSpace * (settings.waterMarkRows - 1)
      )
    ) > pageHeight
  ) {
    settings.waterMarkRows = parseInt(
      String(
        (settings.waterMarkYSpace + pageHeight - settings.waterMarkY) /
          (settings.waterMarkHeight + settings.waterMarkYSpace)
      )
    );
    settings.waterMarkYSpace = parseInt(
      String(
        (pageHeight -
          settings.waterMarkY -
          settings.waterMarkHeight * settings.waterMarkRows) /
          (settings.waterMarkRows - 1)
      )
    );
  }
  let x;
  let y;
  settings.waterMarkRows =
    settings.waterMarkRows == 0 ? 6 : settings.waterMarkRows;
  for (let i = 0; i < settings.waterMarkRows; i++) {
    y =
      settings.waterMarkY +
      (settings.waterMarkYSpace + settings.waterMarkHeight) * i;
    y = isNaN(y) ? 40 : y;
    for (let j = 0; j < settings.waterMarkCols; j++) {
      x =
        settings.waterMarkX +
        (settings.waterMarkWidth + settings.waterMarkXSpace) * j;
      const markElement = document.createElement("div");
      markElement.id = "markElement" + i + j;
      markElement.appendChild(
        document.createTextNode(settings.waterMarkContent)
      );

      //设置水印div倾斜显示
      markElement.style.webkitTransform =
        "rotate(-" + settings.waterMarkAngle + "deg)";
      // @ts-ignore
      markElement.style.MozTransform =
        "rotate(-" + settings.waterMarkAngle + "deg)";
      // @ts-ignore
      markElement.style.msTransform =
        "rotate(-" + settings.waterMarkAngle + "deg)";
      // @ts-ignore
      markElement.style.OTransform =
        "rotate(-" + settings.waterMarkAngle + "deg)";
      markElement.style.transform =
        "rotate(-" + settings.waterMarkAngle + "deg)";
      markElement.style.visibility = "";
      markElement.style.position = "absolute";
      markElement.style.left = x + "px";
      markElement.style.top = y + "px";
      markElement.style.overflow = "hidden";
      markElement.style.opacity = String(settings.waterMarkAlpha);
      markElement.style.fontSize = settings.waterMarkFontSize;
      markElement.style.fontFamily = settings.waterMarkFont;
      markElement.style.color = settings.waterMarkColor;
      markElement.style.textAlign = "center";
      markElement.style.width = "auto !important";
      markElement.style.height = "auto !important";
      markElement.style.zIndex = "999999 !important";
      markElement.style.display = "block";
      markElement.style["pointer-events"] = "none";

      markElement.style.filter =
        "alpha(opacity=" + settings.waterMarkAlpha * 100 + ")";
      markElement.setAttribute("class", "markElement");
      tmpObj.appendChild(markElement);
    }
  }
  obj.appendChild(tmpObj);
}
export default waterMark;
