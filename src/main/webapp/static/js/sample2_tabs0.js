﻿$(function(){

	$('#tab_panel0').append('<div id="tabs0"><div id="tab0" title="tab0"></div><div id="tab1" title="tab1"></div></div>');	
	//$('#tab0').append('<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true"></div>');
	//$('#tab1').append('<div id="dg_panel2" class="easyui-panel" data-options="fit:true,cache:true"></div>');

	$('#tabs0').tabs({
	    fit: true,
	    border: false,
	    tabPosition: 'top',
	    headerWidth: 200,
	    tabWidth: 200,
	    tabHeight: 25,
	    selected: 0,
			cache:true,
			loadingMessage:'로딩중...',
	    onLoad:function(panel){
	    },
	    onUnselect:function(title,index){
	    },
	    onSelect:function(title,index){
	    }
	});
  
});