/*
프로그램명 : 뉴스/기상 datagrid
작성자 : 박원용
작성일 : 2023.04.24
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg0').datagrid({
    url:'/sm/SM0700G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : "", USE_YN : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'INTG_ID',title:'뉴스/기상ID',width:150,align:'center',halign:'center',sortable:true},
        {field:'INTG_NM',title:'뉴스/기상명',width:150,align:'left',halign:'center',sortable:true,editor:{type:'textbox', options:{maxlength:30}}},
        {field:'INTG_TYPE',title:'유형',width:130,align:'left',halign:'center',formatter:function(value,row){return row.INTG_TYPE_NM;},
        editor:{type:'combobox',options:{valueField:'DL_CD',textField:'DL_CD_NM',method:'post',
        url:'/common/selectCommonDtlList',queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "INTG_TYPE"}}),required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
        ,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}, }}},
        {field:'INTG_URL',title:'연계 URL',width:550,halign:'center',align:'left',editor:{type:'textbox', options:{maxlength:200,required:true}}},
        {field:'INTG_API_KEY',title:'연계 API키',width:550,halign:'center',align:'left',editor:{type:'textbox', options:{maxlength:200}}},
        {field:'REMARK',title:'비고',width:300,align:'left',halign:'center',editor:{type:'textbox', options:{maxlength:200}}}
      ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){  $.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(data){
      return data;
    },
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
      if(Object.keys(param).length < 1) return false;
			else return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){
      if($.jf_validatedata($('#dg0'),null, $.jf_fnddgstrct($('#dg0')), 'g')){
				$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
				$.jf_beginedit($('#dg0'), a_index);
			}
    },
    onBeforeSelect: function(index,row){
      return $.jf_validatedata($('#dg0'),null, $.jf_fnddgstrct($('#dg0')), 'g');
    },
    onSelect: function(a_index,a_row){
      $.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
    },
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){
    },
    onEndEdit: function(a_index,a_row,a_changes){
      a_row.INTG_TYPE_NM = $.jf_currowtext($('#dg0'), a_index, 'INTG_TYPE');
    },
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
      if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g'))return true;
      return false;
  },
	});

});