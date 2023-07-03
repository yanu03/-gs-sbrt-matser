/** 
작성자 : 양현우
작성일 : 2023-04-27
수정자 : 양현우
수정일 : 2023-04-27
**/
$(function(){
	//from date to date
	$('#subsch_panel0').append('<input id="sch_fdd" type="text">');
	// $('#sch_panel1').append('<input id="sch_fdd" type="text"> - ');
	// $('#sch_panel1').append('<input id="sch_tdd" type="text">&nbsp;&nbsp;&nbsp;&nbsp;');
	
	$('#sch_fdd').datebox({
		width: 110,
		height: 24,
		currentText: '',
		required: false ,
		editable: false ,
		value: $.tracomfromdate('d'),
		formatter: $.tracomdateformatter,
		parser: $.tracomdateparser,
			onSelect: function(date){},
			onChange: function(a_newValue, oldValue){
				// let v_todate = $('#sch_tdd').datebox('getValue');
				// if(v_todate.length < 1) return false;
				// if(a_newValue > v_todate) $('#sch_fdd').datebox('setValue', v_todate);
				// $.uf_limitdate();
				$.uf_bgajax();
				return true;
			}
	});
	
	// $('#sch_tdd').datebox({
    // width: 110,
    // height: 24,
    // currentText: '',
    // required: false ,
	// editable: false ,
    // value: $.tracomtodate('d'),	//초기값
    // formatter: $.tracomdateformatter,
    // parser: $.tracomdateparser,
	// 	onSelect: function(date){},
	// 	onChange: function(a_newValue, oldValue){
	// 		let v_fromdate = $('#sch_fdd').datebox('getValue');
	// 		if(v_fromdate.length < 1) return false;
	// 		if(a_newValue < v_fromdate) $('#sch_tdd').datebox('setValue', v_fromdate);
	// 		$.uf_limitdate();
	// 		return true;
	// 	}
	// });

});