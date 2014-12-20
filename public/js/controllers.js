'use strict';
var g$scope;
var app=angular.module('indexApp');
app.controller('IndexCtrl',function($scope) {
	g$scope=$scope;
	$scope.lang=getLang();
	$scope.markets=Markets;
	$scope.ExchgRate=ExchgRate;
	$scope.setlang=function(l){
		$scope.lang=l;
		saveLang(l);
	}
	initprice();
});

function initprice(){
	var tradedata={};
	if(window.localStorage){
		if(localStorage.tradedata){
			tradedata=JSON.parse(localStorage.tradedata);
		}
	}
	for(var i=0;i<Markets.length;i++){
		for(var j=0;j<Markets[i].gateways.length;j++){
			var gateway=Markets[i].gateways[j];
			var trade=tradedata[Markets[i].currency+gateway.address];
			gateway.price.action='gray';
			gateway.price.value=trade?trade.price:0;
			gateway.url=Gateways[gateway.address].weburl;
		}
	}
}

