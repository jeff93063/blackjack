if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
	navigator.serviceWorker
	  .register("serviceWorker.js")
	  .then(res => console.log("service worker registered"))
	  .catch(err => console.log("service worker not registered", err))
  })
}

function $(id) { return document.getElementById(id); }
//const suits = ["&#9824;", "&#9827;", "&#9829;", "&#9830;"]; //♠♣♥♦
const suitsSvg = ["<svg viewbox='0 0 14.75 18' xmlns='http://www.w3.org/2000/svg'><path d='m 7.375,1 q 1.007952,1.79075 3.324082,4.75023 2.541307,2.98092 2.605646,3.59214 0.418183,0.91144 0.418183,1.76928 v 0.42886 q 0,1.7907 -1.737107,2.82006 -0.568339,0.23584 -1.254566,0.23584 -1.651318,0 -2.669988,-2.36973 h -0.450343 v 0.12851 q 0,3.03458 0.889996,4.643 h -2.305411 v -0.0624 q 0.911441,-1.61912 0.911441,-4.67509 l -0.0325,-0.034 h -0.40746 l -0.503947,0.9436 q -0.911441,1.42613 -2.27324,1.42613 -2.00517,0 -2.820105,-2.24107 l -0.09649,-0.78274 v -0.49319 q 0,-1.96222 2.005169,-4.13897 3.377691,-4.139 4.332023,-5.90827 l 0.0325,-0.034 z' style='fill:#000000;stroke:none;' /></svg>", "<svg viewbox='0 0 16.787 18' xmlns='http://www.w3.org/2000/svg'><path d='m 8.409412,1 q 2.294571,0 3.377528,2.43392 0.139364,0.55746 0.171594,1.15807 0,1.25448 -1.286684,2.97007 l -0.643356,0.64322 h 0.03251 q 0.793446,-0.30017 1.694124,-0.30017 h 0.203754 q 2.551907,0 3.581249,2.16592 0.246635,0.70767 0.246635,1.35096 0,2.19808 -2.240962,3.31319 -0.428881,0.12865 -1.190181,0.19297 -2.594801,0 -3.677751,-2.93791 h -0.03251 v 0.0961 q 0,3.67775 0.87923,4.84647 v 0.0623 h -2.230243 l -0.06432,-0.0623 q 0.911397,-1.3724 0.911397,-4.94295 v -0.0346 h -0.03251 q -1.07223,2.97007 -3.699199,2.97007 -2.047963,0 -3.141641,-2.15519 -0.268076,-0.72912 -0.268076,-1.35103 0,-2.49832 2.63769,-3.38824 0.707677,-0.12864 1.254509,-0.12864 h 0.09648 q 0.922118,0 1.75846,0.30017 h 0.03251 v -0.0346 q -0.900677,-0.76128 -1.211621,-1.50111 -0.643356,-1.17944 -0.643356,-2.04792 v -0.15009 q 0,-2.15519 2.305298,-3.27031 0.761286,-0.20334 1.179461,-0.20334 z' style='fill:#000000;stroke:none' /></svg>", "<svg viewbox='0 0 17.796 18' xmlns='http://www.w3.org/2000/svg'><path d='m 4.967431,1 q 2.176917,0 3.420867,2.52008 0.45038,0.99732 0.471823,1.52282 h 0.03251 q 0.375328,-1.73726 1.36191,-2.88468 1.158156,-1.15822 2.605859,-1.15822 2.241254,0 3.592441,2.40214 0.343163,0.89004 0.343163,1.67293 0,2.6809 -2.230531,5.11521 l -5.672835,6.80951 h -0.06433 l -6.026727,-7.38862 q -1.801581,-2.19836 -1.801581,-4.5361 0,-2.26276 2.134016,-3.59246 0.900794,-0.48282 1.833753,-0.48282 z' style='fill:#a80000;stroke:none' /></svg>", "<svg viewbox='0 0 14.2896 18' xmlns='http://www.w3.org/2000/svg'><path d='m 7.155514,1 5.394117,7.00269 q 0.739954,0.9115 0.739954,1.05095 l -6.134071,7.94636 q -0.128661,-0.0858 -6.155514,-7.94636 0,-0.1501 1.190349,-1.63007 z' style='fill:#a80000;stroke:none' /></svg>"]; //♠♣♥♦
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const valueScores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
function shuffle(array) { //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	let currentIndex = array.length, randomIndex;
	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}

function displayCard(card) {
	if(card[0] > 1) {
		var color = "red";
	}
	else {
		var color = "black";
	}
	return "<div class='card " + color + "'><div>" + values[card[1]] + "<br>" + suitsSvg[card[0]] + "</div><div>" + values[card[1]] + "<br>" + suitsSvg[card[0]] + "</div></div>"; // &#xFE0E;
}

function score(hand) {
	var score = 0;
	var ace = false;
	var soft = false;
	for(var i=0; i<hand.length; i++){
		var card = hand[i];
		score += valueScores[card[1]];
		if(card[1] == 0) {
			ace = true;
		}
	}
	if(ace && score < 12) {
		score += 10;
		soft = true;
	}
	return [score, soft];
}

