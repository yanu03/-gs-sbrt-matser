<!-- 
작성자 : 박원용
작성일 : 2023.04.10
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
    $( document ).ready(function() { });
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_rejectcfmsg = function(){return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_modalselect = function(a_obj){return true;};

    $.pf_childparams = function(a_obj, a_row){
        let rtn_params;
        if(a_obj.attr('id') == 'dg1') rtn_params = {CO_CD: a_row.CO_CD};
        return rtn_params;
    };   
    $.pf_combineparams = function(a_obj){
        let rtn_params;
        let v_searchVal = $('#sch_sb0').searchbox('getValue');
        let v_useYN = $('input[name = "YN"]:checked').val();
        rtn_params = {TYPE : "CO_CD_NM", CONTENT : v_searchVal, USE_YN : v_useYN};

        return rtn_params;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let rtn_params = [];
        let v_sort = $.uf_getsort(a_obj);
        if(a_obj.attr('id') == 'dg0') rtn_params = {USE_YN : "Y", SORT : v_sort};
        if(a_obj.attr('id') == 'dg1') {
            let v_childkey = $.jf_curdgrow($('#dg0'));
            rtn_params = {USE_YN : "Y", SORT : v_sort, CO_CD : v_childkey.CO_CD};
        }
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
                if($.jf_changeddg($('#dg0'), null)){
                    $.uf_acceptcfmsg($('#dg0'), 'CO_CD');
                }
                if($.jf_changeddg($('#dg1'), null)) {
                    $.uf_acceptcfmsg($('#dg1'), 'DL_CD');
                }
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(a_type == 'subsave'){
            if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
                $.uf_acceptcfmsg($('#dg1'), 'DL_CD');
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(a_type == 'search'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
                if($.jf_changeddg($('#dg0'), null)){
                    $.uf_acceptcfmsg($('#dg0'), 'CO_CD');
                }
                if($.jf_changeddg($('#dg1'), null)){
                    $.uf_acceptcfmsg($('#dg1'), 'DL_CD');
                }
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(typeof(a_type) == 'number'){
            if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
                $.uf_acceptcfmsg($('#dg1'), 'DL_CD', a_type);
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save') $.jf_resetdg($('#dg0'));
        if(a_type == 'subsave') $.jf_resetdg($('#dg1'));
        if(a_type == 'search'){
            $.jf_resetdg($('#dg0'));
            $.jf_resetdg($('#dg1'));
            $.jf_retrieve($('#dg0'));
        }
        if(typeof(a_type) == 'number'){
            $.jf_resetdg($('#dg1'));
            $.jf_setfocus($('#dg0'), a_type);
        }
        if(a_type == 'close') $.jf_close();
        return true;
    };
    $.pf_chkchilddata = function(a_obj){
        //data base를 조회한다.
        // db 조회가 안돼서 테스트를 못하니까
        //임시로 uf를 만들고 child datagrid에 데이터가 없는 것들을 임의로 삭제할 수 있게 
        // $.tracomalmsg('정보', '사용된 데이터가 있어 삭제할 수 없습니다.', null);
        return true;
    };
    $.pf_ajaxafterproc = function(a_type){
        if(a_type == 'search') $.jf_retrieve($('#dg0'));
        return true;
	};
    // 기능 : 추가된 row의 공통코드를 edit을 할 수 있게 만들어줌
    $.uf_checkedit = function(a_obj, a_idx, a_field, a_row){
        let v_insertrow = a_obj.datagrid('getChanges', 'inserted');
        let v_selectedfield = a_obj.datagrid('getEditor', {index:a_idx, field:a_field})
        $(v_selectedfield.target).textbox('disable');
        if(v_insertrow.length > 0){
            for(let i = 0; i < v_insertrow.length; i++){
                if(v_insertrow[i] == a_row) $(v_selectedfield.target).textbox('enable');
            }
        }
        return true;
    };
    // 기능 : column 내에 sort 순서의 마지막에서 +1 해준다
    $.uf_getsort = function(a_obj){
        let rtn_value;
        let v_sort = a_obj.datagrid('getRows');
        for(let i = 0; i < v_sort.length; i++){
            rtn_value = v_sort[i].SORT;
        }
        if(typeof(rtn_value) == 'undefined') return 1;
        else{
            rtn_value = parseInt(rtn_value); 
            return rtn_value +1;
        } 
    };
    // 중복키 찾기
    $.uf_chkkey = function(a_obj, a_data, a_index, a_field){
        let rtn_value;
        let v_editorvalue;
        let v_inserted;

        if(a_data.length == 0) rtn_value = true;
        else{
            v_editorvalue = $.uf_chknewdata(a_obj, a_index, a_field);
            
            if(typeof(v_editorvalue) == 'undefined') rtn_value = true;
            else{
                for(let i=0; i < a_data.length; i++){
                    if(a_obj.attr('id') == 'dg0'){
                        if(typeof(a_data[i].CO_CD) != 'undefined'){
                            if(a_data[i].CO_CD == v_editorvalue) {
                                rtn_value = false;
                                break;
                            }
                            else rtn_value = true;
                        }
                    }
                    else if(a_obj.attr('id') == 'dg1'){
                        if(typeof(a_data[i].DL_CD) != 'undefined'){
                            if(a_data[i].DL_CD == v_editorvalue) {
                                rtn_value = false;
                                break;
                            }
                            else rtn_value = true;
                        }
                    }
                }
                if(rtn_value == false){
                    $.tracomalmsg('정보', '중복된 키값입니다 ');
                    $.jf_setfocus(a_obj, $.jf_fnddgstrct(a_obj));
                }
            }
            
        }
        return rtn_value;
    };
    // 추가된 row의 value를 반환
    $.uf_chknewdata = function(a_obj, a_index, a_field){
        let rtn_value;
        let v_inserted = a_obj.datagrid('getChanges','inserted');
        let v_editoroption;

        if(v_inserted.length > 0){
            v_editoroption = a_obj.datagrid('getEditor',{index:a_index, field:a_field});
            if(v_editoroption != null) rtn_value = $(v_editoroption.target).textbox('getValue');
        }

        return rtn_value;
    };

    // pf의 코드가 길어져서 반복되는 코드를 나눴습니다.
    $.uf_acceptcfmsg = function(a_obj, a_type, a_index){    
        if($.uf_chkkey(a_obj, a_obj.datagrid('getRows'),  $.jf_fnddgstrct(a_obj), a_type)) {
            if(typeof(a_index) != 'number') $.jf_endedit(a_obj, $.jf_fnddgstrct(a_obj));

            if(a_obj.attr('id') == 'dg0') $.jf_savedgdata(a_obj, 'http://localhost:8183/common/updateCommonCo', 'post', null);
            else if(a_obj.attr('id') == 'dg1') $.jf_savedgdata($('#dg1'), 'http://localhost:8183/common/selectCommonDtlUpdate', 'post', null);
        }
        return true;
    }
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true">
                <form>
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- search js -->
                    <script src="/static/js/SM0100/SM0100_sch_searchbox0.js"></script>
                    <script src="/static/js/SM0100/SM0100_sch_radio0.js"></script>
                </div>
                </form>
                <div data-options="region:'east', border:true, maxWidth:1400, minWidth:1400">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
                    <script src="/static/js/SM0100/SM0100_btn0.js"></script>
                </div>
            </div>
        </div>
        <div data-options="region:'center', border:true">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'center', border:true">
                    <div class="easyui-layout" data-options="fit:true" >
                        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
                            <!-- btn1 panel -->
                            <div id="btn_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- btn1 js -->
                        </div>
                        <div data-options="region:'center', border:true">
                            <!-- dg0 panel -->
                            <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg0 js -->
                            <script src="/static/js/SM0100/SM0100_dg0.js"></script>
                        </div>
                    </div>
                </div>
                <div data-options="region:'east', border:true, maxWidth:1200, minWidth:1200">
                    <div class="easyui-layout" data-options="fit:true" >
                        <div data-options="region:'north', border:true, minHeight:50, maxHeight:50">
                            <!-- btn1 panel -->
                            <div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>                            
                            <!-- btn1 js -->
                            <script src="/static/js/SM0100/SM0100_subbtn0.js"></script>
                        </div>
                        <div data-options="region:'center', border:true">
                            <!-- dg1 panel -->
                            <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg1 js -->
                            <script src="/static/js/SM0100/SM0100_dg1.js"></script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>	
</div>
</body>
</html>


