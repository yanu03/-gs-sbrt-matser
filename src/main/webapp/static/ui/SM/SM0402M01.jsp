<!-- 
프로그램명 : 사용자 권한 그룹 관리 
작성자 : 박원용
작성일 : 2023.05.01
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
    
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_rejectcfmsg = function(){return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_modalselect = function(a_obj){return true;};

    $.pf_childparams = function(a_obj, a_row){
        let rtn_params;
        if(a_obj.attr('id') == 'dg1') rtn_params = {AUTH_CD: a_row.AUTH_CD};
        return rtn_params;
    };   
    $.pf_combineparams = function(a_obj){
        let rtn_params;
        let v_searchVal = $('#sch_sb0').searchbox('getValue');
        let v_useYN = $('input[name = "YN"]:checked').val();
        rtn_params = {TYPE : "ALL", CONTENT : v_searchVal, USE_YN : v_useYN};
        console.log(rtn_params);
        return rtn_params;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let rtn_params = {};
        if(a_obj.attr('id') == 'dg0') rtn_params = {USE_YN : "Y", AUTH_CD : $.jf_seqdgdata('/authority/selectAuthorityKey','post')};
        if(a_obj.attr('id') == 'dg1') {
            let v_getauth = $('#dg0').datagrid('getSelected');
            rtn_params = {AUTH_CD : v_getauth.AUTH_CD};
        }
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
                // 저장시 차례대로 저장이 필요함 
                $.jf_savedgdata($('#dg0'), '/authority/saveAuthority', 'post', null);
                $.jf_savedgdata($('#dg1'), '/authority/saveAuthorityMember', 'post', null);
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        if(a_type == 'focussave'){
            if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){as
                $.jf_savedgdata($('#dg1'), '/authority/saveAuthorityMember', 'post', null);
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(a_type == 'search'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
                if($.jf_changeddg($('#dg0'), null)) $.jf_savedgdata($('#dg0'), '/member/updateMemberBasic', 'post', 'search');
                $.jf_retrieve($('#dg0'));
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save') $.jf_resetdg($('#dg0'));
        if(a_type == 'subsave') $.jf_resetdg($('#dg1'));
        if(a_type == 'focussave')$.jf_resetdg($('#dg1'));
        if(a_type == 'search'){
            $.jf_resetdg($('#dg0'), 'ALL');
            $.jf_retrieve($('#dg0'));
        }
        if(a_type == 'close') $.jf_close();
        return true;
    };
    $.pf_chkchilddata = function(a_obj){
        //data base를 조회한다.
        // db 조회가 안돼서 테스트를 못하니까
        //임시로 uf를 만들고 child datagrid에 데이터가 없는 것들을 임의로 삭제할 수 있게 
        // if($.uf_chkchild()) $.tracomalmsg('정보', '사용된 데이터가 있어 삭제할 수 없습니다.', null);
        // else 
        return true;
    };
    $.pf_ajaxafterproc = function(a_type){
        if(a_type == "search") $.jf_retrieve($('#dg0'));
        return true;
    };
    // 기능 : 사용자 ID가 중복된 ID인지 확인
    $.pf_validatedata = function(a_obj, a_idx, a_type){
        let rtn_value = true;
            if(a_obj.attr('id') == "dg1"){
                let v_userdatas = $('#dg1').datagrid('getRows');
                let v_ed = $('#dg1').datagrid('getEditor', {index:a_idx, field:'USER_ID'});
                let v_keyvalue = $(v_ed.target).textbox('getValue');

                for(let i=0; i < v_userdatas.length; i++){
                    if(v_userdatas[i].USER_ID == v_keyvalue) {
                        if(a_idx == i) rtn_value = true;
                        else rtn_value = false; break;
                    }
                }
                if(rtn_value == false) $.tracomalmsg('정보', '중복된 ID 입니다.', null);
            }
        return rtn_value;
    };
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true">
                <form> <!--form 으로 싸줘야 radiobutton이 재대로 작동한다-->
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- search js -->
                    <script src="/static/js/SM0402/SM0402_sch_searchbox0.js"></script>
                    <script src="/static/js/SM0402/SM0402_sch_radio0.js"></script>
                </div>
                </form>
                <div data-options="region:'east', border:true, maxWidth:1400, minWidth:1400">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
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
                            <script src="/static/js/SM0402/SM0402_dg0.js"></script>
                        </div>
                    </div>
                </div>
                <div data-options="region:'east', border:true, maxWidth:800, minWidth:800">
                    <div class="easyui-layout" data-options="fit:true" >
                        <div data-options="region:'north', border:true, minHeight:50, maxHeight:50">
                            <!-- btn1 panel -->
                            <div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>                            
                            <!-- btn1 js -->
                            <script src="/static/js/SM0402/SM0402_subbtn0.js"></script>
                        </div>
                        <div data-options="region:'center', border:true">
                            <!-- dg1 panel -->
                            <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg1 js -->
                            <script src="/static/js/SM0402/SM0402_dg1.js"></script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>	
</div>
</body>
</html>
<script src="/static/js/SM0402/SM0402_btn0.js"></script>
