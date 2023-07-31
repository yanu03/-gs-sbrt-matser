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
	let js_bgData = null;

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
		if(a_type == 'routchange') {
			let v_allocNo = $.jf_curdgfieldvalue($('#dg1'), 'ALLOC_NO');
			if($.jf_curdgfieldvalue($('#dg1'), 'isNew')){
				v_allocNo = null;
			}
			
			let v_index = $.jf_curdgindex($('#dg1'));
			let v_params = {VHC_ID:null, VHC_NO:null, DRV_ID:null, DRV_NM:null}
			$('#dg1').datagrid('updateRow',{index:v_index, row:v_params});
			let v_allocId = $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID');
			let v_routNm = $.jf_curdgfieldvalue($('#dg1'), 'ST_ROUT_NM');
			let v_values = {ALLOC_ID:v_allocId, ALLOC_NO:v_allocNo , ST_ROUT_ID: null, ST_ROUT_NM : v_routNm, ST_OPER_SN : null, ROUT_ST_TM : null
							,ROUT_GRP:null, WAY_DIV:null};
			$.mf_updatedg1mdopen($('#dg1'), null, v_values, $('#dg1'), 'c');
		}		
		return true;
	}
		
	$.pf_rejectcfmsg = function(a_type){
		if(a_type == 'save'){
			$.jf_resetdg($('#dg0'), 'all');
		}
		if(a_type == 'routchange') {
		}		
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){return true;}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		let v_f_date = $('#sch_fdd').datebox('getValue');
		if(a_obj.attr('id') == 'dg1') rtn_params = {ALLOC_ID : a_row.ALLOC_ID, F_DATE :v_f_date}
		return rtn_params;
	}
	
	$.uf_dupValid = function(a_modalobj, a_field) {
		let v_field = $.jf_curdgfieldvalue($('#dg1'), a_field);
		//선택한 row의 값
	    let v_modalField = $.jf_curdgfieldvalue(a_modalobj, a_field);
		if(v_modalField == v_field) return false;
		return true;
	}
	
	//차량, 운전자 시간 유효성 검사
	$.uf_fieldTimeRangeValid = function(a_value, a_modalobj, a_field) {
	    let v_convertValue = $.jf_converttime(a_value) //사용자 수정값
	    //선택한 row의 값
	    let v_field = $.jf_curdgfieldvalue(a_modalobj, a_field);
	    let v_allocNo = $.jf_curdgfieldvalue($('#dg1'), 'ALLOC_NO');
	    let v_routeInfos = js_bgData.filter(data => data.ALLOC_NO == v_allocNo);
	    
	    let v_data = $.jf_getdata($('#dg1'));
	    //동일 필드값 차량 배차 데이터
	    let v_targetDatas = [];
	    let v_selectedIndex = -1;
	    for(var i=0; i<v_data.length; i++) {
	        if(v_data[i][a_field] == v_field) {
	            if($.jf_curdgindex($('#dg1')) == i) v_selectedIndex = v_targetDatas.length;
	            v_targetDatas.push(v_data[i]);
	        }
	    }	    
	    v_targetDatas.sort((a,b) => a.ROUT_ST_TM.localeCompare(b.ROUT_ST_TM));
	    
	    //가상의 도착 시간을 만듦
	  	for (var i=0; i<v_targetDatas.length; i++){
	  		if(v_selectedIndex == i) continue;
	  		let v_targetAllocNo = v_targetDatas[i]['ALLOC_NO'];
	  		//동일한 필드값 데이터중 전체 노선 데이터
	  		let v_targetRouteInfo = js_bgData.filter(data => data.ALLOC_NO == v_targetAllocNo);
	  		
	  		// 다음 배차 시작시간
	  	    let v_nextStartTime = i < v_targetDatas.length - 1 ? $.jf_converttime(v_targetDatas[i+1].ROUT_ST_TM) : null;
			if(v_nextStartTime == null) return true;
	  	    
	  	    // 다음 배차의 시작 시간보다 작은 가장 큰 도착 시간을 찾습니다.
	  	    let v_endTimes = v_targetRouteInfo.filter(data => $.jf_converttime(data.ROUT_ED_TM) < v_nextStartTime);
	  	    
	  	    //내림차 정렬후 맨 첫 도착시간
	  	    let v_maxStartTime = v_endTimes.sort((a, b) => b.ROUT_ED_TM.localeCompare(a.ROUT_ED_TM))[0].ROUT_ED_TM;
	  	    v_targetDatas[i]['ROUT_ED_TM'] = v_maxStartTime;
	  	  
	  	    if(typeof($.jf_converttime(v_targetDatas[i]['ROUT_ED_TM'])) == 'number'){
		  	  if($.jf_converttime(v_targetDatas[i].ROUT_ST_TM) <= v_convertValue && v_convertValue < $.jf_converttime(v_targetDatas[i].ROUT_ED_TM)) return false;
	  	    }
	  	}
	    return true;
	}	
	
	//시간 노선 유효성 검사
	$.uf_routTimeRangeValid = function(a_value) {
	    let v_convertValue = $.jf_converttime(a_value.ROUT_ST_TM); //사용자 수정값
	    //팝업에서 선택한 값
	    let	v_routGrp = a_value.ROUT_GRP;
	    let v_wayDiv = a_value.WAY_DIV;
		let v_allocNo = a_value.ALLOC_NO;

	    let v_data = $.jf_getdata($('#dg1'));
	    let v_compareDatas = [];

	    //선택 인덱스 추적변수
	    let v_selectedIndex = -1;
	  	//같은 배차번호만 비교
	    for(var i=0; i<v_data.length; i++) {
	        if(v_data[i]['ALLOC_NO'] == v_allocNo) {
	            if($.jf_curdgindex($('#dg1')) == i) continue;
	            v_compareDatas.push(v_data[i]);
	        }
	    }
	  	if(v_compareDatas.length < 2) return true;
	  	
	    //시작시간 순으로 정렬
	    v_compareDatas.sort((a,b) => a.ROUT_ST_TM.localeCompare(b.ROUT_ST_TM));

	    for(var i=0; i<v_compareDatas.length-1; i++) {
	        //if(v_selectedIndex == i) continue;
	        if($.jf_converttime(v_compareDatas[i].ROUT_ST_TM) <= v_convertValue && v_convertValue < $.jf_converttime(v_compareDatas[i+1].ROUT_ST_TM)) return false;
	    }
	    return true;
	}	
	
	//백그라운드용 ajax
	$.uf_bgajax = function() {
		$.ajax({
			type: 'post',
			url: '/al/AL0302P0R0',
			data: JSON.stringify({dma_search : {ALLOC_ID :  $('#dg0').datagrid('getSelected').ALLOC_ID}}),
			dataType: 'json',
			async: false,
			contentType: 'application/json; charset=utf-8',
			success: function(data){
				if(typeof(data['rows']) != "undefined"){
					js_bgData = data['rows'];
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
				<div data-options="region:'west', border:false, minWidth:385, maxWidth:385">
					<div class="easyui-layout" data-options="fit:true">
						<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
						</div>			
						<!--datagrid0 -->
						<!-- <script src="/static/js/AL/AL0305/AL0305_dg0.js"></script> -->
						<script src="/static/js/AL/AL0302/AL0302_dg0.js"></script>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							<div class="easyui-layout" data-options="fit:true">
								<div data-options="region:'west', border:false, minWidth:300, maxWidth:300">
									<div id="subsch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0302/AL0302_subsch_searchbox0.js"></script>
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