function generateData (currentSavings, monthlySavings, savingsInterest, currentDeposit, depositGrowth) {
	var data = {
		labels: [],
		datasets: [
			{
				label: "Predicted savings",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: []
			},
			{
			    label: "Predicted deposit",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: []
			}
		]
	};
	
	var startYear = 2015;
	var endYear = 2040;
	var savings = currentSavings;
	var deposit = currentDeposit;
	var affordYear = null;
	
	for (i = startYear; i <= endYear; i++){
		data.labels.push(i);
		data.datasets[0].data.push(savings);
		data.datasets[1].data.push(deposit);
		if (affordYear === null && savings >= deposit){
			affordYear = i;
		};
		savings = (savings * (1 + savingsInterest/100)) + (monthlySavings * 12);
		deposit = deposit * (1 + depositGrowth/100);
	}
	console.log(data);
	
	if (affordYear === null){
		document.getElementById("resultsText").innerHTML = "You can never buy a fucking house. Deposit sizes are growing faster than you're saving money.";
	} else {
		document.getElementById("resultsText").innerHTML = "You can buy a fucking house in " + affordYear + ".";
	}	
	return data;
}

var currentDeposit = 70000;
var depositGrowth = 5;
var button = document.getElementById('submitButton');

button.onclick=function(){
	var currentSavings = document.getElementById('inputSavings').value;
	var monthlySavings = document.getElementById('inputMonthlySavings').value;
	var savingsInterest = document.getElementById('inputInterest').value;
	
	var context = document.getElementById('results').getContext('2d');
	var resultsChart = new Chart(context).Line(generateData(currentSavings, monthlySavings, savingsInterest, currentDeposit, depositGrowth));
}

