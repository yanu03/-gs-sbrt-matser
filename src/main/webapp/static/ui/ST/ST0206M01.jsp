<!-- 
프로그램명 : 정류소 정차시간 통계
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
    $( document ).ready(function() {
      
    });
    var uv_chart1data;
    var uv_chart2data;
    var uv_dg1data;
    var uv_dg2data;
    var uv_chkdata = true;
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
    
    $.pf_retrieve = function(a_obj){
      let v_queryParams;
      v_queryParams = JSON.stringify({dma_search : $.pf_combineparams(a_obj)});
      a_obj.datagrid({queryParams: v_queryParams});

      return true;
    };

    $.pf_combineparams= function(a_obj){
      let rtn_params = {};
      if(a_obj.attr('id') == 'dg0'){
        rtn_params = {ROUT_GRP:$('#sch_lb0').combobox('getValue'),WAY_DIV:$('#sch_lb1').combobox('getValue')};
      } 

      return rtn_params;
    };

    $.pf_childretrieve = function(a_obj){
      let v_queryparams;  
      v_queryparams = JSON.stringify({dma_search : $.pf_childparams()});
      a_obj.pivotgrid({queryParams: v_queryparams});
    
      return true;
    };

    $.pf_childparams = function(){
      let rtn_params;
      let v_nodeid = $('#dg0').datagrid('getSelected').NODE_ID;
      let v_selectdiv = $('#sch_lb2').combobox('getValue');
    
      rtn_params = {SELECT_DIV: v_selectdiv,DAY_DIV:$('#sch_lb3').combobox('getValue'),
                    F_DATE:$('#sch_fdd').datebox('getValue'),L_DATE:$('#sch_tdd').datebox('getValue'),
                    NODE_ID: v_nodeid};

      return rtn_params;
    };
    //pivotgrid의 icon 제거 함수
    $.uf_removecion = function(a_obj){
      let v_datalength;
      let v_treeicon;
      let v_treefoldericon;
      if(a_obj.attr('id') == 'dg1') v_datalength = uv_dg1data.length;
      else if(a_obj.attr('id') == 'dg2') v_datalength = uv_dg2data.length;
      else if(a_obj.attr('id') == 'dg3') v_datalength = uv_dg3data.length;
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
    // 그리드 변경 : 시간대별, 일별, 월별
    $.uf_changegrid = function(){
      let v_seldiv = $('#sch_lb2').combobox('getValue');
      // debugger;
      if(v_seldiv == 'TIME'){
        $.pf_childretrieve($('#dg1'));
        $('#dg_panel1').show();
        $('#dg_panel2').hide();
        $('#dg_panel3').hide();
      }
      else if(v_seldiv == 'DAY'){
        $.pf_childretrieve($('#dg2'));
        $('#dg_panel1').hide();
        $('#dg_panel2').show();
        $('#dg_panel3').hide();
      }
      else if(v_seldiv == 'MONTH'){
        $.pf_childretrieve($('#dg3'));
        $('#dg_panel1').hide();
        $('#dg_panel2').hide();
        $('#dg_panel3').show();
      }
      return true;
    };
    // chart 기본 파라미터 
    $.uf_chart0combineparam = function(a_type,a_node){
      let rtn_param;
      let v_fdate = $('#sch_fdd').datebox('getValue');
      let v_tdate = $('#sch_tdd').datebox('getValue');
      let v_dg0data = $('#dg0').datagrid('getRows');
      let v_seldiv = $('#sch_lb2').combobox('getValue');
      let v_daydiv = $('#sch_lb3').combobox('getValue');

      if(typeof(a_node) != 'undefined' && a_type == 'select'){
        rtn_param = {F_DATE : v_fdate, L_DATE : v_tdate, NODE_ID: '['+a_node+']', SELECT_DIV: v_seldiv, DAY_DIV: v_daydiv};
      }
      else if(a_type == 'auto'){
        let v_nodeids = [];
        for(let i=0; i < v_dg0data.length; i++){
          v_nodeids.push(v_dg0data[i].NODE_ID);
        }
        rtn_param = {F_DATE : v_fdate, L_DATE : v_tdate, NODE_ID: v_nodeids, SELECT_DIV: v_seldiv, DAY_DIV: v_daydiv};
      }
        
      return rtn_param;
    };

    $.uf_chart0data = function(a_data, a_type, a_node, a_div){
      let rtn_value;
      let v_searchtype = $('#sch_lb2').combobox('getValue');
      //debugger;
      if(v_searchtype == "TIME"){
        if(a_div == 'all') rtn_value = $.uf_alldatatimechart(a_data, a_type);
        else rtn_value = $.uf_timechartdata(a_data, a_type, a_node);
      }
      else if(v_searchtype == "DAY"){
        if(a_div == 'all') rtn_value = $.uf_alldatadaymonthchart(a_data, a_type, v_searchtype);
        else rtn_value = $.uf_daymonthchartdata(a_data, a_type, a_node, v_searchtype);
      }
      else if(v_searchtype == "MONTH"){
        if(a_div == 'all') rtn_value = $.uf_alldatadaymonthchart(a_data, a_type, v_searchtype);
        else rtn_value = $.uf_daymonthchartdata(a_data, a_type, a_node, v_searchtype);
      }

      return rtn_value;
    }

    // 시간별 전체 데이터 정리 함수
    $.uf_alldatatimechart = function(a_data, a_type){
      let rtn_value = [];
      let v_daydiv = $('#sch_lb2').combobox('getValue');
      let v_maxvalue = [];
      let v_minvalue = [];
      let v_avgvalue = [];
      let v_hourstat = [];
      let v_hours = [];
      let v_sumvalue = [];
      

      if(typeof(a_data) != 'undefined'){
        for(let i=1; i < 27; i++){
          if(i < 10){
            v_hourstat.push('0'+i+'시');
          }
          else v_hourstat.push(i +'시');
        }
        for(let j=0; j < v_hourstat.length; j++){  
          v_hours = [];
          v_sumvalue = [];
          v_maxvalue = [];
          v_minvalue = [];
          v_avgvalue = [];

          v_hours.push(a_data.filter(obj => obj.STAT_H == v_hourstat[j]));
          v_hours = v_hours[0];
          if(typeof(v_hours) == 'undefined' || v_hours.length == 0){
            // 빈 시간엔 0으로 채워준다
            rtn_value.push(0);
          }else{
            if(a_type == 'MAX_STOP_TIME'){
              // 시간별로 가장 높은 정차시간을 찾고 배열에 넣어준다.
              for(let k=0; k < v_hours.length; k++){
                if(typeof(v_hours[k].MAX_STOP_TIME) == 'undefined') v_hours[k].MAX_STOP_TIME = 0;
                v_sumvalue.push(v_hours[k].MAX_STOP_TIME)
              }
              v_maxvalue = Math.max(...v_sumvalue);
              // 배열중 제일 높은 값을 찾는다
              rtn_value.push(v_maxvalue);
              
            } 
            else if(a_type == 'MIN_STOP_TIME') {
              for(let k=0; k < v_hours.length; k++){
                if(typeof(v_hours[k].MIN_STOP_TIME) == 'undefined') v_hours[k].MIN_STOP_TIME = 0;
                v_sumvalue.push(v_hours[k].MIN_STOP_TIME);
              }
              // 배열중 제일 낮은 값을 찾는다
              v_minvalue = Math.min(...v_sumvalue);

              rtn_value.push(v_minvalue);
            }
            else if(a_type == 'AVRG_STOP_TIME'){
              for(let k=0; k < v_hours.length; k++){
                if(typeof(v_hours[k].AVRG_STOP_TIME) == 'undefined') v_hours[k].AVRG_STOP_TIME = 0;
                v_sumvalue.push(v_hours[k].AVRG_STOP_TIME);
              }
              // 모든 값들을 더해준다.
              v_sumvalue = v_sumvalue.reduce((acc, val) => acc + val,0);
              // 더한값을 나눈다 
              v_avgvalue = v_sumvalue / v_hours.length;
              v_avgvalue = parseFloat(v_avgvalue.toFixed(2));
              
              rtn_value.push(v_avgvalue);
            } 

          }
        }
      }
      return rtn_value;
    };

    // 시간별 차트 데이터 정리
    $.uf_timechartdata = function(a_data, a_type, a_node){
      let rtn_value = [];
      let v_data = [];
      let v_hourstat = [];
      let v_hours = [];

      if(typeof(a_data) != 'undefined'){
        for(let i=0; i < a_data.length; i++){
          if(a_data[i].NODE_ID == a_node) v_data.push(a_data[i]);
        }
        for(let i=1; i < 27; i++){
          if(i < 10) v_hourstat.push('0'+i+'시');
          else v_hourstat.push(i +'시');
        }
        for(let i=0; i < v_hourstat.length; i++){ 
          
          v_hours.push(v_data.filter(obj => obj.STAT_H == v_hourstat[i]));
          v_hours = v_hours[0];
          if(typeof(v_hours) == 'undefined' || v_hours.length == 0){
            // 빈 시간엔 0으로 채워준다
            rtn_value.push(0);
          }else{
            if(a_type == 'MAX_STOP_TIME'){
              for(let j=0; j < v_hours.length; j++){
                if(typeof(v_hours[j].MAX_STOP_TIME) == 'undefined') v_hours[j].MAX_STOP_TIME = 0;
                rtn_value.push(v_hours[j].MAX_STOP_TIME);
              }
            } 
            else if(a_type == 'MIN_STOP_TIME') {
              for(let j=0; j < v_hours.length; j++){
                if(typeof(v_hours[j].MIN_STOP_TIME) == 'undefined') v_hours[j].MIN_STOP_TIME = 0;
                rtn_value.push(v_hours[j].MIN_STOP_TIME);
              }
            }
            else if(a_type == 'AVRG_STOP_TIME') {
              for(let j=0; j < v_hours.length; j++){
                if(typeof(v_hours[j].AVRG_STOP_TIME) == 'undefined') v_hours[j].AVRG_STOP_TIME = 0;
                rtn_value.push(v_hours[j].AVRG_STOP_TIME);
              }
            }
            v_hours = [];
          }
        }
      }
      return rtn_value;
    }

    // 일, 월별 전채 데이터 정리 함수
    $.uf_alldatadaymonthchart = function(a_data, a_type, a_searchtype){
      let rtn_value = [];
      let v_dates = [];
      let v_fdate = new Date($('#sch_fdd').datebox('getValue'));
      let v_tdate = new Date($('#sch_tdd').datebox('getValue'));
      let v_filtereddata = [];
      let v_maxvalue = [];
      let v_minvalue = [];
      let v_avgvalue = [];
      let v_sumvalue = 0;
      let v_resultvalue;
      let v_type = '';

      if(typeof(a_data) != 'undefined'){
        
        while(v_fdate <= v_tdate){
          if(a_searchtype == 'DAY'){
            v_dates.push(v_fdate.toISOString().slice(0,10));
            v_fdate.setDate(v_fdate.getDate() +1);
          }else if(a_searchtype == 'MONTH'){
            v_dates.push(v_fdate.toISOString().slice(0,7));
            v_fdate.setMonth(v_fdate.getMonth() + 1);
          }
        }
        for(let i=0; i < v_dates.length; i++){
          v_filtereddata = [];
          v_maxvalue = [];
          v_minvalue = [];
          v_avgvalue = [];
          v_sumvalue = 0;
          v_resultvalue = 0;

          v_filtereddata.push(a_data.filter(data => data.OPER_DT == v_dates[i]));
          v_filtereddata = v_filtereddata[0];
          // for(let j=0; j < a_data.length; j++){
          //   if(a_data[j].OPER_DT == v_dates[i]) v_filtereddata.push(a_data[j]);
          // }
          if(typeof(v_filtereddata) == 'undefined' || v_filtereddata.length == 0){
            rtn_value.push(0);
          }else{
              if(a_type == 'MAX_STOP_TIME'){
                for(let j=0; j < v_filtereddata.length; j++){
                  if(typeof(v_filtereddata[j].MAX_STOP_TIME) == 'undefiend') v_filtereddata[j].MAX_STOP_TIME = 0;
                  v_maxvalue.push(v_filtereddata[j].MAX_STOP_TIME);
                }
                v_resultvalue = v_maxvalue.reduce((prev, cur) => {
                  return prev > cur ? prev : cur;
                });
                // v_resultvalue = Math.max.apply(null, v_maxvalue);
                rtn_value.push(v_resultvalue);
              } 
              else if(a_type == 'MIN_STOP_TIME'){
                for(let j=0; j < v_filtereddata.length; j++){
                  if(typeof(v_filtereddata[j].MIN_STOP_TIME) == 'undefiend') v_filtereddata[j].MIN_STOP_TIME = 0;
                  v_minvalue.push(v_filtereddata[j].MIN_STOP_TIME);
                }
                v_resultvalue = v_minvalue.reduce((prev, cur) => {
                  return prev < cur ? prev : cur;
                });
                rtn_value.push(v_resultvalue);
              }
              else if(a_type == 'AVRG_STOP_TIME'){
                for(let j=0; j < v_filtereddata.length; j++){
                  if(typeof(v_filtereddata[j].AVRG_STOP_TIME) == 'undefiend') v_filtereddata[j].AVRG_STOP_TIME = 0;
                  v_avgvalue.push(v_filtereddata[j].AVRG_STOP_TIME);
                }
                // 모든 값들을 더해준다.
                v_sumvalue = v_avgvalue.reduce((acc, val) => acc + val,0);
                // 더한값을 나눈다 
                v_avgvalue = v_sumvalue / v_avgvalue.length;
                // 소수점 2번째 자리까지로 넣는다.
                v_resultvalue = parseFloat(v_avgvalue.toFixed(2));
                
                rtn_value.push(v_resultvalue);
              }
          }
        }
      }
      return rtn_value;
    };

    

    // 일별, 월별 데이터 정리
    $.uf_daymonthchartdata = function(a_data, a_type, a_node, a_searchtype){
      let rtn_value = [];
      let v_data = [];
      let v_dates = [];
      let v_fdate = new Date($('#sch_fdd').datebox('getValue'));
      let v_tdate = new Date($('#sch_tdd').datebox('getValue'));
      let v_filtereddata;

      if(typeof(a_data) != 'undefined'){

        for(let i=0; i < a_data.length; i++){
          if(a_data[i].NODE_ID == a_node) v_data.push(a_data[i]);
        }
        while(v_fdate <= v_tdate){
          if(a_searchtype == 'DAY'){
            v_dates.push(v_fdate.toISOString().slice(0,10));
            v_fdate.setDate(v_fdate.getDate() +1);
          }else if(a_searchtype == 'MONTH'){
            v_dates.push(v_fdate.toISOString().slice(0,7));
            v_fdate.setMonth(v_fdate.getMonth() + 1);
          }
        }
        for(let i=0; i < v_dates.length; i++){
          v_filtereddata = v_data.filter(data => {
            if(data.OPER_DT == v_dates[i]){
              return data;
            }else{
              return 0;
            }
          });

          if(a_type == 'MAX_STOP_TIME'){
            if(typeof(v_filtereddata[0]) == 'undefined') v_filtereddata = 0;
            else v_filtereddata = v_filtereddata[0].MAX_STOP_TIME;
            rtn_value.push(v_filtereddata);
          } 
          else if(a_type == 'MIN_STOP_TIME'){
            if(typeof(v_filtereddata[0]) == 'undefined') v_filtereddata = 0;
            else v_filtereddata = v_filtereddata[0].MIN_STOP_TIME;
            rtn_value.push(v_filtereddata);
          }
          else if(a_type == 'AVRG_STOP_TIME'){
            if(typeof(v_filtereddata[0]) == 'undefined') v_filtereddata = 0;
            else v_filtereddata = v_filtereddata[0].AVRG_STOP_TIME;
            rtn_value.push(v_filtereddata);
          }
        }

      }
      
      return rtn_value;
    }


    $.uf_chart0xAxisdata = function(a_data){
      let rtn_datas = [];
      let v_chart = $('#chart0');
      let v_searchtype = $('#sch_lb2').combobox('getValue');
      let v_fdate = new Date($('#sch_fdd').datebox('getValue'));
      let v_tdate = new Date($('#sch_tdd').datebox('getValue'));

      if(v_searchtype == "TIME"){
        for(let i=1; i < 27; i++){
          if(i < 10){
            rtn_datas.push('0'+i+'시');
          }
          else rtn_datas.push(i+'시');
        }
      }
      else if(v_searchtype == "DAY"){
        while(v_fdate <= v_tdate){
          rtn_datas.push(v_fdate.toISOString().slice(5,10));
          v_fdate.setDate(v_fdate.getDate() +1);
        }
      }
      else if(v_searchtype == "MONTH"){
        while(v_fdate <= v_tdate){
          rtn_datas.push(v_fdate.toISOString().slice(0,7));
          v_fdate.setMonth(v_fdate.getMonth() + 1);
        }
      }

      return rtn_datas;
    }

    $.uf_xAxistext = function(){
      let rtn_value;
      let v_searchtype = $('#sch_lb2').combobox('getValue');
      
      if(v_searchtype == "TIME"){
        rtn_value = 'HOUR'
      }
      else if(v_searchtype == "DAY"){
        rtn_value = 'DAY'
      }
      else if(v_searchtype == "MONTH"){
        rtn_value = 'MONTH'
      }

      return rtn_value;
    }
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
  <div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
    <div class="easyui-layout" data-options="fit:true">
      <div data-options="region:'north', border:true, maxHeight:40, minHeight:40">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
              <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'west', border:true, maxWidth:460, minWidth:460">
                  <!-- search panel -->
                  <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                  </div>
                  <!-- search js -->
                  <script src="/static/js/ST/ST0206/ST0206_sch_selectbox0.js"></script>
                </div>
                <div data-options="region:'center', border:true">
                  <!-- search panel -->
                  <div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                  </div>
                  <!-- search js -->
                  <script src="/static/js/ST/ST0206/ST0206_sch_selectbox1.js"></script>
                  <script src="/static/js/ST/ST0206/ST0206_sch_fromtodate0.js"></script>
                </div>
              </div>
            </div>
            <div data-options="region:'east', border:true, maxWidth:700, minWidth:700">
                <!-- btn panel -->
                <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- btn js -->
                <script src="/static/js/ST/ST0206/ST0206_btn0.js"></script>
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
            <script src="/static/js/ST/ST0206/ST0206_dg0.js"></script>
          </div>
          <div data-options="region:'east', border:true, maxWidth:1450, minWidth:1450">
            <div class="easyui-layout" data-options="fit:true">
              <div data-options="region:'north', border:true, maxHeight:'55%', minHeight:'55%'">
                <!-- chart0 panel -->
                <div id="chart_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- chart0 js -->
                <script src="/static/js/ST/ST0206/ST0206_chart0.js"></script>
              </div>
              <div data-options="region:'center', border:true">
                <!-- dg1 panel -->
                <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- dg1 js -->
                <script src="/static/js/ST/ST0206/ST0206_dg1.js"></script>

                <!-- dg2 panel -->
                <div id="dg_panel2" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- dg2 js -->
                <script src="/static/js/ST/ST0206/ST0206_dg2.js"></script>

                <!-- dg3 panel --> 
                <div id="dg_panel3" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                </div>
                <!-- dg3 js -->
                <script src="/static/js/ST/ST0206/ST0206_dg3.js"></script>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</html>