function scorePlayer(playerHandNumber) {
	console.log(playerHand.toString());
	playerScore = score(playerHand);
	console.log("score = " + playerScore[0]);
	console.log("player hand length = " + playerHand.length);
	$("score" + playerHandNumber).innerText = playerScore[0];
	if(playerHand.length == 2){
		console.log("playerhand length 2");
		if(playerHand[0][1] == playerHand[1][1]){
			$("splitButton").disabled = "";
		}
		if(playerScore[0] == 21){
			pbj = true;
			console.log("about to stand");
			stand();
			console.log("did stand");
		}
	}
	else {
		console.log("playerhand length not 2");
		if(playerScore[1]){
			$("playerSoft" + playerHandNumber).innerText = "Soft";
		}
		if(playerScore[0] > 21){
			$("message").innerHTML = "Player Busts";
			resetButtons();
		}
	}
	//console.log("end scoring");
}

function scoreDealer() {
	for(i=0; true; i++){
		dealerScore = score(dealerHand);
		$("dealerScore").innerText = dealerScore[0];
		if(dealerHand.length == 2 && dealerScore[0] == 21){
			if(pbj == false){
				$("message").innerHTML = "Dealer Blackjack, Player Loses";
			}
			else {
				$("message").innerHTML = "Push";
				balance += bet;
				$("balance").innerText = balance;
			}
			resetButtons();
			break;
		}
		else{
			if(pbj == true){
				$("message").innerHTML = "Player Blackjack";
				balance += 2.5 * bet;
				$("balance").innerText = balance;
				resetButtons();
				break;
			}
			else {
				if(dealerScore[1]){
					$("dealerSoft").innerText = "Soft";
				}
				if(dealerScore[0] > 21){
					$("message").innerHTML = "Dealer Busts";
					balance += 2 * bet;
					$("balance").innerText = balance;
					resetButtons();
					break;
				}
				else if(dealerScore[0] < 17){
					var newCard = theShoe.draw();
					dealerHand.push(newCard);
					$("dealerCards").innerHTML += displayCard(newCard);
				}
				else{
					if(dealerScore[0] < playerScore[0]){
						$("message").innerHTML = "Player Wins";
						balance += 2 * bet;
						$("balance").innerText = balance;
					}
					else if(dealerScore[0] == playerScore[0]){
						$("message").innerHTML = "Push";
						balance += bet;
						$("balance").innerText = balance;
					}
					else{
						$("message").innerHTML = "Player Loses";
					}
					resetButtons();
					break;
				}
			}
		}
	}
}

function hit(playerHandNumber){
	playerHand.push(theShoe.draw());
	$("playerCards" + playerHandNumber).innerHTML = "";
	$("playerSoft" + playerHandNumber).innerHTML = "";
	for(i=0; i<playerHand.length; i++){
		$("playerCards" + playerHandNumber).innerHTML += displayCard(playerHand[i]);
	}
	if(playerHand.length > 2){
		$("splitButton").disabled = "disabled";
	}
	//console.log("about to scorePlayer");
	scorePlayer(playerHandNumber);
	//console.log("did scorePlayer");
	
}

function stand(){
	$("dealerCards").innerHTML = "";
	console.log("about to display dealer cards");
	for(i=0; i<dealerHand.length; i++){
		$("dealerCards").innerHTML += displayCard(dealerHand[i]);
	}
	console.log("about to score dealer");
	scoreDealer();
	console.log("scored dealer");
}

function resetButtons(){
	$("dealButton").disabled = "";
	$("hitButton").disabled = "disabled";
	$("standButton").disabled = "disabled";
	$("splitButton").disabled = "disabled";
	$("doubleButton").disabled = "disabled";
	$("insuranceButton").disabled = "disabled";
}

function deal(){
	console.log("===========");
	$("message").innerHTML = "";
	$("dealButton").disabled = "disabled";
	$("hitButton").disabled = "";
	$("standButton").disabled = "";
	$("dealerScore").innerText = "";
	$("dealerSoft").innerText = "";
	dealerHand = [];
	playerHand = [];
	//console.log("emptied hand arrays");
	phase = 0;
	pbj = false;
	dealerHand.push(theShoe.draw());
	dealerHand.push(theShoe.draw());
	//console.log("drew dealer cards");
	if(dealerHand[1][1] == 0){
		$("insuranceButton").disabled = "";
	}
	$("dealerCards").innerHTML = "<div class='cardback'><div>?<br>" + suitsSvg[0] + "</div></div>";
	$("dealerCards").innerHTML += displayCard(dealerHand[1]);
	//console.log("displayed dealer cards");
	balance -= bet;
	$("balance").innerText = balance;
	//console.log("subtracted bet from balance");
	playerHand.push(theShoe.draw());
	//console.log("drew 1 player card");
	hit(1);
	//console.log("hit");
	if(playerHand[0][1] == playerHand[1][1]){
		$("splitButton").disabled = "";
	}
}

class shoe {
	constructor(num) {
		this.num = num;
		this.regenerate(this.num);
	}
	regenerate(){
		this.deckArray = [];
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 13; j++) {
				for (let k = 0; k < this.num; k++) {
					this.deckArray.push([i,j]);
				}
			}
		}
		this.shuffle();
	}
	draw() {
		console.log("draw");
		if(this.deckArray.length == 0){
			this.regenerate()
			//console.log("reshuffled");
		}
		return this.deckArray.pop();
		//return [0,0];
	}
	shuffle() {
		shuffle(this.deckArray);
	}
}

var balance = 500;
const bet = 10;
var theShoe = new shoe(2);
var dealerHand = [];
var playerHand = [];
var playerScore = 0;
var dealerScore = 0;
var pbj = false;
deal();