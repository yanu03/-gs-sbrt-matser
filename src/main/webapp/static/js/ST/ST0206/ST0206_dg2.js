/*
프로그램명 : 정류소 정차시간 통계

작성자 : 박원용
작성일 : 2023.05.26
*/
$(function(){
	//single main grid
	$('#dg_panel2').append('<table id="dg2" style="width:100%;height:100%"></table>');

  let v_fdate = $.tracomfromdate('d');
  let v_tdate = $.tracombasicdate();

    $('#dg2').pivotgrid({
        url:'/st/ST0206G1R0',
        method:'POST',
        queryParams: JSON.stringify({dma_search : {DAY_DIV:"", F_DATE:v_fdate, L_DATE:v_tdate, NODE_ID:"",SELECT_DIV:'DAY'}}),
        pivot:{
            rows:['NODE_NM'],
            columns:['OPER_DT'],
            values:[
                {field:'AVRG_STOP_TIME'},
                {field:'AVRG_ON_OFF_TIME'},
            ],
        },
        valueFieldWidth: 100,
        loadMsg: '데이터 로딩중입니다',
        emptyMsg: '데이터가 없습니다',
        loader: function(param, success, error){
          let v_chkdata = $('#dg2').pivotgrid('getData');
          if(typeof(v_chkdata) == 'undefined') $.tracompvdgloader($(this), param, success, error);
            // 데이터가 없을 시 검색 예외 처리 및 무한 로드 방지
            else if(v_chkdata.length == 0 && uv_chkdata == false && typeof(v_chkdata[0]) == 'undefined'){
                $.tracompvdgloader($(this), param, success, error);
            }
            // 데이터가 있을 시 검색 예외 처리 
            else if(typeof(v_chkdata[0]) != 'undefined' && uv_chkdata == false){
                $.tracompvdgloader($(this), param, success, error);
                uv_chkdata = true;
            }
            else $('#dg2').pivotgrid('loaded');

        },
        loadFilter: function(a_data){
          uv_dg2data = a_data;
            return a_data;
        },
        onBeforeLoad: function(param){
          
        },
        headerStyler: function(title, col){
          if(col.field == '_tree_field') {
            col.width = 250;
            col.title = '운행일, 정류소';
          }
          else if(col.title == 'AVRG_STOP_TIME') {
            col.width = 120;
            col.title = '평균정차시간';
          }
          else if(col.title == 'AVRG_ON_OFF_TIME'){
            col.width = 120;
            col.title = '평균승하차시간';
          }
          return true;
        },
        onLoadSuccess: function(a_row, a_data){
          uv_chkdata = true;
          
          $.uf_removecion($('#dg2'));
          return true;
        },
        
    });

});