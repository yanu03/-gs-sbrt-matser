/*
프로그램명 : 기상 관리 
작성자 : 박원용
작성일 : 2023.04.26
*/
$(function(){
	//single main grid
	$('#tab0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

  var uv_tomonth = 202301;//$.uf_combinedata();

    $('#dg0').datagrid({
    url:'/pi/PI0400G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : uv_tomonth, USE_YN : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
      {field:'UPD_DTM',title:'업데이트일시',width:180,align:'center',halign:'center',sortable:true},
      {field:'NOTI_DTM',title:'발표일시',width:180,align:'center',halign:'center',sortable:true},
      {field:'SKY_COND',title:'하늘상태',width:80,halign:'center',align:'center',hidden:true},
      {field:'SKY_COND_NM',title:'하늘상태',width:80,halign:'center',align:'center',sortable:true},
      {field:'TEMPC',title:'온도(ºC)',width:120,halign:'center',align:'right',hidden:true},
      {field:'TEMP_MINI',title:'최저기온(ºC)',width:140,halign:'center',align:'right',sortable:true},
      {field:'TEMP_HIGH',title:'최고기온(ºC)',width:140,align:'right',halign:'center',sortable:true},
      {field:'HUMI',title:'습도(%)',width:120,halign:'center',align:'right',sortable:true},
      {field:'RAIN_PRO',title:'강수확률(%)',width:140,halign:'center',align:'right',sortable:true},
      {field:'RAINFALL',title:'강수량(mm)',width:140,halign:'center',align:'right',sortable:true},
    ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){ $.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
      return a_data;
    },
    onLoadSuccess: function(a_data){
      $.jf_protectform($('#dg0'), $('#ef0'), true, a_data.rows.length);
      $.uf_imgobserver(a_data.rows.length);
      uv_dg0Load = true;
      if(uv_chktab == "기상") $.jf_setfocus($('#dg0'), -1);
      else { $('#dg1').datagrid('unselectAll'); $.jf_setfocus($('#dg1'), -1);}
      $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(a_index,a_row){
      
    },
    onDblClickRow: function(a_index,row){
    },
    onBeforeSelect: function(index,row){
      
    },
    onSelect: function(a_index,a_row){
        // $.jf_moddgstrct($('#dg0'), a_index);
        if(uv_dg0Load && uv_dg1Load) $.uf_syncform($('#dg0'),null, uv_chktab);
    },
    onBeforeEdit: function(a_index,a_row){
        
    },
    onBeginEdit: function(a_index,a_row){
        //$.pf_checkedit(a_index);
    },
    onEndEdit: function(index,row,changes){
        
    },
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){}
	});

});