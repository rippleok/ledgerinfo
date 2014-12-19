'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('indexApp', []);
app.filter('exchgrate', function() {
	return function(input,tocur,cur) {
		if(cur==tocur) return input;
		if(tocur=='USD'){
  		if(ExchgRate[cur]) return input/ExchgRate[cur];
		}else{
			if(ExchgRate[cur]) return input*ExchgRate['CNY']/ExchgRate[cur];
		}
		return input;
	}
});
