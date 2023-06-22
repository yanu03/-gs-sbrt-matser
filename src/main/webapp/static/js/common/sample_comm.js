/*
* 2023.03.22. ojkim1219@tracom.kr
*
*/

//페이지에서 공통으로 사용할 스트럭처
//var jv_editindex = -1;	//현재 편집중인 row index
var jv_rowclick = false;	//사람이 아닌 기계가 발생시킨 row select event

var js_dgstrct = [];	//다차원 array

var js_mdstrct = [];	//win, form, value로 구성된 데이터

$.jf_moddgstrct = function(a_obj, a_idx){
	for(let i=0; i<js_dgstrct.length; i++){
		if(js_dgstrct[i].dg == a_obj.attr('id')){
			//update
			js_dgstrct[i].eidx = a_idx;
			return true;
		}
	}
	
	//insert
	let a_strct = {};
	a_strct.dg = a_obj.attr('id');
	a_strct.eidx = a_idx;
	js_dgstrct.push(a_strct);

	return true;
}

$.jf_fnddgstrct = function(a_obj){
	let a_idx = -1;
	for(let i=0; i<js_dgstrct.length; i++){
		if(js_dgstrct[i].dg == a_obj.attr('id')){
			a_idx = js_dgstrct[i].eidx;
		}
	}
	return a_idx;
}


/** 
작성자 : 양현우
작성일 : 2023-04-17
기능 : dg의 edit idx를 -1로 초기화함. onBeforeSelect전 validate 피하기 위함
**/
$.jf_resetdgidx = function(a_obj){
	let v_idx = -1;
	for(let i=0; i<js_dgstrct.length; i++) {
		if(js_dgstrct[i].dg == a_obj.attr('id')){
			js_dgstrct[i].eidx = v_idx;
		}
	}
	return true;
}

/** 
수정자 : 양현우
수정일 : 2023-04-07
기능 : parent datagrid를 조회하는 기능, a_params가 없을 경우 pf_combineparams를 이용함
**/
$.jf_retrieve = function(a_obj, a_params){
   let v_queryParams;
   if(typeof(a_params) != "undefined") {
      if(Object.keys(a_params).length > 0){
         v_queryParams = JSON.stringify({dma_search : a_params});
         a_obj.datagrid({queryParams: v_queryParams});
		// queryParams만 수정해도 datagrid('load')가 실행되어 주석처리함
        //  a_obj.datagrid('load');   
      }
   }
   else{
    //   if(typeof($.pf_combineparams(a_obj)) != "undefined"){
      if(typeof($.pf_combineparams) != "undefined"){
         if(!$.pf_retrieve(a_obj)) return false;
         v_queryParams = JSON.stringify({dma_search : $.pf_combineparams(a_obj)});
         a_obj.datagrid({queryParams: v_queryParams});
        //  a_obj.datagrid('load')
      }
   }
   return true;
};

