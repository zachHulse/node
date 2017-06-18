var cool = require('cool-ascii-faces');
var express = require('express');
var url = require('url');
var app = express();

function calculateRate(weight, type){
	if (type == "Letters(Stamped)"){
		if(weight < 1)
			return .49;
		else if(weight < 2)
			return .70;
		else if(weight < 3)
			return .91;
		else if(weight < 3.5)
			return 1.12;
		else{
			console.log("Your letter weighs to much for its type");
			return -1;
		}
	}
	else if(type == "Letters(Metered)"){
		if(weight < 1)
			return .46;
		else if(weight < 2)
			return .67;
		else if(weight < 3)
			return .88;
		else if(weight < 3.5)
			return 1.09;
		else{
			console.log("Your letter weighs to much for its type");
			return -1;
		}
	}
	else if(type == "Large Envelopes(Flats)"){
		if(weight > 13){
			console.log("Your letter weighs to much for its type");
			return -1;
		}
		round = weight | 0; 
		return .98 + (weight * .21)
	}
	else if(type == "Parcels"){
		if(weight > 13){
			console.log("Your letter weighs to much for its type");
			return -1;
		}
		else if(weight < 5)
			return 2.67;
		else{
			return 2.67 + (weight - 4) * .18;
		}
		round = weight | 0;
	}
	else{
		console.log("Invalid letter type!")
		return -1;
	}
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/mail', function(request, response){
	var params = url.parse(request.url, true). query;
	var weight = Number(params.weight);
	var type = params.type;
	var rate = 0.00;
	rate = calculateRate(weight, type);
	var stuff = {value: rate, weighs: weight, kind: type};
	response.render('pages/mailResults', stuff);
});

app.get('/math', function(request, response) {
  var params = url.parse(request.url, true).query;
  var num1 = Number(params.num1);
  var num2 = Number(params.num2);
  var operand = params.operand;
  var result = 0;
  switch(operand){
  	case '*':
  		result = num1 * num2
  		console.log(result);
  		break;
  	case '/':
  		result = num1 / num2
  		console.log(result);
  		break;
  	case '+':
  	    result = num1 + num2
  		console.log(result);
  		break;
	case '-':
		result = num1 - num2
		console.log(result);
		break;
	default:
		console.log("you messed up!");
		break;  
  }
  var stuff ={results: result, number1: num1, number2: num2, opp: operand}; 
  response.render('pages/mathForm', stuff);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


