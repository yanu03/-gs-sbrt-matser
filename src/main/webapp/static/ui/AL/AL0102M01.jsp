
<!-- 
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
    // 불러온 휴일 데이터 담아줄 저역 변수
    var uv_holidata;
    // spinner 값을 담아줄 전역 변수
    var uv_oldyear;
    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
	$.pf_modalselect = function(a_obj){return true;}
    
    $.pf_deleteafter = function(a_obj){
        if($.jf_datalength($('#dg0')) == 0) $.jf_protectform($('#dg0'), $('#ef0'), true, 0);
        return true;
    }
    $.pf_ajaxafterproc = function(a_type){
        if(a_type == 'search') $.jf_retrieve($('#dg0'));
        return true;
    }
    $.pf_combineparams = function(a_obj){
    	//데이터 조회시 파라미터를 정함.
        let rtn_param = {};
        let dateboxVal = $('#sch_ns0').numberspinner('getValue');
        if(a_obj.attr('id') == 'dg0') rtn_param = {TYPE : "ALL", CONTENT: "", HOLY_DT: dateboxVal}; 
        
        return rtn_param;
    };
    $.pf_defaultparams = function(a_obj){
    	//데이터 추가시 default값을 정함.
        let params;
        params = {};

        return params;
    };
    $.pf_acceptcfmsg = function(a_type){
        if(a_type == 'save'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), '/al/AL0102G0S0', 'post', null);  
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
        }
        else if(a_type == 'loadHoli'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.uf_loadholi($('#sch_ns0').numberspinner('getValue'));
            }
            else $.tracomalmsg('정보', '필수 항목을 입력해주세요.', null);
        }
        else if(a_type == 'close'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $.jf_savedgdata($('#dg0'), '/al/AL0102G0S0', 'post', null);  
                $.jf_close();
            }
            else $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
        }
        else if(a_type == 'search'){
            if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f') ){
                $('#sch_ns0').numberspinner('setValue', uv_oldyear);
                $.jf_savedgdata($('#dg0'), '/al/AL0102G0S0', 'post', null);  
                $.jf_retrieve($('#dg0'));
            }
            else{
                $('#sch_ns0').numberspinner('setValue', uv_oldyear);
                $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
            }
        }
        return true;
    };
    $.pf_rejectcfmsg = function(a_type){
        if(a_type == 'save') {
            $.jf_resetdg($('#dg0'), 'ALL');
        }
        else if(a_type == 'search'){
            $.jf_retrieve($('#dg0'));
        }
        if(a_type == 'close') $.jf_close();
        return true;
    };
    /** 기능 : date박스의 날짜가 바뀔때 
     * 바뀐 날짜에 따라 요일도 같이 바뀌게 해주는 함수
     * 작성자 : 박원용
     * 작성일 : 2023.04.17
     */
    $.uf_syncweek = function(a_type,a_date){
        let rtn_value;
        let v_parsedate = $.tracomdateparser(a_date);
        let v_date = new Date(v_parsedate);
        let v_week = $('#DAY_OF_WEEK').combobox('getData');
        let v_day = [];
        // 일 월 화 수 목 금 토를 배열로 담아준다 (1,2,3,4,5,6,7) <- 이렇게 value값으로 담김
        for(let i = 0; i < v_week.length; i++){
            v_day.push(v_week[i].DL_CD);
        }
        if(a_type == "format"){
            rtn_value = v_day[v_date.getDay()];
            return rtn_value;
        }else{
            $('#DAY_OF_WEEK').combobox('setValue',v_day[v_date.getDay()]);
            return true;
        }
    };
    $.uf_loadholi = function(a_date){
        // 휴일 불러오는 url 
        
        let v_url = '/intg/getIntgInfo?INTG_KIND=IK004&YEAR='+a_date;
        $.ajax({
            type: 'post',
            url: v_url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                if(typeof(data['rows']) != "undefined"){
                    uv_holidata = data;
                    $.uf_insertrows(uv_holidata);
                }else{
                    let msgtext = data['rsMsg']['message'];
                    top.$.messager.alert('sever massage',msgtext);
                    uv_holidata = {"total":0,"rows":[]};
                    $('#dg0').datagrid('loadData', uv_holidata);
                }
            },
            error: function(e){
                console.log(e);
            }
        });
        
        return true;
    };
    // 기능 : 불러온 휴일 저장 시키기
    $.uf_saveholi = function(a_param){
        $.ajax({
            type: 'post',
            url: '/al/AL0102G0S0',
            data: a_param,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(data){
                if(typeof(data['rows']) != "undefined"){
                    $.messager.show({
                        title:'정보',
                        msg:data['rsMsg']['message'],
                        timeout:1500,
                        showType:'slide'
                    });
                    $.pf_ajaxafterproc(a_action);
                }else{
                    let msgtext = data['rsMsg']['message'];
                    top.$.messager.alert('sever massage',msgtext);
                    data = {"total":0,"rows":[]};
                }
            
            },
            error: function(){
                error.apply(this, arguments);
            }
        });
    }
    $.uf_insertrows = function(a_values){
        let v_oldrows = $('#dg0').datagrid('getRows');
        let v_newrows = $.uf_formattype(a_values.rows);
        let v_deleteidx = [];
        let v_param;
        // 중복 날짜 찾아내기
        for(let i=0; i < v_oldrows.length; i++){
            v_deleteidx.push(v_newrows.findIndex(function(key){  return key.HOLI_DT == v_oldrows[i].HOLI_DT }));
        }
        // 중복 날짜 삭제
        for(let i=0; i < v_deleteidx.length; i++){
            v_newrows.splice(v_deleteidx[i], 1);
        }
        // 가져온 데이터 서버에 저장 시키기 
        if(!v_newrows.length < 1){
            for(let i=0; i < v_newrows.length; i++){
                v_newrows[i].rowStatus == "C";
                v_param.push([...v_newrows][i]);
            }
            v_param = JSON.stringify({'rows' : v_param});
            $.uf_saveholi(v_param);
        }else{
            $.tracomalmsg('정보', '해당 연도의 휴일은 불려져 있습니다.');
        }
        
        return true;
    }
    $.uf_formattype = function(a_values){
        let rtn_params;
        let v_week;
        var v_y;
        var v_m;
        var v_d;
        for(let i=0; i < a_values.length; i++){
            // 불러온 휴일 type 붙여주기
            delete a_values[i].DATE_KIND;
            a_values[i].DAY_TYPE = "DY002";
            a_values[i].DAY_TYPE_NM = '휴일';
            // 날짜의 요일 맞춰주기
            v_y = a_values[i].HOLI_DT.substr(0, 4);
            v_m = a_values[i].HOLI_DT.substr(4, 2);
            v_d = a_values[i].HOLI_DT.substr(6, 2);
            v_week = v_y +'-'+ v_m +'-'+ v_d;
            a_values[i].HOLI_DT = v_week;
            a_values[i].DAY_OF_WEEK = $.uf_syncweek("format", v_week);
        }
        rtn_params = a_values;
        return rtn_params;
    };
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
                            <!-- vacation searchbox panel -->
                            <div id="sch_panel0"  class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- vacation searchbox js -->
                            <script src="/static/js/AL0102/AL0102_sch_nspin0.js"></script>
                        </div>
                        <div data-options="region:'east', border:true, maxWidth:1200, minWidth:1200">
                            <!-- vacation btn panel -->
                            <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                            </div>
                            <!-- vacation btn js -->
                            <script src="/static/js/AL0102/AL0102_btn0.js"></script>
                        </div>
                    </div>
                </div>
                <form id="ef0" method="post">
                <div data-options="region:'center', border:true">
                    <!-- vacation form panel -->
                    <div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                    </div>
                    <!-- vacation form js -->
                    <script src="/static/js/AL0102/AL0102_editform0.js"></script>
                </div>
                </form>        
            </div>
        </div>
        <div data-options="region:'center', border:true ">
            <!-- vacation datagrid panel -->
            <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
            </div>
            <!-- vacation datagrid js  -->
            <script src="/static/js/AL0102/AL0102_dg0.js"></script>
        </div>
	</div>
</div>
</body>
</html>