//임시데이터
var datas = {"total":28,"rows":[
	{"productid":"FL-DSH-01","productname":"Manx","unitcost":"12.00","status":"Q","listprice":"83.50","attr1":"With tail","itemid":"EST-15"},
	{"productid":"FL-DLH-02","productname":"Persian","unitcost":"12.00","status":"P","listprice":"23.50","attr1":"Adult Female","itemid":"EST-16"},
	{"productid":"FL-DLH-02","productname":"Persian","unitcost":"12.00","status":"P","listprice":"89.50","attr1":"Adult Male","itemid":"EST-17"},
	{"productid":"FI-SW-01","productname":"Koi","unitcost":"10.00","status":"P","listprice":"36.50","attr1":"Large","itemid":"EST-1"},
	{"productid":"K9-DL-01","productname":"Dalmation","unitcost":"12.00","status":"P","listprice":"18.50","attr1":"Spotted Adult Female","itemid":"EST-10"},
	{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":"12.00","status":"P","listprice":"38.50","attr1":"Venomless","itemid":"EST-11"},
	{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":"12.00","status":"P","listprice":"26.50","attr1":"Rattleless","itemid":"EST-12"},
	{"productid":"RP-LI-02","productname":"Iguana","unitcost":"12.00","status":"P","listprice":"35.50","attr1":"Green Adult","itemid":"EST-13"},
	{"productid":"FL-DSH-01","productname":"Manx","unitcost":"12.00","status":"P","listprice":"158.50","attr1":"Tailless","itemid":"EST-14"},
	{"productid":"AV-CB-01","productname":"Amazon Parrot","unitcost":"92.00","status":"P","listprice":"63.50","attr1":"Adult Male","itemid":"EST-18"}
]}

$.jf_append = function(a_obj, a_params){
	if(!$.pf_append(a_obj, a_params)) return false;
	
	a_obj.datagrid('appendRow',a_params);
	let a_index = (a_obj.datagrid('getRows').length)-1;
	a_obj.datagrid('selectRow',a_index);
	
	$.jf_beginedit(a_obj, a_index);

	return true;
};

/** 
작성자 : 양현우
작성일 : 2023-05-22
기능 : row를 index에 insert
**/
$.jf_insert = function(a_obj, a_params, a_idx){
	a_obj.datagrid('insertRow',{
		index : a_idx,
		row: a_params
	});
	a_obj.datagrid('selectRow',a_idx);
	$.jf_beginedit(a_obj, a_idx);
	return a_idx;
}

$.jf_delete = function(a_obj){
	if(typeof($.pf_delete) != "undefined"){
	   if(!$.pf_delete(a_obj)) return false;
	}
	let a_index = a_obj.datagrid('getRowIndex', a_obj.datagrid('getSelected'))
	if(a_index < 0) {

		return false;
	}
	$.jf_moddgstrct(a_obj, -1);
	//$.jf_resetdgidx(a_obj); // 최초 delete시 js_dgstruct 에 push되지 않아 $.jf_moddgstrct 사용하였음
	a_obj.datagrid('deleteRow',a_index);
	
	if(a_index > a_obj.datagrid('getRows').length-1) a_index = a_obj.datagrid('getRows').length-1
	$.jf_setfocus(a_obj, a_index);
	if(typeof($.pf_deleteafter) != "undefined"){
		if(!$.pf_deleteafter(a_obj)) return false;
	 }	   
	return true;
 };

 $.jf_datalength = function(a_obj) {
	let rtn_length;
	rtn_length = a_obj.datagrid('getData')['rows'].length;
	return rtn_length;
 }

/** 
수정자 : 양현우
수정일 : 2023-04-07
기능 : child datagrid를 조회하는 기능, a_params가 없을 경우 pf_childparams를 이용함
**/
$.jf_childretrieve = function(a_obj, a_params){
   let v_queryParams;
   if(typeof(a_params) != "undefined") {
      if(Object.keys(a_params).length > 0){
         v_queryParams = JSON.stringify({dma_search : a_params});
         a_obj.datagrid({queryParams: v_queryParams});

		// queryParams만 수정해도 datagrid('load')가 실행되어 주석처리함
        //  a_obj.datagrid('load');   
      }
   }
   else{
      if(typeof($.pf_childparams) != "undefined"){
         if(!$.pf_childretrieve(a_obj)) return false;
         v_queryParams = JSON.stringify({dma_search : $.pf_childparams(a_obj)});
         a_obj.datagrid({queryParams: v_queryParams});
        //  a_obj.datagrid('load')
      }
   }
   return true;
}


$.jf_setfocus = function(a_obj, a_idx){
	if(!$.pf_setfocus(a_obj, a_idx)) return false;
	//if(a_obj.datagrid('getRows').length)>0; 데이터 개수를 확인할 필요는 없음
	if(a_idx < 0) a_idx=0;
	a_obj.datagrid('selectRow', a_idx);
	
	return true;
};

$.jf_setfooter = function(a_obj){
	
	if(!$.pf_setfooter(a_obj)) return false;
	
	fre_arr = a_obj.datagrid('getColumnFields', true);
	bas_arr = a_obj.datagrid('getColumnFields', false);

	const new_arr = [ ...fre_arr, ...bas_arr];
	
	let fst_col = new_arr[0];
	let sec_col = new_arr[1];
	let thd_col = new_arr[2];
	
	let total_cnt = a_obj.datagrid('getRows').length;
	
	let footerstr = '[{"'+fst_col+'":"total :", "'+sec_col+'":"'+total_cnt+'건"}]';	//, "'+thd_col+'":"건"}]';
	let footerdatas = JSON.parse(footerstr);
	a_obj.datagrid('reloadFooter',footerdatas);	
	
	return true;
};

$.jf_beginedit = function(a_obj, a_idx){
	if($.jf_chkeditdg(a_obj)){
		a_obj.datagrid('beginEdit', a_idx);

		$.jf_moddgstrct(a_obj, a_idx);
		//jv_editindex = a_idx;
		
	}
	return true;
};

$.jf_endedit = function(a_obj, a_idx){
	//그리드의 validate를 확인하고 정상이면 endEdit
	if(a_idx < 0) return true;
	a_obj.datagrid('endEdit', a_idx);
	
		$.jf_moddgstrct(a_obj, -1);
		//jv_editindex = a_idx;
		
	return true;
};


$.tracomdateformatter = function (date){
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
  
$.tracomdateparser = function(s){
  if (!s) return new Date();
  var ss = (s.split('-'));
  var y = parseInt(ss[0],10);
  var m = parseInt(ss[1],10);
  var d = parseInt(ss[2],10);
  if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
      return new Date(y,m-1,d);
  } else {
      return new Date();
  }
}

$.tracombasicdate = function(a_str){
	//f : firstdate
	//l : lastdate
	//t : todate
	//a_str 파라미터 의도 여쭤봐야됨
	let a_date;
	//a_date = ''

	let date = new Date();
		let year = date.getFullYear().toString();
		let month = (date.getMonth()+1).toString();
		let day = date.getDate().toString();
		let zero = 0;

    //글자수 맞추기
    if(day.length == 1) day = zero + day;
    if(month.length == 1) month = zero + month;
		let todaysDate = year+'-'+month+'-'+day;
	a_date = todaysDate;
	
	return a_date;
}

$.tracomfromdate = function(a_str){
	let a_date;
	//a_date = ''

	let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    let zero = 0;

    //글자수 맞추기
    if(day.length == 1) day = zero + day;     
    if(month.length == 1) month = zero + month;
     
	 //일주일전 연월일
		let weekAgoDate = new Date(date.setDate(date.getDate() - 7));
		let weekAgoYear = weekAgoDate.getFullYear().toString();
		let weekAgoMonth = (weekAgoDate.getMonth()+1).toString();
		let weekAgoDay = weekAgoDate.getDate().toString();
			if(weekAgoDay.length == 1) weekAgoDay = zero + weekAgoDay;
			if(weekAgoMonth.length == 1) weekAgoMonth = zero + weekAgoMonth;

		date = new Date();

	 //한달전 연월일
		let monthAgoDate = new Date(date.setMonth(date.getMonth() - 1));
		let monthAgoYear = monthAgoDate.getFullYear().toString();
		let monthAgoMonth = (monthAgoDate.getMonth()+1).toString();
		let monthAgoDay = monthAgoDate.getDate().toString();      
			if(monthAgoDay.length == 1) monthAgoDay = zero + monthAgoDay;
			if(monthAgoMonth.length == 1) monthAgoMonth = zero + monthAgoMonth;
     
	 //대시 주어 형태 맞춤
		let todaysDate = year+'-'+month+'-'+day;
		weekAgoDate = weekAgoYear +'-'+ weekAgoMonth +'-'+ weekAgoDay;
		monthAgoDate = monthAgoYear +'-'+ monthAgoMonth +'-'+ monthAgoDay;      

	if(a_str == "d") a_date = todaysDate;
	else if(a_str == "w") a_date = weekAgoDate;
	else if(a_str == "m") a_date = monthAgoDate;

	//y : year
	//m : month
	//w : week
	//d : day
	
	return a_date;
}

$.tracomtodate = function(a_str){
	//y : year
	//m : month
	//w : week
	//d : day

	let a_date
	//a_date = ''

	let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    let zero = 0;

    if(day.length == 1) day = zero + day;
		if(month.length == 1) month = zero + month;
	let todaysDate = year+'-'+month+'-'+day;
	a_date = todaysDate;

	return a_date;
}

/*
$.tracomselectbox = function(a_obj, a_url, a_method, a_params, a_fields){
	a_obj.combobox({
	   	width: 120,
	   	height: 24,
	   	editable: false ,
	    url: a_url,
	    method: a_method,
	    queryParams: a_params,
	    valueField: a_fields[0],
	    textField: a_fields[1],
	    value: '%',				//dg0과 일치 시키면 편하다
			panelHeight:'auto',
	    onBeforeLoad: function(param){
				a_obj.combo('readonly', true);
	    },
	    onLoadSuccess: function(){
	    	a_obj.combo('readonly', false);
	    },
	    onLoadError: function(){
	    	a_obj.combo('readonly', true);
	    	return false;
	    },
	    onChange: function(newValue,oldValue){

	    }
	});
}
*/

/*grid의 edit기능이 있는지 없는지 판단*/
$.jf_chkeditdg = function(a_obj){
	fre_arr = a_obj.datagrid('getColumnFields', true);	//고정칼럼
	bas_arr = a_obj.datagrid('getColumnFields', false);	//비고정칼럼

	const new_arr = [ ...fre_arr, ...bas_arr];
	let a_bool = false;
	
	for(let i = 0; i < new_arr.length; i++){
		let cols = a_obj.datagrid('getColumnOption', new_arr[i]);
			if(typeof(cols.editor) != "undefined") {
				a_bool = true;
				break;
			}
	}
	return a_bool;
}

$.jf_modalselect = function(params) {
	//착기 창에 대한 데이터 처리를 위한 함수
	if(typeof($.pf_modalselect) != "undefined"){
		if(!$.pf_modalselect(a_obj, a_idx)) return false;
	}
}

//공통 윈도우(공통코드등 사용빈도가 높고 동일한 것이 사용되는 경우에는 최상위 것을 사용한다.)

$.jf_changeformtodate_forsearch = function(a_fdateobj, a_tdateobj, a_type){
	if(a_type == 'today'){
		//금일
		let today;
		a_fdateobj.datebox('setValue', today);
		a_tdateobj.datebox('setValue', today);
	}else if(a_type == 'week'){
		//금주
	}else if(a_type == 'month'){
		//금월
	}	
};

//grid select row value to edit form
$.jf_synctoform = function(a_obj, a_form, a_idx, a_row){
	if(typeof(a_form) == "undefined") return false;
	
	jv_rowclick = false;	//pgm change row click!

	$.jf_moddgstrct(a_obj, a_idx);
	//jv_editindex = a_idx;
	
	a_form.find('.tracom-combobox').each(function(){
		$(this).combobox('clear');
	});
	$.jf_protectform(a_obj, a_form, false, a_idx);
	// a_form.form('clear');
	a_form.form('load', a_row);
	
	jv_rowclick = true;	//next human change row click!
	
	return true;
}

//form value to grid update
//form onchange use this function
$.jf_synctogrid = function(a_obj, a_row){
	//let a_index = a_obj.datagrid('getRowIndex', a_obj.datagrid('getSelected'));
	let a_index = $.jf_fnddgstrct(a_obj);
	//$.jf_moddgstrct(a_obj, -1);	//grid and form 형태일 경우에는 -1로 바꾸지 않음

	a_obj.datagrid('updateRow',{index:a_index,row:a_row});

	return true;
}

//one input element to json string
$.jf_singledatatojson = function(a_field, a_value){
	let a_arr = new Array();
	let a_val = new Object();
		a_val[a_field] = a_value;
		a_arr.push(a_val);
	let a_vals = JSON.stringify(a_arr);
	
	//json string to json obj and [] remove
	a_vals = jQuery.parseJSON(a_vals.substring(1,a_vals.length-1));

	return a_vals;
}

//multi input element to json string
$.jf_multidatatojson = function(a_arrfield, a_arrvalue){
	let a_arr = new Array();
	let a_val = new Object();
		for(let i=0;i<a_arrfield.length;i++){
			a_val[a_arrfield[i]] = a_arrvalue[i];
		}
	a_arr.push(a_val);			
	let a_vals = JSON.stringify(a_arr);
	//json string to json obj and [] remove
	a_vals = jQuery.parseJSON(a_vals.substring(1,a_vals.length-1));

	return a_vals;
}

$.jf_validatedata = function(a_obj, a_form, a_idx, a_type){
	if(a_idx < 0) return true;
	if(!$.pf_validatedata(a_obj, a_idx, a_type)) return false;

		let a_bool = true;
		if (a_type == 'g')
			a_bool = a_obj.datagrid('validateRow', a_idx);
		else if(a_type == 'f')
			a_bool = a_form.form('validate');
			
	return a_bool;
}

$.jf_save = function(a_obj, a_type){
	//사전에 validate를 해주는 거에요
	if(a_type == "all"){
		//전체 저장
		//순서대료 저장 저장이, 완료 되면 저장
	}else{
		//a_obj 만 저장
		a_obj.datagrid('acceptChanges');
	}
	return true;
}

$.jf_close = function(){
	var v_tab =  top.$('#tab-main').tabs('getSelected');
	if (v_tab){
		var v_index =  top.$('#tab-main').tabs('getTabIndex', v_tab);
		top.$('#tab-main').tabs('close', v_index);
	}
	return true;
}

//데이타 갱신
$.jf_reupdate = function(a_obj, exl_obj){
	
	var data = $.jf_getdata(a_obj);
	for(var i=data.length-1; i>=0; i--){
		//let index = a_obj.datagrid('getRowIndex',i);
		a_obj.datagrid('deleteRow',i);
	}
	
	for(var i=0; i<exl_obj.length; i++){
	   a_obj.datagrid('insertRow',{
			index : i,
			row: exl_obj[i]
		});
	};
}

$.jf_exceldownload = function(a_obj, url){
	$.fileDownload(url)
	.done(function () {})
	.fail(function () {});
}

$.jf_excelupload = function(a_obj, a_form, url){
	$.ajax({
		type: 'POST',
		enctype: 'multipart/form-data',
		url: url,
		data: a_form,
		processData: false,
		contentType: false,
		cache: false,
		success: function(data) {
			$.jf_reupdate(a_obj,  data['rows']);
		},
		error: function(e) {
			if (e.status == 403) {
				alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
				top.location.replace("/user/login");
			}
			console.log('ERROR : ', e);
		}
	});
}

$.jf_getcurauthority = function(){
	let v_arraylist = top.$.jf_getprogramauthority();
	for(var i=0; i<v_arraylist.length; i++){
		let curtabid = $.jf_curtabid();
		if(v_arraylist[i].PROG_CD == curtabid){
			return v_arraylist[i];
		}
	}
}

//권한 저장 여부
$.jf_savah = function(){
	let v_authorit = $.jf_getcurauthority();
	return v_authorit.SAV_AH;
}

$.jf_curtabid = function(){
	let v_tabPanel = top.$('#tab-main').tabs('getSelected');
	return v_tabPanel.panel('options').id;
}

$.jf_curtabindex = function(a_tabs){
	if(typeof(a_tabs) == "undefined") return -1;
		let index = a_tabs.tabs('getTabIndex',a_tabs.tabs('getSelected'));
	
	return index;
}

$.jf_curdgindex = function(a_obj){
	if(typeof(a_obj) == "undefined") return -1;	
		let index = a_obj.datagrid('getRowIndex', a_obj.datagrid('getSelected'));

	return index;
}

$.jf_curdgfieldvalue = function(a_obj, a_field){
	return a_obj.datagrid('getSelected')[a_field];
}

$.jf_curdgrow = function(a_obj){
	return a_obj.datagrid('getSelected');
}


$.jf_currowtext = function(a_obj, a_idx, a_field){
	let ed = a_obj.datagrid('getEditor', {index: a_idx, field: a_field});
	let a_str = $(ed.target).combobox('getText');
	return a_str;
}

/** 
작성자 : 양현우
작성일 : 2023-05-26
기능 : combobox의 value를 가져옴
**/
$.jf_getcombovalue = function(a_obj, a_idx, a_field){
	let ed = a_obj.datagrid('getEditor', {index: a_idx, field: a_field});
	let a_value = $(ed.target).combobox('getValue');
	return a_value;
}

/** 
작성자 : 양현우
작성일 : 2023-05-26
기능 : combobox의 value를 변경함
**/
$.jf_setcombovalue = function(a_obj, a_idx, a_field, a_value){
	let ed = a_obj.datagrid('getEditor', {index: a_idx, field: a_field});
	$(ed.target).combobox('setValue', a_value);
	return true;
}

$.jf_resetdg = function(a_obj, a_type){
	//let test = [{obj:"dg0",eidx:1},{obj:"dg2",eidx:1},{obj:"dg3",eidx:1},{obj:"dg9",eidx:1}];

	//eidx를 -1로 초기화
	$.jf_moddgstrct(a_obj, -1);

	if(a_type != 'all')
		a_obj.datagrid('rejectChanges');
	else
	{
		js_dgstrct.forEach((item)=>{
		  $('#'+[item.dg]).datagrid('rejectChanges');
		})
	}

	return true;
}

//기존 java에서 배포하는 json과 일치 시키기 위한 tracom datagrid loader
$.tracomdgloader = function(a_obj, param, success, error){
	let opts = a_obj.datagrid('options');
	if (!opts.url) return false;
	$.ajax({
		type: opts.method,
		url: opts.url,
		data: opts.queryParams,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			if(typeof(data['rows']) != "undefined"){
				data = data['rows'];
			}else{
				let msgtext = data['rsMsg']['message'];
				top.$.messager.alert('sever massage',msgtext);
				data = {"total":0,"rows":[]};
			}
			success(data);
		},
		error: function(error){
			if (error.status == 403) {
				alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
				top.location.replace("/user/login");
			}
			else
				error.apply(this, arguments);
		}
	});
}

//기존 java에서 배포하는 json과 일치 시키기 위한 tracom combobox loader
$.tracomcbloader = function(a_obj, param, success, error){
	let opts = a_obj.combobox('options');
	if (!opts.url) return false;
	$.ajax({
		type: opts.method,
		url: opts.url,
		data: opts.queryParams,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			if(typeof(data['rows']) != "undefined"){
				data = data['rows'];
			}else{
				let msgtext = data['rsMsg']['message'];
				$.messager.alert('sever massage',msgtext);
				data = {"total":0,"rows":[]};
			}
			success(data);
		},
		error: function(error){
			if (error.status == 403) {
				alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
				top.location.replace("/user/login");
			}
			else
				error.apply(this, arguments);
		}
	});
}

