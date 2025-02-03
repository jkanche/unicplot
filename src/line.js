import { UnicodeChart } from "./base.js";

export class LinePlot extends UnicodeChart {
  constructor(width = 60, height = 20) {
    super(width, height);
  }

  render(data, options = {}) {
    const {
      colorScheme = "blue",
      showAxis = true,
      labels = { x: null, y: null },
      title = "",
    } = options;

    const normalized = this._normalize(data);
    const canvas = Array(this.height)
      .fill()
      .map(() => Array(this.width).fill(" "));

    for (let i = 0; i < normalized.length - 1; i++) {
      const x1 = Math.floor((i / (normalized.length - 1)) * (this.width - 1));
      const x2 = Math.floor(
        ((i + 1) / (normalized.length - 1)) * (this.width - 1)
      );
      const y1 =
        this.height - 1 - Math.floor(normalized[i] * (this.height - 1));
      const y2 =
        this.height - 1 - Math.floor(normalized[i + 1] * (this.height - 1));

      this._drawLine(canvas, x1, y1, x2, y2, normalized[i], colorScheme);
    }

    let output = title ? title + "<br />" : "";

    if (showAxis) {
      for (let y = 0; y < this.height; y++) {
        canvas[y][0] = UnicodeChart.BLOCKS.lines.vertical;
      }
      for (let x = 0; x < this.width; x++) {
        canvas[this.height - 1][x] = UnicodeChart.BLOCKS.lines.horizontal;
      }
      canvas[this.height - 1][0] = UnicodeChart.BLOCKS.lines.bottomLeft;
    }

    for (let y = 0; y < this.height; y++) {
      output += canvas[y].join("") + "<br />";
    }

    return output;
  }

  _drawLine(canvas, x1, y1, x2, y2, value, colorScheme) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      if (x1 >= 0 && x1 < this.width && y1 >= 0 && y1 < this.height) {
        canvas[y1][x1] =
          this._getColorCode(value, colorScheme) +
          UnicodeChart.BLOCKS.full +
          UnicodeChart.COLORS.reset;
      }

      if (x1 === x2 && y1 === y2) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }
}
