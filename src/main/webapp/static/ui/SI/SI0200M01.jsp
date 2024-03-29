<!-- 
프로그램명 : 차량관리
작성자 : 박원용
작성일 : 2023.04.12
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
	<script type="text/javascript" src="/static/jquery/jquery.fileDownload-1.4.5.js"></script> 
	<script src="/static/js/common/sample_comm.js"></script>
	<script type="text/javascript">
    $( document ).ready(function() {});

    let uv_vhcmap = {
        "VHC_ID" : 10,
        "COMP_ID" : 10,
        "AREA" : 5,
        "CHAS_NO" : 17,
        "MAKER" : 5,
        "RELS_DT" : 10,
        "MODEL_NM" : 30,
        "ROUT_TYPE" : 5,
        "VHC_TYPE" : 5,
        "VHC_KIND" : 5,
        "VHC_FUEL" : 5,
        "PSG_CNT" : 5,
        "REMARK" : 200
    };

    $.pf_append = function(){return true;}
    $.pf_delete = function(){ return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_childparams = function(a_obj, a_row){let rtn_params = {};return rtn_params;};
    $.pf_modalselect = function(a_obj){return true;};

    $.pf_ajaxafterproc = function(a_type){
        if(a_type == 'search') $.jf_retrieve($('#dg0'));
        return true;
    }
    $.pf_chkchilddata = function(a_obj){
        //$.tracomalmsg('정보', '사용된 데이터가 있어 삭제 할 수 없습니다.', null);
        return true;/*data base를 조회한다.*/
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
        if(a_obj.attr('id') == "dg0") rtn_params = {VHC_ID:$.jf_seqdgdata('/si/SI0200G0K0','post'), USE_YN : "Y"};
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') && $.uf_validatedata()){$.jf_savedgdata($('#dg0'), '/si/SI0200G0S0', 'post', null);}
            else{$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);}
        }
        else if(a_type == 'close'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') && $.uf_validatedata()){
                $.jf_savedgdata($('#dg0'), '/si/SI0200G0S0', 'post', null);  
                $.jf_close();
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
        }
        else if(a_type == 'search'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') && $.uf_validatedata()){
                if($.jf_changeddg($('#dg0'), null)) {
                    $.jf_savedgdata($('#dg0'), '/si/SI0200G0S0', 'post', 'search');
                }
                $.jf_retrieve($('#dg0'));
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(a_type == 'excelupload'){
            $("#excelupload_p0").window('open');
            $("#excelinputfile").val('');
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
    $.pf_deleteafter = function(a_obj){
        if($.jf_datalength($('#dg0')) == 0) $.jf_protectform($('#dg0'), $('#ef0'), true, 0);
        return true;
    }

    $.uf_exlvalidatedata = function(){
        let rtn_value = true;
        let v_data = $('#dg0').datagrid('getRows');

        for(let i=0; i < v_data.length; i++){
            if(v_data[i].msg != null && typeof(v_data[i].msg) != 'undefined'){
                if(!$.uf_subvalidate(v_data[i])) rtn_value = false;
            }
        }

        return rtn_value;
    }

    $.uf_subvalidate = function(a_data){
        
        let rtn_value = true;
        
        for(key in a_data){
            // debugger;
            for(key2 in uv_vhcmap){
                if(key == key2){
                    if(a_data[key].length > uv_vhcmap[key2]){
                        rtn_value = false;
                        //if(rtn_value == false) console.log("key : " + key+ ", value : " + a_data[key]);
                    }
                }
            }
        }

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

        // $.jf_protectform($('#dg0'), $('#ef0'), true, a_data.length);
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
	<div class="easyui-layout" data-options="fit:true" >
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- search js -->
                    <script src="/static/js/SI/SI0200/SI0200_sch_searchbox0.js"></script>
                </div>
                <div data-options="region:'east', border:true, maxWidth:1000, minWidth:1000">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
                    <script src="/static/js/SI/SI0200/SI0200_btn0.js"></script>
                    <div id="excelupload_p0" class="easyui-window" title="엑셀 업로드" data-options="modal:true,closed:true,iconCls:'icon-save'"
                        style="width:500px;height:200px;padding:10px;">
                        <form id="excelfrm" name="excelfrm" method="post" enctype="multipart/form-data">
                                                <input id="excelinputfile" name="excelinputfile" type="file"/>
                                            </form>
                                    </div>
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
                    <script src="/static/js/SI/SI0200/SI0200_editform0.js"></script>
                </div>
                </form>
                <div data-options="region:'center', border:true">
                    <!-- dg panel -->
                    <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- dg js -->
                    <script src="/static/js/SI/SI0200/SI0200_dg0.js"></script>
                </div>
            </div>
        </div>
	</div>	
</div>
<div id="selcomp">
    <script src="/static/js/common/modal_selcomp.js"></script>
</div>
</body>
</html>


