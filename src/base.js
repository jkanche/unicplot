export class UnicodeChart {
  static BLOCKS = {
    empty: " ",
    light: "░",
    medium: "▒",
    dark: "▓",
    full: "█",
    eighths: ["⠀", "▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"],
    dots: ["·", "•", "●"],
    lines: {
      horizontal: "─",
      vertical: "│",
      topRight: "┐",
      topLeft: "┌",
      bottomRight: "┘",
      bottomLeft: "└",
      cross: "┼",
      verticalRight: "├",
      verticalLeft: "┤",
    },
  };

  static COLORS = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
  };

  constructor(width = 60, height = 20) {
    this.width = width;
    this.height = height;
  }

  _normalize(data, min = null, max = null) {
    const dataMin = min !== null ? min : Math.min(...data);
    const dataMax = max !== null ? max : Math.max(...data);
    const range = dataMax - dataMin;
    return data.map((val) => (val - dataMin) / (range || 1));
  }

  _getColorCode(value, colorScheme = "blue") {
    if (typeof colorScheme === "function") {
      return colorScheme(value);
    }
    return UnicodeChart.COLORS[colorScheme] || UnicodeChart.COLORS.reset;
  }
}
