'use strict';
var g$scope;
var app=angular.module('indexApp');
app.controller('IndexCtrl',function($scope) {
	g$scope=$scope;
	$scope.markets=Markets;
	$scope.ExchgRate=ExchgRate;
	initprice();
});

function initprice(){
	if(window.localStorage){
		var tradedata={};
		if(localStorage.tradedata){
			tradedata=JSON.parse(localStorage.tradedata);
			for(var i=0;i<Markets.length;i++){
				for(var j=0;j<Markets[i].gateways.length;j++){
					var trade=tradedata[Markets[i].gateways[j].address];
					Markets[i].gateways[j].price.action='gray';
					Markets[i].gateways[j].price.value=trade?trade.price:0;
				}
			}
		}
	}
}