/*저장되지 않은 변경된 데이터가 있는지 확인*/
$.jf_changeddg = function(a_obj, a_type){
	let a_rtn = false;
	if(a_type == "all"){
		js_dgstrct.forEach((item)=>{
		  if($('#'+[item.dg]).datagrid('getChanges').length > 0){
		  	a_rtn = true;
		  	return a_rtn;
		  }
		})
	}else{
		if(a_obj.datagrid('getChanges').length > 0) a_rtn = true;
		else a_rtn = false;
	}
	return a_rtn;
}

$.tracomcfmsg = function(a_title, a_msg, a_type){
	$.messager.confirm({
		title: a_title,
		ok: '수락',
		cancel: '취소',
		msg: a_msg,
		fn: function(r){
			if (r){
				console.log('ok:'+r);
				$.pf_acceptcfmsg(a_type);
			}else{
				console.log('cancel:'+r);
				$.pf_rejectcfmsg(a_type);
			}
		}
	});	
	return true;
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

$.jf_chkchilddata = function(a_obj){
	let a_rtn;
	a_rtn = $.pf_chkchilddata(a_obj);
	//쿼리를 해서 사용했으면 해요
	//그리드만 이용할 경우
	//그리드에 데이터가 있으면 false
	//없으면 true;
	return false;
}

/**
 * 메시지 한글 출력을 위한 오버라이딩 메시지
 * 시작
 */


if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '페이지';
	$.fn.pagination.defaults.afterPageText = '{pages} 중';
	$.fn.pagination.defaults.displayMsg = '전체 {total} 항목 중 {from}부터 {to}번째';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '처리 중입니다. 잠시만 기다려 주세요...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '확인';
	$.messager.defaults.cancel = '취소';
}
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = '필수 항목입니다.';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = '올바른 메일 주소를 입력해 주세요.';
	$.fn.validatebox.defaults.rules.url.message = '올바른 URL를 입력해 주세요.';
	$.fn.validatebox.defaults.rules.length.message = '{0}에서 {1} 사이의 값을 입력해 주세요.';
	$.fn.validatebox.defaults.rules.remote.message = '이 필드를 수정해 주세요.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['일','월','화','수','목','금','토'];
	$.fn.calendar.defaults.months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '오늘';
	$.fn.datebox.defaults.closeText = '닫기';
	$.fn.datebox.defaults.okText = '확인';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}

