remote.connect(function() {
	subscribe();
});
var Markets = 
[
     {
        name: 'US Dollars',
        currency: 'USD',
        gateways: 
        [
           {name: 'bitstamp', address: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',priceid:'#usdbitstamp'},
           {name: 'snapswap', address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',priceid:'#usdsnapswap'}
        ]
     },

     {
        name: 'Chinese Yuan',
        currency: 'CNY',
        gateways: 
        [
           {name: 'ripplecn', address: 'rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK',priceid:'#cnyripplecn'},
           {name: 'ripplechina', address: 'razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA',priceid:'#cnyripplechina'},
					 {name: 'ripplefox', address: 'rKiCet8SdvWxPXnAgYarFUXMh1zCPz432Y',priceid:'#cnyripplefox'}
        ]        
     },
		 {
        name: 'Euro Member Countries',
        currency: 'EUR',
        gateways: 
        [
           {name: 'SnapSwap', address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',priceid:'#eursnapswap'},
           {name: 'therock', address: 'rLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun',priceid:'#eurtherock'}
        ]        
     },
		 {
        name: 'Singapore Dollar',
        currency: 'SGD',
        gateways: 
        [
           {name: 'RippleSingapore', address: 'r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH',priceid:'#sgdripplesingapore'}
        ]                
     },
		 {
        name: 'Japan Yen',
        currency: 'JPY',
        gateways: 
        [
           {name: 'RippleTradeJapan', address: 'rMAz5ZnK73nyNUL4foAvaxdreczCkG3vA6',priceid:'#jpyrippletradejapan'},
					 {name: 'tokyojpy', address: 'r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN',priceid:'#jpytokyojpy'},
					 {name: 'RippleExchangeTokyo', address: 'r9ZFPSb1TFdnJwbTMYHvVwFK1bQPUCVNfJ',priceid:'#RippleExchangeTokyo'}
        ]                
     },
		 {
        name: 'Canada Dollar',
        currency: 'CAD',
        gateways: 
        [
           {name: 'RippleUnion', address: 'r3ADD8kXSUKHd6zTCKfnKT3zV9EZHjzp1S',priceid:'#cadrippleunion'}
        ]                
     },
     {
        name: 'Bitcoin',
        currency: 'BTC',
        gateways: 
        [
           {name: 'bitstamp', address: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',priceid:'#btcbitstamp'},
					 {name: 'btc2ripple', address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',priceid:'#btcbtc2ripple'}
        ]                
     },
		 {
        name: 'Korea won',
        currency: 'KRW',
        gateways: 
        [
           {name: 'PaxMonetar', address: 'rUkMKjQitpgAM5WTGk79xpjT38DEJY283d',priceid:'#paxMoneta'}
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

function subscribe(){
  var book;
   Markets.forEach(function(Market)
   {
      console.log("init Market"+Market.name);
      var Gateways = Market.gateways;
      Gateways.forEach(function(gateway)
      {
           console.log("init gateway:"+gateway.name);
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
}
function resubscribe(){
	console.log("timeout fresh-------------------------------------------------------");
	lastfreshdate=new Date();
	for(var id in remote._books){
			remote._books[id].unsubscribe();
	}
	remote._books={};
	subscribe();
}
var lastfreshdate=new Date();
setInterval(function(){if((new Date() - lastfreshdate)>180000) resubscribe();console.log(new Date() - lastfreshdate);}, 30000);//超过3分钟强制刷新数据，解决自动刷新意外终止问题
function tradeListener(action, tradeGets, tradePays, currency, gateway)
{
	 lastfreshdate=new Date();
   var price;
   var xrpamount;
   var coinamount;
   var pricecolor; 
   // Ripple-lib bug
   if (tradeGets.is_valid() ||  tradePays.is_valid()) 
   {
     if(action == "asks")
      {
         price = tradeGets.ratio_human(tradePays).to_human();
         xrpamount = tradePays.to_human();
         coinamount = tradeGets.to_human();
				 pricecolor="green";
      }
      else
      {
         price = tradePays.ratio_human(tradeGets).to_human();
         xrpamount = tradeGets.to_human();
         coinamount = tradePays.to_human();
				 pricecolor="red";
      }
      price=price.substring(0,12);
			console.log(gateway.priceid+price);
			var pos;
			for(pos=price.length-1;pos>=0;pos--){ 
			 if(price.charAt(pos)!='0') break; 
			}
			price=price.substring(0,pos+1);//截取价格后面的0
			if(price.length<=0) return;//有时候数值价格小到0
  		$(gateway.priceid).html(price);
			$(gateway.priceid).css("color",pricecolor);
			console.log(gateway.priceid+price);
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
				tradedata[gateway.priceid]=trade;
				localStorage.tradedata=JSON.stringify(tradedata);
			}
			var content=$(gateway.priceid).attr("data-content");
			if(content.length>1500)
			{
					content=content.substring(0,1200);
					content=content.substring(0,content.lastIndexOf('<br>'));
			}
			$(gateway.priceid).attr("data-content",trade.time+" price:<font color='"+pricecolor+"'>"+trade.price+"</font> size:"+trade.size+"<br>"+content);	
  }
}
function initprice(){
	if(window.localStorage){
		var tradedata={};
		if(localStorage.tradedata){
			tradedata=JSON.parse(localStorage.tradedata);
			for(var priceid in tradedata){
				var trade=tradedata[priceid];
				$(priceid).html(trade.price);
				$(priceid).css("color","gray");
				$(priceid).attr("data-content",trade.time+" price:"+trade.price+" size:"+trade.size+"<br>"+$(priceid).attr("data-content"));	
			}
		}
	}
}
initprice();


