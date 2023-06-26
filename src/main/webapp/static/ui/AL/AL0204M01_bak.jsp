<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Single Grid</title>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/material/easyui.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/demo/demo.css">
	 <link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/color.css">
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.min.js"></script>
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.easyui.min.js"></script>
	<script src="/static/js/common/sample_comm.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=100faa0e8b0c72a3da69169f45883b0b"></script>
	<script type="text/javascript">
		$( document ).ready(function() {
    });
	var dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO = null;
	var dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED = [];
	var dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CNT = null;
	var dlt_VIEW_OPER_PL_NODE_INFO = [];

    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;}
    $.pf_childretrieve = function(a_obj, a_params){return true;}
    $.pf_setfooter = function(a_obj){return true;}
		
	//검색조건 파라미터
    $.pf_combineparams = function(a_obj){
    	let rtn_params;
		let v_f_date = $('#sch_fdd').datebox('getValue').replace(/-/g, '');
    	if(a_obj.attr('id') == "dg0"){
    		rtn_params = {CONTENT : $("#sch_sb0").searchbox('getValue'), TYPE : 'ALL',
							OPER_DT : v_f_date};  
    	}
    	return rtn_params;
    };
    
	//추가 파라미터
    $.pf_defaultparams = function(a_obj){
		let rtn_params;
		//if(a_obj.attr('id') == "dg0") rtn_params = {ROUT_ID:$.jf_seqdgdata('/si/SI0402G0K0', 'post')}
    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
				$.jf_savedgdata($('#ef0'), '/al/AL0204G1S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(a_type == 'subsave'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_savedgdata($('#ef0'), '/al/AL0204G1S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);				
		}
		return true;
	}
		
	$.pf_rejectcfmsg = function(a_type){
		if(a_type == 'save'){
			$.jf_resetdg($('#dg0'), 'all');
		}
		if(a_type == 'subsave1'){
			$.jf_resetdg($('#dg1'));
		}
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){
		//저장 ajax 동작후 call back 함수
		return true;
	}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		return rtn_params;
	}

	//백그라운드용 ajax
	$.uf_bgajax = function() {
		$.ajax({
			type: 'post',
			url: '/al/AL0204G1R0',
			data: JSON.stringify({dma_search : {ALLOC_ID :  $('#dg0').datagrid('getSelected').ALLOC_ID, 
								OPER_DT : $('#sch_fdd').datebox('getValue')}}),
			dataType: 'json',
			async: false,
			contentType: 'application/json; charset=utf-8',
			success: function(data){
				if(typeof(data['rows']) != "undefined"){
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO = data['rows']
					$.uf_ajax();
				}else{
					let msgtext = data['rsMsg']['message'];
					top.$.messager.alert('sever massage',msgtext);
				}
			},
			error: function(error){
				error.apply(this, arguments);
				rtn_value = false;
			}
		});
	}

	//ajax 순서(그리드ajax -> 카운트ajax)때문에 사용하였으나 추후 변경할 수 있음
	$.uf_ajax = function() {
		var test = $('#sch_fdd').datebox('getValue');
		$.ajax({
			type: 'post',
			url: '/al/AL0204G1R0_CNT',
			data: JSON.stringify({dma_search : {ALLOC_ID :  $('#dg0').datagrid('getSelected').ALLOC_ID, 
								OPER_DT : $('#sch_fdd').datebox('getValue')}}),
			dataType: 'json',
			async: false,
			contentType: 'application/json; charset=utf-8',
			success: function(data){
				if(typeof(data['rows']) != "undefined"){
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CNT = data['rows']
					$.uf_setgridview();
				}else{
					let msgtext = data['rsMsg']['message'];
					top.$.messager.alert('sever massage',msgtext);
				}
			},
			error: function(error){
				error.apply(this, arguments);
				rtn_value = false;
			}
		});
	}

	//업데이트 전용 ajax, 그리드 change된 값을 보내지 않고 전용변수를 파라미터로 보냅니다.
	$.uf_bgudajax = function() {
		$.ajax({
			type: 'post',
			url: '/al/AL0204G1S0',
			// data: JSON.stringify({dma_search : {ALLOC_ID :  $('#dg0').datagrid('getSelected').ALLOC_ID}}),
			data: JSON.stringify({'rows' : dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED}),
			dataType: 'json',
			async: false,
			contentType: 'application/json; charset=utf-8',
			success: function(data){
				$.messager.show({
					title:'정보',
					msg:data['rsMsg']['message'],
					timeout:1500,
					showType:'slide'
				});
			},
			error: function(error){
				error.apply(this, arguments);
				rtn_value = false;
			}
		});
	}

	$.uf_setgridview = function(){
		var v_gridHeader ="", v_gridHeader2 ="";
		var v_rowDatas = dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO;
		// if(v_rowDatas.length == 0) return false;
		var v_rowCntArrs = dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CNT;
		var v_maxCnt = 0;

		dlt_VIEW_OPER_PL_NODE_INFO = [];

		for(var i = 0; i < v_rowCntArrs.length; i++) {
			if(v_maxCnt < v_rowCntArrs[i].CNT)	v_maxCnt = v_rowCntArrs[i].CNT;
		}
		if(v_maxCnt == 0){maxCnt=30;}
		
		var v_frozenv_gridHeader = '[';
		// v_frozenv_gridHeader += '{"field": "chk", "halign":"center", "checkbox":true, "align":"center","width":70 , "title":""},';
		v_frozenv_gridHeader += '{"field": "OPER_SN", "halign":"center", "align":"center","width":70 , "title":"운행순번" }';
		v_frozenv_gridHeader += ']';

		v_gridHeader += '[';
		v_gridHeader2 += '[';
		for (var i = 0; i < v_maxCnt; i++) {
			let nodeNm = v_rowDatas[i]["NODE_NM"];
			v_gridHeader += '{"field":' + '"NODE_NM_' + i + '", "width":180, "halign":"center"'  + ',' + '"title":"'+ nodeNm + '", "colspan":2}';
			v_gridHeader += ','
			
			// let nodeType = v_rowDatas[i]["NODE_TYPE"];
			// //미완성, 정류소/교차로 background 색 넣어야함
			// if(nodeType == "NT001") { // background-color:#d1e5ff
			// 	v_gridHeader += '{"field":' + '"NT001_' + i + '", "width":180, "halign":"center"'  + ',' + '"title":"'+ nodeNm + '", "colspan":2}';
			// 	v_gridHeader += ','
			// }
			// else if(nodeType == "NT002") { //background-color:#ffdbdb
			// 	v_gridHeader += '{"field":' + '"NT002_' + i + '", "width":180, "halign":"center"'  + ',' + '"title":"'+ nodeNm + '", "colspan":2}';
			// 	v_gridHeader += ','
			// }
		}

		for (var i = 0; i < v_maxCnt; i++) {
			v_gridHeader2 += '{"field":"ARRV_TM_' + i + '", "width":110, "halign":"center", "align":"center", "title":"도착시간" , "editor":{"type":"textbox"}}';
			v_gridHeader2 += ',';
			v_gridHeader2 += '{"field":"DPRT_TM_' + i + '", "width":110, "halign":"center", "align":"center", "title":"출발시간" , "editor":{"type":"textbox"}}';
			v_gridHeader2 += ',';
		}

		var v_rowIndex = 0;
		var v_rowCnt = 0;
		
		for (var i = 0; i < v_rowCntArrs.length; i++) {
			var j = 0;

			v_rowIndex += v_rowCnt;
			v_rowCnt = v_rowCntArrs[i].CNT;
			let columnVal = v_rowDatas[v_rowIndex+j]["OPER_SN"];
			if($.jf_isempty(columnVal)) break;

			var v_newObj = {};
			var idx = dlt_VIEW_OPER_PL_NODE_INFO.push(v_newObj)-1;
			dlt_VIEW_OPER_PL_NODE_INFO[idx]["OPER_SN"] = columnVal;

			for (var j = 0; j < v_rowCnt; j++) {
				let v_nodeStTm = v_rowDatas[v_rowIndex+j]["DPRT_TM"];
				let v_nodeEdTm = v_rowDatas[v_rowIndex+j]["ARRV_TM"];
				let v_nodeSn = v_rowDatas[v_rowIndex+j]["NODE_SN"];

				dlt_VIEW_OPER_PL_NODE_INFO[idx]["ARRV_TM_"+j] = v_nodeEdTm;
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["DPRT_TM_"+j] = v_nodeStTm;
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["NODE_SN_"+j] = v_nodeSn;
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["ROUT_ID"] = v_rowDatas[v_rowIndex]["ROUT_ID"];
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["DAY_DIV"] = v_rowDatas[v_rowIndex]["DAY_DIV"];
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["NODE_ID"] = v_rowDatas[v_rowIndex]["NODE_ID"];
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["NODE_ID"] = $('#dg0').datagrid('getSelected').ALLOC_ID;
				dlt_VIEW_OPER_PL_NODE_INFO[idx]["ALLOC_NO"] = v_rowDatas[v_rowIndex]["ALLOC_NO"];
			}
		}
		let v_findRestIndex = v_gridHeader.lastIndexOf(',');
		if(v_findRestIndex !== -1) v_gridHeader = v_gridHeader.slice(0, v_findRestIndex) + ']' + v_gridHeader.slice(v_findRestIndex + 1);
		else v_gridHeader += ']';
		let v_findRestIndex2 = v_gridHeader2.lastIndexOf(',');
		if(v_findRestIndex2 !== -1) v_gridHeader2 = v_gridHeader2.slice(0, v_findRestIndex2) + ']' + v_gridHeader2.slice(v_findRestIndex2 + 1);
		else v_gridHeader2 += ']';
		v_gridHeader = JSON.parse(v_gridHeader);
		v_gridHeader2 = JSON.parse(v_gridHeader2);
		v_frozenv_gridHeader = JSON.parse(v_frozenv_gridHeader);
		$('#dg1').datagrid({
			data: dlt_VIEW_OPER_PL_NODE_INFO,
			// idField: 'AL0203G1',
			scrollByColumn: true,
			fixedColumnWithHidden: true,
			useShiftKey: false,
			sortable: false,
			fixedColumn: 2,
			columns: [v_gridHeader, v_gridHeader2],
			frozenColumns : [v_frozenv_gridHeader],
			onLoadSuccess: function(data){
				$.jf_setfocus($('#dg1'), -1);
				$.jf_setfooter($('#dg1'));
			},
			onBeforeLoad: function(param){
				if(Object.keys(param).length < 1) return false;
				else return true;
			},
			onDblClickRow: function(index,row){
				if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
					$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1'))); //미완성, 너무 오래걸림
					$.jf_beginedit($('#dg1'), index);
				}
			},		
			onBeforeSelect: function(index,row){
				return $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g');	//onBeforeSelect --> onDblClickRow 또는 onSelect 중 1개가 동작함. 동시 동작 하지 않음.
			},
			onSelect: function(index,row){
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));	//grid edit일때 사용
			},
			onEndEdit: function(index, row, changes){
				if($.jf_isempty(changes)) return true;
				for(var i=0; i<Object.keys(changes).length; i++) {
					if(Object.values(changes)[i].length <=0) continue;
					var v_newObj = {};
					var idx = dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED.push(v_newObj)-1;
					let v_colViewIndex = Number(Object.keys(changes)[i].substring(Object.keys(changes)[i].lastIndexOf("_")+1));
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['NODE_SN'] = row['NODE_SN_'+v_colViewIndex];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['ARRV_TM'] = row['ARRV_TM_'+v_colViewIndex];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['DPRT_TM'] = row['DPRT_TM_'+v_colViewIndex];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['OPER_SN'] = row['OPER_SN'];
					// dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['DAY_DIV'] = row['DAY_DIV'];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['ROUT_ID'] = row['ROUT_ID'];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['ALLOC_ID'] = $('#dg0').datagrid('getSelected').ALLOC_ID;
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['ALLOC_NO'] = row['ALLOC_NO'];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['NODE_ID'] = row['NODE_ID'];
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['OPER_DT'] = $('#sch_fdd').datebox('getValue');
					dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED[idx]['rowStatus'] = 'U';

					// let v_node_sn = row['NODE_SN_'+v_colViewIndex];
					// let v_open_sn = row['OPER_SN'];
					// let v_arrv_tm = row['ARRV_TM_'+v_colViewIndex];
					// let v_DPRT_tm = row['DPRT_TM_'+v_colViewIndex];
				}
			}

		});
	}
    
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north', border:false, maxHeight:50, minHeight:50">
			<div class="easyui-layout" data-options="fit:true">
				<!--검색 조건 특히 name으로 동작하는 요소를 위해서 form을 검색 layout을 감사줌 -->
				<form style="border:0px solid red;">
				<div data-options="region:'west', border:false, minWidth:600, maxWidth:600">
					<div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<script src="/static/js/AL/AL0202/AL0202_sch_searchbox0.js"></script>
				</div>
				</form>
				<div data-options="region:'center', border:false">
					<div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 버튼 object -->
					<script src="/static/js/AL/AL0204/AL0204_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">	
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:385, maxWidth:385">
					<div class="easyui-layout" data-options="fit:true">
						<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
						</div>			
						<!--datagrid0 -->
						<script src="/static/js/AL/AL0203/AL0203_dg0.js"></script>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							<div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<!-- <script src="/static/js/AL0203_sch_selectbox0.js"></script> -->
							<script src="/static/js/AL/AL0204/AL0204_fromtodate0.js"></script>
						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--datagrid1 -->
							<!-- <script src="/static/js/AL0203_dg1_hidden.js"></script> -->
							<script src="/static/js/AL/AL0204/AL0204_dg1.js"></script>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="1"></div>
<div id="2"></div>
<div id="3"></div>
<div id="4"></div>
<div id="5"></div>
<div id="6"></div>

</body>
</html>