/**
 * 메시지 한글 출력을 위한 오버라이딩 메시지
 * 끝
 */

/** 
작성자 : 양현우
작성일 : 2023-04-03
기능 : find 검색, fields값 검색어를 포함하는 row를 select함
**/
$.jf_findtext = function(a_obj, a_fields, a_val){
	let rowData = a_obj.datagrid('getRows');
	let selectedIndex = $.jf_curdgindex(a_obj);

	//selectedIndex 먼저 체크
	for(var i = selectedIndex+1; i<rowData.length; i++) {
		for(var j=0; j<a_fields.length; j++) {
		   if(typeof(rowData[i][a_fields[j]]) != "undefined" && String(rowData[i][a_fields[j]]).indexOf(a_val)>=0){
			  a_obj.datagrid('selectRow', i);
			  return true;
		   }
		}
	 }

	 //selectedIndex 없으면 처음부터 체크
	 for(var i=0; i<selectedIndex; i++){
		for(var j=0; j<a_fields.length; j++) {
		   if(typeof(rowData[i][a_fields[j]]) != "undefined" && String(rowData[i][a_fields[j]]).indexOf(a_val)>=0){
			  a_obj.datagrid('selectRow', i);
			  return true;             
		   }
		}
	 }

	 return false;
}

/** 
작성자 : 양현우
작성일 : 2023-04-03
기능 : 데이터그리드의 체크된 rows를 리턴(datagrid에서 'checkbox' true인 column 필요)
**/
$.jf_rtnchkedrows = function(a_obj) {
	let rtn_rows = a_obj.datagrid('getChecked');
	return rtn_rows;
}

