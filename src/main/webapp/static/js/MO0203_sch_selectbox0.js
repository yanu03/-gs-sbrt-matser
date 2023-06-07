$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0" value="">');
	
	$('#sch_lb0').combobox({
	   	width: 200,
	   	height: 24,
	   	editable: false,
	    url: '/rout/selectRoutList',
	    method: 'post',
	    //queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_DIV"}}),
	    queryParams: JSON.stringify({"dma_search" : {"content" : ""}}),
	    valueField: 'ROUT_ID',
	    textField: 'ROUT_NM',
		panelHeight:'auto',
		label:'노선명 :',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
	    onBeforeLoad: function(param){},
	    onLoadSuccess: function(){
			$(this).combobox('setValue', 'RT00000048');
	    },
	    onLoadError: function(){
	    	return false;
	    },
	    onChange: function(a_newValue, a_oldValue){
	    	//자동 조회시 여기서 코딩
			$.uf_bgajax();
			$.jf_retrieve($('#dg0'));
	    }
	});
});