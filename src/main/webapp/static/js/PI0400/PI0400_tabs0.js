$(function(){

	$('#tab_panel0').append('<div id="tabs0"><div id="tab0" title="기상"></div><div id="tab1" title="대기"></div></div>');	

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
      onSelect:function(a_title,index){
      // 어떤 tab인지 알기위해 받음
      uv_chktab = a_title;
      }
	});

});