/** 
작성자 : 양현우
작성일 : 2023-04-03
기능 : 페이지를 새로고침하는 기능
**/
$.jf_reloadpgm = function() {
	let tabPanel = top.$('#tab-main').tabs('getSelected');
	let pgmId = tabPanel.panel('options').id.slice(0,-4);
	top.$('#'+pgmId+'_obj').attr('data', pgmId+'.html');
}


$.jf_progress = function(status, object) {
	if(status=='close'){
		$.messager.progress(status);
	}
	else{
		$.messager.progress({
		  title:object.title,
		  msg:object.msg
		});
		setTimeout( function() {
			$.messager.progress('close');
		}, 60000);
	}
}

/** 
작성자 : 양현우
작성일 : 2023-04-04
기능 : 데이터그리드의 입력, 수정, 삭제 데이터를 저장하는 기능
**/
$.jf_savedgdata = function(a_obj, a_url, a_method, a_action) {
	let insertedParam = a_obj.datagrid('getChanges', 'inserted');
	let updatedParam = a_obj.datagrid('getChanges', 'updated');
	let deletedParam = a_obj.datagrid('getChanges', 'deleted');
	let param = [];

	if(deletedParam.length>0) {
		for(let i=0; i<deletedParam.length; i++) {
			deletedParam[i].rowStatus = "D";
			param.push([...deletedParam][i]);
		}
	}
	if(insertedParam.length>0) {
		for(let i=0; i<insertedParam.length; i++) {
			insertedParam[i].rowStatus = "C";
			//param에 array형태를 넣지 않고 spread하여 push함
			param.push([...insertedParam][i]);
		}
	}
	if(updatedParam.length>0) {
		for(let i=0; i<updatedParam.length; i++) {
			updatedParam[i].rowStatus = "U";
			param.push([...updatedParam][i]);
		}
	}
	if(param.length <= 0) {
		$.tracomalmsg('정보', '저장할 데이터가 없습니다.', null);
		return false;
	}

	//실제로 사용할 param
	param = JSON.stringify({'rows' : param});
	$.jf_progress('open',{
	  title:'저장',
	  msg:'저장중입니다. 잠시만 기다려 주세요.'
	});
	
	$.ajax({
		type: a_method,
		url: a_url,
		data: param,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			$.jf_progress('close');
			if(typeof(data['rows']) != "undefined"){
				a_obj.datagrid('acceptChanges');
				$.messager.show({
					title:'정보',
					msg:data['rsMsg']['message'],
					timeout:1500,
					showType:'slide'
				});
				$.pf_ajaxafterproc(a_action);	
			}else{
				let msgtext = data['rsMsg']['message'];
				top.$.messager.alert('sever massage',msgtext);
				data = {"total":0,"rows":[]};
			}
		
		},
		error: function(error){
			$.messager.progress('close');
			if (error.status == 403) {
				alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
				top.location.replace("/user/login");
			}
			else
				error.apply(this, arguments);
		}
	});
	
}

