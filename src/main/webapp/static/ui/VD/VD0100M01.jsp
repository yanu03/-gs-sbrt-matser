<!-- 
    프로그램명 : 차내장치 정보 관리
    작성자 : 박원용
    작성일 : 2023.04.13

    수정자 : 박원용
    수정일 : 2023.05.09
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
    <script src="/static/js/vhcdvc_comm.js"></script>
	<script type="text/javascript">
    $( document ).ready(function() {
    
    });
    var uv_vhcidx;
    var uv_modaldvcloc;
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_modalselect = function(a_obj){return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_chkchilddata = function(a_obj){return false;};
    $.pf_combineparams = function(a_obj){let rtn_params = {};return rtn_params;};

    $.pf_childparams = function(a_obj, a_row){
        let rtn_params;
        if(a_obj.attr('id') == 'dg1') rtn_params = {TYPE:"VHC_ID",CONTENT:a_row.VHC_ID};
        return rtn_params;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let rtn_params; 
        let v_default = $('#dg0').datagrid('getSelected');
        if(a_obj.attr('id') == "dg1"){
            rtn_params = {VHC_ID:v_default.VHC_ID, VHC_NO:v_default.VHC_NO, DVC_ID:$.jf_seqdgdata('/vd/VD0100G0K0','post'), USE_YN : "Y"};
        } 
        return rtn_params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f')){
                $.jf_savedgdata($('#dg1'), '/vd/VD0100G0S0', 'post', null);
            }
            else
                $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(a_type == 'focussave'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f')){
                $.jf_savedgdata($('#dg1'), '/vd/VD0100G0S0', 'post', 'focussave');

            }
            else
                $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save'){
            $.jf_resetdg($('#dg1'), 'ALL');
        }
        if(a_type == 'focussave'){
            $.jf_resetdg($('#dg1'), 'ALL');
        }
        return true;
    };
    
    $.pf_ajaxafterproc = function(a_type){
        if(a_type == "focussave"){
            //페이지 사용자 변수
            $.jf_setfocus($('#dg0'), uv_vhcidx);
        }
        return true;
    };
    // 기능 : modal창 띄울때 버스 이미지와 차내장치 이미지를 출력해준다.
    $.uf_makeimg = function(a_obj, a_datas, a_img) {
        a_img.empty();
        let v_imgSrc = null;
        let v_str = "";
        let v_topCoords = 0;
        let v_leftCoords = 0;

        let v_busImg = null;
        let v_vhcKind = a_obj.datagrid('getSelected').VHC_KIND;
        // switch(v_vhcKind){
        //     case 'VK001':
        //         v_busImg = CNG_BUS_IMG; break;
        //     case 'VK002':
        //         v_busImg = WOOJIN_BUS_IMG; break;
        //     case 'VK003':
        //         v_busImg = NORMAL_BUS_IMG; break;
        //     default:
        //         v_busImg = NORMAL_BUS_IMG; break;         
        // }
        v_busImg = WOOJIN_BUS_IMG;
        //left:95px 임시
        v_str += "<img style='position:absolute; left:30px' src='"+v_busImg+"' id='"+a_obj.datagrid('getSelected').VHC_ID+"img';>";
        // onClick='$.uf_mvimg("+a_datas.DVC_ID+")'
        
        let v_dvcKind = a_datas.DVC_KIND;        
        let v_coordsData = a_datas.DVC_COORDS;

        if(!$.jf_isempty(v_coordsData)){
            switch (v_dvcKind){
                // OBE
                case "DK001":
                    v_imgSrc = OBE_NORMAL_IMG; break;
                // 운전자단말기
                case "DK002":
                    v_imgSrc = DRVTERMINAL_NORMAL_IMG; break;
                // 승객용안내기
                case "DK003":
                    v_imgSrc = PSGGUIDE_NORMAL_IMG; break;
                // 전자노선도
                case "DK004":
                    v_imgSrc = ROUTMAP_NORMAL_IMG; break;
                // 행선지키패드
                case "DK005":
                    v_imgSrc = KEYPAD_NORMAL_IMG; break;
                //행선지 정면
                case "DK006":
                case "DK007":
                //행선지 측면   
                case "DK008":
                case "DK009":
                case "DK012":
                //행선지 후면   
                case "DK013":
                    v_imgSrc = DESGUIDE_NORMAL_IMG; break;
                //태그리스   
                case "DK011":
                    v_imgSrc = TAG_NORMAL_IMG; break;
            }
        }
        if(!$.jf_isempty(v_imgSrc)){
            if(!$.jf_isempty(v_coordsData)){
                v_topCoords = v_coordsData.split(',')[0];
                v_leftCoords = v_coordsData.split(',')[1];
            }
        }
        v_str += "<div id='"+ a_datas.DVC_ID+ "' style='z-index: 1; position:absolute; top:"
        +v_topCoords+ "px; left:"+v_leftCoords+"px;' class='tracom-img'; draggable='true'>"
        +"<img src='"+v_imgSrc+"'>"
        +"</div>"
        //imgOnclick_MO0204(this.id)
        
        a_img.append(v_str);
        return true;
    };
    // 기능 : modal안의 이미지 클릭시. 차내장치의 이미지 위치를 옮겨준다.
    $.uf_mvimg = function(a_obj,a_value, a_evtvalue){
        // 마우스가 클릭한 좌표를 가져온다
        let v_mouseX = a_evtvalue.pageX - a_obj.offset().left;
        let v_mouseY = a_evtvalue.pageY - a_obj.offset().top - 20;

        $('#'+a_value).css({
            'left' : v_mouseX + 'px',
            'top' : v_mouseY + 'px'
        });
        // 페이지 사용자 변수
        uv_modaldvcloc = v_mouseY + ','+ v_mouseX;

        return true;
    };

    

	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- search js -->
                    <!-- <script src="/static/js/SI0200/SI0200_sch_selectbox.js"></script>-->
                    <script src="/static/js/VD0100/VD0100_sch_searchbox0.js"></script> 
                </div>
                <div data-options="region:'east', border:true, maxWidth:1000, minWidth:1000">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
                    <script src="/static/js/VD0100/VD0100_btn0.js"></script>
                </div>
            </div>
        </div>
        <div data-options="region:'center', border:true">
            <div class="easyui-layout" data-options="fit:true" >
                <div data-options="region:'west', border:true, minWidth:300, maxWidth:300">
                    <!-- dg0 panel -->
                    <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- dg0 js -->
                    <script src="/static/js/VD0100/VD0100_dg0.js"></script>
                </div>
                <div data-options="region:'center', border:true">
                    <div class="easyui-layout" data-options="fit:true" >
                        <form id="ef0" style="border:0px solid red;">
                        <div data-options="region:'north', border:true, minHeight:350, maxHeight:350">
                            <!-- form panel -->
                            <div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- form js -->
                            <script src="/static/js/VD0100/VD0100_editform0.js"></script>
                        </div>
                        </form>
                        <div data-options="region:'center', border:true">
                            <!-- dg1 panel -->
                            <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- dg1 js -->
                            <script src="/static/js/VD0100/VD0100_dg1.js"></script>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
	</div>	
</div>
<div id="sel_dvc_coords">
    <script src="/static/js/VD0100/VD0100_modal0.js"></script>
</div>
</body>
</html>