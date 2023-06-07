$(function(){

	//지도가 두번째 탭에 있으면 로딩이 제대로 안되어 첫번째탭으로 위치시킴
	$('#tab_panel0').append('<div id="tabs0"><div id="tab1" title="지도"></div><div id="tab0" title="경유노선"></div></div>');	

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