/*
프로그램명 : 사용자 권한 그룹관리 datagrid0
작성자 : 박원용
작성일 : 2023.05.01
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
    $('#dg0').datagrid({
    url:'/authority/selectAuthorityList',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'AUTH_CD',title:'권한코드',width:180,align:'left',halign:'center',sortable:true},
        {field:'AUTH_NM',title:'권한명',width:180,align:'left',halign:'center',sortable:true,editor:{type:'textbox', options:{required:true,validType:['length[0,30]']}}},
        // 시스템 column 았을 시 조금 수정해서 넣어야함
        // datagrid에 combobox를 넣을 시 valuefield가 column과 일치해야함
        // 어떻게 하는지 모르곘음
        // {field:'SYSTEM_BIT',title:'시스템',width:180,align:'left',halign:'center',sortable:true,formatter:function(value,row){return row.SYSTEM_BIT_NM;},editor:{
        // type:'combobox', 
        // options:{
        //     required:true,
        //     url: 'http://localhost:8183/common/selectCommonDtlList',
        //     method: 'post',
        //     queryParams: JSON.stringify({dma_search : {CO_CD : "SYSTEM_BIT"}}),
        //     valueField: 'DL_CD',
        //     textField: 'DL_CD_NM',
        //     loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
        // }}},
        {field:'USE_YN',title:'사용여부',width:80,halign:'center',align:'center',sortable:true,editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
        {field:'REMARK',title:'비고',width:400,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,200]']}}},
        ]],
	frozenColumns:[[
		]],
	//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);},
    onLoadSuccess: function(data){
        $.jf_cleargrid($('#dg1'), data.rows.length);
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){return true;},
    onClickRow: function(a_index,row){
    },
    onDblClickRow: function(a_index,row){
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            $.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
            $.jf_beginedit($('#dg0'), a_index);
        }
    },
    onBeforeSelect: function(a_index,row){
        let rtn_value = false;
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
            if($.jf_changeddg($('#dg1'), null) ){
                $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', a_index);
                rtn_value = false;
            }else{
                rtn_value = true;
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