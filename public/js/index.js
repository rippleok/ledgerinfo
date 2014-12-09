$(document ).ready(function () { // this has to be done after the document has been rendered
    $("[data-toggle='tooltip']").tooltip({html: true}); // enable bootstrap 3 tooltips
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        html: true,
				container: "body"
    });
		$('[data-toggle="popover"]').css("cursor","pointer");

});
function checkAddress(){
	var address=$("#address")[0].value.trim();
	if(address[0]=='r' || address[0] == '~') return true;
	return false;
}
