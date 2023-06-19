/** 
작성자 : 양현우
작성일 : 2023-05-18
수정자 : 양현우
수정일 : 2023-05-18
**/


$(function(){
	$('#tab1').append('<div id="map0" style="width:100%;height:100%;"></div>');
	
	mapContainer = document.getElementById('map0'); // 지도를 표시할 div  $('#map0')
    $.jf_createmap(mapContainer, 126.570667, 33.450701, 3);
	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	//var map = new kakao.maps.Map(mapContainer, mapOption); 

    kakao.maps.event.addListener(js_map, 'click', function(a_mouseEvent) {        
        //클릭 이벤트
        let v_latlng = a_mouseEvent.latLng;
        $('#GPS_X').numberbox('setValue', v_latlng.getLng());
        $('#GPS_Y').numberbox('setValue', v_latlng.getLat());
        $.jf_movemarker($.jf_fndmkstrct($.jf_curdgfieldvalue($('#dg0'),'STTN_ID')), v_latlng.getLng(), v_latlng.getLat());
        $.jf_moveoverlay($.jf_fndostrct($.jf_curdgfieldvalue($('#dg0'),'STTN_ID')), v_latlng.getLng(), v_latlng.getLat());
    });
	kakao.maps.event.addListener(js_map, 'dragend', function() {        
        //지도 이동 이벤트(드래그)
    });
});