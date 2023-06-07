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
	<script src="/static/js/sample_comm.js"></script>
	<script src="/static/js/map_comm.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=100faa0e8b0c72a3da69169f45883b0b"></script>
	<script src="/static/js/vhcdvc_comm.js"></script>
	<script type="text/javascript">
		$( document ).ready(function() {
    });

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
	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		if(a_obj.attr('id') == 'dg1') rtn_params = {VHC_ID: a_row.VHC_ID}
		return rtn_params;	
	}

	$.uf_makeimg = function(a_obj, a_datas, a_img) {
		a_img.empty();
		let v_imgSrc = null;
		let v_str = "";
		let v_topCoords = 0;
		let v_leftCoords = 0;
		for(var i=0; i<a_datas.length; i++) {
			let v_dvcKind = a_datas[i]['DVC_KIND'];
			let v_dvcCond = a_datas[i]['DVC_COND'];
			let v_coordsData = a_datas[i]['DVC_COORDS'];

			if(!$.jf_isempty(v_coordsData)){
				switch (v_dvcKind){
					case "DK001":
						v_imgSrc = OBE_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = OBE_ABNORMAL_IMG; break;
					case "DK002":
						v_imgSrc = DRVTERMINAL_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = DRVTERMINAL_ABNORMAL_IMG; break;
					case "DK003":
						v_imgSrc = PSGGUIDE_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = PSGGUIDE_ABNORMAL_IMG; break;
					case "DK004":
						v_imgSrc = ROUTMAP_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = ROUTMAP_ABNORMAL_IMG; break;
					case "DK005":
						v_imgSrc = KEYPAD_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = KEYPAD_ABNORMAL_IMG; break;
					
					//행선지 정면
					case "DK006":
					case "DK007":
					//행선지 측면	
					case "DK008":
					case "DK009":
					case "DK012":
					//행선지 후면	
					case "DK013":
						v_imgSrc = DESGUIDE_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = DESGUIDE_ABNORMAL_IMG;	break;
					//태그리스	
					case "DK011":
						v_imgSrc = TAG_NORMAL_IMG;
						if(v_dvcCond == "DC021") v_imgSrc = TAG_ABNORMAL_IMG;	break;				
				}
			}
			if(!$.jf_isempty(v_imgSrc)) {
				if(!$.jf_isempty(v_coordsData)){
					v_topCoords = v_coordsData.split(',')[0];
					v_leftCoords = v_coordsData.split(',')[1];
				}
			}
			v_str += "<div id='"+ a_datas[i]['DVC_ID']+ "' style='z-index: 1; position:absolute; top:"
			+v_topCoords+ "px; left:"+v_leftCoords+"px;' class='tracom-img' onclick='uf_imgclick(this.id)'>"
			+"<img src='"+v_imgSrc+"'>"
			+"</div>"
		}
		let v_busImg = null;
		//jf_v_vhcKind로 생
		let v_vhcKind = a_obj.datagrid('getSelected').VHC_KIND;
		switch(v_vhcKind){
			case 'VK001':
				v_busImg = CNG_BUS_IMG; break;
			case 'VK002':
				v_busImg = WOOJIN_BUS_IMG; break;
			case 'VK003':
				v_busImg = NORMAL_BUS_IMG; break;
			default:
				v_busImg = NORMAL_BUS_IMG; break;			
		}
		//left:95px 임시
		v_str += "<img style='position:absolute; left:95px' src='"+v_busImg+"' id='"+a_obj.datagrid('getSelected').VHC_ID+"img'>";
		a_img.append(v_str);
	}
	
	//이미지 클릭 이벤트
	function uf_imgclick(a_id){
		v_allData = $('#dg1').datagrid('getData')['rows'];
		for (var i=0; i<v_allData.length; i++){
			if(a_id == v_allData[i]['DVC_ID']) {
				$.jf_setfocus($('#dg1'), i); 
				return true;	
			}
		}
		return true;		
	}
	$.uf_imgclick = function(a_obj, a_id){
		v_allData = a_obj.dtatgrid('getData')['rows'];
		for (var i=0; i<v_allData; i++){
			if(a_id == v_allData['DVC_ID']) $.jf_setfocus(a_obj, i);
		}
	}

	//uf_matchimg를 위한 이전 이미지로 변환하기 위한 변수
	let v_prevSelected = {
		id: null,
		src: null
	};

	$.uf_matchimg = function(a_obj, a_data) {
		let v_dvcId = a_obj.datagrid('getSelected')['DVC_ID'];
		let v_imgTag = $('#' + v_dvcId).find("img");

		// 이전에 선택된 이미지가 있으면, 원래 이미지로 복원
		if (v_prevSelected.id) {
			$("#" + v_prevSelected.id).find("img").attr('src', v_prevSelected.src);
		}

		// 이전에 선택된 이미지의 정보를 저장
		v_prevSelected.id = v_dvcId;
		v_prevSelected.src = v_imgTag.attr('src');

		let v_dvcKind = a_data['DVC_KIND'];
		let v_dvcCond = a_data['DVC_COND'];

		switch (v_dvcKind){
			case "DK001":
				v_imgSrc = OBE_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = OBE_ABNORMAL_SEL_IMG; break;
			case "DK002":
				v_imgSrc = DRVTERMINAL_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = DRVTERMINAL_ABNORMAL_SEL_IMG; break;
			case "DK003":
				v_imgSrc = PSGGUIDE_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = PSGGUIDE_ABNORMAL_SEL_IMG; break;
			case "DK004":
				v_imgSrc = ROUTMAP_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = ROUTMAP_ABNORMAL_SEL_IMG; break;
			case "DK005":
				v_imgSrc = KEYPAD_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = KEYPAD_ABNORMAL_SEL_IMG; break;
			//행선지 정면
			case "DK006":
			case "DK007":
			//행선지 측면	
			case "DK008":
			case "DK009":
			case "DK012":
			//행선지 후면	
			case "DK013":
				v_imgSrc = DESGUIDE_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = DESGUIDE_ABNORMAL_SEL_IMG;	break;
			//태그리스	
			case "DK011":
				v_imgSrc = TAG_NORMAL_SEL_IMG;
				if(v_dvcCond == "DC021") v_imgSrc = TAG_ABNORMAL_SEL_IMG;	break;				
		}

		// 선택된 이미지를 'selectedImage'로 변경
		v_imgTag.attr('src', v_imgSrc);
};
    
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="positon:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north', border:false, maxHeight:50, minHeight:50">
			<div class="easyui-layout" data-options="fit:true">
				<!--검색 조건 특히 name으로 동작하는 요소를 위해서 form을 검색 layout을 감사줌 -->
				<form style="border:0px solid red;">
				<div data-options="region:'west', border:false, minWidth:620, maxWidth:620">
					<div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 검색 object -->
					<script src="/static/js/MO0204_sch_searchbox0.js"></script>
					<script src="/static/js/MO0204_sch_selectbox0.js"></script>
					<script src="/static/js/MO0204_sch_selectbox1.js"></script>
				</div>
				</form>
				<div data-options="region:'center', border:false">
					<div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 버튼 object -->
					<script src="/static/js/MO0101_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">	
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'center', border:false">
					<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>			
					<!--datagrid0 -->
					<script src="/static/js/MO0204_dg0.js"></script>
				</div>
				<div data-options="region:'east', border:false, minWidth:1300, maxWidth:1300">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true,  maxHeight:220, minHeight:220">
							<div id="img_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<!--이미지 생성 함수는 현재 html에 있습니다-->
						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<!--datagrid0 -->
							<script src="/static/js/MO0204_dg1.js"></script>	
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