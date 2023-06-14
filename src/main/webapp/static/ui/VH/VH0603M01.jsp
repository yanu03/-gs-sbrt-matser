<!-- 
    프로그램명 : 신호현시정보 이력
    작성자 : 박원용
    작성일 : 2023.05.15
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
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_modalselect = function(a_obj){return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_rejectcfmsg = function(a_type){return true;};
    $.pf_defaultparams = function(a_obj){let rtn_params = {}; return rtn_params;};
    $.pf_acceptcfmsg = function(a_type){return true;};
    $.pf_chkchilddata = function(a_obj){return false;};
    $.pf_childparams = function(a_obj, a_row){let rtn_params = {};return rtn_params;};
    $.pf_ajaxafterproc = function(a_type){return true};

    $.pf_combineparams = function(a_obj){
    	//데이터 조회시 파라미터를 정함.
        let rtn_params;

        let v_searchval = $('#sch_sb0').searchbox('getValue');
        let v_fdate = $('#sch_fdd').datebox('getValue');
        let v_tdate = $('#sch_tdd').datebox('getValue');
        let v_ctrsts = $.uf_changetype('CTR_STS', $('#sch_lb0').combobox('getText'));
        let v_ctrmode = $.uf_changetype('CTR_MODE', $('#sch_lb1').combobox('getText'));
        rtn_params = {CONTENT1 : v_searchval, F_DATE : v_fdate, L_DATE : v_tdate, TYPE1 : v_ctrsts, TYPE2 : v_ctrmode};
        
        return rtn_params;
    };
    $.uf_changedate = function(a_type){
        if(a_type == "today"){
            $('#sch_tdd').datebox('setValue',$.tracomfromdate('d'));
            $('#sch_fdd').datebox('setValue',$.tracomfromdate('d'));
        }
        else if(a_type == "week"){
            $('#sch_tdd').datebox('setValue',$.tracomfromdate('d'));
            $('#sch_fdd').datebox('setValue',$.tracomfromdate('w'));
            
        }
        else if(a_type == "month"){
            $('#sch_tdd').datebox('setValue',$.tracomfromdate('d'));
            $('#sch_fdd').datebox('setValue',$.tracomfromdate('m'));
        }
        

        return true;
    };
    // $.uf_limitdate = function(a_type){
    //     // 기능 : fromdate가 todate 보다 한달 이상 멀어지지않게 해주는 함수
    //     let v_fromdt = new Date($('#sch_fdd').datebox('getValue'));
    //     let v_todt = new Date($('#sch_tdd').datebox('getValue'));
    //     // fromdate와 todate을 onchange될때마다 값을 가져온다.
    //     let v_datedifference = v_fromdt.getTime() - v_todt.getTime();
    //     v_datedifference = v_datedifference / (24 * 60 * 60 * 1000);
    //     // 두 날짜의 요일 차이를 계산해 준다.
    //     if(v_datedifference < -30) {
    //         let monthAgoDate = new Date(v_todt.setMonth(v_todt.getMonth() - 1));
    //         monthAgoDate = $.tracomdateformatter(monthAgoDate);
    //         $('#sch_fdd').datebox('setValue', monthAgoDate);
    //         // 만약 fromdate가 todate보다 30일 더 멀어지게 된다면
    //         // todate의 기준으로 부터 30일 전의 날짜로 설정해준다.
    //     }

    //     return true;
    // };
    
    $.uf_changetype = function(a_type, a_value){
        let rtn_value;
            if(a_type == 'CTR_STS'){
                if(a_value == '불량') rtn_value = 0;
                else if(a_value == '정상') rtn_value = 1;
                else if(a_value == '네트워크 오류') rtn_value = 2;
                
            }
            else if(a_type == 'CTR_MODE'){
                if(a_value == 'OFFLINE') rtn_value = 0;
                else if(a_value == 'ONLINE') rtn_value = 1;
                else if(a_value == '전이') rtn_value = 2;
            }
            if(a_value == '-전체-') rtn_value = null;
        return rtn_value; 
    };
    $.uf_addvalue = function(a_data){
        let rtn_values;
        let v_value = [{DL_CD:'all',DL_CD_NM: '-전체-'}];
        rtn_values = [...v_value, ...a_data];
        return rtn_values
    };
    $.uf_formatcolumn = function(a_data){
        let rtn_data;

        if(typeof(a_data.length) == 'undefined') return a_data;
        for(let i=0; i < a_data.length; i ++){
            a_data[i].A_PHASE_TM = $.uf_timefilter(a_data[i].A_PHASE_TM);
            a_data[i].B_PHASE_TM = $.uf_timefilter(a_data[i].B_PHASE_TM);
            a_data[i].CTR_STS = $.uf_ctrstatusfilter(a_data[i].CTR_STS);
            a_data[i].CTR_MODE = $.uf_ctrmdoefilter(a_data[i].CTR_MODE);
        }
        rtn_data = a_data;
        return rtn_data;
    };

    $.uf_timefilter = function(a_time){
        let rtn_value;
        if(a_time >= 120){
            a_time -= 120;
            rtn_value = '2분' + a_time + '초';
        }
        else if(a_time >= 60){
            a_time -= 60;
            rtn_value = '1분' + a_time + '초';
        }
        else if(a_time < 60){
            rtn_value = a_time + '초';
        }

        return rtn_value;
    };
    $.uf_ctrstatusfilter = function(a_status){
        let rtn_value;
        if(a_status == '0') rtn_value = '불량' 
        else if(a_status == '1') rtn_value = '정상'
        else if(a_status == '2') rtn_value = '네트워크 오류'

        return rtn_value;
    };
    $.uf_ctrmdoefilter = function(a_mode){
        let rtn_value;
        if(a_mode == '0') rtn_value= 'OFFLINE'
        else if(a_mode == '1') rtn_value = 'ONLINE' 

        return rtn_value;
    }
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true" >
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
            <div class="easyui-layout" data-options="fit:true" >
                <form>
                <div data-options="region:'center', border:true">
                    <!-- search panel -->
                    <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- search js -->
                    <script src="/static/js/VH0603/VH0603_sch_searchbox0.js"></script> 
                    <script src="/static/js/VH0603/VH0603_sch_selectbox0.js"></script>
                    <script src="/static/js/VH0603/VH0603_sch_fromtodate0.js"></script>
                    <script src="/static/js/VH0603/VH0603_radio0.js"></script> 
                </div>
                </form>
                <div data-options="region:'east', border:true, maxWidth:600, minWidth:600">
                    <!-- btn0 panel -->
                    <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- btn0 js -->
                    <script src="/static/js/VH0603/VH0603_btn0.js"></script>
                </div>
            </div>
        </div>
        <div data-options="region:'center', border:true">
            <!-- dg0 panel -->
            <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
            </div>
            <!-- dg0 js -->
            <script src="/static/js/VH0603/VH0603_dg0.js"></script>
        </div>
	</div>	
</div>
</body>
</html>