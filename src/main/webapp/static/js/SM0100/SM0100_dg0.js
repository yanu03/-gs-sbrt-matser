/*
프로그램명 : 코드 관리 datagrid0
작성자 : 박원용
작성일 : 2023.04.10

수정자 : 박원용
수정일 : 2023.05.08
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
    $('#dg0').datagrid({
    url:'/common/selectCommonCo',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({"dma_search" : {"TYPE": "ALL", "CONTENT" : "", "USE_YN" : "all"}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'CO_CD',title:'공통코드',width:180,align:'left',halign:'center',sortable:true, editor:{type:'textbox', options:{required:true,validType:['length[0,20]']}}},
        {field:'CO_CD_NM',title:'공통코드명',width:180,align:'left',halign:'center',sortable:true,editor:{type:'textbox', options:{required:true,validType:['length[0,30]']}}},
        {field:'SORT',title:'순서',width:50,halign:'center',align:'center',sortable:true,editor:{type:'numberbox', options:{required:true,validType:['length[0,5]']}}},
        {field:'USE_YN',title:'사용여부',width:80,halign:'center',align:'center',sortable:true,editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
        {field:'REMARK',title:'비고',width:227,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,200]']}}},
        ]],
	frozenColumns:[[
		]],
	//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);},
    onLoadSuccess: function(data){
        $.jf_cleargrid($('#dg1'), data.rows.length);
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
        // 데이터가 없을 시 child 데이터 조기화
        
    },
    onBeforeLoad: function(param){return true;},
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            $.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
            $.jf_beginedit($('#dg0'), a_index);
        }
    },
    onBeforeSelect: function(a_index,a_row){
        let rtn_value = false;
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            if(!$.uf_chkkey($('#dg0'), $('#dg0').datagrid('getRows'), $.jf_fnddgstrct($('#dg0')), 'CO_CD') ||
                !$.uf_chkkey($('#dg1'), $('#dg1').datagrid('getRows'),  $.jf_fnddgstrct($('#dg1')), 'DL_CD')) {
                    rtn_value = false;
            }
            else{
                $.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
                $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
                if($.jf_changeddg($('#dg1'), null) ){
                    $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', a_index);
                    rtn_value = false;
                }else{
                    rtn_value = true;
                }
            }
        }
        
        return rtn_value;
    },
    onSelect: function(a_index,a_row){
        
        $.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));	//grid edit일때 사용
        $.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), a_row));
    },
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){
        $.uf_checkedit($('#dg0'),a_index, "CO_CD", a_row);
    },
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g'))return true;
        return false;
    },
	});

});