import { UnicodeChart } from "./base.js";

export class HeatMap extends UnicodeChart {
  constructor(width = 60, height = 20) {
    super(width, height);
  }

  render(data, options = {}) {
    const {
      colorScheme = "greens",
      showScale = true,
      labels = { x: null, y: null },
      title = "",
      useSpectrum = true,
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

    let output = title ? title + "<br />" : "";

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      const yLabel = labels.y ? labels.y[i].padEnd(10) : String(i).padEnd(4);

      output += yLabel;
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        if (useSpectrum == true) {
          const block = UnicodeChart.BLOCKS.full;
          const color = this._getColorCode(value, colorScheme);

          if (!Array.isArray(color)) {
            throw `colors must be an array.`;
          }

          output += color[Math.floor(value * (color.length - 1))];
          output += block + block;
        } else {
          const intensity = Math.floor(value * 4);
          const block = [
            UnicodeChart.BLOCKS.empty_fill,
            UnicodeChart.BLOCKS.light,
            UnicodeChart.BLOCKS.medium,
            UnicodeChart.BLOCKS.dark,
            UnicodeChart.BLOCKS.full,
          ][intensity];

          const color = this._getColorCode(value, colorScheme)

          output += Array.isArray(color) ? color[0] : color;
          output += block + block;
        }

        output += UnicodeChart.COLORS.reset;
      }
      output += "<br />";
    }

    return output;
  }
}
