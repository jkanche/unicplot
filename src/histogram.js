import { UnicodeChart } from "./base.js";

export class Histogram extends UnicodeChart {
  constructor(width = 60, height = 20) {
    super(width, height);
  }

  _createBins(data, numBins = 10) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / numBins;

    // Initialize bins
    const bins = Array(numBins).fill(0);
    const binRanges = Array(numBins)
      .fill(0)
      .map((_, i) => ({
        start: min + i * binWidth,
        end: min + (i + 1) * binWidth,
      }));

    // Count values in each bin
    data.forEach((value) => {
      const binIndex = Math.min(
        Math.floor((value - min) / binWidth),
        numBins - 1
      );
      bins[binIndex]++;
    });

    return { bins, binRanges };
  }

  render(data, options = {}) {
    const {
      numBins = 10,
      colorScheme = "blue",
      showAxis = true,
      title = "",
      showBinLabels = true,
    } = options;

    const { bins, binRanges } = this._createBins(data, numBins);
    const normalized = this._normalize(bins);
    let output = title ? title + "\n" : "";

    // Create vertical scale
    const maxCount = Math.max(...bins);
    const scaleLabels = Array(5)
      .fill(0)
      .map((_, i) =>
        Math.round((maxCount * (4 - i)) / 4)
          .toString()
          .padStart(4, " ")
      );

    // Draw histogram
    for (let i = 0; i < bins.length; i++) {
      const barHeight = Math.round(normalized[i] * (this.height - 1));
      const binLabel = showBinLabels
        ? `[${binRanges[i].start.toFixed(1)}-${binRanges[i].end.toFixed(
            1
          )}]`.padEnd(15)
        : String(i).padEnd(4);

      output += binLabel;
      output += this._getColorCode(normalized[i], colorScheme);
      output += UnicodeChart.BLOCKS.full.repeat(barHeight);
      output += " " + bins[i].toString().padStart(3); // Show count
      output += UnicodeChart.COLORS.reset;
      output += "\n";
    }

    return output;
  }
}
