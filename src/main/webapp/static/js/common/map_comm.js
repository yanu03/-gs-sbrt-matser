var js_mkstruct = []; //marker struct
var js_overlaystruct = []; //overlay struct
var js_bmkstruct = []; // 버스 마커 struct
var js_bostruct = []; //버스 오버레이 struct 
var js_sigstruct = []; // 신호 마커 struct

var js_linestruct = []; //polyline array
const mapOption = {
	NODE_TYPE : {
		CROSS : "NT001",
		BUSSTOP : "NT002",
		NORMAL : "NT003",
		GARAGE : "NT004",
		VERTEX : "NT005",
		SOUND : "NT006",
		SIGNAL : "NT008",
		DISP : "NT009"
	},
	MAX_NODE_CNT : 800,
	LIMIT_SPEED : 50, 
	//================================지도 확대 관련 start==============================================
	LEVEL : 5, // 맵 확대 레벨(1~ 14)
	MIN_LEVEL : 1, //맵 최소 확대 레벨(1~ 14)
	MAX_LEVEL : 7, //맵 최대 확대 레벨(1~ 14)
	//================================지도 확대 관련 end==============================================
	//================================이미지 관련 start==============================================
	CRS_IMG_SIZE : (19,19),
	CRS_IMG : '/static/img/cross.png',
	CRS_IMG_SEL : '/static/img/cross_selected.png',
	STTN_IMG_SIZE : (25, 24),
	STTN_IMG : '/static/img/busstop.png',
	STTN_IMG_SEL : '/static/img/busstop_selected.png',
	VERTEX_IMG_SIZE : (12,12),
	VERTEX_IMG : '/static/img/vertex.png',
	VERTEX_IMG_SEL : '/static/img/vertex_selected.png',
	DISP_IMG_SIZE : (12, 12),
	DISP_IMG : '/static/img/vertex.png',
	DISP_IMG_SEL : '/static/img/vertex_selected.png',
	SIGNAL_IMG_SIZE : (20,12),
	SIGNAL_IMG_GREEN : '/static/img/light_green.png',
	SIGNAL_IMG_RED : '/static/img/light_red.png',
	SOUND_IMG_SIZE : (15,20),
	SOUND_IMG : '/static/img/voice_node.png',
	SOUND_IMG_SEL : '/static/img/voice_node_selected.png',
	ROAD_IMG_SIZE : (19,20),
	ROAD_IMG : '/static/img/road_trans.png',
	ROAD_IMG_SEL : '/static/img/road_selected.png',
	BUS_IMG_SIZE : (35,35),
	BUS_IMG : '/static/img/bus_red.png',
	BUS_IMG_SEL : '/static/img/bus_red_select.png',
	//================================이미지 관련 end==============================================
	//================================Z-Index 관련 start==============================================
	ZINDEX_STTN_MARKER : 2, //정류소 마커 z-index
	ZINDEX_STTN_OVERLAY : 5, //정류소 오버레이 z-index
	ZINDEX_CRS_MARKER : 1, //교차로 마커 z-index
	ZINDEX_CRS_OVERLAY : 3, //교차로 오버레이 z-index
	ZINDEX_FOCUS_STTNCRS_MARKER : 3, //선택된 정류소 or 교차로 마커 z-index
	ZINDEX_BUS_MARKER : 6, //버스 마커 z-index
	ZINDEX_FOCUS_BUS_MARKER : 10, //선택된 버스 마커 z-index
	ZINDEX_BUS_OVERLAY : 9, //버스 오버레이 z-index
	ZINDEX_BUS_RIGHTCLICK_OVERLAY : 999, //버스 우클릭창 z-index
	ZINDEX_SIG_MARKER : 4, //신호등 z-index
	ZINDEX_DISPATCH_OVERLAY : 100000, //디스패치 오버레이 z-index
	ZINDEX_EVENT_OVERLAY : 100000, //이벤트 오버레이 z-index
	ZINDEX_TRF_OVERLAY : 100001, //신호모듈 오버레이 z-index
	//================================Z-Index 관련 end==============================================
	//================================색깔, 크기 관련 start===============================================
	ROUT_COLOR : "#FF005E", //노선 기본 HEX color값
	ROUT_WEIGHT : 5, //노선 두께
	ROUT_STYLE : "solid", //노선 모양 (	solid, shortdash, shortdot, shortdashdot, shortdashdotdot, dot, dash, dashdot, longdash, longdashdot, longdashdotdot)
	ROUT_OPACITY : 0.3, //선의 불투명도 (0~1 사이값)
	MORN_STD_01_COLOR : "#0bbe39", // 집중모니터링 1단계 HEX color값
	MORN_STD_02_COLOR : "#ffc700", // 집중모니터링 2단계 HEX color값
	MORN_STD_03_COLOR : "#eb5e5e", // 집중모니터링 3단계 HEX color값
	POLYGON_WEIGHT : 3, //다각형 선의 두께
	POLYGON_COLOR : "#39DE2A", //다각형 선 HEX color값
	POLYGON_OPACITY : 0.8, //다각형 선의 불투명도(0~1)
	POLYGON_STYLE : "solid", //다각형 선 스타일, 노선모양과 종류같음
	POLYGON_FILL_COLOR : '#A2FF99', //다각형 내부 HEX color값
	POLYGON_FILL_OPACITY : 0.7, //다각형 내부 불투명도
	POLYGON_MOUSE_OVER_COLOR : "#EFFFED", //마우스 오버시 내부 HEX color값
	POLYGON_MOUSE_OVER_OPACITY : 0.8, //마우스 오버시 내부 불투명도
	POLYGON_MOUSE_OUT_COLOR : "#A2FF99", //마우스 오버시 내부 HEX color값
	POLYGON_MOUSE_OUT_OPACITY : 0.7, //마우스 오버시 내부 HEX color값
	//================================색깔, 크기 관련 end===============================================
	//================================디스패치 관련 start===============================================
	DISPATCH_MSG_NORMAL : "정상 운행중입니다.",
	DISPATCH_OVERLAY_TIME : 2500
	//================================디스패치 관련 end=================================================
			
}

