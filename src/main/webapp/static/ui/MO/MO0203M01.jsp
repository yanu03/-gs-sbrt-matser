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
	
	
	$( document ).ready(function() {
		sigTime = setInterval(function() {
		    var nodeId = $('#dg0').datagrid('getSelected').NODE_ID
		    
		    if(typeof(nodeId) == "undefined" || nodeId == null || nodeId == "") {
		    	return
		    }
			$.ajax({
				type: 'post',
				url: '/vhc/selectBit',
				data: JSON.stringify({dma_search : {NODE_ID :  nodeId}}),
				dataType: 'json',
				async: false,
				contentType: 'application/json; charset=utf-8',
				success: function(data){
					
				},
				error: function(error){

				}
			});
		}, 2000);
    });
	
	var js_etaList = [];
	var js_soonEtaList = [];

    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;}
    $.pf_childretrieve = function(a_obj, a_params){return true;}
    $.pf_setfooter = function(a_obj){return true;}
    $.pf_combineparams = function(a_obj){
    	let rtn_params;
    	if(a_obj.attr('id') == "dg0"){
    		rtn_params = {CONTENT2 : $('#sch_lb0').combobox('getValue'), CONTENT3 : $("#sch_sb0").searchbox('getValue')};  
    	}
    	return rtn_params;
	};    
    $.pf_defaultparams = function(a_obj){}
    $.pf_modalselect = function(a_obj){return true;}
	$.pf_acceptcfmsg = function(a_type){}
	$.pf_rejectcfmsg = function(a_type){}
	$.pf_ajaxafterproc = function(a_type){return true;}		
	$.pf_childparams = function(a_obj, a_row){}
	//백그라운드용(맵 노선용) ajax
	$.uf_bgajax = function() {
		$.ajax({
			type: 'post',
			url: '/rout/selectNodeListByRout',
			data: JSON.stringify({dma_search : {ROUT_ID :  $('#sch_lb0').combobox('getValue')}}),
			dataType: 'json',
			async: false,
			contentType: 'application/json; charset=utf-8',
			success: function(data){
				if(typeof(data['rows']) != "undefined"){
					// $.jf_drawroute(data.rows);
					$.jf_deleteline();
					$.jf_drawline(data.rows);
					$.jf_movemap(data.rows[0].GPS_X, data.rows[0].GPS_Y);
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
	
	//BIT 내용 생성
	$.uf_setBITInfo = function(a_datas) {
		debugger;
		let v_BITList = a_datas.LIST;
		let v_tableStr = '';
		let v_body = '';
		v_tableStr = '<table id="MO0203_table" style="" class="w2tb bit_tb">'
					+'<caption id="mf_tac_layout_contents_MN00070102_body_wq_uuid_505" class="w2group "></caption>'
					+'<colgroup id="mf_tac_layout_contents_MN00070102_body_wq_uuid_506" class="w2group ">'
					+'<col id="" style="width:25.00%;">'
					+'<col id="" style="width:37.50%">'
					+'<col id="" style="width:37.50%">'
					+'</colgroup>'
					+'<tbody>';
		
		/* tableStr = '<table id="mf_tac_layout_contents_MN00070102_body_MO0203T0" style="" class="w2group w2tb bit_tb">'
					+'<caption id="mf_tac_layout_contents_MN00070102_body_wq_uuid_505" class="w2group "></caption>'
					+'<colgroup id="mf_tac_layout_contents_MN00070102_body_wq_uuid_506" class="w2group ">'
					+'<col id="mf_tac_layout_contents_MN00070102_body_wq_uuid_507" style="width:25.00%;" class="w2group ">'
					+'<col id="mf_tac_layout_contents_MN00070102_body_wq_uuid_508" style="width:37.50%" class="w2group ">'
					+'<col id="mf_tac_layout_contents_MN00070102_body_wq_uuid_508" style="width:37.50%" class="w2group ">'
					+'</colgroup>'
					+'<tbody>';	 */		
					
		//a_datas 남은 시간에 따른 순서 sort하는 작업 필요
		//
					
		for(var i=0; i<v_BITList.length; i++) {
			v_BITList[i].REMAIN_TM = parseInt((v_BITList[i].REMAIN_TM%3600)/60) + '분';
			let v_newObj = {};
			
			if(v_BITList[i].REMAIN_TM != '0분'){
				v_body += '<tr>'
						+ '<tdstyle="border-color: black;">'	
						+ '<span style="width: 100px;height: 23px;font-size: 2px;">'
						+  v_BITList[i]['ROUT_NM'];
						+ '</span></td>'
						+ '<td style="border-color: black; " class="">'
						+ '<span style="width: 100px;height: 23px;font-size: 2px; color: yellow;">'
						+ v_BITList[i]['REMAIN_STTN'];
						+ '</span></td>'
						+ '<td style="border-color: black;  text-align: right;">'
						+ '<span style="width: 100%;height: 23px;font-size: 2px;text-align: right;color: green;">'
						+ v_BITList[i]['REMAIN_TM'];
						+ '</span></td></tr>'
			}
			else {
				v_body +='<tr id="" class="">'
					+'<td style="border-color: yellow; border-right-color:yellow; border-top-style:double;" scope="row" colspan="3" rowspan="1">'
					+'<span style="width: 100px;height: 23px;font-size: 2px;">'
					+"곧도착 : " + v_BITList[i]['ROUT_NM'];
					+'</span></td></tr>';
			}
		}
		
		v_tableStr += v_body + '</tbody></table>';
		$('#MO0203_bit').html(v_tableStr);
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
					<script src="/static/js/MO/MO0203/MO0203_sch_searchbox0.js"></script>
					<script src="/static/js/MO/MO0203/MO0203_sch_selectbox0.js"></script>
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
				<div data-options="region:'west', border:false, minWidth:500, maxWidth:500">
					<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>			
					<!--datagrid0 -->
					<script src="/static/js/MO/MO0203/MO0203_dg0.js"></script>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							
						</div>
						<div data-options="region:'center', border:true">
							<div id="map_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							
								<div id="brt_div" class="pgm_detail" style="z-index: 10000;position: absolute;right: 52px;bottom: 11px;margin-right: -49px;width: 260px;height: 533px;">
									<div id="bit_img" style="width: 100%; height:100%" class="w2group ">
										<div style="background-image: url('/static/img/BIT-RED.png'); background-reapt: no-repeat; background-position: top; background-size: cover; height: 533px; position: relative;" class="w2group brt_bit">
										</div>
									</div>
									<div style="position: absolute;top: 30%;left: 20%;width: 154px;text-align: center;">
										<span id="bit_sttnNm" style="color: white;font-size: 12px;" class="">정류소명</span>
									</div>
									<div id="" style="position: absolute; top: 35%; left: 27%; text-align: center; width: 118px;" class="">
										<span id="bit_sttnNo" style="color: white;font-size: 10px;" class="w2span ">정류소번호</span>
									</div>
									<div id="MO0203_bit" style="position: absolute; top: 41%; left: 20%; height:296px; width:154px;" class="it_tb"></div>
								</div>
								
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