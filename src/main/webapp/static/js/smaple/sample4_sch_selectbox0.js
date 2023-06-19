$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0">');
	
	$('#sch_lb0').combobox({
	   	width: 120,
	   	height: 24,
	   	editable: false,
	    url: 'sample4_sch_combobox_data.json',
	    method: 'get',
	    queryParams: {},
	    valueField: 'id',
	    textField: 'text',
	    value: '%',				//dg0과 일치 시키면 편하다
			panelHeight:'auto',
	    onBeforeLoad: function(param){
				$(this).combo('readonly', true);
	    },
	    onLoadSuccess: function(){
	    	$(this).combo('readonly', false);
	    },
	    onLoadError: function(){
	    	$('#sch_lb0').combo('readonly', true);
	    	return false;
	    },
	    onChange: function(newValue,oldValue){
	    	//자동 조회시 여기서 코딩
	    }
	});

});