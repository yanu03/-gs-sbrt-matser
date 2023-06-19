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
	<script src="/static/js/common/map_comm.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=100faa0e8b0c72a3da69169f45883b0b"></script>
	<script type="text/javascript">
		$( document ).ready(function() { });
    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;}
    $.pf_childretrieve = function(){return true;}
    $.pf_setfooter = function(a_obj){return true;}
	
    $.pf_combineparams = function(a_obj){
    	let rtn_params;
    	if(a_obj.attr('id') == "dg0"){
    		rtn_params = {CONTENT : $("#sch_sb0").searchbox('getValue'), TYPE : 'ALL'};  
    	}
    	return rtn_params;
    };
    
    $.pf_defaultparams = function(a_obj){
		let rtn_params;
		if(a_obj.attr('id') == "dg0") rtn_params = {STTN_ID:$.jf_seqdgdata('/si/SI0501G0K0', 'post')}
    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
				$.jf_savedgdata($('#ef0'), '/si/SI0501G0S0', 'post', null)
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
		if(a_obj.attr('id') == 'dg1') rtn_params = {STTN_ID : a_row.STTN_ID}
		return rtn_params;
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
					<script src="/static/js/SI/SI0501/SI0501_sch_searchbox0.js"></script>

				</div>
				</form>
				<div data-options="region:'center', border:false">
					<div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 버튼 object -->
					<script src="/static/js/SI/SI0501/SI0501_btn0.js"></script>
				
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:1300, maxWidth:1300">
					<div class="easyui-layout" data-options="fit:true">
						<form id="ef0" method="post">
							<div data-options="region:'north', border:false, minHeight:200, maxHeight:200">
								<div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
								</div>
								<!--edit form object -->
								<script src="/static/js/SI/SI0501/SI0501_editform0.js"></script>
							</div>
						</form>
						<div data-options="region:'center', border:false">
							<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>			
							<!--datagrid0 -->
							<script src="/static/js/SI/SI0501/SI0501_dg0.js"></script>
						</div>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div id="tab_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!--tabs -->
					<script src="/static/js/SI/SI0501/SI0501_tabs0.js"></script>
					<!--datagrid1 -->
					<script src="/static/js/SI/SI0501/SI0501_dg1.js"></script>
					<!--map -->
					<script src="/static/js/SI/SI0501/SI0501_map0.js"></script>
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