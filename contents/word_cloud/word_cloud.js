// Example word count data
const wordCount = {
    "magnus": 216,
    "water": 66,
    "magic": 62,
    "rock": 29,
    "land": 27,
    "other": 21,
    "time": 20,
    "essence": 20,
    "tower": 19,
    "powerful": 19,
    "king": 19,
    "knew": 19,
    "path": 18,
    "mage": 17,
    "how": 16,
    "world": 15,
    "way": 15,
    "realized": 15,
    "seemed": 15,
    "journey": 14,
    "eye": 14,
    "too": 13,
    "saw": 13,
    "power": 12,
    "life": 11,
    "day": 11,
    "grew": 11,
    "book": 11,
    "far": 10,
    "chapter": 10,
    "long": 10,
    "place": 9,
    "wasnt": 9,
    "distance": 9,
    "magical": 9,
    "see": 9,
    "continue": 8,
    "learned": 8,
    "control": 8,
    "understood": 8,
    "small": 7,
    "felt": 7,
    "became": 7,
    "however": 7,
    "village": 6,
    "different": 6,
    "came": 6,
    "decided": 6,
    "element": 6,
    "merchant": 6,
    "clear": 5,
    "sea": 5,
    "thought": 5,
    "manipulate": 5,
    "slightly": 5,
    "left": 5,
    "returned": 5,
    "trap": 5,
    "view": 5,
    "always": 5
};

// Transform data into an array of objects
const words = Object.keys(wordCount).map(word => ({
    text: word,
    count: wordCount[word],
    size: wordCount[word]
}));

// Find the minimum and maximum values in the word count
const minCount = Math.min(...Object.values(wordCount));
const maxCount = Math.max(...Object.values(wordCount));

// Create a linear scaling function
const side = Math.sqrt(window.innerWidth * window.innerHeight)
const scaleSize = d3.scaleLinear()
    .domain([minCount, maxCount])
    .range([20/1000*side, 100/1000*side]); // Scale between 10 and 100

// Tooltip element
const tooltip = d3.select("#tooltip");

// Create the word cloud layout
const layout = d3.layout.cloud()
    .size([window.innerWidth, window.innerHeight])
    .words(words)
    .padding(5)
    .rotate(() => ~~(Math.random() * 2) * 90)
    .font("Impact")
    .fontSize(d => scaleSize(d.size)) // Use the scaling function for font size
    .on("end", draw);

layout.start();

// Draw the word cloud
function draw(words) {
    const svg = d3.select("#word-cloud")
        .append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)
        .append("g")
        .attr("transform", `translate(${window.innerWidth / 2},${window.innerHeight / 2})`);

    // Bind data and create text elements
    const textElements = svg.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-family", "Impact")
        .style("fill", () => `hsl(${Math.random() * 360}, 70%, 60%)`) // More vibrant colors
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return `translate(${d.x},${d.y})rotate(${d.rotate})`;
        })
        .style("font-size", function(d) {
            return `${d.size}px`;
        })
        .text(function(d) {
            return d.text;
        });

    // Add event listeners with traditional function expressions
    textElements
        .on("mouseover", function(d) {
            d3.select(this)
                .style("stroke", "black")  // Apply border
                .style("stroke-width", "1px");
            
            tooltip.style("opacity", 1).html(`${this.__data__.text}: ${this.__data__.count}`); // Show the tooltip with the word count
        })

        .on("mousemove", function() {
            const textElement = d3.select(this);
            const fontSize = parseFloat(textElement.style("font-size"));
            
            // Position the tooltip relative to the cursor with an offset based on the element size
            tooltip.style("left", `${window.event.pageX + fontSize / 2}px`)
                .style("top", `${window.event.pageY + fontSize / 2}px`);
        
        })

        .on("mouseout", function() {
            d3.select(this)
                .style("stroke", "none"); // Remove the border
        });
}

// Debounce resize event to optimize performance
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        d3.select("svg").remove();
        layout.size([window.innerWidth, window.innerHeight]).start();
    }, 300); // 300 milliseconds debounce time
});
