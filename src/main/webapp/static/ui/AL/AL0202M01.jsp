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
	var dlt_OPER_ALLOC_PL_ROUT_INFO = null;
	var dlt_OPER_ALLOC_PL_ROUT_CNT = null;
	var dlt_VIEW_OPER_PL_ROUT_INFO = [];

	var js_allocId = null;
	var js_dayDiv = null;
	var js_wayDiv = null;


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
    	if(a_obj.attr('id') == "dg0"){
    		rtn_params = {CONTENT : $("#sch_sb0").searchbox('getValue'), TYPE : 'ALL'};  
    	}
    	return rtn_params;
    };
    
	//추가 파라미터
    $.pf_defaultparams = function(a_obj){
		let rtn_params;
		if(a_obj.attr('id') == "dg0") rtn_params = {ALLOC_ID:$.jf_seqdgdata('/AL/AL0202G0K0', 'post')}
		if(a_obj.attr('id') == "dg1") {
			let v_row = $.jf_curdgrow($('#dg0'));
			rtn_params = {
			ALLOC_ID: v_row.ALLOC_ID, DAY_DIV: v_row.DAY_DIV, WAY_DIV: v_row.WAY_DIV, OPER_SN:$.jf_seqdgdata('/AL/AL0202G1K0', 'post'),
			DAY_DIV_NM : v_row.DAY_DIV_NM, WAY_DIV_NM: v_row.WAY_DIV_NM, ROUT_ID: v_row.ROUT_ID}
		}
		

    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
				$.jf_savedgdata($('#dg0'), '/AL/AL0202G0S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(typeof(a_type) == 'number'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
				$.jf_savedgdata($('#dg1'), '/al/AL0202G1S0', 'post', null)	//그리드 순서에 따른 전체 저장 부분 갱신 필요
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
		if(typeof(a_type) == 'number'){
			$.jf_resetdg($('#dg1'));
			$.jf_setfocus($('#dg0'), a_type);
		}
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){
		//저장 ajax 동작후 call back 함수
		if(a_type == 'search') $.jf_retrieve($('#dg0'));
		return true;
	}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		if(a_obj.attr('id') == 'dg1') {
			// rtn_params = {ALLOC_ID: a_row.ALLOC_ID, DAY_DIV: a_row.DAY_DIV, WAY_DIV: a_row.WAY_DIV}
			// let wayDiv = $('#DAY_DIV').combobox('getData');
			rtn_params = {ALLOC_ID: a_row.ALLOC_ID, DAY_DIV: a_row.DAY_DIV} //상하행 조건 제외하는걸로 변경
			js_allocId = a_row.ALLOC_ID;
			js_dayDiv = a_row.DAY_DIV;
			// js_wayDiv = a_row.WAY_DIV; //상하행 조건 제외하는걸로 변경
		}
		return rtn_params;
	}
	
	//시간 겹치는 체크
	$.uf_timecheck = function() {
		let v_allocNo = $.jf_curdgfieldvalue($('#dg1'), 'ALLOC_NO');
		let v_data = $.jf_getdata($('#dg1'));
		for(var i=0; i<v_data.length; i++) {
			
		}
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
					<script src="/static/js/AL/AL0202/AL0202_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">	
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:700, maxWidth:700">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'center', border:false">
							<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<script src="/static/js/AL/AL0202/AL0202_dg0.js"></script>
						</div>			
						<!--datagrid0 -->
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:33, minHeight:33">
							<div class="easyui-layout" data-options="fit:true">
								<div data-options="region:'west', border:false, minWidth:220, maxWidth:220">
									<div id="subsch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0202/AL0202_subsch_searchbox0.js"></script>
								</div>

								<div data-options="region:'center', border:false">
									<div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<!--sub button -->
									<script src="/static/js/AL/AL0202/AL0202_subbtn0.js"></script>
								</div>
							</div>

						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--datagrid1 -->
							<script src="/static/js/AL/AL0202/AL0202_dg1.js"></script>
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