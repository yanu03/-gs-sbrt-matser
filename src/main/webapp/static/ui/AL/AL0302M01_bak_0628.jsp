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
	let v_paramDatas = [];

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
		let v_f_date = $('#sch_fdd').datebox('getValue');
    	if(a_obj.attr('id') == "dg0"){
    		rtn_params = {CONTENT : $("#sch_sb0").searchbox('getValue'), TYPE : 'ALL',
							OPER_DT : v_f_date, DAY_DIV : $("#sch_lb0").combobox('getValue')};  
    	}
    	return rtn_params;
    };
    
	//추가 파라미터
    $.pf_defaultparams = function(a_obj){
		let rtn_params;
		if(a_obj.attr('id') == "dg1") {
			let v_row = $.jf_curdgrow($('#dg0'));
			let v_allocNo = ($.jf_curdgrow($('#dg1')) !== null ? $.jf_curdgrow($('#dg1'))['ALLOC_NO'] : null) || 1;
			rtn_params = {ALLOC_ID : v_row.ALLOC_ID, ALLOC_NO:v_allocNo, isNew:true}	
		}
    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_savedgdata($('#dg1'), '/al/AL0302G1S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(a_type == 'distri'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
				//배포 ajax
				// $.jf_savedgdata($('#dg1'), '/al/AL0302G1S1', 'post', null)
				$.ajax({
						type: 'post',
						url: '/al/AL0302G1S1',
						//data: JSON.stringify({'rows' : v_jsonDatas, 'dma_search' : v_paramDatas}),
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

		return true;
	}
		
	$.pf_rejectcfmsg = function(a_type){
		if(a_type == 'save'){
			$.jf_resetdg($('#dg0'), 'all');
		}
		if(a_type == 'distri'){
			$.jf_resetdg($('#dg0'), 'all');
		}
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){return true;}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		if(a_obj.attr('id') == 'dg1') rtn_params = {ALLOC_ID: a_row.ALLOC_ID, DAY_DIV: a_row.DAY_DIV}
		return rtn_params;
	}

	//배포
	$.uf_distri = function(){
		if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg0')), 'g')){
			if($.jf_changeddg($('#dg1'), "ALL")){
				$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
			}

			else{
				let v_allJson = $('#dg1').datagrid('getData');
				if(v_allJson.rows.length > 0 ){
					//let v_weeks = ['일', '월', '화', '수', '목', '금', '토'];
					let v_startDate = new Date($('#sch_fdd').datebox('getValue'));
					let v_endDate = new Date($('#sch_tdd').datebox('getValue'));
					let v_newObj = {};
					let v_relDts = [];
					//v_jsonDatas = [];
					v_paramDatas = [];
					while(v_startDate <= v_endDate){
						v_relDts.push(v_startDate.toISOString().split("T")[0]);
						v_startDate.setDate(v_startDate.getDate() + 1);
					}
					if(v_relDts.length != 0){
						for(var i=0; i<v_relDts.length; i++) {
							let v_newObj = {};
							v_paramDatas.push(v_newObj)-1;
							v_paramDatas[i]['OPER_DT'] = v_relDts[i];
							/* for(var j=0; j<v_allJson.rows.length; j++) {
								v_newObj = {};
								let idx = v_jsonDatas.push(v_newObj)-1;
								v_jsonDatas[idx]['OPER_DT'] = v_relDts[i];
								v_jsonDatas[idx]['ALLOC_ID'] = v_allJson.rows[j]['ALLOC_ID'];
								v_jsonDatas[idx]['ALLOC_NO'] = v_allJson.rows[j]['ALLOC_NO'];
								v_jsonDatas[idx]['WAY_DIV'] = v_allJson.rows[j]['WAY_DIV'];
								v_jsonDatas[idx]['VHC_ID'] = v_allJson.rows[j]['VHC_ID'];
								v_jsonDatas[idx]['SEC_VHC_ID'] = v_allJson.rows[j]['SEC_VHC_ID'];
								v_jsonDatas[idx]['SEC_TRAN_TM'] = v_allJson.rows[j]['SEC_TRAN_TM'];
								v_jsonDatas[idx]['DRV_ID'] = v_allJson.rows[j]['DRV_ID'];
								v_jsonDatas[idx]['SEC_DRV_ID'] = v_allJson.rows[j]['SEC_DRV_ID'];
								v_jsonDatas[idx]['rowStatus'] = 'U';
							} */
						}
						//let test = $.jf_getdata($('#dg1'));
						//debugger;
						
						let v_alertStartDate = $('#sch_fdd').datebox('getValue');
						let v_alertEndDate = $('#sch_tdd').datebox('getValue');
						$.tracomcfmsg('확인', '해당 차량배차를 배포하시겠습니까? ('+ v_alertStartDate + '~' + v_alertEndDate+')', 'distri');
					}
				}
			}
		}
	}
	
	/* //시간 유효성 검사
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
	} */
	
	//차량, 운전자 시간 유효성 검사
	$.uf_fieldTimeRangeValid = function(a_value, a_modalobj, a_field) {
	    let v_convertValue = $.jf_converttime(a_value) //사용자 수정값
	    
	    //선택한 row의 값
	    let	v_routGrp = $.jf_curdgfieldvalue($('#dg1'),'ROUT_GRP');
	    let v_wayDiv = $.jf_curdgfieldvalue($('#dg1'),'WAY_DIV');
	    let v_field = $.jf_curdgfieldvalue(a_modalobj, a_field);

	    let v_data = $.jf_getdata($('#dg1'));
	    let v_compareDatas = [];

	    //선택 인덱스 추적변수
	    let v_selectedIndex = -1;
	  	//같은 노선그룹, 상하행, 필드값이 같은 데이터만 비교
	    for(var i=0; i<v_data.length; i++) {
	        if(v_data[i]['ROUT_GRP'] == v_routGrp && v_data[i]['WAY_DIV'] == v_wayDiv && v_data[i][a_field] == v_field) {
	            if($.jf_curdgindex($('#dg1')) == i) v_selectedIndex = v_compareDatas.length;
	            v_compareDatas.push(v_data[i]);
	        }
	    }
	    //시작시간 순으로 정렬
	    v_compareDatas.sort((a,b) => a.ROUT_ST_TM.localeCompare(b.ROUT_ST_TM));

	    for(var i=0; i<v_compareDatas.length-1; i++) {
	        if(v_selectedIndex == i) continue;
	        if($.jf_converttime(v_compareDatas[i].ROUT_ST_TM) <= v_convertValue && v_convertValue < $.jf_converttime(v_compareDatas[i+1].ROUT_ST_TM)) return false;
	    }
	    return true;
	}	
	
	//시간 노선 유효성 검사
	$.uf_routTimeRangeValid = function(a_value) {
	    let v_convertValue = $.jf_converttime(a_value.ROUT_ST_TM); //사용자 수정값
	    //팝업에서 선택한 값
	    let	v_routGrp = a_value.ROUT_GRP;
	    let v_wayDiv = a_value.WAY_DIV;
	    let v_allocNoEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ALLOC_NO'});
		let v_allocNo = $(v_allocNoEditor.target).textbox('getText');

	    let v_data = $.jf_getdata($('#dg1'));
	    let v_compareDatas = [];

	    //선택 인덱스 추적변수
	    let v_selectedIndex = -1;
	  	//같은 노선그룹, 상하행이 같은 데이터만 비교
	    for(var i=0; i<v_data.length; i++) {
	        if(v_data[i]['ALLOC_NO'] == v_allocNo && v_data[i]['ROUT_GRP'] == v_routGrp && v_data[i]['WAY_DIV'] == v_wayDiv) {
	            //if($.jf_curdgindex($('#dg1')) == i) v_selectedIndex = v_compareDatas.length;
	            if($.jf_curdgindex($('#dg1')) == i) continue;
	            v_compareDatas.push(v_data[i]);
	        }
	    }
	    //시작시간 순으로 정렬
	    v_compareDatas.sort((a,b) => a.ROUT_ST_TM.localeCompare(b.ROUT_ST_TM));

	    for(var i=0; i<v_compareDatas.length-1; i++) {
	        //if(v_selectedIndex == i) continue;
	        if($.jf_converttime(v_compareDatas[i].ROUT_ST_TM) <= v_convertValue && v_convertValue < $.jf_converttime(v_compareDatas[i+1].ROUT_ST_TM)) return false;
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
					<script src="/static/js/AL/AL0302/AL0302_btn0.js"></script>
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
									<script src="/static/js/AL/AL0302/AL0302_fromtodate0.js"></script>
									<!-- <script src="/static/js/AL/AL0203/AL0203_subbtn1.js"></script>	 -->						
								</div>
								<div data-options="region:'east', border:false, minWidth:300, maxWidth:300">
									<div id="subbtn_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<div id="subbtn_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0302/AL0302_subbtn0.js"></script>
									<!-- <script src="/static/js/AL/AL0203/AL0203_subbtn2.js"></script> -->
								</div>
							</div>

						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<script src="/static/js/AL/AL0302/AL0302_dg1.js"></script>
						</div>
					</div>
				</div>				
				
				<!-- <div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							<div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<script src="/static/js/AL/AL0302/AL0302_fromtodate0.js"></script>
						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							datagrid1
							<script src="/static/js/AL/AL0302/AL0302_dg1.js"></script>
						</div>
					</div>
				</div> -->
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