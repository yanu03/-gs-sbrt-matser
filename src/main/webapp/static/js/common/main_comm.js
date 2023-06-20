
var js_menulist = []; //메뉴리스트

//var js_defInfo = []; //세션정보

var js_authoritylist = []; //권한리스트


$.jf_setmenulist = function(a_menulist){
	js_menulist = a_menulist;
}

$.jf_getmenulist = function(){
	return js_menulist;
}

$.jf_setdefInfo = function(a_defInfo){
	//js_defInfo = a_defInfo;
}

$.jf_getdefInfo = function(){
	//return js_defInfo;
}

$.jf_setprogramauthority = function(a_authoritylist){
	js_authoritylist = a_authoritylist;
}

$.jf_getprogramauthority = function(){
	return js_authoritylist;
}

$.jf_getcurauthority = function(a_progcd){
	let v_arraylist = $.jf_getprogramauthority();
	for(var i=0; i<v_arraylist.length; i++){
		if(v_arraylist[i].PROG_CD == a_progcd){
			return v_arraylist[i];
		}
	}
}

$.tracomalmsg = function(a_title, a_msg, a_type){
	$.messager.alert({
		title: a_title,
		ok: '확인',
		icon: 'info',
		msg: a_msg,
		fn: function(r){
			if (r){
				//확인 후 동작 callback
			}
		}
	});	
	return true;
}