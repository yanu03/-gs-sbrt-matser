<!-- 
프로그램명 : 운수사 정보 관리 
작성자 : 박원용
작성일 : 2023.04.11
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

    $.pf_ajaxafterproc = function(){
        if(a_type == 'search') $.jf_retrieve($('#dg0'));
        return true;
    }
    $.pf_childparams = function(a_obj, a_row){
        let rtn_params = {};
        return rtn_params;
    };
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
        if(a_obj.attr('id') == "dg0") rtn_params = {COMP_ID:$.jf_seqdgdata('http://localhost:8183/si/SI0102G0K0','post'), GPS_X : 0, GPS_Y : 0, TM_X: 0, TM_Y : 0};
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), 'http://localhost:8183/si/SI0102G0S0', 'post', null);
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
            
        }
        else if(a_type == 'close'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), 'http://localhost:8183/si/SI0102G0S0', 'post', null);  
                $.jf_close();
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
        }
        else if(a_type == 'search'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
                if($.jf_changeddg($('#dg0'), null)) $.jf_savedgdata($('#dg0'), 'http://localhost:8183/si/SI0102G0S0', 'post', 'search');
                $.jf_retrieve($('#dg0'));
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save') $.jf_resetdg($('#dg0'), 'ALL');
        if(a_type == 'search'){
            $.jf_resetdg($('#dg0'), 'ALL');
            $.jf_retrieve($('#dg0'));
        }
        if(a_type == 'close') $.jf_close();
        return true;
    };
    $.pf_deleteafter = function(a_obj){
        if($.jf_datalength($('#dg0')) == 0) $.jf_protectform($('#dg0'), $('#ef0'), true, 0);
        return true;
    }
    $.uf_chknumber = function(a_value, a_type){
        // debugger;
        let v_value;
        let v_reg = /[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z]/g;
        // value가 없으면 바로 리턴을 시켜준다.
        if(a_value.length < 1) return true;
        // value가 있을 경우 특수 문자 및 문자(한글, 영어)를 검사한다
        if(a_value.search(v_reg) > -1){
            // 있으면 textbox reset
            $('#'+ a_type).textbox('reset');
        }
        else{
            v_value = $.uf_changetext(a_value, a_type);
            let v_result = v_value.indexOf("-",4);
            if(v_result == 4 || v_result == -1 || v_value == "" ) $('#'+ a_type).textbox('reset');
            else $('#'+ a_type).textbox('setValue',v_value);
        }

        return true;
    };
    $.uf_changetext = function(a_value, a_type){
        // debugger;
        let rtn_value;
        let v_reg = /-/g;
        if(a_value.search(v_reg) < 0){
            if(a_type == "PHONE"){
                if(a_value.substr(0,2) == "02") a_value = a_value.substr(0,2) + '-' + a_value.substr(2, 3) + '-' + a_value.substr(5, 4);
                else a_value = a_value.substr(0,3) + '-' + a_value.substr(3, 4) + '-' + a_value.substr(7, 4);
            }
            else if(a_type == "FAX"){
                if(a_value.substr(0,2) == "02")a_value = a_value.substr(0,2) + '-' + a_value.substr(2, 3) + '-' + a_value.substr(5, 4);
                else a_value = a_value.substr(0,3) + '-' + a_value.substr(3, 3) + '-' + a_value.substr(6, 4); 
            }
            else if(a_type == "COMP_REG_NO"){
                a_value = a_value.substr(0,3) + '-' + a_value.substr(3,2) + '-' + a_value.substr(5,5);
            }
        }
        rtn_value = a_value;
        return rtn_value; 
    };

    $.uf_blocktext = function(a_value){
        let v_reg = /^[a-z|A-Z|ㄱ-ㅎ|가-힣]/g;
        if(a_value.search(v_reg) < 0){
            console.log(1);
        }
    }
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
                    <script src="/static/js/SI0102/SI0102_sch_searchbox0.js"></script>
                </div>
                <div data-options="region:'east', border:true, maxWidth:1000, minWidth:1000">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
                    <script src="/static/js/SI0102/SI0102_btn0.js"></script>
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
                    <script src="/static/js/SI0102/SI0102_editform0.js"></script> 
                </div>
                </form>
                <div data-options="region:'center', border:true">
                    <!-- dg panel -->
                    <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- dg js -->
                    <script src="/static/js/SI0102/SI0102_dg0.js"></script>
                </div>
            </div>
        </div>
	</div>	
</div>
</body>
</html>


