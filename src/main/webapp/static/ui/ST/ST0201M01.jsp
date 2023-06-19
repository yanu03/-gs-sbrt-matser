<!-- 
프로그램명 : 정류소 구간별 평균 속도 통계
작성자 : 박원용
작성일 : 2023.05.25
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
  <script src="/static/js/Highcharts-Gantt-10.2.0/code/highcharts.js"></script>
  <script src="/static/js/common/jquery.pivotgrid.js"></script>
	<script src="/static/js/common/sample_comm.js"></script>
	<script type="text/javascript">
    $( document ).ready(function() {});
    // pivotgrid의 아이콘을 지우기 위해 설정
    var uv_dg1data;
    // pivotgrid의 무한로드 방지 플레그
    var uv_chkdata0 = true;
    $.pf_append = function(){return true;};
    $.pf_delete = function(){return true;};
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;};
    $.pf_setfocus = function(a_obj, a_idx){return true;};
    $.pf_setfooter = function(a_obj){return true;};
    $.pf_defaultparams = function(a_obj){return true;};
    $.pf_modalselect = function(a_obj){return true;};
    $.pf_acceptcfmsg = function(a_type){return true;};
    $.pf_rejectcfmsg = function(a_type){return true;};
    $.pf_ajaxafterproc = function(){return true;};
    $.pf_defaultparams = function(a_obj){let rtn_params = {};return rtn_params;};
    $.pf_retrieve = function(a_obj){return true;};

    $.pf_combineparams = function(a_obj){
      let rtn_params = {};
      return rtn_params;
    };

    $.pf_childretrieve = function(a_obj, a_param){
      let v_queryParams;
      v_queryParams = JSON.stringify({dma_search : $.pf_childparams(a_obj, a_param)});
      a_obj.pivotgrid({queryParams : v_queryParams});
      
      return true;
    };
    
    $.pf_childparams = function(a_obj, a_param){
      let rtn_params = {};
      let v_stcombobox = $('#sch_lb1').combobox('getValue');
      let v_edcombobox = $('#sch_lb2').combobox('getValue');
      let v_fdate = $('#sch_fdd').datebox('getValue');
      let v_tdate = $('#sch_tdd').datebox('getValue');
      let v_stlinksn = $.uf_linksnajax('/st/ST0201G1R0', {ROUT_ID: a_param, ST_NODE_ID: v_stcombobox});
      let v_edlinksn = $.uf_linksnajax('/st/ST0201G1R1', {ROUT_ID: a_param, ED_NODE_ID: v_edcombobox});

      if(a_obj.attr('id') == 'dg1') rtn_params = {ROUT_ID: a_param, ST_LINK_SN : v_stlinksn.ST_LINK_SN, ED_LINK_SN : v_edlinksn.ED_LINK_SN, F_DATE : v_fdate, L_DATE : v_tdate};

      return rtn_params;
    };
    // pivotgrid header 바꾸기
    $.uf_formathead = function(a_value){
      if(a_value.title == 'LINK_AVRG_SPD') {
        a_value.title = '평균속도'
        a_value.width = 150;
      }
      else if(a_value.field == '_tree_field'){
        a_value.width = 380;
      }
    };
    // pivotgrid의 rows의 icon을 지워준다
    $.uf_removecion = function(a_obj){
      let v_datalength;
      let v_treeicon;
      let v_treefoldericon;
      if(a_obj.attr('id') == 'dg1') v_datalength = uv_dg1data.length;

      for(let i=0; i < v_datalength; i++){
        v_treeicon = document.querySelector("span.tree-icon.tree-file");
        v_treefoldericon = document.querySelector("span.tree-icon.tree-folder.tree-folder-open");

        if(v_treeicon){
            v_treeicon.remove();
        }
        else if(v_treefoldericon){
          v_treefoldericon.remove();
        }
      }
      return true;
    };

    // 검색조건에 '전체' 옵션 추가
    $.uf_addvalue = function(a_data){
        let rtn_values;
        let v_value = [{DL_CD:'',DL_CD_NM: '-전체-'}];
        rtn_values = [...v_value, ...a_data];
        return rtn_values
    };
    // combobox 데이터 로드 
    $.uf_sttnload = function(a_value){
      let v_param = JSON.stringify({dma_search: {ROUT_ID : a_value}});
      
      $('#sch_lb1').combobox({ queryParams : v_param });
      $('#sch_lb2').combobox({ queryParams : v_param });

      return true;
    };

    $.uf_chart0data = function(a_data,a_type){
      let rtn_value = [];
      let v_stath = [];
      let v_hours = [];
      let v_sumvalue = [];
      let v_avgvalue = [];

      
      for(let i=3; i < 24; i++){
        if(i < 10){
          v_stath.push('0'+i+'시');
          }
          else v_stath.push(i +'시');
      }
      for(let i=0; i< v_stath.length; i++){
        if(a_data != ''){
          v_hours.push(a_data.filter(obj => obj.STAT_H == v_stath[i]));
          v_hours = v_hours[0];
        }
        
        if(typeof(v_hours) == 'undefined' || v_hours.length == 0){
          // 빈 시간엔 0으로 채워준다
          rtn_value.push(0);
        }else{
          if(a_type == 'LINK_AVRG_SPD'){
            
            for(let j=0; j < v_hours.length; j++){
                v_sumvalue.push(v_hours[j].LINK_AVRG_SPD);
              }
              // 모든 값들을 더해준다.
              v_sumvalue = v_sumvalue.reduce((acc, val) => acc + val, 0);
              // 더한값을 나눈다 
              v_avgvalue = v_sumvalue / v_hours.length;
              v_avgvalue = parseFloat(v_avgvalue.toFixed(2));

              rtn_value.push(v_avgvalue);
            }
        }
        // 배열 초기화
        v_hours = [];
        v_sumvalue = [];
        v_avgvalue = [];
      }

      return rtn_value;
    };
    // X축 데이터
    $.uf_chart0xAxisdata = function(){
      let rtn_value = [];
      for(let i=3; i < 24; i++){
        if(i < 10){
          rtn_value.push('0'+i+'시');
          }
          else rtn_value.push(i +'시');
      }
      
      return rtn_value;
    }
    $.uf_linksnajax = function(a_url, a_param){
      let rtn_value;
        $.ajax({
          type:'POST',
          url: a_url,
          data: JSON.stringify({dma_search: a_param}),
          dataType: 'json',
          async: false,
          contentType: 'application/json; charset=utf-8',
          success: function(data){
            if(typeof(data['rows']) != "undefined" && data['rows'] != null){
              rtn_value = data['rows'];
            }else{
              data = {"total":0,"rows":[]};
              rtn_value = data;
            }
          },
          error: function(e){
            error.apply(this, arguments);
          }
        });
        return rtn_value;
    };
    
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
	<div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'north', border:true, maxHeight:40, minHeight:40">
      <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'center', border:true">
          <!-- selectbox0 panel -->
          <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
          </div>
          <!-- selectbox0 js -->
          <script src="/static/js/ST/ST0201/ST0201_sch_selectbox0.js"></script>
        </div>   
        <div data-options="region:'east', border:true, maxWidth:1300, minWidth:1300">
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
              <!-- selectobx1 & fromtodate panel -->
              <div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- selectobx1 js -->
              <script src="/static/js/ST/ST0201/ST0201_sch_selectbox1.js"></script>
              <!-- fromtodate js -->
              <script src="/static/js/ST/ST0201/ST0201_sch_fromtodate0.js"></script>
            </div>
            <div data-options="region:'east', border:true, maxWidth:300, minWidth:300">
              <!-- btn0 panel -->
              <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- btn0 js -->
              <script src="/static/js/ST/ST0201/ST0201_btn0.js"></script>
            </div>
          </div>
        </div>
      </div>
    </div>
		<div data-options="region:'center', border:true">
      <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'center', border:true">
          <!-- dg0 panel -->
          <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
          </div>
          <!-- dg0 js -->
          <script src="/static/js/ST/ST0201/ST0201_dg0.js"></script>
        </div>
        <div data-options="region:'east', border:true, maxWidth:1300, minWidth:1300">
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north', border:true, height:'50%'">
              <!-- chart panel -->
              <div id="chart_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- chart js -->
              <script src="/static/js/ST/ST0201/ST0201_chart0.js"></script>
            </div>
            <div data-options="region:'center', border:true">
              <!-- dg1 panel -->
              <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- dg1 js -->
              <script src="/static/js/ST/ST0201/ST0201_dg1.js"></script>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</div>
</body>
</html>




