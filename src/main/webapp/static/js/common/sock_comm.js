let js_sock = new SockJS("http://localhost:8888/stomp-chat");
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
            
            $.jf_adddsptchoverlay(v_item);
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
            if(typeof($.pf_sockevt) != "undefined"){
                if(!$.pf_sockevt(v_item)) return false;
            }
            $.jf_sockevt(v_item);
        });
        js_client.subscribe('/subscribe/traffic', function (chat) {
            var item = JSON.parse(chat.body);
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