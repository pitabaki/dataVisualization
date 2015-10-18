function occurChart(){
  //Define size parameters
  var conWidth = $('.container').width();
  var margin = {top: 30, right: (conWidth * 0.14), bottom: 30, left: (conWidth * 0.14)},
  	width = conWidth - margin.left - margin.right,
  	height = 360 - margin.top - margin.bottom;

  if(conWidth <= 720 && conWidth > 400){
  	width = 0.9 * conWidth - margin.left - margin.right;
  	height = 360 - margin.top - margin.bottom;
  }else if(conWidth <= 400){
  	width = 1 * conWidth - margin.left - margin.right;
  	height = 360 - margin.top - margin.bottom;
  }else{
  	width = 0.8 * conWidth - margin.left - margin.right;
  	height = 360 - margin.top - margin.bottom;
  }
  console.log(conWidth);
  console.log(width);

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    	.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("clicks_04.csv", type, function(error, data) {
    console.log("first data is " + data);
  	x.domain(data.map(function(d) { return d.name; }));
    	y.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        

     chart.append("g")
  		.attr("class", "y axis")
  		.call(yAxis)

    chart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x.rangeBand());

  });

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
}
$(window).resize(function(){
  $('.barChart').off();
});
window.onload = occurChart;
