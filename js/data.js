//JavaScript file for Data Visualization Graphics
/* global d3, console */

function init(){
	$('#d3Charts').css('background-color','#444444');
	//alert("it's working");
	d3.selectAll('p').style('color','#444444');
	d3.select('body').transition()
		//Following dictates how long the transition is
		.duration(2000)
		//Following delays when the transition occurs
		.delay(1500)
		.style('background-color','#bbbbbb');


	var svg = d3.select("#d3Charts").append("svg")
		.attr("width",300)
		.attr("height",300);
	/*function type(d){
		d.IPAddress_ = +d.IPAddress_;
		d.UrlText_ = +d.UrlText_;
		return d;
	}*/

	function type(d) {
	  return {
	    UrlText_: d.UrlText_,
	    //length: +d.Length convert "Length" column to number
	  };
	}

	// Create empty categories
	var category = [],
		headers = ["unsubscribe","reg","info","countdown","leo_product","IntelligentDC","homepage","cal"],
		unsubscribe = 0,
		reg = 0,
		countdown = 0,
		info = 0;

	//Groups data into categories and stores name
	function categories(x){
		for(var i = 0; i < x.length;i++){
		var y= x[i];

		console.log(y);
		//var name = rows[x].UrlText_;
		//console.log(name);
		}
	}
	//check to see if category names were stored
	console.log(categories(headers));

	// Define Statement: check whether the values were loaded or not
	function statement(what, num){
		var totalStatement = " had a total of ";
		var clicksStatement = " clicks.";
		console.log(what + totalStatement + num + clicksStatement);
	}

	//Read CSV. Fills in empty categories (above)
	d3.csv("clicks_02.csv", type, function(error, rows) {
		for(var i = 0; i < rows.length; i++){
			category.push(rows[i].UrlText_);
			/*if(rows[i].UrlText_ == "unsubscribe"){
				unsubscribe[i] = something;
				something+=
			}*/	
		}

		//Relegate which categories receive what data
		var something = [];
		for(i = 0; i < category.length; i++){
			if(category[i] === "unsubscribe"){
				++unsubscribe;
			}
			if(category[i] === "reg"){
				++reg;
			}
			if(category[i] === "info"){
				++countdown;
			}
			if(category[i] === "countdown"){
				++info;
			}
		}
		console.log(statement('unsubscribe', unsubscribe));
		console.log(statement('reg', reg));
		console.log(category.length);
		console.log(type[0]);
		console.log(category);
		console.log(unsubscribe);
		console.log(reg);
		console.log(countdown);
		var concatUS = {'unsubscribe': unsubscribe};
		console.log(concatUS);
		cBased(concatUS);
	});
	function cBased(data){
		//Bind Data
		var circles = svg.selectAll("circle").data(data);
		var size = function(d){return d.unsubscribe;};
		//enter (include variable for radius)
		circles.enter().append("circle")
			.attr("r", size);

		//update
		circles
			.attr("cx", 50)
			.attr("cy", 50);

		//exit
		circles.exit().remove();
	}
	/*d3.csv('clicks.csv', function(data){
		var list= d3(data, function(d){return d.UrlText_; });
			console.log(list);
	});*/

	//Draws circles based on data. cBased = graph based on circles

	

	//cBased (tutorial from Kellehan)
	/*function render(data){
		//Bind Data
		var circles=svg.selectAll("circle").data(data);
		var size = function(d){return d.amount;};
		//enter (include variable for radius)
		circles.enter().append("circle")
			.attr("r", size);

		//update
		circles
			.attr("cx", function(d){return d.x;})
			.attr("cy", function(d){return d.y;});

		//exit
		circles.exit().remove();
	}
	var myArrayofObjects = [
		{x:100, y:120, amount: 5},
		{x:80, y:200, amount: 10},
		{x:180, y:50, amount: 10},
		{x:40, y:40, amount: 20}
	];
	render(myArrayofObjects);
	console.log("the following is ");
	console.log(unsubscribe);*/
}
window.onload = init;