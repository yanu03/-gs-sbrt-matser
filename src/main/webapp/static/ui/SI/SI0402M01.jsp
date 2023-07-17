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
   <script src="/static/js/common/map_comm.js"></script>
   <script type="text/javascript" src="/static/jquery/jquery.fileDownload-1.4.5.js"></script> 
   <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=100faa0e8b0c72a3da69169f45883b0b"></script>
   <script type="text/javascript">
      $( document ).ready(function() {
         
         
    });

   dlt_OPER_ALLOC_PL_NODE_INFO = [];
   let isPathAdd;
   let isSttnAdd;
   let isCrossAdd;
   let curPoint; //클릭 이벤트용 전역변수
   
    $.pf_append = function(){return true;}
    $.pf_delete = function(){return true;}
    $.pf_validatedata = function(a_obj, a_idx, a_type){return true;}
    $.pf_setfocus = function(a_obj, a_idx){return true;}
    $.pf_retrieve = function(a_obj) {return true;}
   //자식 검색
    $.pf_childretrieve = function(a_obj, a_params){return true;}
    $.pf_setfooter = function(a_obj){return true;}
      
   //검색조건 파라미터
    $.pf_combineparams = function(a_obj){
       let rtn_params;
       if(a_obj.attr('id') == "dg0"){
          rtn_params = {CONTENT : $("#sch_sb0").searchbox('getValue'), TYPE : 'ALL'};  
       }
       return rtn_params;
    };
    
   //추가 파라미터
    $.pf_defaultparams = function(a_obj){
      let rtn_params;
      if(a_obj.attr('id') == "dg0") rtn_params = {ROUT_ID:$.jf_seqdgdata('/si/SI0402G0K0', 'post')}
       return rtn_params;
    }
    
    $.pf_modalselect = function(a_obj){return true;}

   $.pf_acceptcfmsg = function(a_type){
      if(a_type == 'save'){
         if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
            $.jf_savedgdata($('#dg1'), '/si/SI0402G1S0', 'post', null)
         }
         else
            $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
      }
      if(typeof(a_type) == 'number'){
         if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') ){
            $.jf_savedgdata($('#dg1'), '/si/SI0402G1S0', 'post', null)
         }
         else
            $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);            
      }
      if(a_type == 'focussave'){
         if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            $.jf_save($('#dg1'));   //그리드 순서에 따른 전체 저장 부분 갱신 필요
         }
         else
            $.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);
      }
      if(a_type == 'excelupload'){
          $("#excelupload_p0").window('open');
          $("#excelinputfile").val('');
       }
      return true;
   }
      
   $.pf_rejectcfmsg = function(a_type){
      if(a_type == 'save'){
         $.jf_resetdg($('#dg0'), 'all');
      }
      if(typeof(a_type) == 'number'){
         $.jf_resetdg($('#dg1'));
         $.jf_setfocus($('#dg0'), a_type);
      }
      if(a_type == 'focussave'){
         $.jf_resetdg($('#dg1'));
      }
      return true;
   }

   $.pf_ajaxafterproc = function(a_type){return true;}      

   $.pf_childparams = function(a_obj, a_row){
      let rtn_params;
      if(a_obj.attr('id') == 'dg1') rtn_params = {ROUT_ID: a_row.ROUT_ID}
      return rtn_params;
   }

   //map click 이벤트
   $.pf_mapclick = function(a_event) {
      curPoint = a_event;

      if(isPathAdd) {
         $.jf_addnode($('#dg1'), $.jf_curdgfieldvalue($('#dg0'), 'ROUT_ID'), curPoint);
         let v_row = {
            NODE_ID : $.jf_seqdgdata('/si/SI0402G1K0', 'post')
            ,OLD_NODE_ID : ""
            ,OLD_NODE_SN : ""
            ,LINK_ID : ""
            ,LINK_NODE_YN : ""
            ,WAY_DIV : $.jf_curdgfieldvalue($('#dg0'), 'WAY_DIV')
         }
         $('#dg1').datagrid('updateRow',{index:$.jf_curdgindex($('#dg1')),row:v_row});
      }
      if(isSttnAdd) $.uf_addsttn();
      if(isCrossAdd) $.uf_addcrs();

      // let v_index = $.jf_curdgindex($('#dg1'));
      // let v_data = $('#dg1').datagrid('getData');
      // $('#dg1').datagrid('loadData', v_data);
      // $('#dg1').datagrid('selectRow', v_index);
      // for(let i=0; i<v_data.rows.length; i++) {
      //    v_vals = $.jf_singledatatojson('NODE_SN', i+1);
      //    $('#dg1').datagrid('updateRow',{index:i,row:v_vals});
      // }
   }

   $.pf_markerclick = function(marker) {
      $.jf_setfocus($('#dg1'), $.jf_fndduprow($('#dg1'), 'NODE_ID', marker.id))
      return true;
   }

   $.uf_addsttn = function() {
      let v_values = {STTN_ID:null, STTN_NM:null, NODE_ID:null, NODE_NM:null, GPS_X:null, GPS_Y:null, REMARK:null};
      $.mf_selbustopmdopen($('#dg1'), null, v_values, $('#dg1'), 'g');
      //미완성, 이후 콜백 옵션이 필요함, 정류소의 위치를 알고 적절한 row에 insert해야함, 그러려면 공통으로 안쓰고 빼야할 수도
      //$.jf_drawroute($('#dg1').datagrid('getData')['rows']);
   }

   $.uf_addcrs = function() {
      let v_values = {CRS_ID:null, CRS_NM:null, NODE_ID:null, NODE_NM:null, GPS_X:null, GPS_Y:null, REMARK:null};
      $.mf_selcrosecmdopen($('#dg1'), null, v_values, $('#dg1'), 'g');
      //미완성, 이후 콜백 옵션이 필요함!!!!!, 교차로 정류소와 마찬가지
      //$.jf_drawroute($('#dg1').datagrid('getData')['rows']);
   }

   //백그라운드용 ajax
   $.uf_bgajax = function() {
      $.ajax({
         type: 'post',
         url: '/al/AL0203G1R0',
         data: JSON.stringify({dma_search : {ALLOC_ID :  $('#dg0').datagrid('getSelected').ALLOC_ID}}),
         dataType: 'json',
         async: false,
         contentType: 'application/json; charset=utf-8',
         success: function(data){
            if(typeof(data['rows']) != "undefined"){
               dlt_OPER_ALLOC_PL_NODE_INFO = data['rows']
            }else{
               let msgtext = data['rsMsg']['message'];
               top.$.messager.alert('sever massage',msgtext);
            }
         },
         error: function(error){
            error.apply(this, arguments);
            rtn_value = false;
         }
      });
   }

   $.uf_isaddpath = function() {
      if(isPathAdd) isPathAdd = false;
      else {
         isPathAdd = true;
         isSttnAdd = false;
         isCrossAdd = false;
      }
      $.uf_changeGeoBtn();
   }

   $.uf_isaddsttn = function() {
      if(isSttnAdd) isSttnAdd = false;
      else {
         isPathAdd = false;
         isSttnAdd = true;
         isCrossAdd = false;         
      }
      $.uf_changeGeoBtn();
   }

   $.uf_isaddcrs = function() {
      if(isCrossAdd) isCrossAdd = false;
      else {
         isPathAdd = false;
         isSttnAdd = false;
         isCrossAdd = true;         
      }
      $.uf_changeGeoBtn();
   }
    
   //다른 버튼 토글 on/off
   $.uf_changeGeoBtn = function() {
      $('#subbtn3').linkbutton('unselect');
      $('#subbtn4').linkbutton('unselect');
      $('#subbtn5').linkbutton('unselect');
      if(isPathAdd) $('#subbtn3').linkbutton('select');
      if(isSttnAdd) $('#subbtn4').linkbutton('select');
      if(isCrossAdd) $('#subbtn5').linkbutton('select');
      $.uf_setCursor();
   }

   $.uf_setCursor = function() {
      if(isPathAdd) js_map.setCursor('pointer'); //미완성, css 적용 시켜야 할듯
      if(isSttnAdd) js_map.setCursor('resize');
      if(isCrossAdd) js_map.setCursor('move'); 
   }


   </script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<div style="position:left;margin:0 0 0 0;border:0px solid red;width:100%;height:100vh;">
   <div class="easyui-layout" data-options="fit:true">
      <div data-options="region:'north', border:false, maxHeight:50, minHeight:50">
         <div class="easyui-layout" data-options="fit:true">
            <!--검색 조건 특히 name으로 동작하는 요소를 위해서 form을 검색 layout을 감사줌 -->
            <form style="border:0px solid red;">
            <div data-options="region:'west', border:false, minWidth:600, maxWidth:600">
               <div id="sch_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
               </div>
               <!-- 검색 object -->
               <!-- <script src="/static/js/SI0501_sch_selectbox0.js"></script> -->
               <!--검색 selectbox 가져와야함-->
               <script src="/static/js/SI/SI0401/SI0401_sch_searchbox0.js"></script>

            </div>
            </form>
            <div data-options="region:'center', border:false">
               <div id="btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
               </div>
               <!-- 버튼 object -->
               <script src="/static/js/SI/SI0402/SI0402_btn0.js"></script>
            </div>
         </div>
      </div>
      <div data-options="region:'center', border:false">   
         <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'west', border:false, minWidth:700, maxWidth:700">
               <div class="easyui-layout" data-options="fit:true">
                  <div data-options="region:'north', border:false, minHeight:250, maxHeight:250">
                     <div id="dg_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                     </div>         
                     <!--datagrid0 -->
                     <script src="/static/js/SI/SI0402/SI0402_dg0.js"></script>
                  </div>
                  <div data-options="region:'center', border:false">
                     <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'north', border:false, minHeight:40, maxHeight:40">
                           <!-- <div id="sch_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                           </div> -->
                           <div id="subbtn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                           </div>
                           <!--sub button -->
                           <script src="/static/js/SI/SI0402/SI0402_sch_searchbox0.js"></script>
                           <script src="/static/js/SI/SI0402/SI0402_subbtn0.js"></script>
                        </div>
                        <div data-options="region:'center', border:false">
                           <div id="dg_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                           </div>   
                           <!--datagrid1 -->
                           <script src="/static/js/SI/SI0402/SI0402_dg1.js"></script>
                           <!-- excel upload -->
                           <div id="excelupload_p0" class="easyui-window" title="엑셀 업로드" data-options="modal:true,closed:true,iconCls:'icon-save'"style="width:500px;height:200px;padding:10px;">
                              <form id="excelfrm" name="excelfrm" method="post" enctype="multipart/form-data">
                                    <input id="excelinputfile" name="excelinputfile" type="file"/>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div data-options="region:'center', border:false">
               <div class="easyui-layout" data-options="fit:true">
                  <div data-options="region:'north', border:true, maxHeight:30, minHeight:30">
                     <div id="subbtn_panel1" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                     </div>   
                     <!--sub button -->
                     <script src="/static/js/SI/SI0402/SI0402_subbtn1.js"></script>                  
                  </div>
                  <div data-options="region:'center', border:true">
                     <div id="map_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:'로딩중...'">
                     </div>   
                     <!--map -->
                     <script src="/static/js/map0.js"></script>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<div id="selbustop">
    <script src="/static/js/SI/SI0402/SI0402_modal_bus.js"></script>
</div>
<div id="selcrosec">
    <script src="/static/js/SI/SI0402/SI0402_modal_crs.js"></script>
</div>

</body>
</html>