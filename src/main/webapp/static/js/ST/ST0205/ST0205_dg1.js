/*
프로그램명 : 운행 평균속도 통계

작성자 : 박원용
작성일 : 2023.05.17
*/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" style="width:100%;height:100%"></table>');

  let v_fdate = $.tracomfromdate('d');
  let v_tdate = $.tracombasicdate();

    $('#dg1').pivotgrid({
        url:'/st/ST0205G1R1',
        method:'POST',
        queryParams: JSON.stringify({dma_search : {ROUT_GRP: "",F_DATE : v_fdate, L_DATE : v_tdate}}),
        pivot:{
            rows:['OPER_DT'],
            columns:['ROUT_ID'],
            values:[
                {field:'AVRG_SPD'},
            ],
        },
        valueFieldWidth: 100,
        loadMsg: '데이터 로딩중입니다',
        emptyMsg: '데이터가 없습니다',
        loader: function(param, success, error){
          let v_chkdata = $('#dg1').pivotgrid('getData');
          if(typeof(v_chkdata) == 'undefined') $.tracompvdgloader($(this), param, success, error);
            // 데이터가 없을 시 검색 예외 처리 및 무한 로드 방지
            else if(v_chkdata.length == 0 && uv_chkdata1 == false && typeof(v_chkdata[0]) == 'undefined'){
                $.tracompvdgloader($(this), param, success, error);
            }
            // 데이터가 있을 시 검색 예외 처리 
            else if(typeof(v_chkdata[0]) != 'undefined' && uv_chkdata1 == false){
                $.tracompvdgloader($(this), param, success, error);
                uv_chkdata1 = true;
            }
            else $('#dg1').pivotgrid('loaded');
        },
        loadFilter: function(a_data){
          uv_dg1data = a_data;
            return a_data;
        },
        headerStyler: function(title, col){
          let v_formatdata;

            if(col.field == '_tree_field') col.title = '운행일';
            else if(col._field == 'ROUT_ID') {
              col.title = $.uf_formathead(title);
            }
            else if(col.title == 'AVRG_SPD') col.title = '평균속도';
            
        },
        onLoadSuccess: function(a_row, a_data){
          //if() $.cf_chart1ajax();
          uv_chkdata1 = true;
          $.uf_removecion($('#dg1'));
            return true;
        },
        
    });

});