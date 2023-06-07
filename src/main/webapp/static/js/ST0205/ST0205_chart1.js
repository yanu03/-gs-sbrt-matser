/**
 * 프로그램명 : 운행 평균속도  통계
 * 작성자 : 박원용
 * 작성일 : 2023.05.18
 */
$(function(){

  $('#chart_panel1').append('<div id="chart1" style="width:100%, height:100%"></div>');
//debugger;
  let v_fdate = $.tracomfromdate('d');
  let v_tdate = $.tracombasicdate();
  // 그리드 데이터와 차트 데이터가 달라서 따로 ajax를 불러왔습니다

  // chart function 
  // 함수화 한 이유 : ajax보다 chart가 먼저 실행이 되고
  // 그리드가 load된 후 chart가 그려지게 하려고
  $.cf_chart1ajax = function(a_param){
    var v_queryparam = JSON.stringify({dma_search : $.uf_chartcombineparam($('#chart1'),a_param)});
    
    $.ajax({
      type: 'POST',
      url: '/st/ST0205G1R0',
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
        $.cf_chart1(a_data);
      },
      error: function(error){
        error.apply(this, arguments);
      }
    });
  }

  $.cf_chart1 = function(a_data){
    Highcharts.chart('chart1', {
      title: {
        text: +'노선별 평균속도'
      },
      xAxis: {
        categories: $.uf_chart1data(a_data, 'ROUT_NM'),
        title: {
          text: '평균속도 (km/h)'
        }
      },
      yAxis: {
        title: {
          text: '속도'
        },
        max : 150
      },
      series: [
      {
        type: 'column', //막대그래프
        name: '평균속도',
        data: $.uf_chart1data(a_data, 'AVRG_SPD'),
        cursor: 'pointer',
        point: {
          events:{
            click: function(){
              console.log(data[0]);
            }
          }
        }
      },
      {
        type: 'spline', //라인그래프
        name: '최대속도',
        data: $.uf_chart1data(a_data, 'MAX_SPD')
      }
      ]
    });
  }
	
});