# Generate simple visualzations using unicode characters

This is a fun package to generate simple plots using unicode characters.

## Quick start

```js
console.log("\nBar Plot Example:");
const barPlot = new BarPlot(40, 10);
console.log(barPlot.render([1, 4, 2, 8, 5, 7], {
    colorScheme: 'blue',
    title: 'Monthly Sales (in thousands)'
}));

console.log("\nHeat Map Example:");
const heatMap = new HeatMap(20, 10);
console.log(heatMap.render([
    [1, 2, 3, 4],
    [2, 4, 5, 6],
    [3, 5, 7, 8],
    [4, 6, 8, 9]
], {
    colorScheme: 'red',
    title: 'Temperature Map'
}));

// ScatterPlot
console.log("\nScatter Plot Example:");
const scatterPlot = new ScatterPlot(40, 15);
console.log(scatterPlot.render([
    [1, 2], [2, 4], [3, 3], [4, 5], [5, 4], [6, 7], [7, 6], [8, 8]
], {
    colorScheme: 'green',
    title: 'Height vs Weight Correlation'
}));

// LinePlot
console.log("\nLine Plot Example:");
const linePlot = new LinePlot(40, 15);
console.log(linePlot.render([1, 4, 2, 8, 5, 7, 6, 9, 4, 6], {
    colorScheme: 'cyan',
    title: 'Stock Price Over Time'
}));

const histogram = new Histogram(40, 15);

// Generate some sample data (normal distribution)
const sampleData = Array(1000).fill(0).map(() => {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum += Math.random();
    }
    return sum;
});

console.log(histogram.render(sampleData, {
    numBins: 12,
    colorScheme: 'cyan',
    title: 'Normal Distribution Histogram'
}));
```