$.jf_savefmdata = function(a_form, url, a_vals, a_type) {

}

//프로시저, ajax 돌릴 예정
$.jf_execdata = function(a_obj, a_url, a_method, a_action) {

}

/** 
작성자 : 양현우
작성일 : 2023-04-09
기능 : 추가시 채번되는 시퀀스를 받아 데이터그리드에 넣는 기능
**/
$.jf_seqdgdata = function(a_url, a_method) {
	let rtn_value //변수선언후 리턴해야 리턴됨
	$.ajax({
		type: a_method,
		url: a_url,
		dataType: 'json',
		async: false,
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			if(typeof(data['rows']) != "undefined"){
				rtn_value = data['rows'].SEQ;
			}else{
				let msgtext = data['rsMsg']['message'];
				top.$.messager.alert('sever massage',msgtext);
			}
		
		},
		error: function(error){
			if (error.status == 403) {
				alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
				top.location.replace("/user/login");
			}
			else
				error.apply(this, arguments);
			rtn_value = false;
		}
	});
	return rtn_value;
}

/** 
작성자 : 양현우
작성일 : 2023-04-18
기능 : ajax를 실행하여 변수에 저장하는 기능
**/
$.jf_ajaxtovar = function(a_url, a_method, a_var) {
	$.ajax({
		type: a_method,
		url: a_url,
		dataType: 'json',
		async: false,
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			if(typeof(data['rows']) != "undefined"){
				a_var = data['rows']
			}else{
				let msgtext = data['rsMsg']['message'];
				top.$.messager.alert('sever massage',msgtext);
			}
		
		},
		error: function(error){
			if (error.status == 403) {
				alert("세션이 만료되어 로그인 페이지로 돌아갑니다.");
				top.location.replace("/user/login");
			}
			else
				error.apply(this, arguments);
			rtn_value = false;
		}
	});
	return a_var;
}

/** 
수정자 : 양현우
수정일 : 2023-05-09
수정내용 : 데이터그리드에서도 사용하기 위해 2번째 파라미터에 a_obj 추가하였음
**/
$.jf_modmdstrct = function(a_win, a_obj, a_form, a_values, a_rtnobj, a_type){
	let v_strct = {};
	for(let i=0; i<js_mdstrct.length; i++){
		if(js_mdstrct[i].win == a_win.attr("id")){
			if($.jf_isempty(a_type)) a_type == 'f';

			if(a_type == 'g'){
				js_mdstrct[i].datagrid = a_obj.attr("id");
				js_mdstrct[i].type = 'g';
			}
			else if(a_type == 'f'){
				js_mdstrct[i].form = a_form.attr("id");
				js_mdstrct[i].type = 'f';
			}
			else if(a_type == 'c'){
				js_mdstrct[i].datagrid = a_obj.attr("id");
				js_mdstrct[i].type = 'c';
			}
			js_mdstrct[i].values = a_values;
			js_mdstrct[i].rtnobj = a_rtnobj.attr("id");
			return true;
		}
	}
	if($.jf_isempty(a_type)) a_type == 'f';
	if(a_type == "g"){
		v_strct.datagrid = a_obj.attr("id");
		v_strct.type = 'g';
	}
	else if(a_type == "f"){
		v_strct.form = a_form.attr("id");
		v_strct.rtnobj = a_rtnobj.attr("id");
		v_strct.type = 'f';		
	}
	else if(a_type == "c"){
		v_strct.datagrid = a_obj.attr("id");
		v_strct.type = 'c';		
	}	
	v_strct.win = a_win.attr("id");
	v_strct.values = a_values;
	js_mdstrct.push(v_strct);
	return true;
}

$.jf_fndmdstrct = function(a_win){
	let rtn_idx;
	for(let i=0; i<js_mdstrct.length; i++){
		if(js_mdstrct[i].win == a_win){
			rtn_idx = i;
		}
	}
	return rtn_idx;
}

