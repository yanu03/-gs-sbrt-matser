<!-- 
프로그램명 : 기상 관리 
작성자 : 박원용
작성일 : 2023.04.26
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
   <script type="text/javascript" src="/static/js/common/scrollview_comm.js"></script>
   <script type="text/javascript">

    var uv_dg0Load = false;
    var uv_dg1Load = false;
    var uv_chktab;
    $( document ).ready(function() {});
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_childretrieve = function(){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_retrieve = function(a_obj) {return true;};
    $.pf_modalselect = function(a_obj){return true;}

    $.pf_ajaxafterproc = function(){
      $.jf_retrieve($('#dg0'));
        return true;
    };
    $.pf_combineparams = function(a_obj){
      let rtn_params;
      let v_searchVal = $.uf_combinedata();
      rtn_params = {TYPE : "ALL", CONTENT :v_searchVal};

      return rtn_params;
    };

    // 기능 : 검색할때 년, 월 정보를 묶어준다 
    $.uf_combinedata = function(){
      let v_year = $('#sch_ns0').numberspinner('getValue');
      let v_month = $('#sch_ns1').numberspinner('getValue');
      if(v_month.length == 1) v_month = "0" + v_month;
      
      return v_year + v_month;
    };

    // 기능 : 월이 1이하로 내려가거나, 12 이상으로 올라가면 자동으로 년도를 -1하거나 +1 해준다
    // 1이나 12이를 넘어가면  1 -> 12, 12 ->1 로 바꿔준다
    $.uf_autochange = function(a_obj){
      let v_month = a_obj.numberspinner('getValue');
      if(v_month == 0){
        a_obj.numberspinner('setValue', 12);
        $('#sch_ns0').numberspinner('setValue',parseInt($('#sch_ns0').numberspinner('getValue'))-1);
      }else if(v_month == 13){
        a_obj.numberspinner('setValue', 1);
        $('#sch_ns0').numberspinner('setValue', parseInt($('#sch_ns0').numberspinner('getValue'))+1);
      }
    };

    // 기능 : 같거나 비슷한 요일을 찾아 form sync를 해준다
    $.uf_syncform = function(a_obj,a_obj2, a_tab){
      let v_foundvalue;
      let v_selectvalue;
      $('#ef0').form('clear');
      if(a_tab == "기상"){
        // 선택된 tab기준을 삼고.
        // 선택된 tab에서 select된 row의 발표일시를 가져온다
        let v_atmodata = $('#dg1').datagrid('getData').rows;
        v_selectvalue = $('#dg0').datagrid('getSelected');
        v_foundvalue = $.uf_findatmorow(v_atmodata, v_selectvalue.NOTI_DTM);
        if(v_foundvalue == null) {
          v_foundvalue = $.uf_finddate(v_atmodata, null, v_selectvalue.NOTI_DTM);
        }
      }
      else if(a_tab == "대기"){
        let v_weatherdata = $('#dg0').datagrid('getData').rows;
        v_selectvalue = $('#dg1').datagrid('getSelected');
        v_foundvalue = $.uf_findweatherrow(v_weatherdata, v_selectvalue.MEAS_DTM);
        if(v_foundvalue == null){
          v_foundvalue = $.uf_finddate(null, v_weatherdata, v_selectvalue.MEAS_DTM);
        } 
      }
      // 기능 : 리턴받은 값으로 form에 load시켜줍니다.
      $('#ef0').form('load', $.uf_combinevalue(v_selectvalue,v_foundvalue) );

      return true;
    };

    // (선택된 tab: 대기)
    // 기능 : 선택된 값과 기상 데이터에서 같은 같이 있는지 찾아서 select한 후 
    // 있으면 데이터를 넘겨주고 없으면 null을 넘겨준다.
    $.uf_findweatherrow = function(a_weather, a_selectrowdate){
      let rtn_value;
      for(let i=0; i<a_weather.length; i++){
        if(a_selectrowdate == a_weather[i].NOTI_DTM){          
          $('#dg0').datagrid('selectRow',i);
          rtn_value = $('#dg0').datagrid('getSelected');
        }else{
          rtn_value = null;
        }
      }
      return rtn_value;
    };

    // (선택된 tab : 기상)
    //기능 : 선택된 값과 대기 데이터에서 같은 같이 있는지 찾아서 select한 후 
    // 있으면 데이터를 넘겨주고 없으면 null을 넘겨준다.
    $.uf_findatmorow = function(a_atmo, a_selectrowdate){
      let rtn_value;
      for(let i=0; i<a_atmo.length; i++){
        if(a_selectrowdate == a_atmo[i].MEAS_DTM){
          $('#dg1').datagrid('selectRow',i);
          rtn_value = $('#dg1').datagrid('getSelected');
        }else{
          rtn_value = null;
        }
      }
      return rtn_value;
    };

    // findatmorow나 findweatherrow에서 null이 날라오면 이 함수가 실행이 된다.
    $.uf_finddate = function(a_atmo, a_weat, a_value){
      let rtn_value;
      let v_rtnvalue;   
      let v_reg = /[:-\s]/g;
      let v_target = parseInt(a_value.replace(v_reg,'').slice(4));
      let v_loopvalue;
      let v_looparray = [];
      let v_idx;
      // 기능 : 선택된 발표일시 와 대기 데이터중에서 시간차가 얼마 안나는 시간을 찾는다
      if(a_atmo != null){
        for (let i = 0; i < a_atmo.length; i++) {
          // (날짜 시간을 비교하는 방법 중에서 숫자 차이로 구하는 방법을 사용했습니다.)
          // 기능 : 대기의 발표일시를 특수문자를 재외시킨후 년도를 뺴고 배열안에 넣어줍니다.
          v_loopvalue = parseInt(a_atmo[i].MEAS_DTM.replace(v_reg,'').slice(4));
          v_looparray.push(v_loopvalue);
        }
        // 넣어준 배열을 이용하여 타겟과 가장 가까운 수를 찾습니다..
        v_rtnvalue = v_looparray.reduce((prev, curr) =>{
          return Math.abs(curr - v_target) < Math.abs(prev - v_target) ? curr : prev;
        });
        // indexof를 이용하여 찾은 값의 index값으로 그리드를 select후
        // select한 값을 rtn_value에 넣어줍니다.
        v_idx = v_looparray.indexOf(v_rtnvalue);
        $('#dg1').datagrid('selectRow',v_idx);
        rtn_value = $('#dg1').datagrid('getSelected');
      }
      // 기능 : 선택된 발표일시 와 기상 데이터중에서 시간차가 얼마 안나는 시간을 찾는다
      else if(a_weat != null){
        for (let i = 0; i < a_weat.length; i++) {
          v_loopvalue = parseInt(a_weat[i].NOTI_DTM.replace(v_reg,'').slice(4));
          v_looparray.push(v_loopvalue);
        }
        v_rtnvalue = v_looparray.reduce((prev, curr) =>{
          return Math.abs(curr - v_target) < Math.abs(prev - v_target) ? curr : prev;
        });
        
        v_idx = v_looparray.indexOf(v_rtnvalue);
        $('#dg0').datagrid('selectRow',v_idx);
        rtn_value = $('#dg0').datagrid('getSelected');
      }
      return rtn_value;
    };

    // 기능 선택한 값과 찾은 값을 합친후 리턴시켜줍니다.
    $.uf_combinevalue = function(a_selectvalue, a_foundvalue){
      let rtn_value;
      rtn_value = Object.assign({},a_selectvalue, a_foundvalue);

      return rtn_value;
    };

    // 기능 : value를 받아 이미지 바꿔주기
    $.uf_changeimg = function(a_value){
      if(a_value == "맑음"){
        $('#weatherimg').attr("src","/static/img/sunny.jpg");
      }else if(a_value == "구름조금"){
        $('#weatherimg').attr("src","/static/img/lesscloud.jpg");
      }else if(a_value == "구름많음"){
        $('#weatherimg').attr("src","/static/img/cloudiest.jpg");
      }else if(a_value == "흐림"){
        $('#weatherimg').attr("src","/static/img/cloudy.jpg");
      }else if(a_value == "비"){
        $('#weatherimg').attr("src","/static/img/rain.jpg");
      }else if(a_value == "비/눈"){
        $('#weatherimg').attr("src","/static/img/rainnsnow.jpg");
      }else if(a_value == "눈/비"){
        $('#weatherimg').attr("src","/static/img/snownrain.jpg");
      }else if(a_value == "눈"){
        $('#weatherimg').attr("src","/static/img/snow.jpg");
      }else{
        $('#weatherimg').attr("src","/static/img/defaultImg.jpg");
        $('#weatherimg').attr("alt","데이터 없음");
      }
    };
    $.uf_imgobserver = function(a_value){
      if(a_value < 1){
        $('#weatherimg').attr("src","/static/img/defaultImg.jpg");
        $('#weatherimg').attr("alt","데이터 없음");
      }
    };
   </script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
   <div class="easyui-layout" data-options="fit:true" >
    <div data-options="region:'north', border:true, maxHeight:400, minHeight:400">
      <div class="easyui-layout" data-options="fit:true" >
        <div data-options="region:'north', border:true, maxHeight:50, minHeight:50">
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
              <!-- search panel -->
              <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- search js -->
              <script src="/static/js/PI/PI0400/PI0400_sch_nspin0.js"></script>
            </div>
            <div data-options="region:'east', border:true, maxWidth:600, minWidth:600">
              <!-- bnt panel -->
              <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- btn js -->
              <script src="/static/js/PI/PI0400/PI0400_btn0.js"></script>
            </div>
          </div>
        </div>
        <div data-options="region:'center', border:true">
          <!-- tab panel -->
          <div id="tab_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
          </div>
          <!-- tab js -->
          <script src="/static/js/PI/PI0400/PI0400_tabs0.js"></script>
          <!-- dg0 js -->
          <script src="/static/js/PI/PI0400/PI0400_dg0.js"></script>
          <!-- dg1 js -->
          <script src="/static/js/PI/PI0400/PI0400_dg1.js"></script>
        </div>
      </div>
    </div>
    <div data-options="region:'center', border:true">
      <div class="easyui-layout" data-options="fit:true">
        <form id="ef0">
        <div data-options="region:'west', border:true, maxWidth:600, minWidth:600">
          <!-- show form panel -->
          <div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
          </div>
          <!-- show form js -->
          <script src="/static/js/PI/PI0400/PI0400_editform0.js"></script>
        </div>
        </form>
        <div data-options="region:'center', border:true">
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
              <!-- img panel -->
              <div id="img_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- img js -->
              <script src="/static/js/PI/PI0400/PI0400_img0.js"></script>
            </div>
            <div data-options="region:'east', border:true, maxWidth:700, minWidth:700">
              <!-- dg2 panel -->
              <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- dg2 js -->
              <script src="/static/js/PI/PI0400/PI0400_dg2.js"></script>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>   
</div>
</body>
</html>

