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
		//if(a_obj.attr('id') == "dg0") rtn_params = {ROUT_ID:$.jf_seqdgdata('/si/SI0402G0K0', 'post')}
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
						data: JSON.stringify({'rows' : v_jsonDatas, 'dma_search' : v_paramDatas}),
						dataType: 'json',
						async: false,
						contentType: 'application/json; charset=utf-8',
						success: function(data){
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

	//선택한 날짜가 평일인지 휴일인지 판단(from to date), 코드값때문에 공통에 안넣었음
	$.uf_validdayftd = function(a_newValue, a_oldValue){
		let v_weeks = ['일', '월', '화', '수', '목', '금', '토']; 
		let v_dayOfWeek = v_weeks[new Date(a_newValue).getDay()];
			//평일, selectbox의 값을 넣었으나 추후 datagrid의 선택한 row의 요일의 값으로 바꿀수도 있음
			if($("#sch_lb0").combobox('getValue') == 'DY001'){ 
				if(v_dayOfWeek === '토' || v_dayOfWeek === '일'){
					$.tracomalmsg('정보', '평일을 선택해주세요.', null);
					return false;
				}
			}
			//휴일, selectbox의 값을 넣었으나 추후 datagrid의 선택한 row의 요일의 값으로 바꿀수도 있음
			else if($("#sch_lb0").combobox('getValue') == 'DY002'){ 
				if(v_dayOfWeek !== '토' && v_dayOfWeek !== '일'){
					$.tracomalmsg('정보', '휴일을 선택해주세요.', null);
					return false;
				}
			}
			return true;		
	}

	//선택한 날짜가 평일인지 휴일인지 판단(selectbox), 코드값때문에 공통에 안넣었음
	$.uf_validdaysb = function(a_newValue, a_oldValue){
		let v_weeks = ['일', '월', '화', '수', '목', '금', '토'];
		let v_dayOfWeekFdd = v_weeks[new Date($('#sch_fdd').datebox('getValue')).getDay()];
		let v_dayOfWeekTdd = v_weeks[new Date($('#sch_tdd').datebox('getValue')).getDay()];
			if(a_newValue == 'DY001'){ //휴일
				if(v_dayOfWeekFdd === '토' || v_dayOfWeekFdd === '일' || v_dayOfWeekTdd === '토' || v_dayOfWeekTdd ==='일'){
					$.tracomalmsg('정보', '휴일을 선택해주세요.', null);
					return false;
				}
			}
			else if(a_newValue == 'DY002'){ //평일
				if(v_dayOfWeekFdd !== '토' && v_dayOfWeekFdd !== '일' && v_dayOfWeekTdd !== '토' && v_dayOfWeekTdd !=='일'){
					$.tracomalmsg('정보', '평일을 선택해주세요.', null);
					return false;
				}
			}
			return true;		
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
					let v_weeks = ['일', '월', '화', '수', '목', '금', '토'];
					let v_startDate = new Date($('#sch_fdd').datebox('getValue'));
					let v_endDate = new Date($('#sch_tdd').datebox('getValue'));
					let v_newObj = {};
					let v_relDts = [];
					v_jsonDatas = [];
					v_paramDatas = [];
					while(v_startDate <= v_endDate){
						let v_dayOfWeek = v_weeks[v_startDate.getDay()];
						v_relDts.push(v_startDate.toISOString().split("T")[0]);
						v_startDate.setDate(v_startDate.getDate() + 1);
					}
					if(v_relDts.length != 0){
						for(var i=0; i<v_relDts.length; i++) {
							let v_newObj = {};
							v_paramDatas.push(v_newObj)-1;
							v_paramDatas[i]['OPER_DT'] = v_relDts[i];
							for(var j=0; j<v_allJson.rows.length; j++) {
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
							}
						}

						let v_alertStartDate = $('#sch_fdd').datebox('getValue');
						let v_alertEndDate = $('#sch_tdd').datebox('getValue');
						$.tracomcfmsg('확인', '해당 차량과 운전자를 배포 하시겠습니까? ('+ v_alertStartDate + '~' + v_alertEndDate+')', 'distri');
					}
				}
			}
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
					<script src="/static/js/AL/AL0302/AL0302_sch_selectbox0.js"></script>
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
						<script src="/static/js/AL/AL0302/AL0302_dg0.js"></script>
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
							<div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<!-- <script src="/static/js/AL0203_sch_selectbox0.js"></script> -->
							<script src="/static/js/AL/AL0302/AL0302_fromtodate0.js"></script>
						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--datagrid1 -->
							<!-- <script src="/static/js/AL0203_dg1_hidden.js"></script> -->
							<script src="/static/js/AL/AL0302/AL0302_dg1.js"></script>
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