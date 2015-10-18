
function occurChart(){
//initiates when window loads
  var category = [],
      unsubscribe = 0,
      reg = 0,
      countdown = 0,
      info = 0,
      leo_product = 0,
      cal = 0,
      browser = 0,
      libra = 0,
      intelligentDC = 0,
      homepage = 0;

  
  //Define size parameters
  var conWidth = $('#barChart').width();
  var margin = {top: 30, right: (conWidth * 0.005), bottom: 30, left: (conWidth * 0.14)},
    width = conWidth - margin.left - margin.right,
    height = 540 - margin.top - margin.bottom;

  //Resizes according to window size
  if(conWidth <= 720 && conWidth > 400){
    width = 0.9 * conWidth - margin.left - margin.right;
  }else if(conWidth <= 400){
    width = 1 * conWidth - margin.left - margin.right;
  }else{
    width = 0.8 * conWidth - margin.left - margin.right;
  }

  var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.15);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("top");

  var yAxis = d3.svg.axis().scale(y).orient("left");

  var chart = d3.select("#barChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("csv/clicks_02.csv", type, function(error, data) {
      //This successfully returns unsubscribe
      console.log("first data is " + data[0].UrlText_);
      var empty = [unsubscribe, reg, countdown, info, leo_product, homepage, cal,browser,libra,intelligentDC];
      for(var i = 0; i < data.length; i++){
        category.push(data[i].UrlText_);
      }
      //function foo(x){
      for(i = 0; i < data.length; i++){
        if(category[i] === "unsubscribe"){
          ++unsubscribe;
        }
        if(category[i] === "reg"){
          ++reg;
        }
        if(category[i] === "info"){
          ++info;
        }
        if(category[i] === "countdown"){
          ++countdown;
        }
        if(category[i] === "leo_product"){
          ++leo_product;
        }
        if(category[i] === "homepage"){
          ++homepage;
        }
        if(category[i] === "cal"){
          ++cal;
        }
        if(category[i] === "Browser"){
          ++browser;
        }
        if(category[i] === "libra"){
          ++libra;
        }
        if(category[i] === "IntelligentDC"){
          ++intelligentDC;
        }
    }
    var titles = ["Unsubscribe", "Registration", "Information", "ISE Countdown", "LEO family", "Meyer Sound", "CAL","View in Browser","Libra","IntelligentDC"];
    var digits = [unsubscribe, reg, countdown, info, leo_product, homepage, cal,browser,libra,intelligentDC];


    //compiles titles and digits into an array of objects. ¡Importante! For the formula below.
    var data = [];
    for(i = 0;i<digits.length;i++){
      data[i] = {name:titles[i],value:digits[i]};
    }
    var emptyData = [];
    for(i = 0;i<empty.length;i++){
      emptyData[i] = {name:titles[i],value:empty[i]};
    }
    console.log("data is " + data);
    console.log("empty data is " + emptyData);

    //TEST!This successfully returns unsubscribe
    console.log("second data at position 0 is " + emptyData[0].name);

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        
     chart.append("g")
  		.attr("class", "y axis")
  		.call(yAxis);


    chart.selectAll(".bar")
        .data(emptyData)
      .enter().append("rect")
        .attr("fill","#222222")
        .attr("class", "bar")
        .attr("id",function(d){return d.name;})
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x.rangeBand());

    chart.selectAll('.x text')
          .attr("x", "100")
          .attr("y", "-4")
          .attr("opacity","1");

    d3.select("body")
      .on("mouseover",function (){

    chart.selectAll(".bar")
        .data(data)
        .transition()
        .duration(750)
        .ease("sin")
        .attr("fill","#5489c7")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x.rangeBand());


      chart.selectAll('.x text')
          .transition()
          .duration(750)
          .attr("x", "100")
          .attr("opacity","0");
      });

      console.log(digits);
      console.log(empty);

   //end of testing
  });

  function type(d) {
    d.UrlText_ = d.UrlText_;
     // coerce to number
    return d;
  }
}
window.onload = occurChart;
$(window).resize(function(){
  $("body")
    .find("#barChart")
    .empty()
    .append(occurChart);
});

var windowSize = $(window).width();

console.log("this is the correct " + windowSize);

if(windowSize >= 480){
$(".preview").hover(
  function(){
    $(this).animate({
      marginTop: "+10px",
    },1000);
  },function(){
    $(this).animate({
      marginTop: "+0",
    },500);
  });}
/*
$(".preview").hover(
  function(){
    $(this).children().css("box-shadow","0 5px 15px rgba(0, 0, 0, 0.5)");
  },function(){
    $(this).children().css("box-shadow","0 0px 15px rgba(0, 0, 0, 0.25)");
  });
*/


  /*$('.chart').hover(function(){
    $(this).css("background-color", "#c149a8");
  },function(){
    $(this).css("background-color","#3f8fbc");
  });*/





