<!-- 
프로그램명 : 운전자 관리 
작성자 : 박원용
작성일 : 2023.04.18
-->
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
	<script type="text/javascript">
    $( document ).ready(function() {});
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_modalselect = function(a_obj){return true;}
    $.pf_childparams = function(a_obj, a_row){let rtn_params = {};return rtn_params;};

    $.pf_ajaxafterproc = function(){
        if(a_type == 'search') $.jf_retrieve($('#dg0'));
        return true;
    }
    $.pf_combineparams = function(a_obj){
    	//데이터 조회시 파라미터를 정함.
        let rtn_params;
        let v_searchVal = $('#sch_sb0').searchbox('getValue');
        if(a_obj.attr('id') == "dg0") rtn_params = {"TYPE" : "ALL", "CONTENT" : v_searchVal};
        
        return rtn_params;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let rtn_params; 
        if(a_obj.attr('id') == "dg0") rtn_params = {DRV_ID:$.jf_seqdgdata('/si/SI0300G0K0','post'), GPS_X : 0, GPS_Y : 0, TM_X: 0, TM_Y : 0};
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){$.jf_savedgdata($('#dg0'), '/si/SI0300G0S0', 'post', null);}
            else{$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);}
        }
        else if(a_type == 'close'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), '/si/SI0300G0S0', 'post', null);  
                $.jf_close();
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
        }
        else if(a_type == 'search'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g')){
                if($.jf_changeddg($('#dg0'), null)) $.jf_savedgdata($('#dg0'), '/common/updateCommonCo', 'post', 'search');
                $.jf_retrieve($('#dg0'));
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save')$.jf_resetdg($('#dg0'), 'ALL');
        if(a_type == 'search'){
            $.jf_resetdg($('#dg0'), 'ALL');
            $.jf_retrieve($('#dg0'));
        }
        if(a_type == 'close') $.jf_close();
        return true;
    };
    // 기능 : 재직, 휴직, 퇴사 중 퇴사를 골랐을 때 퇴직일을 선택할 수 있는 datebox활성화 한다
    $.uf_chkeply = function(){
        let v_eplyvalue = $('#EPLY_YN').combobox('getValue');
        if(v_eplyvalue != "EY002"){
            $('#RETIRE_DT').datebox('disable');
        }else if(v_eplyvalue == "EY002"){
            $('#RETIRE_DT').datebox('enable');
        }

        return true;
    };
    // 기능 : 재직여부 선택에서 퇴사 외의 선택을하면 퇴직일 선택을 막아준다
    $.uf_chkretiredate = function(){
        let v_eplydate = $('#EPLY_DATE1').datebox('getValue');
        let v_eplyyn = $('#EPLY_YN').combobox('getText');
        if(v_eplyyn == '퇴사'){
            $('#RETIRE_DT').datebox('setValue',v_eplydate);
        }else if(v_eplyyn != '퇴사'){
            $('#RETIRE_DT').datebox('setValue','');
        }
    };
    // 기능 : 재직여부의 날짜가 입사일 보다 낮게 설정하지 못하게 막아준다.
    $.uf_chkretiredt = function(a_value){
        let rtn_value;

        let v_fromdate = $('#EPLY_DATE1').datebox('getValue');
        let v_eplyyn = $('#EPLY_YN').combobox('getText');
        if(v_eplyyn == '퇴사'){
            if(v_fromdate.length < 1) rtn_value = false;
            else if(a_value < v_fromdate){
                $('#RETIRE_DT').datebox('setValue', v_fromdate);
                rtn_value = true;
            } 
        }else{
            rtn_value =  true;
        } 
        return rtn_value;
    }
    // 기능 : 사진 존재 여부 확인 (첨부 아이디의 여부로 알아낸다)
    // grid에 최조 load 될때 첨부 아이디(ATTACH_ID)가 있냐 없냐 에서 Y/N 여부가 나뉜다.
    $.uf_chkphoto = function(a_value){
        let v_vals;
        let v_idx = $('#dg0').datagrid('getRowIndex',$('#dg0').datagrid('getSelected'));
        if(a_value != "" && typeof(a_value) != "undefined"){
            v_vals = $.jf_singledatatojson("ATTACH_YN", "Y");
        }else{
            v_vals = $.jf_singledatatojson("ATTACH_YN", "N");
        }
        $('#dg0').datagrid('updateRow',{index:v_idx,row:v_vals});
        return true;
    }
    

	$.uf_preview = function(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById('picture').src = e.target.result;
			};
			reader.readAsDataURL(input.files[0]);
		} else {
			document.getElementById('picture').src = "";
		}
	}
	
	/* $.uf_filesave = function(input) {
		var form = $("#filefrm")[0];
		var formData = new FormData(form);

		$('#path').val("SI0300"); //저장시 파일 경로

		$.ajax({
			type : 'POST',
			enctype : 'multipart/form-data',
			url : '/cm/fileUploadAction',
			data : formData,
			processData : false,
			contentType : false,
			cache : false,
			success : function(data) {
				debugger;
				$('#ATTACH_ID')
						.textbox('setValue', data.rows[0].atchFileId);
			},
			error : function(e) {
				//$('#result').text(e.responseText);
				console.log('ERROR : ', e);
			}
		});
	} */
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true" >
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- search js -->
                    <script src="/static/js/SI0300/SI0300_sch_searchbox0.js"></script>
                </div>
                <div data-options="region:'east', border:true, maxWidth:1000, minWidth:1000">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
                    <script src="/static/js/SI0300/SI0300_btn0.js"></script>
                </div>
            </div>
        </div>
        <div data-options="region:'center', border:true">
            <div class="easyui-layout" data-options="fit:true" >
                <form id="ef0" style="border:0px solid red;">
                <div data-options="region:'north', border:true, minHeight:350, maxHeight:350">
                    <!-- form panel -->
                    <div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- form js -->
                    <script src="/static/js/SI0300/SI0300_editform0.js"></script> 
                </div>
                </form>
                <div data-options="region:'center', border:true">
                    <!-- dg panel -->
                    <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- dg js -->
                    <script src="/static/js/SI0300/SI0300_dg0.js"></script>
                </div>
            </div>
        </div>
	</div>	
</div>
<div id="selcomp">
    <script src="/static/js/modal_selcomp.js"></script>
</div>
</body>
</html>

