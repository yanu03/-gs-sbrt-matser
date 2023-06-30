<!-- 
프로그램명 : 사용자 관리 
작성자 : 박원용
작성일 : 2023.04.28

수정자 : 박원용
수정일 : 2023.05.15
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
    $( document ).ready(function() {
    
    });

    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_modalselect = function(a_obj){return true;}

    $.pf_ajaxafterproc = function(a_type){
      if(a_type == 'search') $.jf_retrieve($('#dg0'));
      return true;
    }

    $.pf_combineparams = function(a_obj){
    	//데이터 조회시 파라미터를 정함.
        let rtn_param = {};
        let v_searchval = $('#sch_sb0').searchbox('getValue');
        if(a_obj.attr('id') == 'dg0') rtn_param = {TYPE : "ALL", CONTENT: v_searchval}; 
        
        return rtn_param;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let rtn_params;
        if(a_obj.attr('id') == 'dg0') rtn_params = {USE_YN : "Y", EMAIL : '', HP_NO : '', REMARK : ''};

        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                if($.uf_chkuserpw() && $.uf_chkuserid()) $.jf_savedgdata($('#dg0'), '/member/updateMemberBasic', 'post', null);
            }
            else{$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);}
        }
        else if(a_type == 'close'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), '/member/updateMemberBasic', 'post', null);  
                $.jf_close();
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
    // 기능 : 새로 추가한 데이터 사용자 ID readonly를 풀어준다
    $.uf_unlockbox = function(){
      let v_newRows = $('#dg0').datagrid('getChanges', 'inserted');
      let v_selectrow = $('#dg0').datagrid('getSelected');
      if(v_newRows.length > 0){
        for(let j=0; j<v_newRows.length; j++){
          if(v_selectrow.USER_ID == v_newRows[j].USER_ID) {
            $('#USER_ID').textbox('readonly',false);
            // 사용자를 새로 추가할 경우 비밀번호를 필수로 입력해야 하나? 
            // 라는 일이 있을 수 있기 때문에 주석으로 남겨 놓았습니다.
            //$('#USER_PS').textbox({required:true});
            //$('#CHK_USER_PS').textbox({required:true});
          }else{
            $('#USER_ID').textbox('readonly',true);
            //$('#USER_PS').textbox({required:false});
            //$('#CHK_USER_PS').textbox({required:false});
          }
        }        
      }
      return true;
    };
    // 기능 : 입력한 사용자 ID가 해당 그리드의 사용자 ID가 일치하지 않는지 확인
    $.uf_chkuserid = function(){
      
      let rtn_value = true;
      let v_userids = $('#dg0').datagrid('getRows');
      let v_newid = $('#dg0').datagrid('getSelected');

      for(let i=0; i<v_userids.length; i++){
        if(v_userids[i] != v_newid){
          if(v_userids[i].USER_ID == v_newid.USER_ID){
            rtn_value = false;
            break;
          }
        }
      }
      return rtn_value;
    };
    $.uf_combinechanges = function(){
      
      let rtn_value = 1;
      let v_inserted = $('#dg0').datagrid('getChanges','inserted');
      let v_updated = $('#dg0').datagrid('getChanges','updated');
      let v_changedatas;
      for(let i=0; i < v_inserted.length; i++){
        v_inserted[i].rowStatus = "C";
      }
      v_changedatas = [...v_inserted, ...v_updated];
      rtn_value = v_changedatas;
      return rtn_value;
    }
    // 기능 :  새 비밀번호가 일치하는지 확인한다
    $.uf_chkuserpw = function(){
      let rtn_value = true;
      let v_changedatas = $.uf_combinechanges();
      let v_changerow;
      let v_psvalue;
      let v_chkpsvalue;
      
        for(let i=0; i < v_changedatas.length; i++){
          v_psvalue = v_changedatas[i].NEW_USER_PS;
          v_chkpsvalue = v_changedatas[i].CHK_USER_PS;
          // focus 하기 위해 바뀐 row를 찾아준다.
          v_changerow = $('#dg0').datagrid('getRows').find(object => object === v_changedatas[i]);
          
          if(v_changedatas[i].rowStatus == "C"){
            delete v_changedatas[i].rowStatus;
            if(typeof(v_psvalue) == "undefined" || v_psvalue == ""){
                $.tracomalmsg('정보', '비밀번호를 입력해주세요', null);
                rtn_value = false;
                // 비밀번호를 입력하지 않은 곳에 focus
                $.jf_setfocus($('#dg0'), $('#dg0').datagrid('getRowIndex', v_changerow));
                break;
            }else{
              if(typeof(v_chkpsvalue) == "undefined" || v_chkpsvalue == "") {
                $.tracomalmsg('정보', '비밀번호 확인을 입력해주세요', null);
                rtn_value = false;
                // 비밀번호 확인을 입력하지 않은 곳에 focus
                $.jf_setfocus($('#dg0'), $('#dg0').datagrid('getRowIndex', v_changerow));
                break;
              }else{
                if(v_psvalue != v_chkpsvalue) {
                  $.tracomalmsg('정보', '새 비밀번호가 일치하지 않습니다. 확인후 다시 입력하십시오', null);
                  rtn_value = false;
                  // 비밀번호가 같지 않으면 틀린 row를 focus해준다.
                  $.jf_setfocus($('#dg0'), $('#dg0').datagrid('getRowIndex', v_changerow));
                  break;
                }
                else {
                  rtn_value = true;
                }
              }
            }
          }else{
            if(typeof(v_psvalue) == "undefined"){
              if(typeof(v_chkpsvalue) == "undefined") rtn_value = true;
              else {
                $.tracomalmsg('정보', '비밀번호를 입력해주세요', null);
                rtn_value = false;
                // 비밀번호를 입력하지 않은 곳에 focus
                $.jf_setfocus($('#dg0'), $('#dg0').datagrid('getRowIndex', v_changerow));
                break;
              }
            }else{
              if(typeof(v_chkpsvalue) == "undefined") {
                $.tracomalmsg('정보', '비밀번호 확인을 입력해주세요', null);
                rtn_value = false;
                // 비밀번호 확인을 입력하지 않은 곳에 focus
                $.jf_setfocus($('#dg0'), $('#dg0').datagrid('getRowIndex', v_changerow));
                break;
              }else{
                if(v_psvalue != v_chkpsvalue) {
                  $.tracomalmsg('정보', '새 비밀번호가 일치하지 않습니다. 확인후 다시 입력하십시오', null);
                  rtn_value = false;
                  // 비밀번호가 같지 않으면 틀린 row를 focus해준다.
                  $.jf_setfocus($('#dg0'), $('#dg0').datagrid('getRowIndex', v_changerow));
                  break;
                }
                else rtn_value = true;
              }
            }
          }
          delete v_changedatas[i].rowStatus;
          delete v_changedatas[i].CHK_USER_PS;
        }
      
      
        
      return rtn_value;
    }
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true" >
		<div data-options="region:'north', border:true, maxHeight: 350, minHeight:350">
      <div class="easyui-layout" data-options="fit:true" >
        <div data-options="region:'north', border:true, maxHeight: 50, minHeight:50"> 
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
                <!-- user searchbox panel -->
              <div id="sch_panel0"  class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- user searchbox js -->
              <script src="/static/js/SM/SM0401/SM0401_sch_searchbox0.js"></script>
            </div>
            <div data-options="region:'east', border:true, maxWidth:1200, minWidth:1200">
              <!-- user btn panel -->
              <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- user btn js -->
              <script src="/static/js/SM/SM0401/SM0401_btn0.js"></script>
            </div>
          </div>
        </div>
        <form id="ef0" method="post">
        <div data-options="region:'center', border:true">
          <!-- user form panel -->
          <div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
          </div>
          <!-- user form js -->
          <script src="/static/js/SM/SM0401/SM0401_editform0.js"></script>
        </div>
        </form>        
      </div>
    </div>
    <div data-options="region:'center', border:true ">
      <!-- user datagrid panel -->
      <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
      </div>
      <!-- user datagrid js  -->
      <script src="/static/js/SM/SM0401/SM0401_dg0.js"></script>
    </div>
	</div>
</div>
</body>
</html>


