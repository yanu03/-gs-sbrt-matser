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
	<script type="text/javascript" src="/static/js/common/cell_comm.js"></script>
	<script type="text/javascript" src="/static/js/common/scrollview_comm.js"></script>
	
	<script type="text/javascript">
		$( document ).ready(function() {
    });
	var dlt_OPER_ALLOC_PL_NODE_INFO = null;
	var dlt_BRT_DAY_OPER_ALLOC_PL_NODE_INFO_CHANGED = []; //수정된 값 전용 변수
	var dlt_OPER_ALLOC_PL_NODE_CNT = null;
	var dlt_VIEW_OPER_PL_ROUT_INFO = [];
	var v_jsonDatas = [];
	var v_paramDatas = [];

	$.extend($.fn.validatebox.defaults.rules, {
		//시간 유효성 체크
	    timeValid: {
	        validator: function(value, param){return $.uf_timeValid(value, param);},
	        message: '잘못된 노드 시간입니다.'
	    },
		//시간 범위 유효성 체크
	    timeRangeValid: {
	        validator: function(value, param){return $.uf_timeRangeValid(value, param);},
	        message: '노드 시간이 겹칩니다.'
	    }
	});		
	
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
		//if(a_obj.attr('id') == "dg0") rtn_params = {ROUT_ID:$.jf_seqdgdata('/si/SI0402G0K0', 'post')}
    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				// $.jf_savedgdata($('#ef0'), '/al/AL0203G1S0', 'post', null)
				$.uf_bgudajax();
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(a_type == 'distri'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
				//배포 ajax
				$.ajax({
						type: 'post',
						url: '/al/AL0203P0S0',
						// data: JSON.stringify({'rows' : v_jsonDatas, 'dma_search' : v_paramDatas}), //INSERT QUERY가 변경됨에 따라 파라미터 변경함(전체 데이터 INSERT에서 INSERT SELECT로 변환)
						data: JSON.stringify({'rows' : $.jf_getdata($('#dg1')), 'dma_search' : v_paramDatas}),
						dataType: 'json',
						async: false,
						contentType: 'application/json; charset=utf-8',
						success: function(data){
							$('#dg1').datagrid('acceptChanges');
							$.messager.show({
								title:'정보',
								msg:'배포 되었습니다.',
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
		}
		else if(a_type == 'operdtlpl'){
			$.ajax({
				type: 'post',
				url: '/operPlan/makeOperAllocPlNodeInfo',
				data: JSON.stringify({dma_search : {ALLOC_ID :  $('#dg0').datagrid('getSelected').ALLOC_ID
													,STOP_TIME :  $('#sch_tb').textbox('getValue')}}),
				dataType: 'json',
				async: false,
				contentType: 'application/json; charset=utf-8',
				success: function(data){
					$('#dg1').datagrid('acceptChanges');
					$.messager.show({
						title:'정보',
						msg:'궤적생성 하였습니다.',
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
		return true;
	}
		
	$.pf_rejectcfmsg = function(a_type){
		if(a_type == 'save'){
			$.jf_resetdg($('#dg1'), 'all');
		}
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){
		//저장 ajax 동작후 call back 함수
		return true;
	}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		if(a_obj.attr('id') == 'dg1'){
			rtn_params = {ALLOC_ID: a_row.ALLOC_ID} //상하행 조건 제외하는걸로 변경
		}
		
		return rtn_params;
	}

	//운행상세계획 생성
	$.uf_createoperdetailplan = function(){
		$.tracomcfmsg('확인', '운행상세계획 데이터가 재 생성됩니다. 궤적 생성 하시겠습니까?', 'operdtlpl');
	}
	//배포
	$.uf_distri = function(){
		if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg0')), 'g')){
			if($.jf_changeddg($('#dg1'), "ALL")){
				$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
			}

			else{
				//let v_cnt = dlt_OPER_ALLOC_PL_NODE_INFO.length;
				let v_relDts = [];
				let v_startDate = new Date($('#sch_fdd').datebox('getValue'));
				let v_endDate = new Date($('#sch_tdd').datebox('getValue'));
				while(v_startDate <= v_endDate){
					v_relDts.push(v_startDate.toISOString().split("T")[0]);
					v_startDate.setDate(v_startDate.getDate() + 1);
				}
				
				if(v_relDts.length != 0){
					v_newObj = {};
					let idx = v_jsonDatas.push(v_newObj)-1;
					//v_jsonDatas[idx]['ALLOC_ID'] = $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID');
					//v_jsonDatas[idx]['ROUT_ID'] = v_allJson[0]['ROUT_ID'];
					//v_jsonDatas[idx]['WAY_DIV'] = v_allJson[0]['WAY_DIV'];
					// v_jsonDatas[idx]['DAY_DIV'] = v_allJson[0]['DAY_DIV'];
					//v_jsonDatas[idx]['DAY_DIV'] = v_dayDiv;
					for(var i=0; i<v_relDts.length; i++) {
						let v_newObj = {};
						v_paramDatas.push(v_newObj)-1;
						v_paramDatas[i]['OPER_DT'] = v_relDts[i];
					}

					let v_alertStartDate = $('#sch_fdd').datebox('getValue');
					let v_alertEndDate = $('#sch_tdd').datebox('getValue');
					$.tracomcfmsg('확인', '해당 운행계획을 배포 하시겠습니까? ('+ v_alertStartDate + '~' + v_alertEndDate+')', 'distri');
				}
				//요일 구분 사용할 때 로직
				/* if(v_allJson.length > 0 ){
					let v_weeks = ['일', '월', '화', '수', '목', '금', '토'];
					let v_startDate = new Date($('#sch_fdd').datebox('getValue'));
					let v_endDate = new Date($('#sch_tdd').datebox('getValue'));
					let v_dayDiv = $.jf_curdgfieldvalue($('#dg0'), 'DAY_DIV');
					let v_newObj = {};
					let v_relDts = [];
					v_jsonDatas = []; //INSERT QUERY가 변경됨에 따라 파라미터 변경함(전체 데이터 INSERT에서 INSERT SELECT로 변환)
					v_paramDatas = [];
					while(v_startDate <= v_endDate){
						let v_dayOfWeek = v_weeks[v_startDate.getDay()];

						if(v_dayDiv == 'DY001') {
							if(v_dayOfWeek !== '토' && v_dayOfWeek !=='일') v_relDts.push(v_startDate.toISOString().split("T")[0]);
							v_startDate.setDate(v_startDate.getDate() + 1);
						} else if (v_dayDiv == 'DY002'){
							if(v_dayOfWeek === '토' || v_dayOfWeek === '일')v_relDts.push(v_startDate.toISOString().split("T")[0]);
							v_startDate.setDate(v_startDate.getDate() + 1);
						}
					}
					if(v_relDts.length != 0){
						v_newObj = {};
						let idx = v_jsonDatas.push(v_newObj)-1;
						//row 한줄밖에 안들어감
						v_jsonDatas[idx]['ALLOC_ID'] = $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID');
						v_jsonDatas[idx]['ROUT_ID'] = v_allJson[0]['ROUT_ID'];
						v_jsonDatas[idx]['WAY_DIV'] = v_allJson[0]['WAY_DIV'];
						// v_jsonDatas[idx]['DAY_DIV'] = v_allJson[0]['DAY_DIV'];
						v_jsonDatas[idx]['DAY_DIV'] = v_dayDiv;
						for(var i=0; i<v_relDts.length; i++) {
							let v_newObj = {};
							v_paramDatas.push(v_newObj)-1;
							v_paramDatas[i]['OPER_DT'] = v_relDts[i];
						}

						let v_alertStartDate = $('#sch_fdd').datebox('getValue');
						let v_alertEndDate = $('#sch_tdd').datebox('getValue');
						$.tracomcfmsg('확인', '해당 운행계획을 배포 하시겠습니까? ('+ v_alertStartDate + '~' + v_alertEndDate+')', 'distri');
					}
				} */
			}
		}
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
		
		//이하 row Update일때
		let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		let v_stTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ARRV_TM'});
		let v_curStTime = $.jf_converttime($(v_stTimeEditor.target).textbox('getText'));
		let v_edTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'DPRT_TM'});
		let v_curEdTime = $.jf_converttime($(v_edTimeEditor.target).textbox('getText'));
		 
		 //이하 팝업 update
		/* let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		let v_curStTime = $('#ARRV_TM').textbox('getText');
		let v_curEdTime = $('#DPRT_TM').textbox('getText'); */
		
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
		//이하 row Update일때
		let v_stTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ARRV_TM'});
		let v_curStTime = $.jf_converttime($(v_stTimeEditor.target).textbox('getText'));
		let v_edTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'DPRT_TM'});
		let v_curEdTime = $.jf_converttime($(v_edTimeEditor.target).textbox('getText'));		
		
		 //이하 팝업 update
		/* let v_curStTime = $('#ARRV_TM').textbox('getText');
		let v_curEdTime = $('#DPRT_TM').textbox('getText'); */	
		
		if (a_param === 'ARRV_TM' && $.jf_isempty(v_curEdTime)) {
			v_curEdTime = v_convertValue;
		}
		else if (a_param === 'DPRT_TM' && $.jf_isempty(v_curStTime)) {
			v_curStTime = v_convertValue;
		}
	
		/* 전체 for문 
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
		} */
		
		let v_data = $.jf_getdata($('#dg1'));
		let v_startIndex = v_data.findIndex(item => item['ALLOC_NO'].toString() === v_allocNo.toString());
		let v_endIndex = v_data.slice(v_startIndex).findIndex(item => item['ALLOC_NO'].toString() !== v_allocNo.toString()) + v_startIndex;

		if(v_endIndex === -1) {  // 만약 해당 'ALLOC_NO'가 마지막에 위치하고 있으면, endIndex는 v_data의 길이로 설정
		    v_endIndex = v_data.length;
		}

		for(var i = v_startIndex; i < v_endIndex; i++) {
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
					<!-- <script src="/static/js/AL/AL0302/AL0302_sch_selectbox0.js"></script> -->
				</div>
				</form>
				<div data-options="region:'center', border:false">
					<div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
					</div>
					<!-- 버튼 object -->
					<script src="/static/js/AL/AL0203/AL0203_btn0.js"></script>
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
							<div class="easyui-layout" data-options="fit:true">
								<div data-options="region:'west', border:false, minWidth:300, maxWidth:300">
									<div id="subsch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0202/AL0202_subsch_searchbox0.js"></script>
									<!-- <script src="/static/js/AL/AL0203/AL0203_subbtn0.js"></script> -->
								</div>
								<div data-options="region:'center', border:false">
									<div id="subsch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<div id="subbtn_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<!--sub button -->
									<script src="/static/js/AL/AL0302/AL0302_textbox0.js"></script>
									<script src="/static/js/AL/AL0302/AL0302_fromtodate0.js"></script>
									<!-- <script src="/static/js/AL/AL0203/AL0203_subbtn1.js"></script>	 -->						
								</div>
								<div data-options="region:'east', border:false, minWidth:300, maxWidth:300">
									<div id="subbtn_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<div id="subbtn_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0203/AL0203_subbtn0.js"></script>
									<!-- <script src="/static/js/AL/AL0203/AL0203_subbtn2.js"></script> -->
								</div>
							</div>

						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<script src="/static/js/AL/AL0203/AL0203_dg1.js"></script>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="updatedg1">
	<!-- <form id="modal_ef0" method="post">
	</form> -->
    <script src="/static/js/AL/AL0203/AL0203_modal0.js"></script>
</div>

</body>
</html>