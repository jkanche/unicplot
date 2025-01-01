import { UnicodeChart } from "./base.js";

export class BarPlot extends UnicodeChart {
  constructor(width = 60, height = 20) {
    super(width, height);
  }

  render(data, options = {}) {
    const {
      colorScheme = "blue",
      showAxis = true,
      labels = null,
      title = "",
    } = options;

    const normalized = this._normalize(data);
    let output = title ? title + "\n" : "";

    // Draw bars
    for (let i = 0; i < normalized.length; i++) {
      const barHeight = Math.round(normalized[i] * (this.height - 1));
      const label = labels ? labels[i].padEnd(10) : String(i).padEnd(4);

      output += label;
      output += this._getColorCode(normalized[i], colorScheme);
      output += UnicodeChart.BLOCKS.full.repeat(barHeight);
      output += UnicodeChart.COLORS.reset;
      output += "\n";
    }

    return output;
  }
}
