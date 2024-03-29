<!-- 
프로그램명 : 뉴스/기상 설정
작성자 : 박원용
작성일 : 2023.04.24
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
	<script src="/static/js/common/sample_comm.js"></script>
    <script type="text/javascript" src="/static/jquery/jquery.fileDownload-1.4.5.js"></script> 
	<script type="text/javascript">
    $( document ).ready(function() {});
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_defaultparams = function(a_obj){return true;};
    $.pf_modalselect = function(a_obj){return true;};

    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') ){
                $.jf_savedgdata($('#dg0'), '/sm/SM0700G0S0', 'post', null);
            }
            else{$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);}
        }
        else if(a_type == 'close'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') ){
                $.jf_savedgdata($('#dg0'), '/sm/SM0700G0S0', 'post', null);  
                $.jf_close();
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
        }
        else if(a_type == 'search'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') ){
                $.jf_savedgdata($('#dg0'), '/sm/SM0700G0S0', 'post', null);  
                $.jf_retrieve($('#dg0'));
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save')$.jf_resetdg($('#dg0'), 'ALL');
        if(a_type == 'close') $.jf_close();
        if(a_type == 'search'){
            $.jf_resetdg($('#dg0'), 'ALL');
            $.jf_retrieve($('#dg0'));
        }
        return true;
    };

    $.pf_ajaxafterproc = function(){
        $.jf_retrieve($('#dg0'));
        return true;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let rtn_params;
        if(a_obj.attr('id') == "dg0"){
            rtn_params = {INTG_ID:$.jf_seqdgdata('/sm/SM0700G0K0','post')};
        }
        return rtn_params;
    };
    $.pf_combineparams = function(a_obj){
        let rtn_params = {};
        let v_searchVal = $('#sch_sb0').searchbox('getValue');
        rtn_params = {CONTENT : v_searchVal, TYPE : "ALL"}; 
        
        return rtn_params;
    };
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
                <!-- search panel -->
                <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- search js -->
                <script src="/static/js/SM/SM0700/SM0700_sch_searchbox0.js"></script>
            </div>
            <div data-options="region:'east', border:true, maxWidth:800, minWidth:800">
                <!-- btn panel -->
                <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- btn js -->
                <script src="/static/js/SM/SM0700/SM0700_btn0.js"></script>
            </div>
        </div>
        </div>
        <div data-options="region:'center', border:true">
            <!-- dg panel -->
            <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
            </div>
            <!-- dg js -->
            <script src="/static/js/SM/SM0700/SM0700_dg0.js"></script>
        </div>
	</div>
</div>
</body>
</html>

