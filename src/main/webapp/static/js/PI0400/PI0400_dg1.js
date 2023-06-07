/*
프로그램명 : 기상 관리 
작성자 : 박원용
작성일 : 2023.04.26
*/
$(function(){
	//single main grid
	$('#tab1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    var uv_tomonth = 202301;//$.uf_combinedata();

    $('#dg1').datagrid({
    url:'/pi/PI0400G1R0',	//json 조회 url
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
        {field:'MEAS_DTM',title:'발표일시',width:180,align:'center',halign:'center',sortable:true},
        {field:'DUSTC',title:'미세먼지농도(㎍/㎥)',width:180,halign:'center',align:'right',sortable:true},
        {field:'SDUSTC',title:'초미세먼지농도(㎍/㎥)',width:180,halign:'center',align:'right',sortable:true},
        {field:'SDC',title:'아황산가스농도(ppm)',width:180,halign:'center',align:'right',sortable:true},
        {field:'CMC',title:'일산화탄소농도(ppm)',width:180,align:'right',halign:'center',sortable:true},
        {field:'OZONEC',title:'오존농도(ppm)',width:140,halign:'center',align:'right',sortable:true},
        {field:'NDC',title:'이산화질소농도(ppm)',width:180,halign:'center',align:'right',sortable:true},
    ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
        return a_data;
    },
    onLoadSuccess: function(a_data){
        $.jf_protectform($('#dg1'), $('#ef0'), true, a_data.rows.length);
        uv_dg1Load = true
        if(uv_chktab == "대기") $.jf_setfocus($('#dg1'), -1);
        else { $('#dg0').datagrid('unselectAll'); $.jf_setfocus($('#dg0'), -1);}
        $.jf_setfooter($('#dg1'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){
    },
    onBeforeSelect: function(index,row){
    },
    onSelect: function(a_index,a_row){
        // $.jf_moddgstrct($('#dg0'), a_index);
        //$.uf_trigger($('#dg1'), a_row);
        
        if(uv_dg0Load && uv_dg1Load) $.uf_syncform(null,$('#dg1'), uv_chktab);
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