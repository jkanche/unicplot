import { UnicodeChart } from "./base.js";

export class HeatMap extends UnicodeChart {
  constructor(width = 60, height = 20) {
    super(width, height);
  }

  render(data, options = {}) {
    const {
      colorScheme = "blue",
      showScale = true,
      labels = { x: null, y: null },
      title = "",
    } = options;

    const flattened = data.flat();
    const normalized = this._normalize(flattened);
    const matrix = [];
    let idx = 0;

    for (let i = 0; i < data.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < data[i].length; j++) {
        matrix[i][j] = normalized[idx++];
      }
    }

    let output = title ? title + "\n" : "";

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      const yLabel = labels.y ? labels.y[i].padEnd(10) : String(i).padEnd(4);

      output += yLabel;
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        const intensity = Math.floor(value * 4);
        const block = [
          UnicodeChart.BLOCKS.empty,
          UnicodeChart.BLOCKS.light,
          UnicodeChart.BLOCKS.medium,
          UnicodeChart.BLOCKS.dark,
          UnicodeChart.BLOCKS.full,
        ][intensity];

        output += this._getColorCode(value, colorScheme);
        output += block + block;
        output += UnicodeChart.COLORS.reset;
      }
      output += "\n";
    }

    return output;
  }
}
