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
	<script type="text/javascript" src="/static/jquery/jquery.fileDownload-1.4.5.js"></script> 
	<script type="text/javascript">
		$( document ).ready(function() {
			
			
    });
   
    $.pf_append = function(){return true;}
		$.pf_delete = function(){return true;}
    $.pf_deleteafter = function(a_obj){
		if($.jf_datalength($('#dg0')) == 0) $.jf_protectform($('#dg0'), $('#ef0'), true, 0);
    	return true;
    }
    
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
		if(a_obj.attr('id') == "dg0") rtn_params = {ROUT_ID:$.jf_seqdgdata('/si/SI0401G0K0', 'post'), USE_YN:'Y'}
    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
				$.jf_savedgdata($('#dg0'), '/si/SI0401G0S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(typeof(a_type) == 'number'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_savedgdata($('#dg1'), '/si/SI0401G1S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);				
		}
		if(a_type == 'search'){
			if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
				$.jf_savedgdata($('#dg0'), '/si/SI0401G0S0', 'post', null);
				$.jf_savedgdata($('#dg0'), '/si/SI0401G1S0', 'post', null);
				$.jf_retrieve($('#dg0'));
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		return true;
	}
		
	$.pf_rejectcfmsg = function(a_type){
		if(typeof(a_type) == 'number'){
			$.jf_resetdg($('#dg1'));
			$.jf_setfocus($('#dg0'), a_type);
		}
		if(a_type == 'save'){
			$.jf_resetdg($('#dg0'), 'all');
		}
		if(a_type == 'search'){
			$.jf_resetdg($('#dg0'), 'all');
			$.jf_retrieve($('#dg0'));
		}
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){
			if(a_type == 'search') $.jf_retrieve($('#dg0'));
			return true;
   };		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		if(a_obj.attr('id') == 'dg1') rtn_params = {ROUT_ID: a_row.ROUT_ID}
		return rtn_params;
	}
	
	//리턴 변수명이 다른 변수 맞추기 위함
	$.pf_mdclose = function(a_values, a_rtnobj){
		if(a_rtnobj == 'ST_STTN_NM'){
			a_values['ST_STTN_ID'] = a_values.STTN_ID
			a_values['ST_STTN_NM'] = a_values.STTN_NM
		}
		else if(a_rtnobj == 'ED_STTN_NM'){
			a_values['ED_STTN_ID'] = a_values.STTN_ID
			a_values['ED_STTN_NM'] = a_values.STTN_NM
		}
		else if(a_rtnobj == 'RET_STTN_NM'){
			a_values['RET_STTN_ID'] = a_values.STTN_ID
			a_values['RET_STTN_NM'] = a_values.STTN_NM
		}
		
		return a_values
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
					<!-- 검색 object -->
					<!-- <script src="/static/js/SI0501_sch_selectbox0.js"></script> -->
					<!--검색 selectbox 가져와야함-->
					<script src="/static/js/SI/SI0401/SI0401_sch_searchbox0.js"></script>

				</div>
				</form>
				<div data-options="region:'center', border:false">
					<div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 버튼 object -->
					<script src="/static/js/SI/SI0401/SI0401_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:1520, maxWidth:1520">
					<div class="easyui-layout" data-options="fit:true">
						<form id="ef0" class="tracom-form" method="post">
							<div data-options="region:'north', border:false, minHeight:230, maxHeight:230">
								<div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
								</div>
								<!--edit form object -->
								<script src="/static/js/SI/SI0401/SI0401_editform0.js"></script>
							</div>
						</form>
						<div data-options="region:'center', border:false">
							<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>			
							<!--datagrid0 -->
							<script src="/static/js/SI/SI0401/SI0401_dg0.js"></script>
						</div>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							<div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<!--sub button -->
							<script src="/static/js/SI/SI0401/SI0401_subbtn0.js"></script>
						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--datagrid1 -->
							<script src="/static/js/SI/SI0401/SI0401_dg1.js"></script>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="selbustop">
    <script src="/static/js/common/modal_selbustop.js"></script>
</div>
<div id="selcomp">
	<script src="/static/js/common/modal_selcomp.js"></script>
</div>
</body>
</html>