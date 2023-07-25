let js_sock = new SockJS('/websocket');
let js_client = Stomp.over(js_sock);
function changeDeviceStatus(item) {
    console.log("changeDeviceStatus id", $(item).parent().parent().parent().prop('id'), 'value ', $(item).prop('checked'));
    if(js_client.connected) {
        js_client.send('/publish/userControl', {}, JSON.stringify({
            type: 'DEVICE_STATUS',
            id : $(item).parent().parent().parent().prop('id'),
            value : $(item).prop('checked')
        }));
    }
}
function changeLight(item) {
    console.log("changeLight id", $(item).prop('id').substring(0, $(item).prop('id').length -1), 'value ', $(item).prop('id').substring($(item).prop('id').length -1));
    if(js_client.connected) {
        js_client.send('/publish/userControl', {}, JSON.stringify({
            type: 'LIGHT',
            id : $(item).prop('id').substring(0, $(item).prop('id').length -1),
            value : $(item).prop('id').substring($(item).prop('id').length -1) == 1 ? true : false
        }));
    }
}

function changeTrafficSchedule(item) {
    console.log("changeTrafficSchedule id", $(item).parent().parent().parent().prop('id'), 'value ', $(item).prop('checked'));
    if(js_client.connected) {
        js_client.send('/publish/userControl', {}, JSON.stringify({
            type: 'SCHEDULE',
            id : $(item).parent().parent().parent().prop('id'),
            value : $(item).prop('checked')
        }));
    }
}
function changeModule3(item) {
    console.log("changeModule3 id", $(item).parent().parent().parent().prop('id'), 'value ', $(item).prop('checked'));
    if(js_client.connected) {
        js_client.send('/publish/userControl', {}, JSON.stringify({
            type: 'MODULE3',
            id : $(item).parent().parent().parent().prop('id'),
            value : $(item).prop('checked')
        }));
    }
}

$(function () {
    var js_sendBtn = $('.send');
    var js_roomId = '1';
    var js_member = '2';

    js_client.debug = function (e) {};

    js_client.connect({}, function () {
        js_client.subscribe('/subscribe/dispatch', function (chat) {
            let v_item = JSON.parse(chat.body);
            if(typeof($.pf_sockdispatch) != "undefined"){
                if(!$.pf_sockdispatch(v_item)) return false;
            }
            
            //$.jf_adddsptchoverlay(v_item);
        });
        js_client.subscribe('/subscribe/vhc', function (chat) {
            var v_item = JSON.parse(chat.body);
            if(typeof($.pf_sockbus) != "undefined"){
                if(!$.pf_sockbus(v_item)) return false;
            }
            $.jf_sockbus(v_item);
        });
        js_client.subscribe('/subscribe/evt', function (chat) {
            var v_item = JSON.parse(chat.body);
            $.jf_sockevt(v_item);
            if(typeof($.pf_sockevt) != "undefined"){
                if(!$.pf_sockevt(v_item)) return false;
            }
			//$.jf_addevtoverlay(v_item);
        });


		js_client.subscribe('/subscribe/arrival', function (chat) {
            var v_item = JSON.parse(chat.body);
            if(typeof($.pf_arrival) != "undefined"){
                if(!$.pf_arrival(v_item)) return false;
            }
            $.jf_setBITInfo(v_item);
        });

        js_client.subscribe('/subscribe/traffic', function (chat) {
            var item = JSON.parse(chat.body);
            if(typeof($.pf_socksig) != "undefined"){
                if(!$.pf_socksig(v_item)) return false;
            }
            // console.log(content);
            // var itemTod = $('#' + item.crossNodeId);

            // if (itemTod.length > 0) {
            //     $(itemTod).find(".green" ).prop('checked', item.lightFlag);//.change();
            //     $(itemTod).find(".red" ).prop('checked', !item.lightFlag);//.change();
            //     $(itemTod).find('.phasetime').text(item.phaseTimeA)
            //     $(itemTod).find(".schedule" ).prop('checked', item.useSchedule);//.change();
            //     $(itemTod).find(".module" ).prop('checked', item.useModule3);//.change();
            // }+
            
        });

		js_client.subscribe('/subscribe/signal', function (chat) {
            var v_item = JSON.parse(chat.body);
            if(typeof($.pf_socksig) != "undefined"){
                if(!$.pf_socksig(v_item)) return false;
            }
        });

		js_client.subscribe('/subscribe/prioritysignal', function (chat) {
			debugger;
            var v_item = JSON.parse(chat.body);
            if(typeof($.pf_sockprisig) != "undefined"){
                if(!$.pf_sockprisig(v_item)) return false;
            }
        });


    });

    js_sendBtn.click(function () {
        var message = '1';
        js_client.send('/publish/chat/message', {}, JSON.stringify({
            chatjs_roomId: js_roomId,
            type: 'CHAT',
            message: message,
            writer: js_member
        }));
    });
});

$.jf_convertdsptch = function(a_data) {
	let dsptchMessage = "";
	let rtn_contsResult = "";
	let dsptchDiv = a_data.DSPTCH_DIV;
	let dsptchKind = a_data.DSPTCH_KIND;
	let min = "0분";
	
	if(a_data['MESSAGE'].split('｜').length>0) dsptchMessage = a_data['MESSAGE'].split('｜')[0];
	else dsptchMessage = a_data['MESSAGE'];
	
	//디스패치가 일반메시지가 아닐경우
	if(parseInt(dsptchMessage) != "undefined" && a_data.DSPTCH_DIV != "DP001"){
		//if(dsptchMessage==0)return; //0인 경우 표시할 필요가 없음
		if(Math.abs(parseInt(dsptchMessage) >= 60)) {
			 min = Math.abs(parseInt(dsptchMessage/60)) + "분 ";
		}
		 sec = Math.abs(parseInt(dsptchMessage%60)) + "초 ";
		 
		//운행중 디스패치일 경우 
		 if(dsptchDiv == "DP002") {

				if(dsptchKind == "DK001") rtn_contsResult = mapOption.DISPATCH_MSG_NORMAL;
				else if(dsptchKind == "DK002") rtn_contsResult = min + sec + "느림";
				else if(dsptchKind == "DK003") rtn_contsResult = min + sec + "빠름";
			}
		//정차중 디스패치일 경우
		 else if(dsptchDiv == "DP003") rtn_contsResult = "정류장 정차 : " + min + sec;
	}
	
	return rtn_contsResult;	
}