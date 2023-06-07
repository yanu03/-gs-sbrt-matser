$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0" value="">');
	
	$('#sch_lb0').combobox({
	   	width: 120,
	   	height: 24,
	   	editable: false,
	    url: '/common/selectCommonDtlList',
	    method: 'post',
	    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_DIV"}}),
	    valueField: 'DL_CD',
	    textField: 'DL_CD_NM',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
		loadFilter: function(data) {
			var allItem = {};
			allItem['DL_CD'] = ''; // 사용할 수 있는 고유한 값
			allItem['DL_CD_NM'] = '모두'; // 표시되는 텍스트

			// 새 항목을 데이터 배열의 처음에 추가
			data.unshift(allItem);
			return data;
		},
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
	    onChange: function(a_newValue, a_oldValue){
	    	//자동 조회시 여기서 코딩
			//$.jf_retrieve($('#dg0'));
			$.uf_validdaysb(a_newValue,a_oldValue); //배포할때로 바꿔야함
	    }
	});
});