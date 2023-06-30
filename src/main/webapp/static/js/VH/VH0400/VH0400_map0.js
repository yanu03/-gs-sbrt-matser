/**
 * 프로그램명 : 버스 운행 이벤트 이력 map
 * 작성자 : 박원용
 * 작성일 : 2023.06.26
 */
$(function(){
	$('#map_panel0').append('<div id="map0" style="width:100%;height:100%;"></div>');
	
	mapContainer = document.getElementById('map0'); // 지도를 표시할 div  $('#map0')
  $.jf_createmap(mapContainer, 126.570667, 33.450701, 3);
	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	//var map = new kakao.maps.Map(mapContainer, mapOption); 

  kakao.maps.event.addListener(js_map, 'click', function(mouseEvent) {        
      //클릭 이벤트
      if(!$.jf_isempty($.pf_mapclick)) $.pf_mapclick(mouseEvent);
  });
	kakao.maps.event.addListener(js_map, 'dragend', function() {        
        //지도 이동 이벤트(드래그)
    });
});