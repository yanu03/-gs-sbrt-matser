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
	 <link rel="stylesheet" type="text/css" href="/static/css/map.css">
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.min.js"></script>
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.easyui.min.js"></script>
	<script src="/static/js/common/sample_comm.js"></script>
	<script src="/static/js/common/map_comm.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=100faa0e8b0c72a3da69169f45883b0b"></script>
	<script src="/static/js/common/sockjs.min.js"></script>
    <script src="/static/js/common/stomp.min.js"></script>
	<!-- sockjs.min.js - stomp.min.js - sock_comm.js 순서 유지 -->
	<script src="/static/js/common/sock_comm.js"></script> 
	<script type="text/javascript">
	window.addEventListener("resize", test);
	
	function test() {
		js_map.relayout();
	}
	
	var js_sigList = [];
	
	$( document ).ready(function() {
			
			
    });

    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;}
    $.pf_childretrieve = function(a_obj, a_params){return true;}
    $.pf_setfooter = function(a_obj){return true;}
    $.pf_combineparams = function(a_obj){};    
    $.pf_defaultparams = function(a_obj){}
    $.pf_modalselect = function(a_obj){return true;}
	$.pf_acceptcfmsg = function(a_type){}
	$.pf_rejectcfmsg = function(a_type){}
	$.pf_ajaxafterproc = function(a_type){return true;}		
	$.pf_childparams = function(a_obj, a_row){}
	$.pf_bgajaxafterproc = function(a_data, a_type){
		if(a_type == 'bg0'){
			$.jf_movemap(a_data[0].GPS_X, a_data[0].GPS_Y);
			$.jf_deleteline();
			$.jf_drawline(a_data);
		}
		if(a_type == 'bg1'){
			$.jf_deletemarker();
			$.jf_deleteAllOverlay();
			for(var i=0; i<a_data.length; i++) {
				$.jf_addimgmarker(a_data[i]);
				$.jf_addoverlay(a_data[i]);			
			}
		}
		if(a_type == 'bg2'){
			for(var i=0; i<a_data.length; i++) {
				$.jf_addimgmarker(a_data[i]);
				$.jf_addoverlay(a_data[i]);			
			}
			for(var i=0; i<js_sigList.length; i++){
				$.jf_addsigmarker(js_sigList[i], a_data);
			}
						
			//marker.id = a_data.CRS_ID;
			
		}
		return true;
	}		

	//소켓 통신용 pf
	$.pf_sockdispatch = function(a_data) {
		/* let dsptchMessage = "";
		let dsptchDiv = a_data.DSPTCH_DIV;
		let dsptchKind = a_data.DSPTCH_KIND;
		let min = "0분";
		
		if(a_data['MESSAGE'].split('｜').length>0) dsptchMessage = a_data['MESSAGE'].split('｜')[0];
		else dsptchMessage = a_data['MESSAGE'];
		
		//디스패치가 일반메시지가 아닐경우
		if(parseInt(dsptchMessage) != "undefined" && a_data.DSPTCH_DIV != "DP001"){
			//if(dsptchMessage==0)return; //0인 경우 표시할 필요가 없음
			if(Math.abs(parseInt(dsptchMessage) >= 60)) {
				 min = Math.abs(parseInt(dsptchMessage/60)) + "분 ";
			}
			 sec = Math.abs(parseInt(dsptchMessage%60)) + "초 ";
			 
			//운행중 디스패치일 경우 
			 if(dsptchDiv == "DP002") {

					if(dsptchKind == "DK001") contsResult = mapOption.DISPATCH_MSG_NORMAL;
					else if(dsptchKind == "DK002") contsResult = min + sec + "느림";
					else if(dsptchKind == "DK003") contsResult = min + sec + "빠름";
				}
			//정차중 디스패치일 경우
			 else if(dsptchDiv == "DP003") contsResult = "정류장 정차 : " + min + sec;
		} */
		
		let contsResult = $.jf_convertdsptch(a_data);
		
		let v_params = {
			//직접 통신하여 현재 변수명이 다름. kafka 연결후 수정해야함.
			SEND_DATE : $.jf_gettime(),
			ROUT_NM : a_data.ROUT_NM,
			VHC_NO : a_data.VHC_NO,
			//VHC_NO : a_data.BUS_NO,
			DSPTCH_DIV_NM : a_data.DSPTCH_DIV_NM,
			// DSPTCH_CONTS : a_data.DSPTCH_CONTS,
			DSPTCH_CONTS : contsResult,
		};
		// $.jf_append($('#dg1'), v_params);
		//$.jf_insert($('#dg2'), v_params, 0);
		$('#dg2').datagrid('insertRow', {index : 0, row: v_params});
		//if(a_data.VHC_ID != $.jf_curdgfieldvalue($('#dg0'), 'VHC_ID')) return false;
		if(a_data.VHC_ID != $.jf_curdgfieldvalue($('#dg0'), 'VHC_ID')) return false;
		if($.jf_fndicostrct('_dsptch') == null) $.jf_adddsptchoverlay(a_data);
		return true;
		//현재 데이터가 메시지만 넘어오고 있음. 디스패치 구분(DSPTCH_DIV)가 넘어올 경우 일반메시지, 운행메시지, 정차메시지 구분해야함.
	}

	$.pf_sockbus = function(a_data) {
		let v_params = {
			VHC_ID : a_data.VHC_ID,
			VHC_NO : a_data.VHC_NO,
			CUR_SPD : a_data.CUR_SPD,
			OCR_DTM : $.jf_gettime(),
			GPS_Y : a_data.GPS_Y,
			GPS_X : a_data.GPS_X
		}
		//if(!$.jf_dupcheck($('#dg0'), 'VHC_ID', a_data.VHC_ID)) $.jf_insert($('#dg0'), v_params, 0);
		if(!$.jf_dupcheck($('#dg0'), 'VHC_ID', a_data.VHC_ID)) $('#dg0').datagrid('insertRow', {index : 0, row: v_params});
		else {
			let v_index = $.jf_fndduprow($('#dg0'), 'VHC_ID', a_data.VHC_ID);
			$('#dg0').datagrid('updateRow',{index:v_index,row:v_params});
		}
		if($.jf_datalength($('#dg0')) == 1) $.jf_setfocus($('#dg0'), 0);
		return true;
	}

	$.pf_sockevt = function(a_data) {
		let v_eventMessage = '';
		
		
		if(a_data.OPER_STS != 'OS001'){
			let v_dgData = $('#dg0').datagrid('getRows');
			//a_data.VHC_ID 같은 row 찾기
			for(var i=0; i<v_dgData.length; i++){
				if(v_dgData[i].VHC_ID == a_data.VHC_ID){
					$('#dg0').datagrid('selectRow', i);
					$.jf_delete($('#dg0'));
					return true;
				}
				
			}
		}
		
		switch(a_data.EVT_TYPE){
			case 'ET001':
				v_eventMessage = a_data.NODE_NM + '에 도착'; break;
			case 'ET002':
				v_eventMessage = a_data.NODE_NM + '에서 출발'; break;
			case 'ET003':		
				v_eventMessage = "기점"+"("+a_data.NODE_NM+")"+"에 도착"; break;
			case "ET004":
				v_eventMessage = "기점"+"("+a_data.NODE_NM+")"+"에서 출발"; break;
			case "ET005":
				v_eventMessage = "종점"+"("+a_data.NODE_NM+")"+"에 도착"; break;
			case "ET006":
				v_eventMessage = "종점"+"("+a_data.NODE_NM+")"+"에서 출발"; break;
			case "ET007":
				v_eventMessage = "현재속도 " + a_data.CUR_SPD+ "km/h, 평균 "+ a_data.EVT_DATA + "km/h"; break;
			case "ET008":
				v_eventMessage = "음성 방송 출력"; break;
			case "ET009":
				v_eventMessage = "버스 문 열림"; break;
			case "ET010":
				v_eventMessage = "버스 문 닫힘"; break;		
			case "ET011":
				v_eventMessage = "무정차 주행"; break;
			case "ET012":
				v_eventMessage = "과속 주행 현재속도 " + jsonObj.CUR_SPD + "km/h" ; break;
			case "ET013":
				v_eventMessage = "급가속"; break;
			case "ET014":
				v_eventMessage = "급감속"; break;
			case "ET015":
				v_eventMessage = "급출발"; break;
			case "ET016":
				v_eventMessage = "급정지"; break;
			case "ET017":
				v_eventMessage = "개문주행"; break;
			case "ET018":
				v_eventMessage = "노선이탈"; break;		
			case "ET019":
				v_eventMessage = "차고지도착"; break;	
			case "ET020":
				v_eventMessage = "차고지출발"; break;
			case "ET021":
				v_eventMessage = "교차로에 도착"; break;
			case "ET022":
				v_eventMessage = "교차로에서 출발"; break;				
		}

		let v_params = {
				VHC_ID : a_data.VHC_ID,
				VHC_NO : a_data.VHC_NO,
				OCR_DTM : $.jf_gettime(),
				EVT_TYPE_NM : a_data.EVT_TYPE_NM,
				EVT_DATA : v_eventMessage,
				GPS_X : a_data.GPS_X,
				GPS_Y : a_data.GPS_Y,
				CUR_SPD : a_data.CUR_SPD,			
			}
		//$.jf_insert($('#dg1'), v_params, 0);
		$('#dg1').datagrid('insertRow', {index : 0, row: v_params});
		//if(!$.jf_dupcheck($('#dg0'), 'VHC_ID', a_data.VHC_ID)) $.jf_insert($('#dg0'), v_params, 0);
		if(!$.jf_dupcheck($('#dg0'), 'VHC_ID', a_data.VHC_ID)) $('#dg0').datagrid('insertRow', {index : 0, row: v_params});
		else {
			let v_index = $.jf_fndduprow($('#dg0'), 'VHC_ID', a_data.VHC_ID);
			$('#dg0').datagrid('updateRow',{index:v_index,row:v_params});
		}
		if($.jf_datalength($('#dg0')) == 1) $.jf_setfocus($('#dg0'), 0);
		if(a_data.VHC_ID != $.jf_curdgfieldvalue($('#dg0'), 'VHC_ID')) return false;
		$.jf_addevtoverlay(a_data);
		return true;		
	}
	
	$.pf_socksig = function(a_data){
		$.jf_changesigmarker(js_sigList, a_data);
	}
	
	$.pf_sockprisig = function(a_data){
		//if(a_data.LIST[0].VHC_NO != $.jf_curdgfieldvalue($('#dg0'), 'VHC_NO')) return false;
		if(a_data.VHC_NO != $.jf_curdgfieldvalue($('#dg0'), 'VHC_NO')) return false;
		$.jf_addsigoverlay(a_data, $.jf_curdgrow($('#dg0')));
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
					<script src="/static/js/MO/MO0101/MO0101_sch_searchbox0.js"></script>
					<script src="/static/js/MO/MO0101/MO0101_sch_selectbox0.js"></script>
				</div>
				</form>
				<div data-options="region:'center', border:false">
					<div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 버튼 object -->
					<script src="/static/js/MO/MO0101/MO0101_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">	
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:700, maxWidth:700">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:false, minHeight:300, maxHeight:300">
							<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>			
							<!--datagrid0 -->
							<script src="/static/js/MO/MO0101/MO0101_dg0.js"></script>
						</div>
						<div data-options="region:'center', border:false">
							<div class="easyui-layout" data-options="fit:true">
								<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
								</div>	
								<!--datagrid1 -->
								<script src="/static/js/MO/MO0101/MO0101_dg1.js"></script>
							</div>
						</div>
						<div data-options="region:'south', border:false, minHeight:220, maxHeight:220">
							<div class="easyui-layout" data-options="fit:true">
								<div id="dg_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
								</div>	
								<!--datagrid2 -->
								<script src="/static/js/MO/MO0101/MO0101_dg2.js"></script>
							</div>
						</div>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							
						</div>
						<div data-options="region:'center', border:true">
							<div id="map_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--map -->
							<script src="/static/js/map0.js"></script>
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