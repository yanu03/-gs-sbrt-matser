<!-- 
íë¡ê·¸ë¨ëª : ì´ì ì ê´ë¦¬ 
ìì±ì : ë°ìì©
ìì±ì¼ : 2023.04.18
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
    	//ë°ì´í° ì¡°íì íë¼ë¯¸í°ë¥¼ ì í¨.
        let rtn_params;
        let v_searchVal = $('#sch_sb0').searchbox('getValue');
        if(a_obj.attr('id') == "dg0") rtn_params = {"TYPE" : "ALL", "CONTENT" : v_searchVal};
        
        return rtn_params;
    };
    $.pf_defaultparams = function(a_obj){
    	//ë°ì´í° ì¶ê°ì defaultê°ì ì í¨.
        let rtn_params; 
        if(a_obj.attr('id') == "dg0") rtn_params = {DRV_ID:$.jf_seqdgdata('/si/SI0300G0K0','post'), GPS_X : 0, GPS_Y : 0, TM_X: 0, TM_Y : 0};
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){$.jf_savedgdata($('#dg0'), '/si/SI0300G0S0', 'post', null);}
            else{$.tracomalmsg('ì ë³´', 'ë°ì´í°ê° ì ìì ì´ì§ ìì ì ì¥í  ì ììµëë¤.', null);}
        }
        else if(a_type == 'close'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), '/si/SI0300G0S0', 'post', null);  
                $.jf_close();
            }
            else $.tracomalmsg('ì ë³´', 'ë°ì´í°ê° ì ìì ì´ì§ ìì ì ì¥í  ì ììµëë¤.', null);  
        }
        else if(a_type == 'search'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g')){
                if($.jf_changeddg($('#dg0'), null)) $.jf_savedgdata($('#dg0'), '/common/updateCommonCo', 'post', 'search');
                $.jf_retrieve($('#dg0'));
            }
            else $.tracomalmsg('ì ë³´', 'ë°ì´í°ê° ì ìì ì´ì§ ìì ì ì¥í  ì ììµëë¤.', null);
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
    // ê¸°ë¥ : ì¬ì§, í´ì§, í´ì¬ ì¤ í´ì¬ë¥¼ ê³¨ëì ë í´ì§ì¼ì ì íí  ì ìë dateboxíì±í íë¤
    $.uf_chkeply = function(){
        let v_eplyvalue = $('#EPLY_YN').combobox('getValue');
        if(v_eplyvalue != "EY002"){
            $('#RETIRE_DT').datebox('disable');
        }else if(v_eplyvalue == "EY002"){
            $('#RETIRE_DT').datebox('enable');
        }

        return true;
    };
    // ê¸°ë¥ : ì¬ì§ì¬ë¶ ì íìì í´ì¬ ì¸ì ì íìíë©´ í´ì§ì¼ ì íì ë§ìì¤ë¤
    $.uf_chkretiredate = function(){
        let v_eplydate = $('#EPLY_DATE1').datebox('getValue');
        let v_eplyyn = $('#EPLY_YN').combobox('getText');
        if(v_eplyyn == 'í´ì¬'){
            $('#RETIRE_DT').datebox('setValue',v_eplydate);
        }else if(v_eplyyn != 'í´ì¬'){
            $('#RETIRE_DT').datebox('setValue','');
        }
    };
    // ê¸°ë¥ : ì¬ì§ì¬ë¶ì ë ì§ê° ìì¬ì¼ ë³´ë¤ ë®ê² ì¤ì íì§ ëª»íê² ë§ìì¤ë¤.
    $.uf_chkretiredt = function(a_value){
        let rtn_value;

        let v_fromdate = $('#EPLY_DATE1').datebox('getValue');
        let v_eplyyn = $('#EPLY_YN').combobox('getText');
        if(v_eplyyn == 'í´ì¬'){
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
    // ê¸°ë¥ : ì¬ì§ ì¡´ì¬ ì¬ë¶ íì¸ (ì²¨ë¶ ìì´ëì ì¬ë¶ë¡ ììë¸ë¤)
    // gridì ìµì¡° load ë ë ì²¨ë¶ ìì´ë(ATTACH_ID)ê° ìë ìë ìì Y/N ì¬ë¶ê° ëëë¤.
    $.uf_chkphoto = function(a_value){
        let v_vals;
        let v_idx = $('#dg0').datagrid('getRowIndex',$('#dg0').datagrid('getSelected'));
        if(a_value != "" && typeof(a_value) != "undefined"){
            v_vals = $.jf_singledatatojson("ATTACH_YN", "Y");
        }else{
            v_vals = $.jf_singledatatojson("ATTACH_YN", "N");
        }
        $('#dg0').datagrid('updateRow',{index:v_idx,row:v_vals});
        íì¤, ì§ì´, ì§ì°, íí¸, ì ì°¬
        return true;
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
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'ë¡ë©ì¤...'">
                    </div>
                    <!-- search js -->
                    <script src="/static/js/SI0300/SI0300_sch_searchbox0.js"></script>
                </div>
                <div data-options="region:'east', border:true, maxWidth:1000, minWidth:1000">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'ë¡ë©ì¤...'">
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
                    <div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'ë¡ë©ì¤...'">
                    </div>
                    <!-- form js -->
                    <script src="/static/js/SI0300/SI0300_editform0.js"></script> 
                </div>
                </form>
                <div data-options="region:'center', border:true">
                    <!-- dg panel -->
                    <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'ë¡ë©ì¤...'">
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

