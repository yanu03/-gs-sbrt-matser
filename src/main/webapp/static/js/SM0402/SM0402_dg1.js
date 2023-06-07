/*
프로그램명 : 사용자 권한 그룹 관리 datagrid1
작성자 : 박원용
작성일 : 2023.05.01
*/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg1').datagrid({
    //url:'js/AL0102/JSON file/AL0102_sample0.json',	//json 조회 url
    url:'/authority/selectAuthorityMemberList',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {AUTH_CD : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'AUTH_CD',title:'사용자 ID ',width:120,halign:'center',align:'left',hidden:true},
        {field:'USER_ID',title:'사용자 ID ',width:120,halign:'center',align:'left',sortable:true,editor:{type:'textbox', options:{required:true,validType:['length[0,30]']}}},
        {field:'USER_NM',title:'사용자명',width:120,align:'left',halign:'center',sortable:true,editor:{type:'textbox', options:{required:true,validType:['length[0,30]']}}},
        //{field:'ASSIGNED_TASK',title:'담당업무',width:400,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,200]']}}},
        ]],
	frozenColumns:[[
        ]],
		//event 정의
    loader: function(param, success, error){  $.tracomdgloader($(this), param, success, error);},
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg1'), -1);
        $.jf_setfooter($('#dg1'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){     
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
            $.jf_beginedit($('#dg1'), a_index);
        }
    },
    onBeforeSelect: function(index,row){

        return $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g');
    },
    onSelect: function(a_index,a_row){
        $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));	//grid edit일때 사용
    },
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')) return true;
        return false;
    },
	});

});