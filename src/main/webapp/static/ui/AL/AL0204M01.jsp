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
	<script type="text/javascript" src="/static/js/common/scrollview_comm.js"></script>
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
		let v_f_date = $('#sch_fdd').datebox('getValue').replace(/-/g, '');
		if(a_obj.attr('id') == 'dg1'){
			rtn_params = {ALLOC_ID: a_row.ALLOC_ID, ALLOC_NO: a_row.ALLOC_NO, OPER_DT: v_f_date}
		}
		return rtn_params;
	}
	
	//시간 유효성 체크
	$.uf_timeValid = function(a_value, a_param){
		if(a_value.toString().length != 8) return false;
		let v_timeSplit = a_value.split(':');
		if(v_timeSplit.length != 3) return false;
		else{
			if(typeof(parseInt(v_timeSplit[0])) == 'undefined' || typeof(parseInt(v_timeSplit[1])) == 'undefined'
					|| typeof(parseInt(v_timeSplit[2])) == 'undefined') return false;
			if(parseInt(v_timeSplit[0]) < 0 || 23 < parseInt(v_timeSplit[0])) return false;
			if(parseInt(v_timeSplit[1]) < 0 || 59 < parseInt(v_timeSplit[1])) return false;
			if(parseInt(v_timeSplit[2]) < 0 || 59 < parseInt(v_timeSplit[2])) return false;
		}
		
		let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		let v_stTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ARRV_TM'});
		let v_curStTime = $.jf_converttime($(v_stTimeEditor.target).textbox('getText'));
		let v_edTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'DPRT_TM'});
		let v_curEdTime = $.jf_converttime($(v_edTimeEditor.target).textbox('getText'));
		if(a_param == 'ARRV_TM'){
			if(v_convertValue > v_curEdTime) return false;
		}
		if(a_param == 'DPRT_TM'){
			if(v_convertValue < v_curStTime) return false;
		}
		return true;
	}
	
	//시간 범위 유효성 체크
	$.uf_timeRangeValid = function(a_value, a_param) {
		//실시간 편집중인 값 가져오기 위함
		//let v_allocNoEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ALLOC_NO'});
		//let v_allocNo = $(v_allocNoEditor.target).textbox('getText');
		let v_allocNo = $('#dg1').datagrid('getSelected').ALLOC_NO;
		let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		
		let v_stTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ARRV_TM'});
		let v_curStTime = $.jf_converttime($(v_stTimeEditor.target).textbox('getText'));
		let v_edTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'DPRT_TM'});
		let v_curEdTime = $.jf_converttime($(v_edTimeEditor.target).textbox('getText'));		
		
		if (a_param === 'ARRV_TM' && $.jf_isempty(v_curEdTime)) {
			v_curEdTime = v_convertValue;
		}
		else if (a_param === 'DPRT_TM' && $.jf_isempty(v_curStTime)) {
			v_curStTime = v_convertValue;
		}
	
		let v_data = $.jf_getdata($('#dg1'));
		for(var i=0; i<v_data.length; i++) {
			if($.jf_curdgindex($('#dg1')) == i) continue;
			if(v_data[i]['ALLOC_NO'].toString() === v_allocNo.toString()) {
				if($.jf_converttime(v_data[i]['ARRV_TM']) < v_convertValue && v_convertValue < $.jf_converttime(v_data[i]['DPRT_TM'])) return false;
				if(a_param == 'ARRV_TM'){
					if(v_convertValue < $.jf_converttime(v_data[i]['ARRV_TM']) && $.jf_converttime(v_data[i]['ARRV_TM']) < v_curEdTime) return false;
				}
				else if(a_param == 'DPRT_TM'){
					if(v_curStTime < $.jf_converttime(v_data[i]['DPRT_TM']) && $.jf_converttime(v_data[i]['DPRT_TM']) < v_convertValue) return false;
				}
			}
		}
		return true;
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
				<div data-options="region:'west', border:false, minWidth:490, maxWidth:490">
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
							<!-- <div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div> -->
							<div id="subsch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<!-- <script src="/static/js/AL0203_sch_selectbox0.js"></script> -->
							<script src="/static/js/AL/AL0202/AL0202_subsch_searchbox0.js"></script>
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