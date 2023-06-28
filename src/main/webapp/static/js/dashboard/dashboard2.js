	var dashboard = {
		ROUT_INFO : [],
		ROUT_STTN_INFO : [],
		ROUT_CROSS_INFO : [],
		REAR_FRONT_INFO : [],
		CUR_WAY : 'WD002',
		CUR_CRS_NODE : [],
		CUR_DISPATCH_STATE : 0,
		OLD_NODE_SN : 0,
		VHC_NO : '',
		IMP_ID : '',
    curTimeOut : 0,
    timer : null,
    timerOut : null,
	};
	
	dashboard.init = function() {
		
		dashboard.connect();
		// dashboard.routDraw(); 우측하단 정류소 라인 만들기, 동적으로 만들지 않게 변경
   // dashboard.dispatchDraw(0, null,null);
   
// dashboard.test();
	};

var count =0;
dashboard.test = function() {
    if(count>80&&count<100){
      dashboard.dispatch(4, 1,null);
      }
    count++;
    if(count>100)count = 0;
         	setTimeout(function() {
      dashboard.test();
  			},1000);
};

	dashboard.routDraw = function() {
		$("#dashboard_list").empty();
		for (var i = 0; i < dashboard.ROUT_STTN_INFO[dashboard.CUR_WAY].length; i++) {
			var nodeInfo = dashboard.ROUT_STTN_INFO[dashboard.CUR_WAY][i];
			var nodeDisp = "<li><i class='station ir_pm'>정거장아이콘</i><span>"
					+ nodeInfo.NODE_NM + "</span></li>";
			$("#dashboard_list").append(nodeDisp);
		}
		
	};
	
	dashboard.routShow = function() {
		if (dashboard.CUR_WAY == 'WD001') {
			$("#dashboard_list").css("display", "block");
		} else {
			$("#dashboard_list").css("display", "none");
		}
	};
	

	dashboard.busDraw = function(node_id) {
		$("#dashboard_bus").empty();
		
		for (var i = 0; i < dashboard.ROUT_INFO[dashboard.CUR_WAY].length; i++) {
			
			var nodeInfo = dashboard.ROUT_INFO[dashboard.CUR_WAY][i];
			if (nodeInfo.NODE_ID == node_id&&nodeInfo.LOC!=-1) {
				/*
				 * var busDisp = "<i class='bus ir_pm' style='left:" +
				 * nodeInfo.LOC + "%'>버스</i>";
				 */
				var busDisp = "<i class='bus ir_pm' style='left:50%>버스</i>";
				$("#dashboard_bus").append(busDisp)
				break;
			}
		}
	};
	
	/*
	 * 디스패치 사용x 주석처리
	 * 
	 * dashboard.dispatchDraw = function(dispatchState, type, value) {
	 * if(dispatchState==0){ var message = util.MSG.DISPATCH_MSG_NORMAL;
	 * $("#priority_signal").text(message)
	 * 
	 * $(".situation").removeClass("blue");
	 * $(".situation").removeClass("orange"); $(".situation").addClass("green"); }
	 * else if(dispatchState==1){ if(value >= 60) { min = parseInt(value/60) +
	 * "분 "; } sec = value%60 + "초 ";
	 * 
	 * var message = "정류장 정차 : " + min + sec;
	 * $("#priority_signal").text(message)
	 * 
	 * $(".situation").removeClass("green");
	 * $(".situation").removeClass("orange"); $(".situation").addClass("blue");
	 * dashboard.curTimeOut = value; dashboard.dispatchTimerCb (dispatchState); }
	 * else if(dispatchState==2){ var min = 0; var sec = 0; if(value >= 60) {
	 * min = parseInt(value/60) + "분 "; } sec = value%60 + "초 "; var message =
	 * ""; if(type=='DK002'){ if(min==0)message = sec + " 늦음"; else message =
	 * min + sec + " 늦음"; } else if(type=='DK003'){ if(min==0)message = sec + "
	 * 빠름"; else message = min + sec + " 빠름"; }
	 * 
	 * $("#priority_signal").text(message)
	 * 
	 * $(".situation").removeClass("green");
	 * $(".situation").removeClass("orange"); $(".situation").addClass("blue");
	 * dashboard.curTimeOut = 5; dashboard.dispatchTimeOutCb (dispatchState); }
	 * else if(dispatchState==3){ var message = "정류장제어 운영 :
	 * "+jsonObj.LIST[0].STOP_SEC; $("#priority_signal").text(message)
	 * 
	 * $(".situation").removeClass("green");
	 * $(".situation").removeClass("blue"); $(".situation").addClass("orange");
	 * dashboard.curTimeOut = jsonObj.LIST[0].STOP_SEC;
	 * dashboard.dispatchTimerCb (dispatchState); } else if(dispatchState==4){
	 * if(type=='ST001'){ var message = "교차로제어 운영 : 조기녹색";
	 * $("#priority_signal").text(message) $(".situation").removeClass("green");
	 * $(".situation").removeClass("blue"); $(".situation").addClass("orange");
	 * dashboard.curTimeOut = 6; dashboard.dispatchTimeOutCb (dispatchState); }
	 * else{ var message = "교차로제어 운영 : 녹색연장";
	 * $("#priority_signal").text(message) $(".situation").removeClass("green");
	 * $(".situation").removeClass("blue"); $(".situation").addClass("orange");
	 * dashboard.curTimeOut = 6; dashboard.dispatchTimeOutCb (dispatchState); } } };
	 * 
	 * dashboard.dispatchTimerCb = function(dispatchState){
	 * if(dashboard.CUR_DISPATCH_STATE =! dispatchState)return;
	 * if(dashboard.curTimeOut==0){ dashboard.dispatchDraw(0, null,null); }
	 * else{ if(dispatchState==1){ var min = 0; var sec = 0; var message = "";
	 * if(dashboard.curTimeOut >= 60) { min = parseInt(dashboard.curTimeOut/60) +
	 * "분 "; } sec = dashboard.curTimeOut%60 + "초 "; if(min!=0){ message = "정류장
	 * 정차 : " + min + sec; } else{ message = "정류장 정차 : " + sec; }
	 * $("#priority_signal").text(message) } else if(dispatchState==3){ var
	 * message = "정류장제어 운영 : "+dashboard.curTimeOut;
	 * $("#priority_signal").text(message) } dashboard.curTimeOut--;
	 * dashboard.timer = setTimeout(function() {
	 * dashboard.dispatchTimerCb(dispatchState); },1000); } }
	 * 
	 * dashboard.dispatchTimeOutCb = function(dispatchState){
	 * if(dashboard.CUR_DISPATCH_STATE !== dispatchState)return;
	 * if(dashboard.curTimeOut==0){ dashboard.dispatchDraw(0, null,null); }
	 * else{ dashboard.curTimeOut--; dashboard.timerOut = setTimeout(function() {
	 * dashboard.dispatchTimerCb(dispatchState); },1000); } }
	 * 
	 * 
	 * 
	 * dashboard.dispatch = function(dispatchState, type, value) {
	 * //if(dashboard.curTimeOut>0)return; if(dispatchState <
	 * dashboard.CUR_DISPATCH_STATE)return; if(dashboard.timer != null){
	 * clearTimeout(dashboard.timer); dashboard.timer = null; }
	 * if(dashboard.timerOut != null){ clearTimeout(dashboard.timerOut);
	 * dashboard.timerOut = null; } dashboard.CUR_DISPATCH_STATE =
	 * dispatchState; dashboard.dispatchDraw(dispatchState, type, value); };
	 * 
	 */

	dashboard.searchNodeId = function(node_id) {
		for (var i = 0; i < dashboard.ROUT_INFO[dashboard.CUR_WAY].length; i++) {
			var nodeInfo = dashboard.ROUT_INFO[dashboard.CUR_WAY][i];
			if (nodeInfo.NODE_ID == node_id) {
				return nodeInfo;
			}
		}
		return null;
	};

	dashboard.nextNodeId = function(node_id, nodeType) {
		var curIdx = -1;
		for (var i = 0; i < dashboard.ROUT_INFO[dashboard.CUR_WAY].length; i++) {
			var nodeInfo = dashboard.ROUT_INFO[dashboard.CUR_WAY][i];
			if (nodeInfo.NODE_ID == node_id) {
				curIdx = i;
			}
			if (curIdx != -1 && i > curIdx && nodeType == nodeInfo.NODE_TYPE) {
				return nodeInfo;
			}
		}
		return null;
	};

	dashboard.searchCrsId = function(node_id) {
		for (var i = 0; i < dashboard.ROUT_CROSS_INFO[dashboard.CUR_WAY].length; i++) {
			var nodeInfo = dashboard.ROUT_CROSS_INFO[dashboard.CUR_WAY][i];
			if (nodeInfo.NODE_ID == node_id) {
				return nodeInfo;
			}
		}
		return null;
	};

	dashboard.setCrsId = function(node_id, cur_signal) {
		for (var i = 0; i < dashboard.ROUT_CROSS_INFO[dashboard.CUR_WAY].length; i++) {
      var nodeInfo = dashboard.ROUT_CROSS_INFO[dashboard.CUR_WAY][i];
			if (nodeInfo.NODE_ID == node_id) {
				dashboard.ROUT_CROSS_INFO[dashboard.CUR_WAY][i].CUR_SIGNAL = cur_signal;
				return;
			}
		}
		return;
	};
  
	dashboard.connect = function() {
		var socket = new SockJS('/websocket');
		stompClient = Stomp.over(socket);
		
		stompClient.connect({}, dashboard.onConnected, dashboard.onError);
	};
	
	dashboard.onConnected = function (frame) {
		console.log('onConnected: ' + frame);
		stompClient.subscribe('/topic/public', dashboard.onMessageReceived);
		stompClient.subscribe('/subscribe/frontRear', dashboard.onMessageFrontRear);
	};
	
	dashboard.onError = function (error) {
		// alert('Could not connect to WebSocket server. ' + error);
		setTimeout(function() {
			dashboard.connect();
		},1000);
	};	
	
	dashboard.onMessageFrontRear = function(payload) {
		var attrId = null;
		var jsonObj = JSON.parse(payload.body);
		
		
			// 스크린도어 처리
			if(typeof(jsonObj.length) != "undefined" && jsonObj.length == 1) {
		        	
	      	}
			// 피플count
			else if(typeof(jsonObj.length) != "undefined" && jsonObj.length > 1) {
			
			}

			dashboard.setRearFrontInfo(jsonObj);
			var rear = dashboard.getRearFrontInfo2(dashboard.IMP_ID,"R");
			var front = dashboard.getRearFrontInfo2(dashboard.IMP_ID,"F");
			
			dashboard.rearDraw(rear);
			dashboard.frontDraw (front);
	}	
	
	dashboard.setRearFrontInfo = function (jsonObj){
		var isSearch = 0;
		var impId = jsonObj.IMP_ID;
		for(var i =0;i<dashboard.REAR_FRONT_INFO.length;i++){
			var element = dashboard.REAR_FRONT_INFO[i];
			if(element.jsonObj.IMP_ID==impId){
				dashboard.REAR_FRONT_INFO[i] ={jsonObj};
				isSearch = 1;
				break;
			}
		}
		if(isSearch==0){
			dashboard.REAR_FRONT_INFO.push({jsonObj});
		}
	}
	dashboard.getRearFrontInfo = function (impId){
		for(var i =0;i<dashboard.REAR_FRONT_INFO.length;i++){
			var element = dashboard.REAR_FRONT_INFO[i];
			if(element.jsonObj.IMP_ID==impId){
				return element;
			}
		}
	}
	
	
	dashboard.getRearFrontInfo2 = function (impId, loc){
		for(var i =0;i<dashboard.REAR_FRONT_INFO.length;i++){
			var element = dashboard.REAR_FRONT_INFO[i];
			if(element.jsonObj.IMP_ID==impId){
				for(var j =0;j<element.jsonObj.list.length;j++){
					var item = element.jsonObj.list[j];
					if(item.LOC_TYPE == loc){
						return item;
					}
				}
			}
		}
	}
	
	dashboard.frontDraw = function(front) {
		if(typeof front !== "undefined"){
			
			if(front.GAP_TIME != null) {
				if(front.GAP_TIME<2)return;
				var result = "";
				// var min = parseInt(parseInt(jsonObj.NEXT_BUS_INTRV)/60);//분 초
				// if문 처리 안하였음
				// var sec = parseInt(parseInt(jsonObj.NEXT_BUS_INTRV)%60);
				
				// 자리수 맞추기, 빈자리 0으로 채워짐
				// result = String(min).padStart(2, '0') + '분 '+
				// String(sec).padStart(2, '0') + '초';
				
				result = front.GAP_TIME + '분 ';
				
				$("#nextBusIntrv").text(result);
			} else{
				$("#nextBusIntrv").text('-');
			}
			
			if(front.BUS_NAME != null) {
				// $("#nextBus").text(jsonObj.NEXT_BUS_NO);
				$("#nextBus").text(front.BUS_NAME);
			} else{
				$("#nextBus").text('-');
			}
		}
		else{
			$("#nextBusIntrv").text('-');
			$("#nextBus").text('-');
		}
	}
	
	dashboard.rearDraw = function(rear) {
		if(typeof rear !== "undefined"){
			if(rear.GAP_TIME != null) {
				if(rear.GAP_TIME<3)return;
				var result = "";
				
				 /*var min = parseInt(parseInt(rear.GAP_TIME)/60);//분 초

				 var sec = parseInt(parseInt(rear.GAP_TIME)%60);
				 
				 result = String(min).padStart(2, '0') + '분 '+
				 String(sec).padStart(2, '0') + '초';*/
				  					
				result = rear.GAP_TIME + '분 ';
				$("#prevBusIntrv").text(result);
			} else{
				$("#prevBusIntrv").text('-');
			}
			if(rear.BUS_NAME != null) {
				// $("#prevBus").text(jsonObj.PREV_BUS_NO);
				$("#prevBus").text(rear.BUS_NAME);
			} else {
				$("#prevBus").text('-');
			}
		}
		else{
			$("#prevBusIntrv").text('-');
			$("#prevBus").text('-');
		}
		
	}
	
	dashboard.onMessageReceived = function(payload) {
		
		
		var jsonObj = JSON.parse(payload.body);
		
		var attrId = jsonObj.ATTR_ID;
		var dataList = jsonObj.LIST;
		
		// GPS값 튈 경우 아무 동작도 안되게 처리
	
		if(attrId == util.ATTR_ID.BUS_ARRIVAL_INFO){
		
		}
		// 4012: 운행이벤트
		else if(attrId == util.ATTR_ID.BUS_OPER_EVENT) {
      // if(jsonObj.VHC_NO!=="우진76자5876")return;
      if(jsonObj.VHC_NO!==dashboard.VHC_NO)return;
	  if(jsonObj.ED_STTN_ID == jsonObj.CUR_NODE_ID){
		  $("#titleVhcNo").text(jsonObj.VHC_NO+"는 종점임");
		  return;
	  }
      if(dashboard.OLD_NODE_SN>jsonObj.NODE_SN&&(dashboard.OLD_NODE_SN-jsonObj.NODE_SN)<10&&dashboard.OLD_NODE_SN!=0)return;
		dashboard.OLD_NODE_SN = jsonObj.NODE_SN;
       // if(jsonObj.VHC_NO!=="경기76자5587")return;
       // if(jsonObj.VHC_NO!=="세종70자1509")return;
		// console.log(payload.body);
			if (typeof(jsonObj.GPS_X) == "undefined" || typeof(jsonObj.GPS_Y) == "undefined" || jsonObj.GPS_X < 120 || jsonObj.GPS_Y > 130 ||jsonObj.CUR_NODE_ID==null) {
				return;
			}
			if (dashboard.CUR_WAY != jsonObj.WAY_DIV) {
				dashboard.CUR_WAY = jsonObj.WAY_DIV;
				// dashboard.routDraw(); 동적으로 만들지 않게 변경
			}
	
			if (jsonObj.CUR_STTN_CRS_ID != null) {
				// dashboard.busDraw(jsonObj.CUR_STTN_CRS_ID); 동적으로 만들지 않게 변경
			}
	
				$("#titleVhcNo").text(jsonObj.VHC_NO);
				$(".situation").removeClass("orange");
				$(".situation").addClass("green");				
	
			if (jsonObj.NODE_NM != null) {
					var sttn1 = $("#sttn1").text();
					var sttn2 = $("#sttn2").text();
					var sttn3 = $("#sttn3").text();
					if(sttn2 == "") {
						$("#sttn2").text(jsonObj.NODE_NM);
					}
					else {
						if(sttn2 != jsonObj.NODE_NM){
							$("#sttn1").text(sttn2);
							$("#sttn2").text(jsonObj.NODE_NM);
						}
					}
			} 
			if (jsonObj.NEXT_NODE_NM != null) {
				$("#next_node").text(jsonObj.NEXT_NODE_NM);
				$("#sttn3").text(jsonObj.NEXT_NODE_NM);
			}
	
			if (jsonObj.ROUT_NM != null) {
				$("#rout").text(jsonObj.ROUT_NM);
			}
			
			var rear = dashboard.getRearFrontInfo2(jsonObj.IMP_ID,"R");
			var front = dashboard.getRearFrontInfo2(jsonObj.IMP_ID,"F");
			
			if(jsonObj.ETA != null) {
				var result = "";
				var min = parseInt(parseInt(jsonObj.ETA)/60);// 분 초 if문 처리
																// 안하였음
				var sec = parseInt(parseInt(jsonObj.ETA)%60);
				
				// 자리수 맞추기, 빈자리 0으로 채워짐 	
				result = String(min) + '분 ';//+ String(sec).padStart(2, '0') + '초'; 	
				if(jsonObj.ETA<60)result = "1분 이내";
				
				$("#eta").text(result);
			} else {
				$("#eta").text('-');
			}
			
			dashboard.rearDraw(rear);
			dashboard.frontDraw (front);
			
			dashboard.IMP_ID = jsonObj.IMP_ID;
	
		} 
		// attrId = 4014 : 실시간 차량 위치 정보
		else if(attrId == util.ATTR_ID.BUS_INFO){
			if(jsonObj.VHC_NO!==dashboard.VHC_NO)return;
			if(jsonObj.ED_STTN_ID == jsonObj.CUR_NODE_ID){
				  $("#titleVhcNo").text(jsonObj.VHC_NO+"는 종점임");
				 return;
			  }
			if(dashboard.OLD_NODE_SN>jsonObj.NODE_SN&&(dashboard.OLD_NODE_SN-jsonObj.NODE_SN)<10&&dashboard.OLD_NODE_SN!=0)return;
			dashboard.OLD_NODE_SN = jsonObj.NODE_SN;
			if (typeof(jsonObj.GPS_X) == "undefined" || typeof(jsonObj.GPS_Y) == "undefined" || jsonObj.GPS_X < 120 || jsonObj.GPS_Y > 130 ||jsonObj.CUR_NODE_ID==null) {
				return;
			}
			if (dashboard.CUR_WAY != jsonObj.WAY_DIV) {
				dashboard.CUR_WAY = jsonObj.WAY_DIV;
				// dashboard.routDraw(); 동적으로 만들지 않게 변경
			}
	
			if (jsonObj.CUR_STTN_CRS_ID != null) {
				// dashboard.busDraw(jsonObj.CUR_STTN_CRS_ID); 동적으로 만들지 않게 변경
			}
	
				$("#titleVhcNo").text(jsonObj.VHC_NO);
				$(".situation").removeClass("orange");
				$(".situation").addClass("green");				
	
			if (jsonObj.NODE_NM != null) {
					var sttn1 = $("#sttn1").text();
					var sttn2 = $("#sttn2").text();
					var sttn3 = $("#sttn3").text();
					if(sttn2 == "") {
						$("#sttn2").text(jsonObj.NODE_NM);
					}
					else {
						if(sttn2 != jsonObj.NODE_NM){
							$("#sttn1").text(sttn2);
							$("#sttn2").text(jsonObj.NODE_NM);
						}
					}
			} 
			if (jsonObj.NEXT_NODE_NM != null) {
				$("#next_node").text(jsonObj.NEXT_NODE_NM);
				$("#sttn3").text(jsonObj.NEXT_NODE_NM);
			}
	
			if (jsonObj.ROUT_NM != null) {
				$("#rout").text(jsonObj.ROUT_NM);
			}
			
			var rear = dashboard.getRearFrontInfo2(jsonObj.IMP_ID,"R");
			var front = dashboard.getRearFrontInfo2(jsonObj.IMP_ID,"F");
			
			if(jsonObj.ETA != null) {
				var result = "";
				var min = parseInt(parseInt(jsonObj.ETA)/60);// 분 초 if문 처리
																// 안하였음
				var sec = parseInt(parseInt(jsonObj.ETA)%60);
				
				// 자리수 맞추기, 빈자리 0으로 채워짐
				//result = String(min).padStart(2, '0') + '분 '+ String(sec).padStart(2, '0') + '초'; 	
				result = String(min) + '분 ';//+ String(sec).padStart(2, '0') + '초'; 	
				if(jsonObj.ETA<60)result = "1분 이내";
				
				$("#eta").text(result);
			} else {
				$("#eta").text('-');
			}
			
			dashboard.rearDraw(rear);
			dashboard.frontDraw (front);
			
			dashboard.IMP_ID = jsonObj.IMP_ID;

		}
		else if(attrId == util.ATTR_ID.DISPATCH) { // 4020: 디스패치
        // if(jsonObj.VHC_NO!=="우진76자5876")return;
        if(jsonObj.VHC_NO!==dashboard.VHC_NO)return
       // if(jsonObj.VHC_NO!=="경기76자5587")return;
      // if(jsonObj.VHC_NO!=="세종70자1509")return;
			try { 
				var timeResult = util.getToday();
				
				var dsptchDiv = jsonObj.DSPTCH_DIV;
				var dsptchConts = jsonObj.MESSAGE.split('｜')[0];
				var dsptchKind = jsonObj.DSPTCH_KIND;
				var contsResult = "";
				var min = "";
				var sec = "";
				var dsptchMessage = "";
				
				if(dsptchConts.split(',').length>0){
					dsptchMessage = dsptchConts.split(',')[0];
				}
				else{
					dsptchMessage = dsptchConts;
				}
				// 디스패치가 일반메시지가 아닐경우
				if(parseInt(dsptchMessage) != "undefined" && dsptchDiv != "DP001"&&parseInt(dsptchMessage) != 0) {

					// 운행중 디스패치일 경우
					if(dsptchDiv == "DP002") {
						if(dsptchKind == "DK001") {
							
						}
						else if(dsptchKind == "DK002") {
							dashboard.dispatch(2, dsptchKind, Math.abs(parseInt(dsptchMessage)));
						}
						else if(dsptchKind == "DK003") {
							dashboard.dispatch(2, dsptchKind, Math.abs(parseInt(dsptchMessage))); 
						}
					}
					// 정차중 디스패치일 경우
					else if(dsptchDiv == "DP003") {
						dashboard.dispatch(1, null, Math.abs(parseInt(dsptchMessage)));
					}	
					
				} 
				// 디스패치 메시지가 일반메시지일 경우
				else if(parseInt(dsptchConts) == "undefined" || dsptchDiv == "DP001") {	
				}
			} catch (e) {
				console.log("[scwin.onMessageReceived] Exception :: " + e.message);		
			}
			console.log("contsResult= " + contsResult);
			
		}
		
		/*
		 * 신호 사용 x, 주석처리 //신호등 현시 수신 // else if (attrId ==
		 * util.ATTR_ID.TRAFFIC_LIGHT_STATUS_RESPONSE) { var phaseNo =
		 * dataList[0].PHASE_NO.toString(); var crsId = dataList[0].CRS_ID;
		 * dashboard.setCrsId(crsId, phaseNo); nodeInfo =
		 * dashboard.CUR_CRS_NODE;
		 * 
		 * if((typeof nodeInfo.NODE_ID !== "undefined") && (nodeInfo.NODE_ID !==
		 * null) &&(nodeInfo.NODE_ID==crsId)){
		 * if(nodeInfo.SIGNAL.indexOf(nodeInfo.CUR_SIGNAL) !== -1){
		 * $(".ir_pm.red-light").removeClass("on");
		 * $(".ir_pm.green-light").addClass("on"); } else {
		 * $(".ir_pm.green-light").removeClass("on");
		 * $(".ir_pm.red-light").addClass("on"); } } } else if (attrId ==
		 * util.ATTR_ID.TRAFFIC_MODULE_TWO) { try { dashboard.dispatch(3,
		 * jsonObj.LIST[0].CTRL_TYPE,jsonObj.LIST[0].STOP_SEC); } catch (e) {
		 * console.log("[ATTR_ID.TRAFFIC_MODULE_TWO] Exception :: " +
		 * e.message); } }
		 * 
		 * //신호 모듈3 수신 else if (attrId == util.ATTR_ID.TRAFFIC_MODULE_THREE) {
		 * try { dashboard.dispatch(4, jsonObj.LIST[0].CTRL_TYPE,null);
		 * //if((jsonObj.LIST[0].NODE_ID ==
		 * 'CR00000004')&&(jsonObj.LIST[0].CTRL_TYPE=='ST001')){ //
		 * dashboard.dispatch(4, jsonObj.LIST[0].CTRL_TYPE,null); //} //else{ //
		 * dashboard.dispatch(4, jsonObj.LIST[0].CTRL_TYPE,null); //} //else
		 * if(jsonObj.LIST[0].CTRL_TYPE=='ST001'){ //} } catch (e) {
		 * console.log("[ATTR_ID.TRAFFIC_MODULE_TWO] Exception :: " +
		 * e.message); } }
		 * 
		 */
		
		
		
	};
	
	dashboard.selectVhcNo = function() {
		var vhcNo = $("#vhcNoInput").val();
		$("#titleVhcNo").text("통신 대기중(" + vhcNo + ")");
		$(".situation").removeClass("green");
		$(".situation").addClass("orange");		
		
		$("#next_node").text('-');
		$("#eta").text('-');
		$("#rout").text('-');
		$("#nextBus").text('-');
		$("#nextBusIntrv").text('-');
		$("#prevBus").text('-');
		$("#prevBusIntrv").text('-');
		$("#sttn1").empty();
		$("#sttn2").empty();
		$("#sttn3").empty();
		
		dashboard.VHC_NO = vhcNo;
		
		dashboard.selectVhcNoCb();
	
		setInterval(function() {
			dashboard.selectVhcNoCb();
		}, 2000);
		dashboard.OLD_NODE_SN = 0;
	}
	
	dashboard.selectVhcNoCb = function() {
		
		var vhcData = {VHC_NO : dashboard.VHC_NO};
		var param = JSON.stringify({"dma_sub_search":vhcData});
	  $.ajax({
		     type : 'post',
		     url : '/vhc/selectFrontRearVhc',
		     data : param,
		     dataType : "json",
		     contentType: 'application/json; charset=utf-8',
		     success : function(data) {
		         
		     },
		     error : function(error) {
		    	 //console.log(error);
		         //alert(error);
		        
		     }
		 }); 
		
	}
	
	function enterKeyEvent(e) {
		var code = e.code;
		
		if(code == "Enter" || code == "NumpadEnter"){
			dashboard.selectVhcNo();
		}
	}