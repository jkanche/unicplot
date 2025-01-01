import {
  UnicodeChart,
  BarPlot,
  Histogram,
  ScatterPlot,
  LinePlot,
} from "../src/index.js";

describe("UnicodeChart", () => {
  describe("constructor", () => {
    it("should initialize with default dimensions", () => {
      const chart = new UnicodeChart();
      expect(chart.width).toBe(60);
      expect(chart.height).toBe(20);
    });

    it("should initialize with custom dimensions", () => {
      const chart = new UnicodeChart(30, 10);
      expect(chart.width).toBe(30);
      expect(chart.height).toBe(10);
    });
  });

  describe("_normalize", () => {
    let chart;

    beforeEach(() => {
      chart = new UnicodeChart();
    });

    it("should normalize an array of numbers between 0 and 1", () => {
      const data = [0, 5, 10];
      const normalized = chart._normalize(data);
      expect(normalized).toEqual([0, 0.5, 1]);
    });

    it("should handle single value arrays", () => {
      const data = [5];
      const normalized = chart._normalize(data);
      expect(normalized).toEqual([0]);
    });

    it("should handle arrays with identical values", () => {
      const data = [5, 5, 5];
      const normalized = chart._normalize(data);
      expect(normalized).toEqual([0, 0, 0]);
    });

    it("should handle custom min/max values", () => {
      const data = [2, 4, 6];
      const normalized = chart._normalize(data, 0, 10);
      expect(normalized).toEqual([0.2, 0.4, 0.6]);
    });
  });

  describe("_getColorCode", () => {
    let chart;

    beforeEach(() => {
      chart = new UnicodeChart();
    });

    it("should return correct color code for predefined colors", () => {
      expect(chart._getColorCode(0.5, "red")).toBe("\x1b[31m");
      expect(chart._getColorCode(0.5, "blue")).toBe("\x1b[34m");
    });

    it("should return reset code for unknown colors", () => {
      expect(chart._getColorCode(0.5, "invalidColor")).toBe("\x1b[0m");
    });

    it("should handle custom color functions", () => {
      const customColor = (value) => (value > 0.5 ? "\x1b[31m" : "\x1b[34m");
      expect(chart._getColorCode(0.7, customColor)).toBe("\x1b[31m");
      expect(chart._getColorCode(0.3, customColor)).toBe("\x1b[34m");
    });
  });
});

describe("BarPlot", () => {
  describe("render", () => {
    let barPlot;

    beforeEach(() => {
      barPlot = new BarPlot(20, 10);
    });

    it("should render correct number of bars", () => {
      const data = [1, 2, 3];
      const output = barPlot.render(data);
      const lines = output.split("\n");
      expect(lines.length - 1).toBe(data.length); // -1 for last newline
    });

    it("should include title when provided", () => {
      const output = barPlot.render([1, 2, 3], { title: "Test Chart" });
      expect(output.startsWith("Test Chart\n")).toBe(true);
    });

    it("should use custom color scheme", () => {
      const output = barPlot.render([1], { colorScheme: "red" });
      expect(output).toContain("\x1b[31m");
    });
  });
});

describe("Histogram", () => {
  describe("_createBins", () => {
    let histogram;

    beforeEach(() => {
      histogram = new Histogram(20, 10);
    });

    it("should create correct number of bins", () => {
      const data = Array(100)
        .fill(0)
        .map((_, i) => i);
      const { bins, binRanges } = histogram._createBins(data, 5);
      expect(bins.length).toBe(5);
      expect(binRanges.length).toBe(5);
    });

    it("should distribute values correctly", () => {
      const data = [1, 2, 3, 4, 5];
      const { bins } = histogram._createBins(data, 2);
      expect(bins[0]).toBe(2); // [1,2,3]
      expect(bins[1]).toBe(3); // [4,5]
    });

    it("should handle edge cases", () => {
      const data = [1, 1, 1];
      const { bins } = histogram._createBins(data, 3);
      expect(bins[0]).toBe(3);
      expect(bins[1]).toBe(0);
      expect(bins[2]).toBe(0);
    });
  });

  describe("render", () => {
    let histogram;

    beforeEach(() => {
      histogram = new Histogram(20, 10);
    });

    it("should render correct number of bins", () => {
      const data = Array(100)
        .fill(0)
        .map((_, i) => i);
      const output = histogram.render(data, { numBins: 5 });
      const lines = output.split("\n");
      expect(lines.length - 1).toBe(5); // -1 for last newline
    });

    it("should show bin labels when enabled", () => {
      const data = [1, 2, 3];
      const output = histogram.render(data, { showBinLabels: true });
      expect(output).toContain("[");
      expect(output).toContain("]");
    });

    it("should hide bin labels when disabled", () => {
      const data = [1, 2, 3];
      const output = histogram.render(data, { showBinLabels: false });
      expect(output).not.toContain("[");
      expect(output).not.toContain("]");
    });
  });
});

describe("ScatterPlot", () => {
  describe("render", () => {
    let scatterPlot;

    beforeEach(() => {
      scatterPlot = new ScatterPlot(20, 10);
    });

    it("should render points within bounds", () => {
      const points = [
        [0, 0],
        [1, 1],
      ];
      const output = scatterPlot.render(points);
      const lines = output.split("\n");
      expect(lines.length).toBeLessThanOrEqual(11); // height + 1 for newline
      expect(Math.max(...lines.map((l) => l.length))).toBeLessThanOrEqual(21); // width + 1
    });

    it("should render axes when enabled", () => {
      const output = scatterPlot.render([[0, 0]], { showAxis: true });
      expect(output).toContain("│");
      expect(output).toContain("─");
    });
  });
});

describe("LinePlot", () => {
  describe("render", () => {
    let linePlot;

    beforeEach(() => {
      linePlot = new LinePlot(20, 10);
    });

    it("should render continuous line", () => {
      const data = [1, 2, 3];
      const output = linePlot.render(data);
      expect(output).toContain("█");
    });

    it("should render axes when enabled", () => {
      const output = linePlot.render([1, 2, 3], { showAxis: true });
      expect(output).toContain("│");
      expect(output).toContain("─");
    });

    it("should use custom color scheme", () => {
      const output = linePlot.render([1, 2, 3], { colorScheme: "red" });
      expect(output).toContain("\x1b[31m");
    });
  });

  describe("_drawLine", () => {
    let linePlot;

    beforeEach(() => {
      linePlot = new LinePlot(20, 10);
    });

    it("should draw line within canvas bounds", () => {
      const canvas = Array(10)
        .fill()
        .map(() => Array(20).fill(" "));
      linePlot._drawLine(canvas, 0, 0, 19, 9, 1, "blue");

      // Check if line stays within bounds
      let foundPoints = 0;
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 20; x++) {
          if (canvas[y][x] !== " ") foundPoints++;
        }
      }
      expect(foundPoints).toBeGreaterThan(0);
    });
  });
});
