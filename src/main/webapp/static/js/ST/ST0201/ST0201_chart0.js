/**
 * 프로그램명 : 정류소 구간별 평균 소도 통계
 * 작성자 : 박원용
 * 작성일 : 2023.06.15
 */

$(function(){
  $('#chart_panel0').append('<div id="chart0" style="width:100%, height:100%"></div>');

  $.cf_chart0 = function(a_data){
    Highcharts.chart('chart0', {
      title: {
        text: '주요노선별 평균속도'
      },
      xAxis: {
        categories: $.uf_chart0xAxisdata(),
        title: {
          text: '평균속도 (km/h)'
        }
      },
      yAxis: {
        title: {
          text: '속도'
        },
        max : 100
      },
      series: [
        {
          type: 'spline', //막대그래프
          name: '평균속도',
          data: $.uf_chart0data(a_data, 'LINK_AVRG_SPD'),
          cursor: 'pointer',
          point: {}
        }
      ]
    });
  }
	
});