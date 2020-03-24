/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

//Set margins for your chart
var margin = { left: 100, right: 10, top: 50, bottom: 100 }

//Set the width and the height of your chart
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

//Create Chart area (you need to include the margins in the chart area so everything fits correctly)
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

//Create a group that will contain your chart
var g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Load data and build your chart
d3.json("data/buildings.json").then(function (data) {

    //Create a scale for the height of your buildings (bars)
    var y = d3.scaleLinear()
        .domain([0,
            d3.max(data, function (d) { return d.height })
        ])
        .range([height, 0])

    // Create a scale for the width of each bar
    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.3);

    //Add an x axis with labels  
    let xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)")

    //add a y axis with labels
    let yAxisCall = d3.axisLeft(y)
        .tickFormat(function (d) {
            return d + "m";
        })

    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    //Add a chart title in the SVG
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .text("Worlds Tallest Buildings")
        .attr("font-size", "20px")

    //Add all of the bars to your graph
    var rects = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            return y(d.height);
        })
        .attr("x", function (d) {
            return x(d.name)
        })
        .attr("height", function (d) {
            console.log(d.name + ": " + y(d.height))
            return height - y(d.height);
        })
        .attr("width", x.bandwidth)
        .attr("fill", "blue")
});

