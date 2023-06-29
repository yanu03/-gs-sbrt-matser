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
	<script type="text/javascript">
		$( document ).ready(function() {
    });

	let v_jsonDatas = [];

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
    $.pf_defaultparams = function(a_obj){let rtn_params;return rtn_params;}
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_savedgdata($('#dg1'), '/al/AL0302G1S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(a_type == 'dr_reflect'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_savedgdata($('#dg1'), '/al/AL0305G0SEND', 'post', null)
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
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){return true;}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		let v_f_date = $('#sch_fdd').datebox('getValue');
		//let v_t_date = $('#sch_tdd').datebox('getValue');
		if(a_obj.attr('id') == 'dg1') rtn_params = {ALLOC_ID : a_row.ALLOC_ID, F_DATE :v_f_date}
		return rtn_params;
	}
	
	$.uf_timeRangeValid = function(a_value) {
		let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		
		let v_data = $.jf_getdata($('#dg1'));
		let sortedData = [...v_data].sort((a, b) => a.ROUT_ST_TM.localeCompare(b.ROUT_ST_TM));
		for(var i=0; i<sortedData.length-1; i++) {
			//if($.jf_curdgindex($('#dg1')) == i) continue;
			if($.jf_curdgfieldvalue($('#dg1'),'SN') == sortedData[i]['SN']) continue;
			//if(v_data[i]['ALLOC_NO'].toString() === v_allocNo.toString()) {
				if($.jf_converttime(sortedData[i].ROUT_ST_TM) <= v_convertValue && v_convertValue < $.jf_converttime(sortedData[i+1].ROUT_ST_TM)) return false;
			//}
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
					<script src="/static/js/AL/AL0305/AL0305_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">	
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:290, maxWidth:290">
					<div class="easyui-layout" data-options="fit:true">
						<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
						</div>			
						<!--datagrid0 -->
						<!-- <script src="/static/js/AL/AL0305/AL0305_dg0.js"></script> -->
						<script src="/static/js/AL/AL0203/AL0203_dg0.js"></script>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							<div class="easyui-layout" data-options="fit:true">
								<div data-options="region:'west', border:false, minWidth:300, maxWidth:300">
									<div id="subsch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0202/AL0202_subsch_searchbox0.js"></script>
								</div>
								<div data-options="region:'center', border:false">
									<div id="subsch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0305/AL0305_fromtodate0.js"></script>
								</div>
								<div data-options="region:'east', border:false, minWidth:300, maxWidth:300">
									<div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0305/AL0305_subbtn0.js"></script>
								</div>
							</div>
							
						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--datagrid1 -->
							<script src="/static/js/AL/AL0305/AL0305_dg1.js"></script>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="updatedg1">
    <script src="/static/js/AL/AL0302/AL0302_modal0.js"></script>
</div>
<div id="updatedg2">
    <script src="/static/js/AL/AL0302/AL0302_modal1.js"></script>
</div>
<div id="updatedg3">
    <script src="/static/js/AL/AL0302/AL0302_modal2.js"></script>
</div>

</body>
</html>