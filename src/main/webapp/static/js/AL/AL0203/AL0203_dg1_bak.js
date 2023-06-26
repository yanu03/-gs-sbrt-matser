/** 
작성자 : 양현우
작성일 : 2023-04-17
수정자 : 양현우
수정일 : 2023-04-17
참고 : 이 js를 포함한 프로그램은 동적으로 데이터그리드를 그립니다. 관련 코드는 html에 있습니다.
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
		// url:'',	//json 조회 url
		// method: 'post',
		// queryParams: JSON.stringify({dma_search : {ALLOC_ID : ""}}),						//json 조회 params
		// singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		// border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		// rownumbers: true,
		// showFooter: true,
		columns:[[
			// {field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left'},
			// ,{field:'OPER_INFO_1_0',title:'OPER_INFO_1_0',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_1',title:'OPER_INFO_1_1',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_2',title:'OPER_INFO_1_2',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_3',title:'OPER_INFO_1_3',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_4',title:'OPER_INFO_1_4',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_5',title:'OPER_INFO_1_5',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_6',title:'OPER_INFO_1_6',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_7',title:'OPER_INFO_1_7',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_8',title:'OPER_INFO_1_8',halign:'center',align:'left',hidden:true}
			// ,{field:'OPER_INFO_1_9',title:'OPER_INFO_1_9',halign:'center',align:'left',hidden:true}
			// ,{field:"INDEX_0" , title:"INDEX_0" , hidden:true}, {field:"COR_ID_0" , title:"COR_ID_0" , hidden:true},
			// ,{field:"INDEX_1" , title:"INDEX_1" , hidden:true}, {field:"COR_ID_1" , title:"COR_ID_1" , hidden:true},
			// ,{field:"INDEX_2" , title:"INDEX_2" , hidden:true}, {field:"COR_ID_2" , title:"COR_ID_2" , hidden:true},
			// ,{field:"INDEX_3" , title:"INDEX_3" , hidden:true}, {field:"COR_ID_3" , title:"COR_ID_3" , hidden:true},
			// ,{field:"INDEX_4" , title:"INDEX_4" , hidden:true}, {field:"COR_ID_4" , title:"COR_ID_4" , hidden:true},
			// ,{field:"INDEX_5" , title:"INDEX_5" , hidden:true}, {field:"COR_ID_5" , title:"COR_ID_5" , hidden:true},
			// ,{field:"INDEX_6" , title:"INDEX_6" , hidden:true}, {field:"COR_ID_6" , title:"COR_ID_6" , hidden:true},
			// ,{field:"INDEX_7" , title:"INDEX_7" , hidden:true}, {field:"COR_ID_7" , title:"COR_ID_7" , hidden:true},
			// ,{field:"INDEX_8" , title:"INDEX_8" , hidden:true}, {field:"COR_ID_8" , title:"COR_ID_8" , hidden:true},
			// ,{field:"INDEX_9" , title:"INDEX_9" , hidden:true}, {field:"COR_ID_9" , title:"COR_ID_9" , hidden:true},
			// ,{field:"INDEX_10", title:"INDEX_10", hidden:true}, {field:"COR_ID_10", title:"COR_ID_10", hidden:true},
			// ,{field:"INDEX_11", title:"INDEX_11", hidden:true}, {field:"COR_ID_11", title:"COR_ID_11", hidden:true},
			// ,{field:"INDEX_12", title:"INDEX_12", hidden:true}, {field:"COR_ID_12", title:"COR_ID_12", hidden:true},
			// ,{field:"INDEX_13", title:"INDEX_13", hidden:true}, {field:"COR_ID_13", title:"COR_ID_13", hidden:true},
			// ,{field:"INDEX_14", title:"INDEX_14", hidden:true}, {field:"COR_ID_14", title:"COR_ID_14", hidden:true},
			// ,{field:"INDEX_15", title:"INDEX_15", hidden:true}, {field:"COR_ID_15", title:"COR_ID_15", hidden:true},
			// ,{field:"INDEX_16", title:"INDEX_16", hidden:true}, {field:"COR_ID_16", title:"COR_ID_16", hidden:true},
			// ,{field:"INDEX_17", title:"INDEX_17", hidden:true}, {field:"COR_ID_17", title:"COR_ID_17", hidden:true},
			// ,{field:"INDEX_18", title:"INDEX_18", hidden:true}, {field:"COR_ID_18", title:"COR_ID_18", hidden:true},
			// ,{field:"INDEX_19", title:"INDEX_19", hidden:true}, {field:"COR_ID_19", title:"COR_ID_19", hidden:true},
			// ,{field:"INDEX_20", title:"INDEX_20", hidden:true}, {field:"COR_ID_20", title:"COR_ID_20", hidden:true},
			// ,{field:"INDEX_21", title:"INDEX_21", hidden:true}, {field:"COR_ID_21", title:"COR_ID_21", hidden:true},
			// ,{field:"INDEX_22", title:"INDEX_22", hidden:true}, {field:"COR_ID_22", title:"COR_ID_22", hidden:true},
			// ,{field:"INDEX_23", title:"INDEX_23", hidden:true}, {field:"COR_ID_23", title:"COR_ID_23", hidden:true},
			// ,{field:"INDEX_24", title:"INDEX_24", hidden:true}, {field:"COR_ID_24", title:"COR_ID_24", hidden:true},
			// ,{field:"INDEX_25", title:"INDEX_25", hidden:true}, {field:"COR_ID_25", title:"COR_ID_25", hidden:true},
			// ,{field:"INDEX_26", title:"INDEX_26", hidden:true}, {field:"COR_ID_26", title:"COR_ID_26", hidden:true},
			// ,{field:"INDEX_27", title:"INDEX_27", hidden:true}, {field:"COR_ID_27", title:"COR_ID_27", hidden:true},
			// ,{field:"INDEX_28", title:"INDEX_28", hidden:true}, {field:"COR_ID_28", title:"COR_ID_28", hidden:true},
			// ,{field:"INDEX_29", title:"INDEX_29", hidden:true}, {field:"COR_ID_29", title:"COR_ID_29", hidden:true},
			// ,{field:"INDEX_30", title:"INDEX_30", hidden:true}, {field:"COR_ID_30", title:"COR_ID_30", hidden:true},
			// ,{field:"INDEX_31", title:"INDEX_31", hidden:true}, {field:"COR_ID_31", title:"COR_ID_31", hidden:true},
			// ,{field:"INDEX_32", title:"INDEX_32", hidden:true}, {field:"COR_ID_32", title:"COR_ID_32", hidden:true},
			// ,{field:"INDEX_33", title:"INDEX_33", hidden:true}, {field:"COR_ID_33", title:"COR_ID_33", hidden:true},
			// ,{field:"INDEX_34", title:"INDEX_34", hidden:true}, {field:"COR_ID_34", title:"COR_ID_34", hidden:true},
			// ,{field:"INDEX_35", title:"INDEX_35", hidden:true}, {field:"COR_ID_35", title:"COR_ID_35", hidden:true},
			// ,{field:"INDEX_36", title:"INDEX_36", hidden:true}, {field:"COR_ID_36", title:"COR_ID_36", hidden:true},
			// ,{field:"INDEX_37", title:"INDEX_37", hidden:true}, {field:"COR_ID_37", title:"COR_ID_37", hidden:true},
			// ,{field:"INDEX_38", title:"INDEX_38", hidden:true}, {field:"COR_ID_38", title:"COR_ID_38", hidden:true},
			// ,{field:"INDEX_39", title:"INDEX_39", hidden:true}, {field:"COR_ID_39", title:"COR_ID_39", hidden:true},
			// ,{field:"OPER_INFO_1_0" ,title:"OPER_INFO_1_0" ,hidden:true}, {field:"OPER_INFO_2_0" , title:"OPER_INFO_2_0" ,hidden:true}, {field:"OPER_INFO_3_0" , title:"OPER_INFO_3_0" , hidden:true}
			// ,{field:"OPER_INFO_1_1" ,title:"OPER_INFO_1_1" ,hidden:true}, {field:"OPER_INFO_2_1" , title:"OPER_INFO_2_1" ,hidden:true}, {field:"OPER_INFO_3_1" , title:"OPER_INFO_3_1" , hidden:true}
			// ,{field:"OPER_INFO_1_2" ,title:"OPER_INFO_1_2" ,hidden:true}, {field:"OPER_INFO_2_2" , title:"OPER_INFO_2_2" ,hidden:true}, {field:"OPER_INFO_3_2" , title:"OPER_INFO_3_2" , hidden:true}
			// ,{field:"OPER_INFO_1_3" ,title:"OPER_INFO_1_3" ,hidden:true}, {field:"OPER_INFO_2_3" , title:"OPER_INFO_2_3" ,hidden:true}, {field:"OPER_INFO_3_3" , title:"OPER_INFO_3_3" , hidden:true}
			// ,{field:"OPER_INFO_1_4" ,title:"OPER_INFO_1_4" ,hidden:true}, {field:"OPER_INFO_2_4" , title:"OPER_INFO_2_4" ,hidden:true}, {field:"OPER_INFO_3_4" , title:"OPER_INFO_3_4" , hidden:true}
			// ,{field:"OPER_INFO_1_5" ,title:"OPER_INFO_1_5" ,hidden:true}, {field:"OPER_INFO_2_5" , title:"OPER_INFO_2_5" ,hidden:true}, {field:"OPER_INFO_3_5" , title:"OPER_INFO_3_5" , hidden:true}
			// ,{field:"OPER_INFO_1_6" ,title:"OPER_INFO_1_6" ,hidden:true}, {field:"OPER_INFO_2_6" , title:"OPER_INFO_2_6" ,hidden:true}, {field:"OPER_INFO_3_6" , title:"OPER_INFO_3_6" , hidden:true}
			// ,{field:"OPER_INFO_1_7" ,title:"OPER_INFO_1_7" ,hidden:true}, {field:"OPER_INFO_2_7" , title:"OPER_INFO_2_7" ,hidden:true}, {field:"OPER_INFO_3_7" , title:"OPER_INFO_3_7" , hidden:true}
			// ,{field:"OPER_INFO_1_8" ,title:"OPER_INFO_1_8" ,hidden:true}, {field:"OPER_INFO_2_8" , title:"OPER_INFO_2_8" ,hidden:true}, {field:"OPER_INFO_3_8" , title:"OPER_INFO_3_8" , hidden:true}
			// ,{field:"OPER_INFO_1_9" ,title:"OPER_INFO_1_9" ,hidden:true}, {field:"OPER_INFO_2_9" , title:"OPER_INFO_2_9" ,hidden:true}, {field:"OPER_INFO_3_9" , title:"OPER_INFO_3_9" , hidden:true}
			// ,{field:"OPER_INFO_1_10",title:"OPER_INFO_1_10",hidden:true}, {field:"OPER_INFO_2_10", title:"OPER_INFO_2_10",hidden:true}, {field:"OPER_INFO_3_10", title:"OPER_INFO_3_10", hidden:true}
			// ,{field:"OPER_INFO_1_11",title:"OPER_INFO_1_11",hidden:true}, {field:"OPER_INFO_2_11", title:"OPER_INFO_2_11",hidden:true}, {field:"OPER_INFO_3_11", title:"OPER_INFO_3_11", hidden:true}
			// ,{field:"OPER_INFO_1_12",title:"OPER_INFO_1_12",hidden:true}, {field:"OPER_INFO_2_12", title:"OPER_INFO_2_12",hidden:true}, {field:"OPER_INFO_3_12", title:"OPER_INFO_3_12", hidden:true}
			// ,{field:"OPER_INFO_1_13",title:"OPER_INFO_1_13",hidden:true}, {field:"OPER_INFO_2_13", title:"OPER_INFO_2_13",hidden:true}, {field:"OPER_INFO_3_13", title:"OPER_INFO_3_13", hidden:true}
			// ,{field:"OPER_INFO_1_14",title:"OPER_INFO_1_14",hidden:true}, {field:"OPER_INFO_2_14", title:"OPER_INFO_2_14",hidden:true}, {field:"OPER_INFO_3_14", title:"OPER_INFO_3_14", hidden:true}
			// ,{field:"OPER_INFO_1_15",title:"OPER_INFO_1_15",hidden:true}, {field:"OPER_INFO_2_15", title:"OPER_INFO_2_15",hidden:true}, {field:"OPER_INFO_3_15", title:"OPER_INFO_3_15", hidden:true}
			// ,{field:"OPER_INFO_1_16",title:"OPER_INFO_1_16",hidden:true}, {field:"OPER_INFO_2_16", title:"OPER_INFO_2_16",hidden:true}, {field:"OPER_INFO_3_16", title:"OPER_INFO_3_16", hidden:true}
			// ,{field:"OPER_INFO_1_17",title:"OPER_INFO_1_17",hidden:true}, {field:"OPER_INFO_2_17", title:"OPER_INFO_2_17",hidden:true}, {field:"OPER_INFO_3_17", title:"OPER_INFO_3_17", hidden:true}
			// ,{field:"OPER_INFO_1_18",title:"OPER_INFO_1_18",hidden:true}, {field:"OPER_INFO_2_18", title:"OPER_INFO_2_18",hidden:true}, {field:"OPER_INFO_3_18", title:"OPER_INFO_3_18", hidden:true}
			// ,{field:"OPER_INFO_1_19",title:"OPER_INFO_1_19",hidden:true}, {field:"OPER_INFO_2_19", title:"OPER_INFO_2_19",hidden:true}, {field:"OPER_INFO_3_19", title:"OPER_INFO_3_19", hidden:true}
			// ,{field:"OPER_INFO_1_20",title:"OPER_INFO_1_20",hidden:true}, {field:"OPER_INFO_2_20", title:"OPER_INFO_2_20",hidden:true}, {field:"OPER_INFO_3_20", title:"OPER_INFO_3_20", hidden:true}
			// ,{field:"OPER_INFO_1_21",title:"OPER_INFO_1_21",hidden:true}, {field:"OPER_INFO_2_21", title:"OPER_INFO_2_21",hidden:true}, {field:"OPER_INFO_3_21", title:"OPER_INFO_3_21", hidden:true}
			// ,{field:"OPER_INFO_1_22",title:"OPER_INFO_1_22",hidden:true}, {field:"OPER_INFO_2_22", title:"OPER_INFO_2_22",hidden:true}, {field:"OPER_INFO_3_22", title:"OPER_INFO_3_22", hidden:true}
			// ,{field:"OPER_INFO_1_23",title:"OPER_INFO_1_23",hidden:true}, {field:"OPER_INFO_2_23", title:"OPER_INFO_2_23",hidden:true}, {field:"OPER_INFO_3_23", title:"OPER_INFO_3_23", hidden:true}
			// ,{field:"OPER_INFO_1_24",title:"OPER_INFO_1_24",hidden:true}, {field:"OPER_INFO_2_24", title:"OPER_INFO_2_24",hidden:true}, {field:"OPER_INFO_3_24", title:"OPER_INFO_3_24", hidden:true}
			// ,{field:"OPER_INFO_1_25",title:"OPER_INFO_1_25",hidden:true}, {field:"OPER_INFO_2_25", title:"OPER_INFO_2_25",hidden:true}, {field:"OPER_INFO_3_25", title:"OPER_INFO_3_25", hidden:true}
			// ,{field:"OPER_INFO_1_26",title:"OPER_INFO_1_26",hidden:true}, {field:"OPER_INFO_2_26", title:"OPER_INFO_2_26",hidden:true}, {field:"OPER_INFO_3_26", title:"OPER_INFO_3_26", hidden:true}
			// ,{field:"OPER_INFO_1_27",title:"OPER_INFO_1_27",hidden:true}, {field:"OPER_INFO_2_27", title:"OPER_INFO_2_27",hidden:true}, {field:"OPER_INFO_3_27", title:"OPER_INFO_3_27", hidden:true}
			// ,{field:"OPER_INFO_1_28",title:"OPER_INFO_1_28",hidden:true}, {field:"OPER_INFO_2_28", title:"OPER_INFO_2_28",hidden:true}, {field:"OPER_INFO_3_28", title:"OPER_INFO_3_28", hidden:true}
			// ,{field:"OPER_INFO_1_29",title:"OPER_INFO_1_29",hidden:true}, {field:"OPER_INFO_2_29", title:"OPER_INFO_2_29",hidden:true}, {field:"OPER_INFO_3_29", title:"OPER_INFO_3_29", hidden:true}
			// ,{field:"OPER_INFO_1_30",title:"OPER_INFO_1_30",hidden:true}, {field:"OPER_INFO_2_30", title:"OPER_INFO_2_30",hidden:true}, {field:"OPER_INFO_3_30", title:"OPER_INFO_3_30", hidden:true}
			// ,{field:"OPER_INFO_1_31",title:"OPER_INFO_1_31",hidden:true}, {field:"OPER_INFO_2_31", title:"OPER_INFO_2_31",hidden:true}, {field:"OPER_INFO_3_31", title:"OPER_INFO_3_31", hidden:true}
			// ,{field:"OPER_INFO_1_32",title:"OPER_INFO_1_32",hidden:true}, {field:"OPER_INFO_2_32", title:"OPER_INFO_2_32",hidden:true}, {field:"OPER_INFO_3_32", title:"OPER_INFO_3_32", hidden:true}
			// ,{field:"OPER_INFO_1_33",title:"OPER_INFO_1_33",hidden:true}, {field:"OPER_INFO_2_33", title:"OPER_INFO_2_33",hidden:true}, {field:"OPER_INFO_3_33", title:"OPER_INFO_3_33", hidden:true}
			// ,{field:"OPER_INFO_1_34",title:"OPER_INFO_1_34",hidden:true}, {field:"OPER_INFO_2_34", title:"OPER_INFO_2_34",hidden:true}, {field:"OPER_INFO_3_34", title:"OPER_INFO_3_34", hidden:true}
			// ,{field:"OPER_INFO_1_35",title:"OPER_INFO_1_35",hidden:true}, {field:"OPER_INFO_2_35", title:"OPER_INFO_2_35",hidden:true}, {field:"OPER_INFO_3_35", title:"OPER_INFO_3_35", hidden:true}
			// ,{field:"OPER_INFO_1_36",title:"OPER_INFO_1_36",hidden:true}, {field:"OPER_INFO_2_36", title:"OPER_INFO_2_36",hidden:true}, {field:"OPER_INFO_3_36", title:"OPER_INFO_3_36", hidden:true}
			// ,{field:"OPER_INFO_1_37",title:"OPER_INFO_1_37",hidden:true}, {field:"OPER_INFO_2_37", title:"OPER_INFO_2_37",hidden:true}, {field:"OPER_INFO_3_37", title:"OPER_INFO_3_37", hidden:true}
			// ,{field:"OPER_INFO_1_38",title:"OPER_INFO_1_38",hidden:true}, {field:"OPER_INFO_2_38", title:"OPER_INFO_2_38",hidden:true}, {field:"OPER_INFO_3_38", title:"OPER_INFO_3_38", hidden:true}
			// ,{field:"OPER_INFO_1_39",title:"OPER_INFO_1_39",hidden:true}, {field:"OPER_INFO_2_39", title:"OPER_INFO_2_39",hidden:true}, {field:"OPER_INFO_3_39", title:"OPER_INFO_3_39", hidden:true}
			// ,{field:"empty_1_0" ,title:"empty_1_0" ,hidden:true}, {field:"empty_2_0" , title:"empty_2_0" ,hidden:true}, {field:"empty_3_0" , title:"empty_3_0" ,hidden:true}
			// ,{field:"empty_1_1" ,title:"empty_1_1" ,hidden:true}, {field:"empty_2_1" , title:"empty_2_1" ,hidden:true}, {field:"empty_3_1" , title:"empty_3_1" ,hidden:true}
			// ,{field:"empty_1_2" ,title:"empty_1_2" ,hidden:true}, {field:"empty_2_2" , title:"empty_2_2" ,hidden:true}, {field:"empty_3_2" , title:"empty_3_2" ,hidden:true}
			// ,{field:"empty_1_3" ,title:"empty_1_3" ,hidden:true}, {field:"empty_2_3" , title:"empty_2_3" ,hidden:true}, {field:"empty_3_3" , title:"empty_3_3" ,hidden:true}
			// ,{field:"empty_1_4" ,title:"empty_1_4" ,hidden:true}, {field:"empty_2_4" , title:"empty_2_4" ,hidden:true}, {field:"empty_3_4" , title:"empty_3_4" ,hidden:true}
			// ,{field:"empty_1_5" ,title:"empty_1_5" ,hidden:true}, {field:"empty_2_5" , title:"empty_2_5" ,hidden:true}, {field:"empty_3_5" , title:"empty_3_5" ,hidden:true}
			// ,{field:"empty_1_6" ,title:"empty_1_6" ,hidden:true}, {field:"empty_2_6" , title:"empty_2_6" ,hidden:true}, {field:"empty_3_6" , title:"empty_3_6" ,hidden:true}
			// ,{field:"empty_1_7" ,title:"empty_1_7" ,hidden:true}, {field:"empty_2_7" , title:"empty_2_7" ,hidden:true}, {field:"empty_3_7" , title:"empty_3_7" ,hidden:true}
			// ,{field:"empty_1_8" ,title:"empty_1_8" ,hidden:true}, {field:"empty_2_8" , title:"empty_2_8" ,hidden:true}, {field:"empty_3_8" , title:"empty_3_8" ,hidden:true}
			// ,{field:"empty_1_9" ,title:"empty_1_9" ,hidden:true}, {field:"empty_2_9" , title:"empty_2_9" ,hidden:true}, {field:"empty_3_9" , title:"empty_3_9" ,hidden:true}
			// ,{field:"empty_1_10",title:"empty_1_10",hidden:true}, {field:"empty_2_10", title:"empty_2_10",hidden:true}, {field:"empty_3_10", title:"empty_3_10",hidden:true}
			// ,{field:"empty_1_11",title:"empty_1_11",hidden:true}, {field:"empty_2_11", title:"empty_2_11",hidden:true}, {field:"empty_3_11", title:"empty_3_11",hidden:true}
			// ,{field:"empty_1_12",title:"empty_1_12",hidden:true}, {field:"empty_2_12", title:"empty_2_12",hidden:true}, {field:"empty_3_12", title:"empty_3_12",hidden:true}
			// ,{field:"empty_1_13",title:"empty_1_13",hidden:true}, {field:"empty_2_13", title:"empty_2_13",hidden:true}, {field:"empty_3_13", title:"empty_3_13",hidden:true}
			// ,{field:"empty_1_14",title:"empty_1_14",hidden:true}, {field:"empty_2_14", title:"empty_2_14",hidden:true}, {field:"empty_3_14", title:"empty_3_14",hidden:true}
			// ,{field:"empty_1_15",title:"empty_1_15",hidden:true}, {field:"empty_2_15", title:"empty_2_15",hidden:true}, {field:"empty_3_15", title:"empty_3_15",hidden:true}
			// ,{field:"empty_1_16",title:"empty_1_16",hidden:true}, {field:"empty_2_16", title:"empty_2_16",hidden:true}, {field:"empty_3_16", title:"empty_3_16",hidden:true}
			// ,{field:"empty_1_17",title:"empty_1_17",hidden:true}, {field:"empty_2_17", title:"empty_2_17",hidden:true}, {field:"empty_3_17", title:"empty_3_17",hidden:true}
			// ,{field:"empty_1_18",title:"empty_1_18",hidden:true}, {field:"empty_2_18", title:"empty_2_18",hidden:true}, {field:"empty_3_18", title:"empty_3_18",hidden:true}
			// ,{field:"empty_1_19",title:"empty_1_19",hidden:true}, {field:"empty_2_19", title:"empty_2_19",hidden:true}, {field:"empty_3_19", title:"empty_3_19",hidden:true}
			// ,{field:"empty_1_20",title:"empty_1_20",hidden:true}, {field:"empty_2_20", title:"empty_2_20",hidden:true}, {field:"empty_3_20", title:"empty_3_20",hidden:true}
			// ,{field:"empty_1_21",title:"empty_1_21",hidden:true}, {field:"empty_2_21", title:"empty_2_21",hidden:true}, {field:"empty_3_21", title:"empty_3_21",hidden:true}
			// ,{field:"empty_1_22",title:"empty_1_22",hidden:true}, {field:"empty_2_22", title:"empty_2_22",hidden:true}, {field:"empty_3_22", title:"empty_3_22",hidden:true}
			// ,{field:"empty_1_23",title:"empty_1_23",hidden:true}, {field:"empty_2_23", title:"empty_2_23",hidden:true}, {field:"empty_3_23", title:"empty_3_23",hidden:true}
			// ,{field:"empty_1_24",title:"empty_1_24",hidden:true}, {field:"empty_2_24", title:"empty_2_24",hidden:true}, {field:"empty_3_24", title:"empty_3_24",hidden:true}
			// ,{field:"empty_1_25",title:"empty_1_25",hidden:true}, {field:"empty_2_25", title:"empty_2_25",hidden:true}, {field:"empty_3_25", title:"empty_3_25",hidden:true}
			// ,{field:"empty_1_26",title:"empty_1_26",hidden:true}, {field:"empty_2_26", title:"empty_2_26",hidden:true}, {field:"empty_3_26", title:"empty_3_26",hidden:true}
			// ,{field:"empty_1_27",title:"empty_1_27",hidden:true}, {field:"empty_2_27", title:"empty_2_27",hidden:true}, {field:"empty_3_27", title:"empty_3_27",hidden:true}
			// ,{field:"empty_1_28",title:"empty_1_28",hidden:true}, {field:"empty_2_28", title:"empty_2_28",hidden:true}, {field:"empty_3_28", title:"empty_3_28",hidden:true}
			// ,{field:"empty_1_29",title:"empty_1_29",hidden:true}, {field:"empty_2_29", title:"empty_2_29",hidden:true}, {field:"empty_3_29", title:"empty_3_29",hidden:true}
			// ,{field:"empty_1_30",title:"empty_1_30",hidden:true}, {field:"empty_2_30", title:"empty_2_30",hidden:true}, {field:"empty_3_30", title:"empty_3_30",hidden:true}
			// ,{field:"empty_1_31",title:"empty_1_31",hidden:true}, {field:"empty_2_31", title:"empty_2_31",hidden:true}, {field:"empty_3_31", title:"empty_3_31",hidden:true}
			// ,{field:"empty_1_32",title:"empty_1_32",hidden:true}, {field:"empty_2_32", title:"empty_2_32",hidden:true}, {field:"empty_3_32", title:"empty_3_32",hidden:true}
			// ,{field:"empty_1_33",title:"empty_1_33",hidden:true}, {field:"empty_2_33", title:"empty_2_33",hidden:true}, {field:"empty_3_33", title:"empty_3_33",hidden:true}
			// ,{field:"empty_1_34",title:"empty_1_34",hidden:true}, {field:"empty_2_34", title:"empty_2_34",hidden:true}, {field:"empty_3_34", title:"empty_3_34",hidden:true}
			// ,{field:"empty_1_35",title:"empty_1_35",hidden:true}, {field:"empty_2_35", title:"empty_2_35",hidden:true}, {field:"empty_3_35", title:"empty_3_35",hidden:true}
			// ,{field:"empty_1_36",title:"empty_1_36",hidden:true}, {field:"empty_2_36", title:"empty_2_36",hidden:true}, {field:"empty_3_36", title:"empty_3_36",hidden:true}
			// ,{field:"empty_1_37",title:"empty_1_37",hidden:true}, {field:"empty_2_37", title:"empty_2_37",hidden:true}, {field:"empty_3_37", title:"empty_3_37",hidden:true}
			// ,{field:"empty_1_38",title:"empty_1_38",hidden:true}, {field:"empty_2_38", title:"empty_2_38",hidden:true}, {field:"empty_3_38", title:"empty_3_38",hidden:true}
			// ,{field:"empty_1_39",title:"empty_1_39",hidden:true}, {field:"empty_2_39", title:"empty_2_39",hidden:true}, {field:"empty_3_39", title:"empty_3_39",hidden:true}
		]],
		// loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			// },
			// //event 정의
			// onLoadSuccess: function(data){
			// 	// dlt_OPER_ALLOC_PL_ROUT_INFO = data;

			// 	//파라미터 주려 했으나 uf라 내부에서 옵션 설정함
			// 	// $.uf_ajax('/AL/AL0202G1R0_CNT', 'post');
			// 	// $.uf_ajax();
			// 	// $.uf_setgridview();
			// 	$.jf_setfocus($('#dg1'), -1);
			// 	$.jf_setfooter($('#dg1'));
			// },
			// onBeforeLoad: function(param){
			// },
			// onClickRow: function(index,row){},
			// onDblClickRow: function(index,row){
			// 	if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
			// 		$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			// 		$.jf_beginedit($('#dg1'), index);
			// 	}
			// },
			// onBeforeSelect: function(index,row){
			// 	return $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g');
			// },
			// onSelect: function(index,row){
			// 	$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			// },
			// onBeforeEdit: function(index,row){},
			// onBeginEdit: function(index,row){},
			// onEndEdit: function(index,row,changes){

			// },
			// onAfterEdit: function(index,row,changes){},
			// onCancelEdit:function(index,row){}
	});

});