$.jf_protectform = function(a_obj, a_form, a_bool, a_idx, a_type){

	if(a_bool!=true&&$.jf_savah()!='Y')return; //저장권한이 없으면 protect를 동작할수 없음
		if(typeof(a_form) == "undefined") return false;
	// $.jf_resetdgidx(a_obj);
	if(a_idx < 0) a_bool = true;
	// if(a_type == 'nodata') {
	// 	a_form.find('.tracom-combobox').each(function(){
	// 		$(this).combobox('clear');
	// 	});
	// 	a_form.find('.tracom-numberbox').each(function(){
	// 		$(this).numberbox('clear');
	// 	});
	// 	a_form.form('clear');
	// }
	// else if(a_type == 'noauth'){}

	a_form.find('.tracom-textbox').each(function(){
		$(this).textbox({disabled:a_bool, value:null});
	});
	a_form.find('.tracom-datebox').each(function(){
		$(this).datebox({disabled:a_bool, value:null});
	});
	a_form.find('.tracom-combobox').each(function(){
		$(this).combobox({disabled:a_bool, value:null});
	});
	a_form.find('.tracom-radiobutton').each(function(){
		$(this).radiobutton({disabled:a_bool}); //radiobutton은 form sync가 되지 않아 null 제외
	});
	a_form.find('.tracom-numberbox').each(function(){
		$(this).numberbox({disabled:a_bool, value:null});
	});

	a_form.find('.tracom-numberspinner').each(function(){
		$(this).numberspinner({disabled:a_bool, value:null});
	});
	a_form.find('.tracom-useyn').each(function(){
		$(this).radiobutton({disabled:a_bool, value:null});
	});
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 데이터그리드의 데이터를 없앰
**/
$.jf_cleargrid = function(a_obj, a_idx) {
	if(typeof(a_obj) == "undefined") return false;
	if(a_idx < 1) {
		a_obj.datagrid('loadData', []);
	}
	
	return true;
}

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 데이터그리드 선택 row 위로 이동
**/
// $.jf_updgdata = function(a_obj, a_fields) {
// 	let v_index = $.jf_curdgindex(a_obj);
// 	if (v_index > 0) {
// 		let v_data = a_obj.datagrid('getData');
// 		let v_temp = v_data.rows[v_index - 1];
// 		v_data.rows[v_index - 1] = v_data.rows[v_index];
// 		v_data.rows[v_index] = v_temp;
// 		a_obj.datagrid('loadData', v_data);
// 		a_obj.datagrid('selectRow', v_index - 1);
// 		for(let i=0; i<v_data.rows.length; i++) {
// 			v_vals = $.jf_singledatatojson(a_fields, i+1);
// 			a_obj.datagrid('updateRow',{index:i,row:v_vals});
// 		}

// 	}
// }

/** 
작성자 : 양현우
작성일 : 2023-04-12
기능 : 데이터그리드 선택 row 아래로 이동
**/
// $.jf_downdgdata = function(a_obj, a_fields) {
// 	var v_index = $.jf_curdgindex(a_obj);
// 	var v_data = a_obj.datagrid('getData');
// 	if (v_index < v_data.rows.length - 1) {
// 		var v_temp = v_data.rows[v_index + 1];
// 		v_data.rows[v_index + 1] = v_data.rows[v_index];
// 		v_data.rows[v_index] = v_temp;
// 		a_obj.datagrid('loadData', v_data);
// 		a_obj.datagrid('selectRow', v_index + 1);
// 		for(let i=0; i<v_data.rows.length; i++) {
// 			v_vals = $.jf_singledatatojson(a_fields, i+1);
// 			a_obj.datagrid('updateRow',{index:i,row:v_vals});
// 		}
// 	}
// }

/** 
작성자 : 양현우
작성일 : 2023-04-24
기능 : datagrid의 같은 컬럼을 기준으로 cell을 병합
**/
$.jf_mergedg = function (a_obj, a_fields) {
	var v_rows = a_obj.datagrid('getRows');
	var v_startIndex = 0;
	var v_endIndex = 0;

	if (v_rows.length < 1) {
		return;
	}

	for (var i = 1; i < v_rows.length; i++) {
		if (v_rows[i][a_fields] === v_rows[i - 1][a_fields]) {
			v_endIndex = i;
		} else {
			a_obj.datagrid('mergeCells', {
				index: v_startIndex,
				field: a_fields,
				rowspan: v_endIndex - v_startIndex + 1
			});
			v_startIndex = i;
			v_endIndex = i;
		}
	}

	return true;
}
/** 
작성자 : 양현우
작성일 : 2023-04-24
기능 : datagrid의 같은 value를 기준으로 병합
**/
$.jf_mergecellvalue = function (a_obj, a_fields) {
    var v_rows = a_obj.datagrid('getRows');

    if (v_rows.length < 1) {
        return;
    }

    for (var v_rowIndex = 0; v_rowIndex < v_rows.length; v_rowIndex++) {
        var v_prevValue = v_rows[v_rowIndex][a_fields[0]];
        var v_startIndex = 0;
        var v_endIndex = 0;
        for (var v_fieldIndex = 1; v_fieldIndex < a_fields.length; v_fieldIndex++) {
            if (v_rows[v_rowIndex][a_fields[v_fieldIndex]] === v_prevValue) {
            // if (a_fields.length == v_fieldIndex) {
                v_endIndex = v_fieldIndex;
            } 
			else {
				if(v_startIndex !== v_endIndex) {
					a_obj.datagrid('mergeCells', {
						index: v_rowIndex,
						field: a_fields[v_startIndex],
						colspan: v_endIndex - v_startIndex + 1
					});
				}
				v_startIndex = v_fieldIndex;
				v_endIndex = v_fieldIndex;
				v_prevValue = v_rows[v_rowIndex][a_fields[v_fieldIndex]];
            }
        }
		if(v_startIndex !== v_endIndex) {
			a_obj.datagrid('mergeCells', {
				index: v_rowIndex,
				field: a_fields[v_startIndex],
				colspan: v_endIndex - v_startIndex + 1
			});
		}
    }
}

/** 
작성자 : 양현우
작성일 : 2023-04-24
기능 : datagrid의 같은 컬럼명을 기준으로 병합
**/
$.jf_mergecellnm = function(a_obj, a_fields) {
    var v_rows = a_obj.datagrid('getRows');

    if (v_rows.length < 1) {
        return;
    }

    for (var v_rowIndex = 0; v_rowIndex < v_rows.length; v_rowIndex++) {
		if(v_rowIndex % 2 == 0) { // row가 짝수일때만 적용하였음. 수정가능성 있음
			var v_startIndex = 0;
			var v_endIndex = a_fields.length - 1;
			if (v_startIndex !== v_endIndex) {
				a_obj.datagrid('mergeCells', {
					index: v_rowIndex,
					field: a_fields[v_startIndex],
					colspan: v_endIndex - v_startIndex + 1
				});
			}
		}
    }
}

/** 
작성자 : 양현우
작성일 : 2023-04-25
기능 : 대상 문구가 비어있는지 체크
**/
$.jf_isempty = function(a_str){
	return a_str == '' || a_str == null || typeof a_str == "undefined";
}

/** 
작성자 : 양현우
작성일 : 2023-05-02
기능 : 데이터그리드에서 중복된 값이 있는지 검사
**/
$.jf_dupcheck = function(a_obj, a_field, a_param) {
	let v_allData = a_obj.datagrid('getData').rows;
	let rtn_isDuplicated = false;
	for (let i=0; i<v_allData.length; i++) {
		if(v_allData[i][a_field] === a_param) {
			rtn_isDuplicated = true;
			break;	
		}
	}
	return rtn_isDuplicated;
}

/** 
작성자 : 양현우
작성일 : 2023-05-30
기능 : 데이터그리드에서 중복된 값의 row 리턴
**/
$.jf_fndduprow = function(a_obj, a_field, a_param) {
	let v_allData = a_obj.datagrid('getData').rows;
	let rtn_isDuplicated = -1;
	for (let i=0; i<v_allData.length; i++) {
		if(v_allData[i][a_field] === a_param) {
			rtn_isDuplicated = i;
			break;	
		}
	}
	return rtn_isDuplicated;
}

/** 
작성자 : 양현우
작성일 : 2023-05-22
기능 : 현재 날짜 가져오기(년월일시분초)
**/
$.jf_getcurrentdate = function(a_day) {
	let v_date = new Date();
	if(!$.jf_isempty(a_day)) v_date.setDate(v_date.getDate()+a_day);
	let v_year = v_date.getFullYear().toString();

	let v_month = v_date.getMonth() + 1;
	v_month = v_month < 10 ? '0' + v_month.toString() : v_month.toString();
	
	var v_day = v_date.getDate();
	v_day = v_day < 10 ? '0' + v_day.toString() : v_day.toString();
	
	var v_hour = v_date.getHours();
	v_hour = v_hour < 10 ? '0' + v_hour.toString() : v_hour.toString();
	
	var v_minites = v_date.getMinutes();
	v_minites = v_minites < 10 ? '0' + v_minites.toString() : v_minites.toString();
	
	var v_seconds = v_date.getSeconds();
	v_seconds = v_seconds < 10 ? '0' + v_seconds.toString() : v_seconds.toString();
	
	return v_year + v_month + v_day + v_hour + v_minites + v_seconds;
}

/** 
작성자 : 양현우
작성일 : 2023-05-23
기능 : 데이터그리드의 총 데이터 리턴
**/
$.jf_getdata = function(a_obj) {
	return a_obj.datagrid('getData')['rows'];
}

/** 
작성자 : 양현우
작성일 : 2023-05-24
기능 : 현재 시간 리턴(HH:mm:ss)
**/
$.jf_gettime = function() {
	var v_today = new Date();   
	return $.jf_leadingZeros(v_today.getHours(), 2) + ':' + $.jf_leadingZeros(v_today.getMinutes(), 2) + ':' + $.jf_leadingZeros(v_today.getSeconds(), 2);
}

/** 
작성자 : 양현우
작성일 : 2023-06-20
기능 : 문자열 시간(예: 07:03) 초 변경
**/
$.jf_converttime = function(a_str) {
	let [hours, minutes] = a_str.split(':');
	return (+hours) * 60 * 60 + (+minutes) * 60;
}

$.jf_leadingZeros = function(a_number, a_digits){
	let rtn_zero = '';
	a_number = a_number.toString();
	if(a_number.length < a_digits){
		for(let i=0; i<a_digits - a_number.length; i++) rtn_zero += '0';
	}
	return rtn_zero + a_number;
}

/** 
작성자 : 양현우
작성일 : 2023-05-30
기능 : 백그라운드용 ajax
**/
$.jf_bgajax = function(a_url, a_method, a_param, a_type){
	$.ajax({
		type: a_method,
		url: a_url,
		data: a_param,
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(data){
			if(typeof(data['rows']) != "undefined"){
				data = data['rows'];
				if(typeof($.pf_bgajaxafterproc) != "undefined"){$.pf_bgajaxafterproc(data, a_type)}
			}else{
				let msgtext = data['rsMsg']['message'];
				top.$.messager.alert('sever massage',msgtext);
				data = {"total":0,"rows":[]};
			}
		},
		error: function(){
			error.apply(this, arguments);
		}
	});
}
