/*
프로그램 명 : 배차별 차량 관리 datagrid0
작성자 : 박원용
작성일 : 2023.04.07

수정자 : 박원용
수정일 : 2023.04.25
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg0').datagrid({
    url:'/AL/AL0202G0R0',	//json 조회 url 
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE:"ALL",CONTENT : "",USE_YN:""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'ALLOC_ID',title:'배차ID',width:120,align:'center',halign:'center',sortable:true},
        {field:'ALLOC_NM',title:'배차명',width:120,align:'center',halign:'center',sortable:true},
        ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    onLoadSuccess: function(data){
        $.jf_cleargrid($('#dg1'), data.rows.length);
        $.jf_cleargrid($('#dg2'), data.rows.length);
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(a_index,row){
        let rtn_value = false;
        if($.jf_changeddg($('#dg2'), null) ){
            $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', a_index);
            rtn_value = false;
        }else{
            rtn_value = true;
        }
        return rtn_value;
    },
    onSelect: function(a_index,a_row){
        // $.jf_childretrieve($('#dg1'),null);
        $.jf_childretrieve($('#dg1'));
        $.jf_childretrieve($('#dg2'), $.pf_childparams($('#dg2'), a_row));  
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit: function(index,row){}
	});

});