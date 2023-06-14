/*
프로그램명 : 코드관리 datagrid1
작성자 : 박원용
작성일 : 2023.04.10
*/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg1').datagrid({
    //url:'js/AL0102/JSON file/AL0102_sample0.json',	//json 조회 url
    url:'/common/selectCommonDtlList',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    //method: 'GET', // json 데이터 가져올때는 GET 
    queryParams: JSON.stringify({"dma_commonCO" : { "CO_CD" : ""}}),	//json 조회 params
    //queryParams: {},
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'CO_CD',title:'공통코드',width:60,halign:'center',align:'center',hidden:true},
        {field:'DL_CD_NM',title:'상세코드명',width:220,align:'left',halign:'center',sortable:true,editor:{type:'textbox', options:{required:true,validType:['length[0,30]']}}},
        {field:'USE_YN',title:'사용여부',width:80,halign:'center',align:'center',sortable:true,editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
        {field:'TXT_VAL1',title:'속성1(문자)',width:110,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,30]']}}},
        {field:'TXT_VAL2',title:'속성2(문자)',width:110,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,30]']}}},
        {field:'TXT_VAL3',title:'속성3(문자)',width:110,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,30]']}}},
        {field:'NUM_VAL4',title:'속성4(숫자)',width:110,align:'left',halign:'center',editor:{type:'numberbox', options:{validType:['length[0,30]']}}},
        {field:'NUM_VAL5',title:'속성5(숫자)',width:110,align:'left',halign:'center',editor:{type:'numberbox', options:{validType:['length[0,30]']}}},
        {field:'NUM_VAL6',title:'속성6(숫자)',width:110,align:'left',halign:'center',editor:{type:'numberbox', options:{validType:['length[0,30]']}}},
        {field:'REMARK',title:'비고',width:220,align:'left',halign:'center',editor:{type:'textbox', options:{validType:['length[0,200]']}}},
        ]],
	frozenColumns:[[
        {field:'DL_CD',title:'상세코드',width:80,align:'left',halign:'center',sortable:true,editor:{type:'textbox', options:{required:true,validType:['length[0,20]']}}}
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
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
            $.jf_beginedit($('#dg1'), a_index);
        }
    },
    onBeforeSelect: function(a_index,a_row){
        let rtn_value = false;
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            if(!$.uf_chkkey($('#dg1'), $('#dg1').datagrid('getRows'),  $.jf_fnddgstrct($('#dg1')), 'DL_CD') ) {
                rtn_value = false;
            }
            else rtn_value = true;
        }
        return rtn_value;
    },
    onSelect: function(a_index,a_row){
        $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));	//grid edit일때 사용
    },
    onBeforeEdit: function(a_index,a_row){   },
    onBeginEdit: function(a_index,a_row){
        $.uf_checkedit($('#dg1'),a_index, "DL_CD",a_row);
    },
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))return true;
        return false;
    },
	});

});