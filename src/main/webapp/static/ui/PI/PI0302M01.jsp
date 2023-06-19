<!-- 
  프로그램 명 : 뉴스관리 html
  작성자 : 박원용
  작성일 : 2023.04.25
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
	<script type="text/javascript">
    $( document ).ready(function() {
    
    });
    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_modalselect = function(a_obj){return true;};
    $.pf_ajaxafterproc = function(){return true;};
    $.pf_defaultparams = function(a_obj){let params;params = {};return params;};
    $.pf_rejectcfmsg = function(a_type){return true;};
    $.pf_acceptcfmsg = function(a_type){return true;};

    $.pf_ajaxafterproc = function(){
        $.jf_retrieve($('#dg0'));
        return true;
    }
    $.pf_combineparams = function(a_obj){
    	//데이터 조회시 파라미터를 정함.
        let rtn_param = {};
        let v_searchVal = $('#sch_sb0').searchbox('getValue');
        if(a_obj.attr('id') == 'dg0') rtn_param = {TYPE : "ALL", CONTENT: ""}; 
        
        return rtn_param;
    };
    
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north', border:true, maxHeight: 50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center', border:true ">
                    <!-- news search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- news search js -->
                    <script src="/static/js/PI/PI0302/PI0302_sch_searchbox0.js"></script>
                </div>
                <div data-options="region:'east', border:true, maxWidth:600, minWidth:600">
                    <!-- news btn panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- news btn js -->
                    <script src="/static/js/PI/PI0302/PI0302_btn0.js"></script>
                </div>
            </div>
        </div>
        <div data-options="region:'center', border:true ">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center', border:true ">
                    <!-- news panel -->
                    <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- news dg0 js -->
                    <script src="/static/js/PI/PI0302/PI0302_dg0.js"></script>
                </div>
                <div data-options="region:'east', border:true, maxWidth:700, minWidth:700">
                    <!-- send news panel -->
                    <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- send news js -->
                    <script src="/static/js/PI/PI0302/PI0302_dg1.js"></script>
                </div>
            </div>
        </div>
	</div>
</div>
</body>
</html>