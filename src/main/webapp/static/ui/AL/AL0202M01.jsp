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
	<script type="text/javascript" src="/static/jquery/jquery.fileDownload-1.4.5.js"></script> 
	<script src="/static/js/common/sample_comm.js"></script>
	<script type="text/javascript">
		$( document ).ready(function() {
    });

	var js_allocId = null;
	var js_dayDiv = null;
	var js_wayDiv = null;

	var uv_routmap ={
		"ALLOC_ID" : 10,
		"SN" : 5,
		"ALLOC_NO" : 2,
		"ROUT_ID" : 10
	}

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
		if(a_obj.attr('id') == "dg0") rtn_params = {ALLOC_ID:$.jf_seqdgdata('/AL/AL0202G0K0', 'post')}
		if(a_obj.attr('id') == "dg1") {
			let v_row = $.jf_curdgrow($('#dg0'));
			let v_allocNo = ($.jf_curdgrow($('#dg1')) !== null ? $.jf_curdgrow($('#dg1'))['ALLOC_NO'] : null) || 1;
			/* rtn_params = {
			ALLOC_ID: v_row.ALLOC_ID, DAY_DIV: v_row.DAY_DIV, WAY_DIV: v_row.WAY_DIV, OPER_SN:$.jf_seqdgdata('/AL/AL0202G1K0', 'post'),
			DAY_DIV_NM : v_row.DAY_DIV_NM, WAY_DIV_NM: v_row.WAY_DIV_NM, ROUT_ID: v_row.ROUT_ID} */
			rtn_params = {ALLOC_ID: v_row.ALLOC_ID, ALLOC_NO:v_allocNo, isNew:true
					}
		}
		

    	return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

	$.pf_acceptcfmsg = function(a_type){
		if(a_type == 'save'){
			if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') ){
				$.jf_savedgdata($('#dg0'), '/AL/AL0202G0S0', 'post', null)
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
		}
		if(a_type == 'excelupload'){
				$("#excelupload_p0").window('open');
					$("#excelinputfile").val('');
			}
		if(typeof(a_type) == 'number'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
				$.jf_savedgdata($('#dg1'), '/al/AL0202G1S0', 'post', null)	//그리드 순서에 따른 전체 저장 부분 갱신 필요
			}
			else
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);				
		}
		if(a_type == 'subsave'){
			if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
				$.jf_savedgdata($('#dg1'), '/al/AL0202G1S0', 'post', null)
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
		if(typeof(a_type) == 'number'){
			$.jf_resetdg($('#dg1'));
			$.jf_setfocus($('#dg0'), a_type);
		}
		if(a_type == 'subsave'){
			$.jf_resetdg($('#dg1'));
		}
		return true;
	}

	$.pf_ajaxafterproc = function(a_type){
		//저장 ajax 동작후 call back 함수
		if(a_type == 'search') $.jf_retrieve($('#dg0'));
		return true;
	}		

	$.pf_childparams = function(a_obj, a_row){
		let rtn_params;
		if(a_obj.attr('id') == 'dg1') {
			// rtn_params = {ALLOC_ID: a_row.ALLOC_ID, DAY_DIV: a_row.DAY_DIV, WAY_DIV: a_row.WAY_DIV}
			// let wayDiv = $('#DAY_DIV').combobox('getData');
			rtn_params = {ALLOC_ID: a_row.ALLOC_ID, DAY_DIV: a_row.DAY_DIV} //상하행 조건 제외하는걸로 변경
			js_allocId = a_row.ALLOC_ID;
			js_dayDiv = a_row.DAY_DIV;
			// js_wayDiv = a_row.WAY_DIV; //상하행 조건 제외하는걸로 변경
		}
		return rtn_params;
	}
	
	//시간 유효성 체크
	$.uf_timeValid = function(a_value, a_param){
		if(a_value.toString().length != 5) return false;
		let v_timeSplit = a_value.split(':');
		if(v_timeSplit.length != 2) return false;
		else{
			if(isNaN(parseInt(v_timeSplit[0])) || isNaN(parseInt(v_timeSplit[1]))) return false;
			if(parseInt(v_timeSplit[0]) < 0 || 23 < parseInt(v_timeSplit[0])) return false;
			if(parseInt(v_timeSplit[1]) < 0 || 59 < parseInt(v_timeSplit[1])) return false;
		}
		
		let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		//if($.jf_isempty(v_convertValue)) return false;
		//실시간 편집중인 값 가져오기 위함
		//let v_editors = $('#dg1').datagrid('getEditors', $.jf_curdgindex($('#dg1')));
		//let v_stTimeEditor = v_editors.find(editor => editor.field === 'ROUT_ST_TM');
		let v_stTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ROUT_ST_TM'});
		let v_curStTime = $.jf_converttime($(v_stTimeEditor.target).textbox('getText'));
		//let v_edTimeEditor = v_editors.find(editor => editor.field === 'ROUT_ED_TM');
		let v_edTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ROUT_ED_TM'});
		let v_curEdTime = $.jf_converttime($(v_edTimeEditor.target).textbox('getText'));
		
		//let v_curStTime = $('#dg1').datagrid('getSelected').ROUT_ST_TM;
		//let v_curEdTime = $('#dg1').datagrid('getSelected').ROUT_ED_TM;
	    //let v_curStTime = $.jf_converttime($.jf_curdgfieldvalue($('#dg1'), 'ROUT_ST_TM')) || new Date(-8640000000000000); //현재 선택된 노선시작값, 수정전
	    //let v_curEdTime = $.jf_converttime($.jf_curdgfieldvalue($('#dg1'), 'ROUT_ED_TM')) || new Date(8640000000000000); //현재 선택된 노선종료값, 수정전
		if(a_param == 'ROUT_ST_TM'){
			if(v_convertValue >= v_curEdTime) return false;
		}
		if(a_param == 'ROUT_ED_TM'){
			if(v_convertValue <= v_curStTime) return false;
		}
		
		return true;
	}	
	
	//시간 범위 유효성 체크
	//참고: validate function에서 a_value 파라미터는 사용자가 수정하는 값, $.jf_curdgfieldvalue는 수정되기 전 값이 리턴됨
	$.uf_timeRangeValid = function(a_value, a_param) {
		//실시간 편집중인 값 가져오기 위함
		//let v_editors = $('#dg1').datagrid('getEditors', $.jf_curdgindex($('#dg1')));
		let v_allocNoEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ALLOC_NO'});
		let v_allocNo = $(v_allocNoEditor.target).textbox('getText');
		//let v_allocNo = $.jf_curdgfieldvalue($('#dg1'), 'ALLOC_NO');
		//if($.jf_isempty(v_allocNo) || $.jf_isempty(a_value)) return false;
		let v_convertValue = $.jf_converttime(a_value); //사용자 수정값
		
		//let v_stTimeEditor = v_editors.find(editor => editor.field === 'ROUT_ST_TM');
		let v_stTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ROUT_ST_TM'});
		let v_curStTime = $.jf_converttime($(v_stTimeEditor.target).textbox('getText'));
		//let v_edTimeEditor = v_editors.find(editor => editor.field === 'ROUT_ED_TM');
		let v_edTimeEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ROUT_ED_TM'});
		let v_curEdTime = $.jf_converttime($(v_edTimeEditor.target).textbox('getText'));		
		
		//let v_curStTime = $.jf_converttime($.jf_curdgfieldvalue($('#dg1'), 'ROUT_ST_TM')); //현재 선택된 노선시작값, 수정전
		//let v_curEdTime = $.jf_converttime($.jf_curdgfieldvalue($('#dg1'), 'ROUT_ED_TM')); //현재 선택된 노선종료값, 수정전
		
		// if 'ROUT_ST_TM' is being edited and 'ROUT_ED_TM' is not set yet
		if (a_param === 'ROUT_ST_TM' && $.jf_isempty(v_curEdTime)) {
			v_curEdTime = v_convertValue;
		}
		// if 'ROUT_ED_TM' is being edited and 'ROUT_ST_TM' is not set yet
		else if (a_param === 'ROUT_ED_TM' && $.jf_isempty(v_curStTime)) {
			v_curStTime = v_convertValue;
		}
	
		let v_data = $.jf_getdata($('#dg1'));
		for(var i=0; i<v_data.length; i++) {
			if($.jf_curdgindex($('#dg1')) == i) continue;
			if(v_data[i]['ALLOC_NO'].toString() === v_allocNo.toString()) {
				if($.jf_converttime(v_data[i]['ROUT_ST_TM']) < v_convertValue && v_convertValue < $.jf_converttime(v_data[i]['ROUT_ED_TM'])) return false;
				if(a_param == 'ROUT_ST_TM'){
					if(v_convertValue < $.jf_converttime(v_data[i]['ROUT_ST_TM']) && $.jf_converttime(v_data[i]['ROUT_ST_TM']) < v_curEdTime) return false;
				}
				else if(a_param == 'ROUT_ED_TM'){
					if(v_curStTime < $.jf_converttime(v_data[i]['ROUT_ED_TM']) && $.jf_converttime(v_data[i]['ROUT_ED_TM']) < v_convertValue) return false;
				}
			}
		}
		return true;
	}
	// -------------------------------- excel upload ---------------------------------------

	$.uf_exlvalidatedata = function(){
        let rtn_value = true;
        let v_data = $('#dg1').datagrid('getRows');
				let v_allocno = [];
				let v_maxallocno;
				let v_deduplicateallocno = [];
				// 업로드된 그리드의 배차번호 얻기
				for(let i=0; i < v_data.length; i++){
					v_allocno.push(v_data[i].ALLOC_NO);
				}
				v_maxallocno = Math.max(...v_allocno);

				// 얻은 배차번호의 중복 제거 
				v_allocno.forEach((nonduple) => {
						if(!v_deduplicateallocno.includes(nonduple)){
							v_deduplicateallocno.push(nonduple);
						}
				});

        for(let i=0; i < v_data.length; i++){
            if(v_data[i].msg != null && typeof(v_data[i].msg) != 'undefined'){
							if(!$.uf_subvalidate(v_data[i], "msg","")){
									rtn_value = false;
							} 
            }
        }

				if(!$.uf_subvalidate(v_data, "alloc_no", v_deduplicateallocno)) rtn_value = false;

        return rtn_value;
    }

    $.uf_subvalidate = function(a_data, a_type, a_allocno){
        let rtn_value = true;
				let v_starttimes = [];
				let v_cnt = 0;

				if(a_type == "msg"){
					for(key in a_data){
							for(key2 in uv_routmap){
									if(key == key2){
											if(a_data[key].length > uv_routmap[key2]){
												rtn_value = false;
											}
									}
							}
					}
				}
				else if(a_type == "alloc_no"){
						loop: for(let i=0; i < a_allocno.length; i++){
								for(let j=0; j < a_data.length; j++){
										if(a_allocno[i] == a_data[j].ALLOC_NO){
												// 여기서 배차번호 기준 데이터 만든다
												v_starttimes.push(a_data[j].ROUT_ST_TM);
										}
								}
								for(let data of v_starttimes){
										v_starttimes.filter((value) => {
												if(data == value) v_cnt++;
										});
										if(v_cnt > 1) {
												rtn_value = false;
												break loop;
										}
										v_cnt = 0;
								}
								v_starttimes = [];
							}
				}		

				rtn_value = false;
        return rtn_value;
    }

    $.uf_updategrid = function(a_obj, a_data){      
        a_obj.datagrid('loadData',[]);
        for(let i=0; i < a_data.length; i ++){
						a_obj.datagrid('appendRow', a_data[i]);

            if(a_data[i].msg != null && typeof(a_data[i].msg) != 'undefined'){
                a_obj.datagrid('freezeRow', i);
                a_data[i].REMARK += ' msg : ' + a_data[i].msg;
            }
        }
        $.jf_setfocus(a_obj, -1);
        $.jf_setfooter(a_obj);

        return true;
    }
    
    $.uf_reupdate = function(a_obj, a_data){
        if(typeof(a_data[0]['errorMsg']) != "undefined"){
            top.$.tracomalmsg('정보', a_data[0]['errorMsg'], null);  
        }else{
            $.uf_updategrid(a_obj, a_data);
        }
    }
    
    $.uf_excelupload = function(a_obj, a_form, url){
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: url,
            data: a_form,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {
							console.log(data);
                $.uf_reupdate(a_obj, data['rows']);
            },
            error: function(e) {
                if (e.status == 403) {
                    alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
                    top.location.replace("/user/login");
                }
                console.log('ERROR : ', e);
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
					<script src="/static/js/AL/AL0202/AL0202_btn0.js"></script>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">	
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'west', border:false, minWidth:700, maxWidth:700">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'center', border:false">
							<div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>
							<script src="/static/js/AL/AL0202/AL0202_dg0.js"></script>
						</div>			
						<!--datagrid0 -->
					</div>
				</div>
				<div data-options="region:'center', border:false">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north', border:true, maxHeight:33, minHeight:33">
							<div class="easyui-layout" data-options="fit:true">
								<div data-options="region:'west', border:false, minWidth:220, maxWidth:220">
									<div id="subsch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<script src="/static/js/AL/AL0202/AL0202_subsch_searchbox0.js"></script>
								</div>

								<div data-options="region:'center', border:false">
									<div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
									</div>
									<!--sub button -->
									<script src="/static/js/AL/AL0202/AL0202_subbtn0.js"></script>
								</div>
							</div>

						</div>
						<div data-options="region:'center', border:true">
							<div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
							</div>	
							<!--datagrid1 -->
							<script src="/static/js/AL/AL0202/AL0202_dg1.js"></script>
								<div id="excelupload_p0" class="easyui-window" title="엑셀 업로드" data-options="modal:true,closed:true,iconCls:'icon-save'"
									style="width:500px;height:200px;padding:10px;">
									<form id="excelfrm" name="excelfrm" method="post" enctype="multipart/form-data">
												<input id="excelinputfile" name="excelinputfile" type="file"/>
										</form>
								</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="selrout">
    <script src="/static/js/common/modal_selrout.js"></script>
</div>

</body>
</html>