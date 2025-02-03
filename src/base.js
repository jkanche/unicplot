export class UnicodeChart {
  static BLOCKS = {
    empty: " ",
    empty_fill: "⠀",
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

  static COLORS_UNICODE = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
  };

  static COLORS = {
    reset: "</span>",
    bold: '<span style="font-weight: bold;">',
    italic: '<span style="font-style: italic;">',
    line_through: '<span style="text-decoration: line-through;">',
    underline: '<span style="text-decoration: underline;">',
    black: '<span style="color:black;">',
    red: '<span style="color:red;">',
    green: '<span style="color:green;">',
    yellow: '<span style="color:yellow;">',
    blue: '<span style="color:blue;">',
    magenta: '<span style="color:magenta;">',
    cyan: '<span style="color:cyan;">',
    white: '<span style="color:white;">',
    greens: ['#eeeeee', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map(x => '<span style="color:' + x + ';">'),
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
