// @TODO: YOUR CODE HERE!
// Chart set up
var svgWidth = 1000;
var svgHeight = 800;

var margin = {
  	top: 50,
	bottom: 150,
	right: 50,
	left: 150
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//SVG
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data
d3.csv("./assets/data/data.csv").then(function(healthData) {

    // Parse Data and cast as numbers
    healthData.forEach(function(data) {
      data.income = +data.income;
      data.obesity = +data.obesity;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthData, d => d.income)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.obesity)])
      .range([height, 0]);

    //Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles with text labels
    var circlesGroup = chartGroup.selectAll(".circle")
	    .data(healthData)
	    .enter()
	    .append("circle")
	    .attr("cx", d => xLinearScale(d.income))
	    .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "15")
        .attr("fill", "blue")
	    .attr("opacity", ".8")
	    .classed("circle", true)

	var textGroup = chartGroup.selectAll(".text")
        .data(healthData)
        .enter()
        .append("text")
        .classed("text", "True")
        .attr("x", d => xLinearScale(d.income)-9)
        .attr("y", d => yLinearScale(d.obesity)+6)
        .text(d => d.abbr);

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percent of Obesity");
      
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Average Income");

    var toolTip = d3.select("body").append("div")
    .attr("class", "d3-tip");

  }).catch(function(error) {
    console.log(error);
  });
