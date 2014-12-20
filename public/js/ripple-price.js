remote.connect(function() {
	subscribe();
});
//http://api.k780.com:88/?app=finance.rate&scur=USD&tcur=CNY&appkey=12416&sign=79a36d1d8c108269e7e354cc5e8a89fe&format=json
//{"success":"1","result":{"status":"ALREADY","scur":"USD","tcur":"CNY","ratenm":"美元/人民币","rate":"6.2262","update":"2014-12-19 13:01:20"}}
var ExchgRate={//对美元汇率
	USD:1,
	CNY:6.2262,
	JPY:119.224998,
	EUR:0.8145,
	CAD:1.1574,
	KRW:1101.900024,
	SGD:1.3163
}

var Markets = 
[
     {
        name: 'US Dollars',
        currency: 'USD',
				symbol:'$',
        gateways: 
        [
           {name: 'bitstamp', address: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
           {name: 'snapswap', address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]
     },

     {
        name: 'ChineseYuan',
        currency: 'CNY',
				symbol:'¥',
        gateways: 
        [
           {name: 'ripplechina', address: 'razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
           {name: 'ripplecn', address: 'rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
					 {name: 'ripplefox', address: 'rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]        
     },
		 {
        name: 'KoreaWon',
        currency: 'KRW',
				symbol:'₩',
        gateways: 
        [
           {name: 'PaxMonetar', address: 'rUkMKjQitpgAM5WTGk79xpjT38DEJY283d',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]                
     },
		 {
        name: 'Euro',
        currency: 'EUR',
				symbol:'€',
        gateways: 
        [
           {name: 'SnapSwap', address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
           {name: 'therock', address: 'rLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]        
     },
		 {
        name: 'JapanYen',
        currency: 'JPY',
				symbol:'¥',
        gateways: 
        [
           {name: 'TradeJapan', address: 'rMAz5ZnK73nyNUL4foAvaxdreczCkG3vA6',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
					 {name: 'tokyojpy', address: 'r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
					 {name: 'ExchgTokyo', address: 'r9ZFPSb1TFdnJwbTMYHvVwFK1bQPUCVNfJ',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]                
     },
     {
        name: 'Bitcoin',
        currency: 'BTC',
				symbol:'Ƀ',
        gateways: 
        [
           {name: 'bitstamp', address: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''},
					 {name: 'btc2ripple', address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]                
     },
		 {
        name: 'SingaporeDollar',
        currency: 'SGD',
				symbol:'$',
        gateways: 
        [
           {name: 'RippleSingapore', address: 'r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]                
     },
		 {
        name: 'CanadaDollar',
        currency: 'CAD',
				symbol:'$',
        gateways: 
        [
           {name: 'RippleUnion', address: 'r3ADD8kXSUKHd6zTCKfnKT3zV9EZHjzp1S',price:{value:0,action:'asks',low:null,high:null},volume:{xrp:null,iou:null},url:''}
        ]                
     }
/*
		 {
        name: 'Gold Bullion International',
        currency: '0158415500000000C1F76FF6ECB0BAC600000000',
        gateways: 
        [
           {name: 'GBI', address: 'rrh7rf1gV2pXAoqA8oYbpHd8TKv5ZQeo67',priceid:'#gbigbi'}
        ]                
     }
*/
];   
setTimeout(loadExchgRate,10000);
function loadExchgRate(){
	for(var i=1;i<Markets.length;i++){
		var curr=Markets[i].currency;
		console.log(curr);
		if(curr=="BTC") continue;
		//var url="http://api.k780.com:88/?app=finance.rate&scur=USD&tcur="+curr+"&appkey=12416&sign=79a36d1d8c108269e7e354cc5e8a89fe&format=json";
		var url="http://api.k780.com:88/?app=finance.rate&scur=USD&tcur="+curr+"&appkey=12416&sign=79a36d1d8c108269e7e354cc5e8a89fe&format=json&jsoncallback=?";
		//var url="https://id.ripple.com/v1/user/razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA";
		$.getJSON(url,function(data){
			//console.log(data);
			if(data.success=="1"){
				var tcur=data.result.tcur;
				var rate=data.result.rate;
				ExchgRate[tcur]=rate;
				console.log(tcur,rate);
			}else{
				console.log(data);
			}
		});		
	}
}
function subscribe(){
  var book;
   Markets.forEach(function(Market)
   {
      //console.log("init Market"+Market.name);
      var gateways = Market.gateways;
      gateways.forEach(function(gateway)
      {
           //console.log("init gateway:"+Gateways[gateway.address].name);
           ['asks','bids'].forEach(function(action)
           {
              if(action == "asks")
              {
                book = remote.book('XRP', null, Market.currency, gateway.address);
              }
              else
              {
              	book = remote.book(Market.currency, gateway.address, 'XRP', null);

              }
              book.on("trade", function(tradeGets, tradePays){tradeListener(action, tradeGets, tradePays, Market.currency, gateway)});
           });
      });
   });
	g$scope.$apply();
}
function resubscribe(){
	//console.log("timeout fresh-------------------------------------------------------");
	lastfreshdate=new Date();
	for(var id in remote._books){
			remote._books[id].unsubscribe();
	}
	remote._books={};
	subscribe();
}
var lastfreshdate=new Date();
setInterval(function(){if((new Date() - lastfreshdate)>180000) resubscribe();}, 30000);//超过3分钟强制刷新数据，解决自动刷新意外终止问题
function tradeListener(action, tradeGets, tradePays, currency, gateway)
{
	 lastfreshdate=new Date();
   var price;
   var xrpamount;
   var coinamount;
   var pricecolor; 
	 var volumexrp,volumeiou;
   // Ripple-lib bug
   if (tradeGets.is_valid() ||  tradePays.is_valid()) 
   {
     if(action == "asks")
      {
     	   price = tradeGets.ratio_human(tradePays).to_human();
         xrpamount = tradePays.to_human();
         coinamount = tradeGets.to_human();
				 volumexrp = tradePays.to_number();
				 volumeiou = tradeGets.to_number();
				 pricecolor="green";
      }
      else
      {
				 price = tradePays.ratio_human(tradeGets).to_human();
         xrpamount = tradeGets.to_human();
         coinamount = tradePays.to_human();
				 volumexrp = tradeGets.to_number();
				 volumeiou = tradePays.to_number();
				 pricecolor="red";
      }
      price=price.substring(0,9);
			//console.log(gateway.name+price);
			/*var pos;
			for(pos=price.length-1;pos>=0;pos--){ 
			 if(price.charAt(pos)!='0') break; 
			}
			price=price.substring(0,pos+1);//截取价格后面的0
			*/
			if(price<=0) return;//有时候数值价格小到0
			if(price<gateway.price.low||999999) gateway.price.low=price;
			if(price>gateway.price.high) gateway.price.high=price;
			gateway.price.value=price;
			gateway.price.action=action;
			gateway.volume.xrp+=droptoxrp(volumexrp);
			gateway.volume.iou+=volumeiou;
			g$scope.$apply();
  		//$(gateway.priceid).html(price);
			//$(gateway.priceid).css("color",pricecolor);
			//console.log(gateway.priceid+price);
			var trade={};
			trade.price=price;
			trade.time=stringDate(new Date());
			var pos=xrpamount.indexOf('.');
			if(pos>0) xrpamount=xrpamount.substring(0,pos);//xrp数量取整
			trade.size=xrpamount+"XRP";
			if(window.localStorage){
				var tradedata={};
				if(localStorage.tradedata){
					tradedata=JSON.parse(localStorage.tradedata);
				}
				tradedata[currency+gateway.address]=trade;
				localStorage.tradedata=JSON.stringify(tradedata);
			}
			var content=$("#"+currency+gateway.address).attr("data-content");
			if(content.length>1500)
			{
					content=content.substring(0,1200);
					content=content.substring(0,content.lastIndexOf('<br>'));
			}
			$("#"+currency+gateway.address).attr("data-content",trade.time+" price:<font color='"+pricecolor+"'>"+trade.price+"</font> size:"+trade.size+"<br>"+content);	
			
  }
}



