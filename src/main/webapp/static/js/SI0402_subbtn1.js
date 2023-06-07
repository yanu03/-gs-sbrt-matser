$(function(){
	
	$('#subbtn_panel1').append('<a id="subbtn3" href="#">경로추가</a>');
	$('#subbtn_panel1').append('<a id="subbtn4" href="#">정류소추가</a>');
	$('#subbtn_panel1').append('<a id="subbtn5" href="#">교차로추가</a>');
	
	// $('#subbtn0').linkbutton({
	//     height: 24,
	//     iconCls: 'icon-search'
	// });
	$('#subbtn3').linkbutton({
	    height: 24,
	    //iconCls: 'icon-add',
	    // disabled: false,
		toggle: true
	});
	$('#subbtn4').linkbutton({
	    height: 24,
	    // iconCls: 'icon-remove',
	   	// plain: false,
		toggle: true
	});	
	$('#subbtn5').linkbutton({
	    height: 24,
	    // iconCls: 'icon-cancel',
		toggle: true
	});
	
	//btn 기능 binding
	$('#subbtn3').bind('click', function(){
		$.uf_isaddpath();
	});
	$('#subbtn4').bind('click', function(){
		$.uf_isaddsttn();
	});
	$('#subbtn5').bind('click', function(){
		$.uf_isaddcrs();
	});
});