var js_map;

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 지도 생성
**/
$.jf_createmap = function(a_mapcontainer, a_gps_x, a_gps_y, a_lvl) {
	let mapOption = { 
        center: new kakao.maps.LatLng(a_gps_y, a_gps_x), // 지도의 중심좌표
        level: a_lvl // 지도의 확대 레벨
    };
	js_map = new kakao.maps.Map(a_mapcontainer, mapOption);


}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 지도의 중심좌표 이동
**/
$.jf_movemap = function(a_gps_x, a_gps_y){
	let moveLatLon = new kakao.maps.LatLng(a_gps_y, a_gps_x);
	js_map.setCenter(moveLatLon);
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 지도 줌인
**/
$.jf_zoomin = function() {
	js_map.setLevel(map.getLevel-1);
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 지도 줌아웃
**/
$.jf_zoomout = function() {
	js_map.setLevel(map.getLevel+1);
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 지도 레벨 변경
**/
$.jf_setlevelmap = function(a_lvl) {
	js_map.setLevel(a_lvl);
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 지도에 마커 추가, 기본 마커입니다. 이미지마커는 jf_addimgmarker 사용합니다.
**/
$.jf_addmarker = function(a_gps_x, a_gps_y) {
	let marker = new kakao.maps.Marker({
	   position: new kakao.maps.LatLng(a_gps_y, a_gps_x)
	})
	marker.setMap(js_map);
	js_mkstruct.push(marker);
	return true;
 }

 /** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 등록되어 있는 마커 삭제
**/
$.jf_deletemarker = function() {
	if(js_mkstruct != null && js_mkstruct.length != 0) {
		for (var i=0; i<js_mkstruct.length; i++) {
			js_mkstruct[i].setMap(null);
		}
	}
	js_mkstruct = [];
	return true;
}

//이미지마커 등록
$.jf_addimgmarker = function(a_data, a_nodetype) {
	let zIndex = -1;
	let imageSize = null;
	let markerImage = null;
	let markerSelImage = null;
	if(!$.jf_isempty(a_nodetype)) a_data.NODE_TYPE = a_nodetype;
	if(a_data.NODE_TYPE != null && typeof(a_data.NODE_TYPE) != 'undefined'){
		if(a_data.NODE_TYPE == mapOption.NODE_TYPE.CROSS) {
			zIndex = mapOption.ZINDEX_CRS_MARKER;
			imageSize = new kakao.maps.Size(mapOption.CRS_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.CRS_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.CRS_IMG_SEL, imageSize);
		}
		else if(a_data.NODE_TYPE == mapOption.NODE_TYPE.BUSSTOP){
			zIndex = mapOption.ZINDEX_STTN_MARKER;
			imageSize = new kakao.maps.Size(mapOption.STTN_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.STTN_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.STTN_IMG_SEL, imageSize);
		}
		else if(a_data.NODE_TYPE == mapOption.NODE_TYPE.DISP){
			imageSize = new kakao.maps.Size(mapOption.DISP_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.DISP_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.DISP_IMG_SEL, imageSize);
		}
		else if(a_data.NODE_TYPE == mapOption.NODE_TYPE.VERTEX){
			imageSize = new kakao.maps.Size(mapOption.VERTEX_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.VERTEX_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.VERTEX_IMG_SEL, imageSize);
		}
		else if(a_data.NODE_TYPE == mapOption.NODE_TYPE.SIGNAL){
			imageSize = new kakao.maps.Size(mapOption.SIGNAL_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.SIGNAL_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.SIGNAL_IMG_SEL, imageSize);
		}
		else if(a_data.NODE_TYPE == mapOption.NODE_TYPE.SOUND){
			imageSize = new kakao.maps.Size(mapOption.SOUND_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.SOUND_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.SOUND_IMG_SEL, imageSize);
		}
		else {
			imageSize = new kakao.maps.Size(mapOption.ROAD_IMG_SIZE);
			markerImage = new kakao.maps.MarkerImage(mapOption.ROAD_IMG, imageSize);
			markerSelImage = new kakao.maps.MarkerImage(mapOption.ROAD_IMG_SEL, imageSize);
		}
	}
	// if(a_idx == a_focusidx) markerImage = markerSelImage;
	let marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(a_data.GPS_Y, a_data.GPS_X),
		image: markerImage,
		zIndex : zIndex,
		//id : a_data.NODE_ID
	})
	if(!$.jf_isempty(a_data.NODE_ID)) marker.id = a_data.NODE_ID;
	else if(!$.jf_isempty(a_data.STTN_ID)) marker.id = a_data.STTN_ID;
	else if(!$.jf_isempty(a_data.CRS_ID)) marker.id = a_data.CRS_ID;

	// 마커에 클릭이벤트를 등록합니다
	kakao.maps.event.addListener(marker, 'click', function() {
		if(typeof($.pf_markerclick) != "undefined"){
			if(!$.pf_markerclick(marker)) return false;
		 }
	});

	marker.setMap(js_map);
	js_mkstruct.push(marker);
	return true;
}


/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 마커 위치 이동
**/
$.jf_movemarker = function(a_marker, a_gps_x, a_gps_y) {
	a_marker.setPosition(new kakao.maps.LatLng(a_gps_y, a_gps_x));
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : mkstruct 배열에서 마커 찾기
**/
$.jf_fndmkstrct = function(a_id){
	let rtn_marker = null;
	for(let i=0; i<js_mkstruct.length; i++){
		if(js_mkstruct[i].id == a_id){
			rtn_marker = js_mkstruct[i];
			return rtn_marker;
		}
	}
	return rtn_marker;
}


/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 오버레이 만들기
**/
$.jf_addoverlay = function(a_data, a_nodetype) {
	let overlayName = null;
	let overlay = null;
	let marker = null;
	let nodeType = null;
	let zIndex = mapOption.ZINDEX_BUS_OVERLAY;
	if(!$.jf_isempty(a_nodetype)) {
		if(a_nodetype == mapOption.NODE_TYPE.BUSSTOP) {
			a_data['NODE_NM'] = a_data.STTN_NM;
			a_data['NODE_ID'] = a_data.STTN_ID;
		}
		else if(a_nodetype == mapOption.NODE_TYPE.CROSS) {
			a_data['NODE_NM'] = a_data.CRS_NM;
			a_data['NODE_ID'] = a_data.CRS_ID;
		}
	}
	else {
		if(!$.jf_isempty(a_data.STTN_ID) || a_data.NODE_TYPE == 'NT002') nodeType = 'busstop';
		else if(!$.jf_isempty(a_data.CRS_ID) || a_data.NODE_TYPE == 'NT001') nodeType = 'cross';
		else nodeType = 'normal';
	}
	if(!$.jf_isempty(a_data['NODE_NM']))	overlayName = a_data.NODE_NM;

	var msg = "<div class = 'customoverlay "+nodeType+"'>"
			+ "<span class = 'map_title' style=''>" + overlayName + "</span>"
			+ "</div>";

	if(!$.jf_isempty(a_data['NODE_ID'])) marker = $.jf_fndmkstrct(a_data.NODE_ID);
	overlay = new kakao.maps.CustomOverlay({
		content : msg,
		//position : marker.getPosition(),
		position : new kakao.maps.LatLng(a_data.GPS_Y, a_data.GPS_X),
		zIndex : zIndex,
		//id : a_data.NODE_ID
	})		
	if(!$.jf_isempty(a_data.NODE_ID)) overlay.id = a_data.NODE_ID;
	else if(!$.jf_isempty(a_data.STTN_ID)) overlay.id = a_data.STTN_ID;
	else if(!$.jf_isempty(a_data.CRS_ID)) overlay.id = a_data.CRS_ID;

	overlay.setMap(js_map);
	js_overlaystruct.push(overlay);
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-31
기능 : js_overlaystruct 배열에서 오버레이 찾기
**/
$.jf_fndostrct = function(a_id){
	let rtn_overlay = null;
	for(let i=0; i<js_overlaystruct.length; i++){
		if(js_overlaystruct[i].id == a_id){
			rtn_overlay = js_overlaystruct[i];
			break;
		}
	}
	return rtn_overlay;
}

/** 
작성자 : 양현우
작성일 : 2023-07-07
기능 : js_overlaystruct 배열에서 a_id를 포함하는 오버레이 찾기
**/
$.jf_fndicostrct = function(a_id){
	let rtn_overlay = null;
	for(let i=0; i<js_overlaystruct.length; i++){
		if(js_overlaystruct[i].id.includes(a_id)){
			rtn_overlay = js_overlaystruct[i];
			break;
		}
	}
	return rtn_overlay;
}

/** 
작성자 : 양현우
작성일 : 2023-05-24
기능 : 디스패치 오버레이 만들기
**/
$.jf_adddsptchoverlay = function(a_data) {
	//직접 통신하여 현재 변수명이 다름. kafka 연결후 수정해야함.(주석 풀면 됨)
	let overlayName = null;
	let overlay = null;
	let marker = null;
	let zIndex = mapOption.ZINDEX_BUS_OVERLAY;
	//let v_message = a_data.MESSAGE;
	let v_message = $.jf_convertdsptch(a_data);
	let v_dsptchMsg = "";
	/*v_dsptchMsg += '<div class="dsptchMessagePopup clickoverlay" id="busInfoPopup" style="position: absolute;"><div class="map_layer bustraffic" style="left: 0px;top: 10px;z-index:10000000;">'
	v_dsptchMsg += '<a href="javascript:void(0)" id="busInfo-closer" class="close"><span class="blind">닫기</span></a>'
	v_dsptchMsg += '<div id="popup-content">'
	v_dsptchMsg += '<div class="tit"><span style="margin-right: 40px; word-wrap:break-word; white-space: normal;"><strong>'+a_data.VHC_NO+'</strong></span></div>' 
	//v_dsptchMsg += '<div class="tit"><span style="margin-right: 40px; word-wrap:break-word; white-space: normal;"><strong>'+a_data.BUS_NO+'</strong></span></div>' 
	v_dsptchMsg += '<div class="content">' 
	v_dsptchMsg += '<div class="trafficInfor">' 
	v_dsptchMsg += '<table class="tby03">' 
	v_dsptchMsg += '<caption>디스패치메시지</caption>' 
	v_dsptchMsg += '<colgroup>' 
	v_dsptchMsg += '<col style="width:*">' 
	v_dsptchMsg += '<col style="width:19%">' 
	v_dsptchMsg += '<col style="width:13%">' 
	v_dsptchMsg += '<col style="width:19%">' 
	v_dsptchMsg += '<col style="width:13%">' 
	v_dsptchMsg += '</colgroup>' 
	v_dsptchMsg += '<tbody id="overlay_tbody">' 
	v_dsptchMsg += '<tr> '
	v_dsptchMsg += '<th style="font-size: 10px;">메시지내용</th>' 
	v_dsptchMsg += '<td style="font-size: 10px; padding: 5px;" colspan="4" id="">'
	v_dsptchMsg +=  '<div style="white-space: normal;">'+v_message+'</div></td>' 
	v_dsptchMsg += '</tr>'
	v_dsptchMsg += '</tbody>' 
	v_dsptchMsg += '</table>' 
	v_dsptchMsg += '</div> </div>'
	v_dsptchMsg += '</div></div>'	*/			

	if(a_data.DSPTCH_DIV == 'DP001' || a_data.DSPTCH_DIV == 'DP002'){
		if($.jf_fndicostrct('evt') != null) v_dsptchMsg += '<div class="dispatch map_mesage" style="position: absolute; bottom:210px;"></h3>';
		else v_dsptchMsg += '<div class="dispatch map_mesage" style="position: absolute;"></h3>';
	    v_dsptchMsg += '<h3 class="blind"></h3>'
		v_dsptchMsg += '   <span>'+v_message+'</span>'
		v_dsptchMsg += '   <button class="close_mesage ir_pm" id="busInfo-closer">닫기</button> '
		v_dsptchMsg += '</div>'
	
		//if(!$.jf_isempty(a_data['IMP_ID'])) marker = $.jf_fndmkstrct(a_data.IMP_ID);
		if ($.jf_fndicostrct('_dsptch') == null) {
		if (!$.jf_isempty(a_data['VHC_ID'])) marker = $.jf_fndbmkstrct(a_data.VHC_ID);
			overlay = new kakao.maps.CustomOverlay({
				content : v_dsptchMsg,
				//position : marker.getPosition(),
				position : new kakao.maps.LatLng(a_data.GPS_Y, a_data.GPS_X),
				//position : new kakao.maps.LatLng(36.46913, 127.27398), //미완성, 현재 테스트중 GPS값 들어오지 않음, kafka붙이면 실제 데이터로 변경해야함
				zIndex : zIndex,
			})		
			overlay.id = a_data.VHC_ID+'_dsptch';
			overlay.setMap(js_map);
			js_overlaystruct.push(overlay);		
		}
	}
	
	else if (a_data.DSPTCH_DIV == 'DP003'){
		//showMessage = "정류장 정차 : " + min + sec;
		$("#stopMessage").text(v_message);
	}
	
	if ($.jf_fndicostrct('_dsptch') != null && $.jf_fndicostrct('_evt') == null) {
		setTimeout(function() {
			$.jf_deleteOverlay($.jf_fndicostrct('_dsptch'));
		},mapOption.DISPATCH_OVERLAY_TIME);	
	}
	
	else if($.jf_fndicostrct('_dsptch') != null && $.jf_fndicostrct('_evt') != null) {
		$("#busInfoPopup").css("bottom", "42px");
		setTimeout(function() {
			$.jf_deleteOverlay($.jf_fndicostrct('_dsptch'));		
		},mapOption.DISPATCH_OVERLAY_TIME);			
	}

	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-07-07
기능 : 등록되어 있는 오버레이 삭제
**/
$.jf_deleteOverlay = function(a_overlay) {
	if(js_mkstruct != null && js_overlaystruct.length != 0) {
		a_overlay.setMap(null);
		var v_index = js_overlaystruct.indexOf(a_overlay);
		if (v_index !== -1) js_overlaystruct.splice(v_index, 1);		
	}
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-11
기능 : 등록되어 있는 오버레이 전체 삭제
**/
$.jf_deleteAllOverlay = function() {
	if(js_mkstruct != null && js_overlaystruct.length != 0) {
		for (var i=0; i<js_overlaystruct.length; i++) {
			js_overlaystruct[i].setMap(null);
		}
	}
	js_overlaystruct = [];
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-24
기능 : 오버레이 위치 이동
**/
$.jf_moveoverlay = function(a_overlay, a_gps_x, a_gps_y) {
	a_overlay.setPosition(new kakao.maps.LatLng(a_gps_y, a_gps_x))
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 노선 그리기(선, 마커, 오버레이 초기화 후 다시 그림)
**/
$.jf_drawroute = function(a_list, a_type) {
	if(a_list != null && a_list.length != 0) {
		$.jf_deleteline();
		$.jf_deletemarker();
		$.jf_deleteAllOverlay();
		$.jf_drawline(a_list);
		for(var i=0; i<a_list.length; i++) {
			$.jf_addimgmarker(a_list[i], a_type);
			$.jf_addoverlay(a_list[i]);			
		}
	}
}


/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 선 그리기
**/
$.jf_drawline = function(a_list){
	let v_linePaths = [];

	for(var i=0; i<a_list.length; i++)	v_linePaths.push(new kakao.maps.LatLng(a_list[i]['GPS_Y'], a_list[i]['GPS_X']));

	let v_polyLine = new kakao.maps.Polyline({
		path : v_linePaths,
		strokeColor : mapOption.ROUT_COLOR,
		strokeWeight : mapOption.ROUT_WEIGHT,
		strokeStyle : mapOption.ROUT_STYLE,
		strokeOpacity : mapOption.ROUT_OPACITY
	})
	kakao.maps.event.addListener(v_polyLine, 'click', function(mouseEvent) {});
	kakao.maps.event.addListener(v_polyLine, 'mouseover', function(mouseEvent) {});
	kakao.maps.event.addListener(v_polyLine, 'mouseout', function(mouseEvent) {});
	kakao.maps.event.addListener(v_polyLine, 'mousemove', function(mouseEvent) {});
	kakao.maps.event.addListener(v_polyLine, 'mousedown', function(mouseEvent) {});
	v_polyLine.setMap(js_map);
	// js_mapstruct.push({polyline : v_polyLine});
	js_linestruct.push(v_polyLine);

	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 지도에 있는 선 지우기
**/
$.jf_deleteline = function() {
	if(js_linestruct != null && js_linestruct.length != 0) {
		for (var i=0; i<js_linestruct.length; i++){
			js_linestruct[i].setMap(null);
		}
	}
	js_linestruct = [];
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 버스 마커 만들기
**/
$.jf_addbusmarker = function(a_data) {
	let zIndex = mapOption.ZINDEX_BUS_MARKER;
	let imageSize = new kakao.maps.Size(mapOption.BUS_IMG_SIZE);
	let markerImage = new kakao.maps.MarkerImage(mapOption.BUS_IMG, imageSize);
	let markerSelImage = new kakao.maps.MarkerImage(mapOption.BUS_IMG_SEL, imageSize);

	// if(a_idx == a_focusidx) markerImage = markerSelImage;
	let marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(a_data.GPS_Y, a_data.GPS_X),
		image: markerImage,
		zIndex : zIndex,
		//id:a_data.VHC_ID // 먹히는지 확인하기, map.getMarkerById('아이디'); <- 이거도 되는지 확인하기
	})

	marker.id = a_data.VHC_ID;

	if(!$.jf_isempty(a_data['BEARING'])) {
		$(marker.ca).css('transform', '');
		$(marker.ca).css('transform', 'rotate(-'+a_data.BEARING+'deg)');
	}

	marker.setMap(js_map);
	js_bmkstruct.push(marker);

	//마커 클릭 이벤트등 추가할 것

	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : bmkstruct 배열에서 버스 마커 찾기
**/
$.jf_fndbmkstrct = function(a_id){
	let rtn_marker = null;
	for(let i=0; i<js_bmkstruct.length; i++){
		if(js_bmkstruct[i].id == a_id){
			rtn_marker = js_bmkstruct[i];
		}
	}
	return rtn_marker;
}

/** 
작성자 : 양현우
작성일 : 2023-05-24
기능 : bostruct 배열에서 버스 오버레이 찾기
**/
$.jf_fndbostrct = function(a_id){
	let rtn_overlay = null;
	for(let i=0; i<js_bostruct.length; i++){
		if(js_bostruct[i].id == a_id){
			rtn_overlay = js_bostruct[i];
		}
	}
	return rtn_overlay;
}

/** 
작성자 : 양현우
작성일 : 2023-05-10
기능 : 버스 오버레이 만들기
**/
$.jf_addbusoverlay = function(a_data) {
	let overlayName = null;
	let overlay = null;
	let marker = null;
	let zIndex = mapOption.ZINDEX_BUS_OVERLAY;
	if(!$.jf_isempty(a_data['VHC_NO']))	overlayName = a_data.VHC_NO;

	var msg = "<div class = 'busoverlay'>"
			+ "<span class = 'map_title' style=''>" + overlayName + "</span>"
			+ "</div>";

	if(!$.jf_isempty(a_data['VHC_ID'])) marker = $.jf_fndbmkstrct(a_data.VHC_ID);	
	overlay = new kakao.maps.CustomOverlay({
		content : msg,
		position : marker.getPosition(),
		zIndex : zIndex,
		///id : a_data.VHC_ID
	})		
	overlay.id = a_data.VHC_ID;

	overlay.setMap(js_map);
	js_bostruct.push(overlay);
}

/** 
작성자 : 양현우
작성일 : 2023-05-22
기능 : 노드 추가, 노드순번이 소수점이 아닌 그리드 전체를 바꾸는 경우, 백업용
**/
// $.jf_addnode = function(a_obj, a_routeId, a_event) {
// 	if($.jf_datalength(a_obj) > mapOption.MAX_NODE_CNT) return false;
// 	let v_lonlat = a_event.latLng;
// 	// let v_idx = $.jf_curdgindex(a_obj);

// 	let v_params = {
// 		ROUT_ID : a_routeId,
// 		NODE_SN : v_idx,
// 		NODE_NM : "노드_" + $.jf_getcurrentdate().substring(4),
// 		NODE_TYPE : mapOption.NODE_TYPE.NORMAL,
// 		GPS_Y : Math.floor(v_lonlat.Ma*(Math.pow(10, 7)))/Math.pow(10,7),
// 		GPS_X : Math.floor(v_lonlat.La*(Math.pow(10, 7)))/Math.pow(10,7),
// 		draggable: true
// 	};
// 	if(v_idx <= -1) v_idx = $.jf_insert(a_obj, v_params, 0);
// 	else v_idx = $.jf_insert(a_obj, v_params, v_idx);

// 	$.jf_drawroute(a_obj.datagrid('getData')['rows']);
// }

/** 
작성자 : 양현우
작성일 : 2023-05-23
기능 : 노드 추가
**/
$.jf_addnode = function(a_obj, a_routeId, a_event) {
	// 직교좌표 현재 사용하지 않아 일단 보류함(추후 주석 부분 코드로 사용할 가능성 있음)

	// if($.jf_datalength(a_obj) > mapOption.MAX_NODE_CNT) return false;
	// let v_routeData = a_obj.datagrid('getData')['rows'];
	// let v_lastIndex = $.jf_datalength(a_obj) -1;
	// let v_lonlat = a_event.latLng;
	// var v_min = 10000000;
	// var v_minIndex = null;

	// for(var i=0; i<v_lastIndex; i++) {
	// 	let v_result = $.jf_getdistancetoline(v_lonlat.Ma, v_lonlat.La, v_routeData[i].GPS_Y, v_routeData[i].GPS_X, v_routeData[i+1].GPS_Y, v_routeData[i+1].GPS_X);
	// 	if(v_result.distance) {
	// 		if(v_min > v_result.distacne){
	// 			v_min = result.distacne;
	// 			v_minIndex = i;
	// 		}
 	// 	}
	// }
	// let v_idx = -1;
	// if($.jf_isempty(v_minIndex)) {
	// 	let v_firstDistance = 0;
	// 	let v_lastDistance = 0;
	// 	if(v_routeData.length>0) {
	// 		v_firstDistance = $.jf_getDistanceBetween(v_lonlat.Ma, v_lonlat.La, v_routeData[0].GPS_Y, v_routeData[0].GPS_X);
	// 		v_lastDistance = $.jf_getDistanceBetween(v_lonlat.Ma, v_lonlat.La, v_routeData[v_lastIndex].GPS_Y, v_routeData[v_lastIndex].GPS_X);
	// 		debugger;
	// 	}
	// 	if(v_routeData.length == 1) v_idx = 1;
	// 	else {
	// 		if(v_firstDistance <= v_lastDistance) v_idx = 0;
	// 		else v_idx = v_lastIndex + 1;
	// 	}
	// }
	// else v_idx = v_minIndex + 1;
	// let v_params = {
	// 	ROUT_ID : a_routeId,
	// 	NODE_SN : v_idx,
	// 	NODE_NM : "노드_" + $.jf_getcurrentdate().substring(4),
	// 	NODE_TYPE : mapOption.NODE_TYPE.NORMAL,
	// 	GPS_Y : Math.floor(v_lonlat.Ma*(Math.pow(10, 7)))/Math.pow(10,7),
	// 	GPS_X : Math.floor(v_lonlat.La*(Math.pow(10, 7)))/Math.pow(10,7),
	// 	draggable: true
	// }
	// v_idx = $.jf_insert(a_obj, v_params, v_idx);
	// $.jf_drawroute(a_obj.datagrid('getData')['rows']);
	if($.jf_datalength(a_obj) > mapOption.MAX_NODE_CNT) return false;
	let v_lonlat = a_event.latLng;
	// let v_idx = $.jf_curdgindex(a_obj);
	let v_idx = 0;
	let v_curIndex = $.jf_curdgindex(a_obj);
	let v_nextIndex = v_curIndex + 1;

	//선택된게 없거나 마지막 row일때
	if((v_curIndex <= -1) || (v_nextIndex == $.jf_datalength(a_obj))) {
		v_curIndex = $.jf_datalength(a_obj)-1;
		v_nextIndex = -1;
	}
	
	//v_idx = v_routeData[v_minIndex].NODE_SN + (v_routeData[v_minIndex+1].NODE_SN - v_routeData[v_minIndex].NODE_SN) / 2;
	let v_routeData = $.jf_getdata(a_obj);
	if(v_curIndex == -1) v_idx = 1;
	else if(v_nextIndex == -1) v_idx = v_routeData[v_curIndex].NODE_SN + 1;
	else if(v_nextIndex != -1) {
		v_idx = (v_routeData[v_curIndex].NODE_SN + v_routeData[v_nextIndex].NODE_SN) / 2;
		v_idx = Math.round(v_idx * 1000) / 1000;
	}

	let v_params = {
		ROUT_ID : a_routeId,
		NODE_SN : v_idx,
		NODE_NM : "노드_" + $.jf_getcurrentdate().substring(4),
		NODE_TYPE : mapOption.NODE_TYPE.NORMAL,
		GPS_Y : Math.floor(v_lonlat.Ma*(Math.pow(10, 7)))/Math.pow(10,7),
		GPS_X : Math.floor(v_lonlat.La*(Math.pow(10, 7)))/Math.pow(10,7),
		draggable: true
	};
	// if(!Number.isInteger(v_idx)) v_idx = Math.floor(v_idx);

	if(!$.jf_dupcheck(a_obj, 'NODE_SN', v_idx)) {
		$.jf_insert(a_obj, v_params, $.jf_curdgindex(a_obj)+1);
		$.jf_drawroute(a_obj.datagrid('getData')['rows']);
	}
	else $.tracomalmsg('정보', '동일한 노드순번('+v_idx+')이 존재합니다.', null);
	
	// if(v_nextIndex == -1) v_idx = $.jf_insert(a_obj, v_params, 0);
	// else v_idx = $.jf_insert(a_obj, v_params, v_idx);

	
}

/** 
작성자 : 양현우
작성일 : 2023-05-22
기능 : 정류소 추가
**/
$.jf_addsttn = function(a_obj, a_data, a_routeId, a_event) {
	let idx = -1;
	if($.jf_datalength(a_obj) > mapOption.MAX_NODE_CNT) return false;
	let v_lonlat = a_event.latLng;
	let v_min = 10000000;
	let v_minIndex = null;
	let v_routeData = $.jf_getdata(a_obj);

	for(let i=0; i<$.jf_datalength(a_obj) - 1; i++) {
		let v_result = $.jf_getdistancetoline(v_lonlat.Ma, v_lonlat.La, v_routeData[i].GPS_Y, v_routeData[i].GPS_X, v_routeData[i+1].GPS_Y, v_routeData[i+1].GPS_X);
		if(v_result.distance){
			if(v_min > v_result.distance) {
				v_min = v_result.distance;
				v_minIndex = i;
			}
		}
	}

	if($.jf_isempty(v_minIndex)) $.tracomalmsg('정보', '선택할 수 없는 좌표입니다. 경로를 먼저 입력하세요.', null);
	else{
		// v_idx = v_minIndex + 1;
		v_idx = 0;
		v_idx = v_routeData[v_minIndex].NODE_SN + (v_routeData[v_minIndex+1].NODE_SN - v_routeData[v_minIndex].NODE_SN) / 2;
		let v_insertIndex = v_minIndex + 1;
		let v_params = {
			ROUT_ID : a_routeId,
			NODE_ID : a_data['NODE_ID'],
			NODE_SN : v_idx,
			// NODE_NM : "정류소_" + $.jf_getcurrentdate().substring(4),
			NODE_NM : a_data['NODE_NM'],
			NODE_TYPE : mapOption.NODE_TYPE.BUSSTOP,
			// GPS_Y : Math.floor(v_lonlat.Ma*(Math.pow(10, 7)))/Math.pow(10,7),
			// GPS_X : Math.floor(v_lonlat.La*(Math.pow(10, 7)))/Math.pow(10,7),
			GPS_Y : a_data['GPS_Y'],
			GPS_X : a_data['GPS_X'],
			draggable: true
		};

		// v_idx = $.jf_insert(a_obj, v_params, v_idx);
		v_idx = $.jf_insert(a_obj, v_params, v_insertIndex);
		$.jf_drawroute(a_obj.datagrid('getData')['rows']);
	}

}

/** 
작성자 : 양현우
작성일 : 2023-05-23
기능 : 교차로 추가
**/
$.jf_addcrs = function(a_obj, a_data, a_routeId, a_event) {
	let idx = -1;
	if($.jf_datalength(a_obj) > mapOption.MAX_NODE_CNT) return false;
	let v_lonlat = a_event.latLng;
	let v_min = 10000000;
	let v_minIndex = null;
	let v_routeData = $.jf_getdata(a_obj);

	for(let i=0; i<$.jf_datalength(a_obj) - 1; i++) {
		let v_result = $.jf_getdistancetoline(v_lonlat.Ma, v_lonlat.La, v_routeData[i].GPS_Y, v_routeData[i].GPS_X, v_routeData[i+1].GPS_Y, v_routeData[i+1].GPS_X);
		if(v_result.distance){
			if(v_min > v_result.distance) {
				v_min = v_result.distance;
				v_minIndex = i;
			}
		}
	}

	if($.jf_isempty(v_minIndex)) $.tracomalmsg('정보', '선택할 수 없는 좌표입니다. 경로를 먼저 입력하세요.', null);
	else{
		// v_idx = v_minIndex + 1;
		v_idx = 0;
		v_idx = v_routeData[v_minIndex].NODE_SN + (v_routeData[v_minIndex+1].NODE_SN - v_routeData[v_minIndex].NODE_SN) / 2;
		let v_insertIndex = v_minIndex + 1;
		let v_params = {
			ROUT_ID : a_routeId,
			NODE_ID : a_data['NODE_ID'],
			NODE_SN : v_idx,
			// NODE_NM : "정류소_" + $.jf_getcurrentdate().substring(4),
			NODE_NM : a_data['NODE_NM'],
			NODE_TYPE : mapOption.NODE_TYPE.BUSSTOP,
			// GPS_Y : Math.floor(v_lonlat.Ma*(Math.pow(10, 7)))/Math.pow(10,7),
			// GPS_X : Math.floor(v_lonlat.La*(Math.pow(10, 7)))/Math.pow(10,7),
			GPS_Y : a_data['GPS_Y'],
			GPS_X : a_data['GPS_X'],
			draggable: true
		};

		// v_idx = $.jf_insert(a_obj, v_params, v_idx);
		v_idx = $.jf_insert(a_obj, v_params, v_insertIndex);
		$.jf_drawroute(a_obj.datagrid('getData')['rows']);
	}

}



/** 
작성자 : 양현우
작성일 : 2023-05-22
기능 : 점이 직선에 직교좌표를 생성하고 거리를 계산
**/
$.jf_getdistancetoline = function(a_x, a_y, a_x1, a_y1, a_x2, a_y2) {
	var v_point = $.jf_getpointtoline(a_x, a_y, a_x1, a_y1, a_x2, a_y2);
	
	if(v_point == null) return false;
	else {
		var v_distance = $.jf_getDistanceBetween(a_x, a_y, v_point.x, v_point.y);
		return {
			point: v_point,
			distance: v_distance
		}
	}
}

/**
작성자 : 양현우
작성일 : 2023-05-22
기능 : 한점이 직선상에 직교좌표를 생성한 좌표를 반환
**/
$.jf_getpointtoline = function(a_x, a_y, a_x1, a_y1, a_x2, a_y2) {
	var v_isValid = false;
	var v_point;
	
	if(a_y1 == a_y2 && a_x1 == a_y2)
		a_y1 -= 0.00001;
	var U = ((a_y - a_y1) * (a_y2 - a_y1)) + ((a_x - a_x1) * (a_x2 - a_x1));
	var Udenom = Math.pow(a_y2 - a_y1, 2) + Math.pow(a_x2 - a_x1, 2);
	
	U /= Udenom;
	
	var v_y = a_y1 + (U * (a_y2 - a_y1));
	var v_x = a_x1 + (U * (a_x2 - a_x1));
	v_point =  {
		x: v_x,
		y: v_y
	};
	
	var v_minx, v_maxx, v_miny, v_maxy;
	
	v_minx = Math.min(a_y1, a_y2);
	v_maxx = Math.max(a_y1, a_y2);
	
	v_miny = Math.min(a_x1, a_x2);
	v_maxy = Math.max(a_x1, a_x2);
	
	v_isValid = (v_point.y >= v_minx && v_point.y <= v_maxx) && (v_point.x >= v_miny && v_point.x <= v_maxy);
	
	return v_isValid ? v_point : null;	
}

/**
작성자 : 양현우
작성일 : 2023-05-22
기능 : 두 지점간의 거리 계산
 */
$.jf_getDistanceBetween = function(a_x1, a_y1, a_x2, a_y2) {
	let v_kEarthRadiusKms = 6376.5;
    
    var v_lat1_rad = a_y1 * (Math.PI / 180.0);
    var v_lng1_rad = a_x1 * (Math.PI / 180.0);
    var v_lat2_rad = a_y2 * (Math.PI / 180.0);
    var v_lng2_rad = a_x2 * (Math.PI / 180.0);

    var v_lat_gap = v_lat2_rad - v_lat1_rad;
    var v_lng_gap = v_lng2_rad - v_lng1_rad;
    
    var v_lng_gap = Math.pow(Math.sin(v_lat_gap / 2.0), 2.0) +
                     Math.cos(v_lat1_rad) * 
                     Math.cos(v_lat2_rad) *
                     Math.pow(Math.sin(v_lng_gap / 2.0), 2.0);

    var v_circle_distance = 2.0 * Math.atan2(Math.sqrt(v_lng_gap), Math.sqrt(1.0 - v_lng_gap));
    var rtn_distance = v_kEarthRadiusKms * v_circle_distance * 1000; 
    
    return rtn_distance; 
}

/**
작성자 : 양현우
작성일 : 2023-05-24
기능 : 소켓 통신 실시간 디스패치
 */
// $.jf_sockdispatch = function(a_data, a_obj){



// 	if(!$.jf_isempty(a_obj)) {
// 		let v_params = {
// 			SEND_DATE : $.jf_gettime(),
// 			ROUT_NM : a_data.ROUT_NM,
// 			VHC_NO : a_data.VHC_NO,
// 			DSPTCH_DIV : a_data.DSPTCH_DIV
// 		};
// 		$.jf_append(a_obj, v_params);
// 		//현재 데이터가 메시지만 넘어오고 있음. 디스패치 구분(DSPTCH_DIV)가 넘어올 경우 일반메시지, 운행메시지, 정차메시지 구분해야함.
		
// 	}
// }

/**
작성자 : 양현우
작성일 : 2023-05-24
기능 : 소켓 통신 버스 마커
 */
$.jf_sockbus = function(a_data){
	let busMarker = $.jf_fndbmkstrct(a_data.VHC_ID);
	if($.jf_isempty(busMarker))$.jf_addbusmarker(a_data);
	else {
		$.jf_movemarker(busMarker, a_data.GPS_X, a_data.GPS_Y);
		$.jf_updatebearing(busMarker, a_data.BEARING);	
	}

	let busOverlay = $.jf_fndbostrct(a_data.VHC_ID);
	if($.jf_isempty(busOverlay)) $.jf_addbusoverlay(a_data);
	else $.jf_moveoverlay(busOverlay, a_data.GPS_X, a_data.GPS_Y);

	return true;
}

/**
작성자 : 양현우
작성일 : 2023-05-30
기능 : 버스 마커 방향 전환
 */
$.jf_updatebearing = function(a_marker, a_data){
	$(a_marker.ca).css('transform', '');
	$(a_marker.ca).css('transform', 'rotate(-'+a_data+'deg)');
	return true;
}

/**
작성자 : 양현우
작성일 : 2023-05-24
기능 : 소켓 통신 버스 이벤트
 */
$.jf_sockevt = function(a_data) {
	let busMarker = $.jf_fndbmkstrct(a_data.VHC_ID);
	if($.jf_isempty(busMarker))$.jf_addbusmarker(a_data);
	else {
		$.jf_movemarker(busMarker, a_data.GPS_X, a_data.GPS_Y);
		$.jf_updatebearing(busMarker, a_data.BEARING);	
	}

	let busOverlay = $.jf_fndbostrct(a_data.VHC_ID);
	if($.jf_isempty(busOverlay)) $.jf_addbusoverlay(a_data);
	else $.jf_moveoverlay(busOverlay, a_data.GPS_X, a_data.GPS_Y);

	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-07-07
기능 : 이벤트 오버레이 만들기
**/
$.jf_addevtoverlay = function(a_data){
	//이벤트 오버레이 테스트 필요함
	var zIndex = mapOption.ZINDEX_EVENT_OVERLAY;
	var v_eventMsg = "";
	var stopTime = 0;
	var nodeType = "";
	var nextNodeType = "";
	var min = "";
	var sec = "";
	
	if(a_data.CUR_NODE_TYPE == "NT001") {
		nodeType = "교차로";
	} else if(a_data.CUR_NODE_TYPE == "NT002"){
		nodeType = "정류소";
	}
	
	if(a_data.NEXT_NODE_TYPE == "NT001") {
		nextNodeType = "교차로"; 
	} else if(a_data.NEXT_NODE_TYPE == "NT002") {
		nextNodeType = "정류소";
	}
	
	if(a_data.NEXT_NODE_NM == null) a_data.NEXT_NODE_NM = '';
	
	if (a_data.EVT_TYPE == "ET001") {
		//디스패치 오버레이가 있음  
		if(($.jf_fndicostrct('_dsptch')) != null) v_eventMsg += '<div class="event map_info busInfoPopup" id="busInfoPopup" style="position: absolute; bottom:154px;">'
		else v_eventMsg += '<div class="event map_info busInfoPopup" id="busInfoPopup" style="position: absolute;">';	
		
		//v_eventMsg += '<div class="event map_info busInfoPopup" id="busInfoPopup">';
		v_eventMsg += '   <h3 class="blind">이벤트 안내</h3>';
		v_eventMsg += '   <p class="action">'+a_data.EVT_TYPE_NM+'</p>';
		//v_eventMsg += '   <p class="stay_sec">(현재정차시간 : <span id="cur_stop_tm">'+0+'</span>)</p>';
		v_eventMsg += '   <table class="station_info">';
		v_eventMsg += '      <colgroup>';
		v_eventMsg += '         <col style="width: 90px;">';
		v_eventMsg += '         <col style="width: auto;">';
		v_eventMsg += '      </colgroup>';
		v_eventMsg += '      <tbody><tr>';
		v_eventMsg += '         <th>현재'+ nodeType+'</th>';
		v_eventMsg += '         <td>'+a_data.NODE_NM+'</td>';
		v_eventMsg += '      </tr>';
		v_eventMsg += '      <tr>';
		v_eventMsg += '         <th>다음'+ nextNodeType+'</th>';
		v_eventMsg += '         <td>'+a_data.NEXT_NODE_NM+'</td>';
		v_eventMsg += '      </tr>';
		v_eventMsg += '   </tbody></table>';
		v_eventMsg += '   <dl class="event_mesage">';
		v_eventMsg += '     <dt class="blind">정차 메시지</dt>';
		v_eventMsg += '      <dd id="stopMessage"></dd>';
		v_eventMsg += '   </dl>';
		v_eventMsg += '   <dl class="event_mesage trf_message" style="display: none;">';
		v_eventMsg += '     <dt class="blind">정차 제어</dt>';
		v_eventMsg += '      <dd id="trfStopSec"></dd>';
		v_eventMsg += '   </dl>';
		v_eventMsg += '   <button class="close_mesage ir_pm" id="busInfo-closer">닫기</button>';
		v_eventMsg += '</div>';
			
		/*addStopTime = setInterval(function() {
			var stopTime = 0;
			//stopTime = (routMap.getVhcInfo(data.VHC_ID).stopTime)++;
	
			if(stopTime >= 60) {
				min = parseInt((stopTime/60))+"분 ";
			}
			sec = parseInt((stopTime%60))+"초";
	
			var total = min+sec;
			
			//$("#cur_stop_tm").text(total);
		}, 1000);*/
	}
    else if (a_data.EVT_TYPE == "ET020") {
       eventMsg += '<div class="mesage map_mesage2">';
       eventMsg += '<h3 class="blind"></h3>';       
       eventMsg += '<span>차고지 출발</span>';              
       eventMsg += '<button class=close_mesage ir_pm"></button>';       
    }

	else if (a_data.EVT_TYPE == "ET002" || a_data.CUR_SPD > 30){
		//이벤트 오버레이가 있음
		if(($.jf_fndicostrct('_evt')) != null) {
			setTimeout(function() {
				if($.jf_fndicostrct('_dsptch') != null) {
					$(".dispatch").css("bottom", "42px");
					//출발할 때 운행중 디스패치가 발생하여 주석처리하였음
					//$(".dsptchMessagePopup").hide();
				}
				stopTime = 0;
				//clearInterval(addStopTime);
				$.jf_deleteOverlay($.jf_fndicostrct('_evt'));
			},1500)			
		}
	} 
	//if (routMap.mapInfo[mapId].divEvent == "ET001") {
	// 왜 따로 나눴더라	
	if ($.jf_fndicostrct('evt') == null && (a_data.EVT_TYPE == "ET001" || a_data.EVT_TYPE == "ET020")) {
		/*if($.jf_fndicostrct('_dsptch') != null) {
			
		}*/
		if(!$.jf_isempty(a_data['VHC_ID'])) marker = $.jf_fndbmkstrct(a_data.VHC_ID);
		eventOverlay = new kakao.maps.CustomOverlay({
			content: v_eventMsg,
			position: marker.getPosition(),
			zIndex : zIndex
		});
		eventOverlay.id = a_data.VHC_ID+'_evt';
		eventOverlay.setMap(js_map);
		js_overlaystruct.push(eventOverlay);
		
	}
	return true;	
}

/** 
작성자 : 양현우
작성일 : 2023-07-12
기능 : BIT 정보 설정
**/
$.jf_setBITInfo = function(a_datas) {
	if(typeof($.uf_setBITInfo) != "undefined"){
		if(!$.uf_setBITInfo(a_datas)) return false;
	 }

	return true;	
}

/** 
작성자 : 양현우
작성일 : 2023-07-18
기능 : 신호 마커 만들기
**/
$.jf_addsigmarker = function(a_data) {
	let zIndex = mapOption.ZINDEX_SIG_MARKER;
	
	let imageSize = new kakao.maps.Size(mapOption.SIGNAL_IMG_SIZE);
	let markerImage = new kakao.maps.MarkerImage(mapOption.SIGNAL_IMG_RED, imageSize);
	//let markerSelImage = new kakao.maps.MarkerImage(mapOption.SIGNAL_IMG_GREEN, imageSize);

	// if(a_idx == a_focusidx) markerImage = markerSelImage;
	let marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(a_data.GPS_Y, a_data.GPS_X),
		image: markerImage,
		zIndex : zIndex,
	})
	
	marker.id = a_data.CRS_ID + '_sig' + a_data.SGNL_SN;
	marker.setMap(js_map);
	js_sigstruct.push(marker);

	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-07-18
기능 : sigstruct 배열에서 a_id를 포함하는 마커들 찾기
**/
$.jf_fndicsigstruct = function(a_id){
	let rtn_markers = [];
	for(let i=0; i<js_sigstruct.length; i++){
		if(js_sigstruct[i].id.includes(a_id)){
			rtn_markers.push(js_sigstruct[i]);
		}
	}
	return rtn_markers;
}

/** 
작성자 : 양현우
작성일 : 2023-07-18
기능 : 신호 마커 색 변경
**/
$.jf_changesigmarker = function(a_baseData, a_sockData) {
	let v_greenImage = new kakao.maps.Size(mapOption.SIGNAL_IMG_GREEN);
	let v_redImage = new kakao.maps.Size(mapOption.SIGNAL_IMG_RED);
	let markerImage = new kakao.maps.MarkerImage(v_redImage, mapOption.SIGNAL_IMG_SIZE);
	
	if(a_baseData.PHASE_NO.indexOf(a_sockData)>-1)	markerImage = new kakao.maps.MarkerImage(v_greenImage, mapOption.SIGNAL_IMG_SIZE);
		
	let markers = $.jf_fndicsigstruct(a_baseData.CRS_ID);
	if(markers.length != 0){
		//현시에 맞게 마커 이미지들 변경되게 하는 코드 추가해야함
		for(var i=0; i<markers.length; i++) {
			markers[i].setImage(markerImage);
		}
	}

	return true;
}


