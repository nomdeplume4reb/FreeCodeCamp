const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

let margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 75 },
width = 700 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;


// append the svg object to the body of the page
let svg = d3.select("#dataContainer").
append("svg").
attr("width", width + margin.left + margin.right).
attr("height", height + margin.top + margin.bottom).
append("g").
attr("transform",
"translate(" + margin.left + "," + margin.top + ")");



d3.json(url).then(data => {//read in file

  //Parse time and add doping column
  data.forEach(function (d) {
    let parseYear = d3.timeParse("%Y");
    let parseMinutes = d3.timeParse("%M:%S");
    d.Time = parseMinutes(d.Time);
    d.Year = parseYear(d.Year);
    d.dopingAllegations = null;
    d.Doping !== "" ? d.dopingAllegations = "Yes" : d.dopingAllegations = "No";

  });

  // Add X axis
  let x = d3.scaleTime().
  domain(d3.extent(data, function (d) {
    return d.Year - 1; // -1 adds padding      
  })).
  range([0, width]).
  nice(); // adds to end of axis to make it look cleaner

  svg.append("g").
  attr("transform", "translate(0," + height + ")").
  call(d3.axisBottom(x)).
  attr('id', 'x-axis');


  //X axis label
  svg.append("text").
  attr("id", "x-label").
  attr("transform", "translate(0," + height + ")").
  attr("x", width / 2).
  attr("y", 40).
  style("text-anchor", "end").
  text("Year");

  // Add Y axis  
  //scale determines what data will be plotted
  let yScale = d3.scaleTime().
  domain(d3.extent(data, function (d) {
    return d.Time;
  })).
  range([0, height]).
  nice();
  //axis determines how the axis will be labeled
  let timeFormat = d3.timeFormat("%M:%S");
  let yearFormat = d3.timeFormat("%Y");
  let yAxis = d3.axisLeft(yScale).
  tickFormat(timeFormat);
  svg.append("g").
  call(yAxis).
  attr('id', 'y-axis');

  // Y axis label
  svg.append('text').
  attr("id", "y-label").
  attr("transform", "rotate(-90)").
  attr("y", 0 - margin.left).
  attr("x", 0 - height / 2).
  attr("dy", "1em").
  style("text-anchor", "middle").
  text("Time (minutes:seconds)");


  // color code
  let color = d3.scaleOrdinal().
  range(["#D93250", "#69b3a2"]);

  //div for text
  let div = d3.select("body").append("div").
  attr("class", "tooltip").
  attr("id", "tooltip").
  attr('data-year', 'data-xvalue');

  //legend
  let legend = svg.append("g").
  attr("id", "legend");

  legend.append('rect').
  attr("x", 380).
  attr("y", 15).
  attr("width", 180).
  attr("height", 60).
  attr('stroke', 'black').
  attr('fill', '#F5F5F5');

  legend.append("circle").
  attr("cx", 400).
  attr("cy", 30).
  attr("r", 7).
  style("fill", "#D93250").
  style("opacity", 0.7).
  style("stroke", "black");

  legend.append("text").
  attr("x", 420).
  attr("y", 30).
  text("Doping Allegations").
  attr("alignment-baseline", "middle");

  legend.append("circle").
  attr("cx", 400).
  attr("cy", 60).
  attr("r", 7).
  style("fill", "#69b3a2").
  style("stroke", "black");

  legend.append("text").
  attr("x", 420).
  attr("y", 60).
  text("No Doping Allegations").
  attr("alignment-baseline", "middle");

  // Add dots
  svg.append('g').
  selectAll("dot").
  data(data).
  enter().
  append("circle").
  attr('class', 'dot').
  attr("cx", function (d) {return x(d.Year);}).
  attr("data-xvalue", function (d) {return d.Year;}).
  attr("cy", function (d) {return yScale(d.Time);}).
  attr("data-yvalue", function (d) {return d.Time.toISOString();}).
  attr("r", 7).
  style("fill", function (d) {return color(d.dopingAllegations);}).
  style("opacity", .7).
  style("stroke", "black")
  // animate
  .on("mouseover", handleMouseOver).
  on("mouseout", handleMouseOut);

  function handleMouseOver(d, i) {
    let text = "Time: " + timeFormat(d.Time) + '<br/>' +
    "Name: " + d.Name + '<br/>' +
    "Rank: " + d.Place + '<br/>' +
    "Year: " + yearFormat(d.Year) + '<br/>' +
    "Nationality: " + d.Nationality + '<br/>' +
    "Doping: " + d.Doping + '<br/>';

    d3.select(this).
    transition().
    attr('r', 10);
    div.html(text).
    style("left", d3.event.pageX + "px").
    style("top", d3.event.pageY - 45 + "px").
    style('opacity', 0.9).
    attr("data-year", d.Year);
  }

  function handleMouseOut(d) {
    //  console.log(null)
    d3.select(this).
    transition().
    attr('r', 7);
    div.transition().
    style('opacity', 0);

  }
});