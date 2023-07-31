$(function(){

	$('#sch_panel0').append('<input id="sch_lb1" name="sch_lb1" value="">');
	
	$('#sch_lb1').combobox({
	   	width: 200,
		labelWidth: 80,
	   	height: 24,
	   	editable: false,
	    url: '/common/selectCommonDtlList',
	    method: 'post',
	    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_GRP"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		panelHeight:'auto',
		label:'노선그룹 :',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
	    onBeforeLoad: function(param){},
	    onLoadSuccess: function(){
			$(this).combobox('setValue', 'RG001');
		},
	    onLoadError: function(){
	    	return false;
	    },
	    onChange: function(a_newValue, a_oldValue){
	        let v_queryParams = JSON.stringify({"dma_search" : {"ROUT_GRP" : a_newValue}});
	
			$('#sch_lb0').combobox({queryParams: v_queryParams});	
	        //$('#sch_lb0').combobox('reload', v_queryParams);			
	    }
	});
});