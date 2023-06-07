/**
 * 프로그램명 : 운행 평균속도  통계
 * 작성자 : 박원용
 * 작성일 : 2023.05.18
 */
$(function(){

  $('#chart_panel0').append('<div id="chart0" style="width:100%, height:100%"></div>');
//debugger;
  let v_fdate = $.tracomfromdate('d');
  let v_tdate = $.tracombasicdate();
  // 그리드 데이터와 차트 데이터가 달라서 따로 ajax를 불러왔습니다

  // chart function 
  // 함수화 한 이유 : ajax보다 chart가 먼저 실행이 되고
  // 그리드가 load된 후 chart가 그려지게 하려고
  $.cf_chart0ajax = function(a_node){
    let v_queryparam = JSON.stringify({dma_search : $.uf_chart0combineparam('auto')});
    
    $.ajax({
      type: 'POST',
      url: '/st/ST0206G1R1',
      data: v_queryparam,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function(a_data){
        if(typeof(a_data['rows']) != "undefined"){
          a_data = a_data['rows'];
        }else{
          let msgtext = a_data['rsMsg']['message'];
          top.$.messager.alert('sever massage',msgtext);
          a_data = {"total":0,"rows":[]};
        }
        $.cf_chart0(a_data, a_node);
        // console.log(a_data);
      },
      error: function(error){
        error.apply(this, arguments);
      }
    });
  }

  $.cf_chart0 = function(a_data, a_node){
    Highcharts.chart('chart0', {
      title: {
        text: '정류소 정차 시간대별 통계'
      },
      xAxis: {
        categories: $.uf_chart0xAxisdata(),
        title: {
          text: 'sec'
        }
      },
      yAxis: {
        title: {
          text: '시간'
        },
        max : 180
      },
      series: [
      {
        type: 'column', //막대그래프
        name: '최대 정차시간',
        data: $.uf_chart0data(a_data,'MAX_STOP_TIME',a_node),
        cursor: 'pointer',
      },
      {
        type: 'column', //막대그래프
        name: '최소 정차시간',
        data: $.uf_chart0data(a_data,'MIN_STOP_TIME',a_node),
        cursor: 'pointer',
      },
      {
        type: 'column', //막대그래프
        name: '평균 정차시간',
        data: $.uf_chart0data(a_data,'AVRG_STOP_TIME',a_node),
        cursor: 'pointer',
      },
      {
        type: 'spline', //라인그래프
        name: '최대 정차시간',
        data: $.uf_chart0avgdata(a_data, 'MAX_STOP_TIME')
      },
      {
        type: 'spline', //라인그래프
        name: '최소 정차시간',
        data: $.uf_chart0avgdata(a_data, 'MIN_STOP_TIME')
      },
      {
        type: 'spline', //라인그래프
        name: '평균 정차시간',
        data: $.uf_chart0avgdata(a_data, 'AVRG_STOP_TIME')
      }
      ]
    });
  }
	
});