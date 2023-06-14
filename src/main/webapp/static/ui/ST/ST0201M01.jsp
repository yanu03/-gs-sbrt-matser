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
  <script src="/static/js/jquery.pivotgrid.js"></script>
	<script src="/static/js/sample_comm.js"></script>
	<script type="text/javascript">
    $( document ).ready(function() {});
    var uv_httpCount = 1;
    var uv_dg0data;

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
        let v_fdate = $('#sch_fdd').datebox('getValue');
        let v_tdate = $('#sch_tdd').datebox('getValue');
        let v_routgrpcombo = $('#sch_lb0').combobox('getValue');

        if(a_obj.attr('id') == 'dg0') rtn_params = {CONTENT : v_routgrpcombo};
        else if(a_obj.attr('id') == 'dg1') rtn_params = {F_DATE : v_fdate, L_DATE : v_tdate}; 
        
        return rtn_params;
    };

    $.pf_childretrieve = function(a_obj, a_param){
      let v_queryParams;
      v_queryParams = JSON.stringify({dma_search : $.pf_childparams(a_obj, a_param)});
      
      let v_str1 =  v_queryParams.search('ST_LINK_SN');
      let v_str2 =  v_queryParams.search('ED_LINK_SN');
      if(v_str1 != -1 && v_str2 != -1){
        a_obj.pivotgrid({queryParams: v_queryParams});
      }

      return true;
    };
    
    $.pf_childparams = function(a_obj, a_param){
      let rtn_params;
      let v_stcombobox = $('#sch_lb1').combobox('getValue');
      let v_edcombobox = $('#sch_lb2').combobox('getValue');
      let v_fdate = $.tracomfromdate('d');
      let v_tdate = $.tracombasicdate();
      let v_stlinksn = $.uf_linksnajax('http://localhost:8183/st/ST0201G1R0', {ROUT_ID: a_param, ST_NODE_ID: v_stcombobox}, uv_httpCount);
      let v_edlinksn = $.uf_linksnajax('http://localhost:8183/st/ST0201G1R1', {ROUT_ID: a_param, ED_NODE_ID: v_edcombobox}, uv_httpCount);
      if(a_obj.attr('id') == 'dg1') rtn_params = JSON.stringify({ROUT_ID: a_param, ST_LINK_SN : v_stlinksn.ST_LINK_SN, ED_LINK_SN : v_edlinksn.ED_LINK_SN, F_DATE : v_fdate, L_DATE : v_tdate});

      return rtn_params;
    };
    $.uf_formathead = function(a_value){
        let rtn_value;
        for(let i=0; i < uv_dg1data.length; i++){
          if(uv_dg1data[i].ROUT_ID == a_value){
            rtn_value = uv_dg1data[i].ROUT_NM;
          }
        }
        
        return rtn_value;
    };

    $.uf_chart0data = function(a_data, a_type){
      let rtn_value = [];
      if(typeof(a_data) != 'undefined'){
        for(let i=0; i < a_data.length; i++){
          if(a_type == 'ROUT_NM') rtn_value.push(a_data[i].ROUT_GRP_NM);
          else if(a_type == 'AVRG_SPD') rtn_value.push(a_data[i].AVRG_SPD);
          else if(a_type == 'MAX_SPD') rtn_value.push(a_data[i].MAX_SPD);
        }
      }
      return rtn_value;
    };

    $.uf_chartcombineparam = function(a_obj, a_param){
      let rtn_param;
      let v_fdate = $('#sch_fdd').datebox('getValue');
      let v_tdate = $('#sch_tdd').datebox('getValue');
      if(a_obj.attr('id') == 'chart0') rtn_param = {F_DATE : v_fdate, L_DATE : v_tdate};

      return rtn_param;
    }
    // pivotgrid의 rows의 icon을 지워준다
    $.uf_removecion = function(a_type){
      let v_datalength;
      if(a_type.attr('id') == 'dg0') v_datalength = uv_dg0data.length;
      else if(a_type.attr('id') == 'dg1') v_datalength = uv_dg1data.length;

      for(let i=0; i < v_datalength; i++){
        let v_treeicon = document.querySelector("span.tree-icon.tree-file");
        if(v_treeicon){
            v_treeicon.remove();
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

    $.uf_linksnajax = function(a_url, a_param, a_count){
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

    $.uf_findnodeid = function(a_value){

    }
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
          <script src="/static/js/ST0201/ST0201_sch_selectbox0.js"></script>
        </div>   
        <div data-options="region:'east', border:true, maxWidth:1300, minWidth:1300">
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center', border:true">
              <!-- selectobx1 & fromtodate panel -->
              <div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- selectobx1 js -->
              <script src="/static/js/ST0201/ST0201_sch_selectbox1.js"></script>
              <!-- fromtodate js -->
              <script src="/static/js/ST0201/ST0201_sch_fromtodate0.js"></script>
            </div>
            <div data-options="region:'east', border:true, maxWidth:300, minWidth:300">
              <!-- btn0 panel -->
              <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- btn0 js -->
              <script src="/static/js/ST0201/ST0201_btn0.js"></script>
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
          <script src="/static/js/ST0201/ST0201_dg0.js"></script>
        </div>
        <div data-options="region:'east', border:true, maxWidth:1300, minWidth:1300">
          <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north', border:true, height:'50%'">
              <!-- chart panel -->
              <div id="chart_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- chart js -->
              <script src="/static/js/ST0201/ST0201_chart0.js"></script>
            </div>
            <div data-options="region:'center', border:true">
              <!-- dg1 panel -->
              <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
              </div>
              <!-- dg1 js -->
              <script src="/static/js/ST0201/ST0201_dg1.js"></script>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</div>
</body>
</html>



