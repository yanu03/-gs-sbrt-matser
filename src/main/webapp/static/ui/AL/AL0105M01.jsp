<!-- 
프로그램명 : 베차별 운전자 관리
작성자 : 박원용
작성일 : 2023.04.06
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
    $( document ).ready(function() {
    
    });
    // dg1과 dg2를 비교해서 dg1에서 dg2와 데이터가 같으면 같은 데이터를
    // 제외 해주려고 전역변수를 선언
    var uv_dg1data;
    var uv_dg2data;
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};    
    $.pf_setfocus = function(a_obj, a_idx){return true;};    
    $.pf_retrieve = function(a_obj) {return true;};    
    $.pf_childretrieve = function(){return true;};    
    $.pf_setfooter = function(a_obj){return true;};
	$.pf_modalselect = function(a_obj){return true;};

    $.pf_defaultparams = function(a_obj){
        let params;
        params = {};
        return params;
    };
    $.pf_combineparams = function(a_obj){
        let params;
        let searchVal = $('#sch_sb0').searchbox('getValue');
        if(a_obj.attr('id') == 'dg0')params = {TYPE : "ALL", CONTENT : searchVal};
        
        return params;
    };    
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            $.jf_savedgdata($('#dg2'), '/al/AL0105G2S0', 'post', null);	
        }
        if(a_type == 'search'){
            $.jf_savedgdata($('#dg2'), '/al/AL0105G2S0', 'post', null);	
            $.jf_retrieve($('#dg0'));
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save'){
            $.jf_resetdg($('#dg1'));
            $.jf_resetdg($('#dg2'));
        }
        if(a_type == 'close') $.jf_close();
        if(a_type == 'search'){
            $.jf_resetdg($('#dg0'), 'all');
            $.jf_retrieve($('#dg0'));
        }
        return true;
    };
    $.pf_childparams = function(a_obj, a_row){
        let rtn_params;
        if(a_obj.attr('id') == 'dg2') rtn_params = {ALLOC_ID: a_row.ALLOC_ID};
        if(a_obj.attr('id') == 'dg1') params = {TYPE : ""};
        return rtn_params;
    }
    // 
    $.uf_movevhc = function(a_type){
        let v_allocid = $('#dg0').datagrid('getSelected');
        if(a_type == "add"){
            let v_notallocatedvhc = $('#dg1').datagrid('getSelected');
            v_notallocatedvhc.ALLOC_ID = v_allocid.ALLOC_ID;
            if(v_notallocatedvhc != null){
                $.jf_append($('#dg2'),v_notallocatedvhc);
                $.jf_delete($('#dg1'));
            }
        }else if(a_type == "del"){
            let v_assignedvhc = $('#dg2').datagrid('getSelected');
            if(v_assignedvhc != null){
                $.jf_append($('#dg1'),v_assignedvhc);
                $.jf_delete($('#dg2'));    
            }
        }
    };

    $.uf_comparedata = function(){
        let v_dg1data = uv_dg1data;
        if(typeof(uv_dg2data) != 'undefined' && typeof(uv_dg1data) != 'undefined'){
            for(let i=0; i < uv_dg2data.length; i++){
                for(let j=0; j < v_dg1data.length; j++){
                    if(uv_dg2data[i].DRV_ID === v_dg1data[j].DRV_ID) {
                        $('#dg1').datagrid('deleteRow',j);
                    }
                }
            }
            
        }
        return true;
    };
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true" >
        <div data-options="region:'north', border:true, minHeight:50, maxHeight:50">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'"></div>
                    <!-- search js -->
                    <!-- <script src="/static/js/AL0105/AL0105_sch_selectbox0.js"></script> -->
                    <script src="/static/js/AL0105/AL0105_sch_searchbox0.js"></script>
                </div>
                <div data-options="region:'east', border:true, minWidth:800, maxWidth:800">
                    <!-- btn panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'"></div>
                    <!-- btn js -->   
                    <script src="/static/js/AL0105/AL0105_btn0.js"></script>
                </div>        
            </div>
        </div>
        <div data-options="region:'center', border:true">  
            <!-- dg0 panel -->
            <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
            </div>
            <!-- dg0 js -->
            <script src="/static/js/AL0105/AL0105_dg0.js"></script>
        </div>
        <div data-options="region:'east', border:true, width:1600">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center', border:true, width:775">
                    <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'north', border:true,minHeight:30, maxHeight:30">
                            <!-- dg1 panel -->
                            <div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg1 js -->
                            <script src="/static/js/AL0105/AL0105_sch_searchbox1.js"></script>
                        </div>
                        <div data-options="region:'center', border:true">
                            <!-- dg1 panel -->
                            <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg1 js -->
                            <script src="/static/js/AL0105/AL0105_dg1.js"></script>
                        </div>
                    </div>
                </div>
                <div data-options="region:'east', border:true, width:825">
                    <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'west', border:true, width:50">
                            <!-- move btn panel -->
                            <div id="btn_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- move btn js -->
                            <script src="/static/js/AL0105/AL0105_subbtn0.js"></script>
                        </div>
                        <div data-options="region:'center', border:true, width:775">
                            <!-- dg2 panel -->
                            <div id="dg_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg2 js -->
                            <script src="/static/js/AL0105/AL0105_dg2.js"></script>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
	</div>	
</div>
</body>
</html>