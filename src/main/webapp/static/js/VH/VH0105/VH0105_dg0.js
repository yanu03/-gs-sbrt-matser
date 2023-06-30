/*
프로그램명 : 버스 운행 경로 이력 datagrid
작성자 : 박원용
작성일 : 2023.05.11
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

	var v_fdate = $.tracomfromdate('d');
	var v_tdate = $.tracombasicdate();
    $('#dg0').datagrid({
    url:'/vh/VH0105G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({"dma_search" : {"TYPE" : "All", "CONTENT1" : "", "CONTENT2" : "", "CONTENT3" : "","F_DATE": v_fdate,"L_DATE":v_tdate}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'ROUT_GRP_NM',title:'노선그룹',width:100,align:'center',halign:'center',sortable:true},
        {field:'ROUT_NM',title:'노선명',width:150,align:'center',halign:'center',sortable:true},
        {field:'VHC_NO',title:'차량번호',width:150,halign:'center',align:'center',sortable:true},
        {field:'DRV_NM',title:'운전자명',width:100,align:'center',halign:'center',sortable:true},
        {field:'ALLOC_NO',title:'배차번호',width:80,halign:'center',align:'center'},
        {field:'OPER_SN',title:'운행순번',width:80,halign:'center',align:'center',sortable:true},
        {field:'NODE_NM',title:'노드명',width:200,halign:'center',align:'left'},
        {field:'GPS_X',title:'경도',width:150,halign:'center',align:'right'},
        {field:'GPS_Y',title:'위도',width:150,halign:'center',align:'right'},
        {field:'OPER_STS',title:'운행상태',width:200,halign:'center',align:'left'},
        {field:'BUS_STS',title:'버스상태',width:200,halign:'center',align:'left'},
        {field:'OBE_STS',title:'OBE상태',width:200,halign:'center',align:'left'},
        {field:'DRV_ANGLE',title:'차량진행각도(º)',width:150,halign:'center',align:'right'},
        {field:'CUR_SPD',title:'현재속도(km/h)',width:150,halign:'center',align:'right'},
        {field:'ACLRTN_YN',title:'가속여부',width:200,halign:'center',align:'left'},
        {field:'DCLRTN_YN',title:'감속여부',width:200,halign:'center',align:'left'},
        {field:'CUR_STOP_TM',title:'현재정차시간',width:200,halign:'center',align:'left'},
        {field:'OPER_LEN',title:'운행거리',width:200,halign:'center',align:'left'},
        {field:'NODE_TYPE_NM',title:'노드유형',width:200,halign:'center',align:'center'},
        {field:'LINK_NM',title:'링크명',width:250,halign:'center',align:'left'},
        {field:'PRV_PLCE_NM',title:'이전정류소명',width:200,halign:'center',align:'left'},
      ]],
	frozenColumns:[[
			{field:'OPER_DT',title:'운행일',width:150,align:'center',halign:'center',sortable:true},
      {field:'UPD_DTM',title:'갱신일시',width:200,align:'center',halign:'center',sortable:true},
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(data){
      return data;
    },
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){},
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){},
    onBeforeSelect: function(index,row){},
    onSelect: function(a_index,a_row){
      $.jf_movemap(a_row.GPS_X, a_row.GPS_Y);
      $.jf_deletemarker();
      $.jf_addmarker(a_row.GPS_X, a_row.GPS_Y);
    },
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){},
    onEndEdit: function(a_index,a_row,a_changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){},
	});

});
