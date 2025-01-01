import { UnicodeChart } from "./base.js";

export class ScatterPlot extends UnicodeChart {
  constructor(width = 60, height = 20) {
    super(width, height);
  }

  render(points, options = {}) {
    const {
      colorScheme = "blue",
      showAxis = true,
      labels = { x: null, y: null },
      title = "",
    } = options;

    const xValues = points.map((p) => p[0]);
    const yValues = points.map((p) => p[1]);
    const normalizedX = this._normalize(xValues);
    const normalizedY = this._normalize(yValues);

    const canvas = Array(this.height)
      .fill()
      .map(() => Array(this.width).fill(" "));

    for (let i = 0; i < points.length; i++) {
      const x = Math.floor(normalizedX[i] * (this.width - 1));
      const y =
        this.height - 1 - Math.floor(normalizedY[i] * (this.height - 1));

      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        canvas[y][x] =
          this._getColorCode(normalizedY[i], colorScheme) +
          UnicodeChart.BLOCKS.dots[1] +
          UnicodeChart.COLORS.reset;
      }
    }

    let output = title ? title + "\n" : "";

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
      output += canvas[y].join("") + "\n";
    }

    return output;
  }
}
