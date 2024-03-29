/**
 * 프로그램명 : 로그인 이력 조회 fromtodate
 * 작성자 : 박원용
 * 작성일 : 2023.04.11
 */
$(function(){
	//from date to date
	$('#sch_panel0').append('<input id="sch_fdd" type="text"> - ');
	$('#sch_panel0').append('<input id="sch_tdd" type="text">&nbsp;&nbsp;&nbsp;&nbsp;');
	
	$('#sch_fdd').datebox({
    width: 110,
    height: 24,
    currentText: '',
    required: false ,
    editable: false ,
    value: $.tracomfromdate('m'),
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){},
		onChange: function(a_newValue, oldValue){
			let v_todate = $('#sch_tdd').datebox('getValue');
			if(v_todate.length < 1) return false;
			if(a_newValue > v_todate) $('#sch_fdd').datebox('setValue', v_todate);
			// $.uf_limitdate();
			return true;
		}
	});
	
	$('#sch_tdd').datebox({
    width: 110,
    height: 24,
    currentText: '',
    required: false ,
	editable: false ,
    value: $.tracomtodate('d'),	//초기값
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){},
		onChange: function(a_newValue, oldValue){
			let v_fromdate = $('#sch_fdd').datebox('getValue');
			if(v_fromdate.length < 1) return false;
			if(a_newValue < v_fromdate) $('#sch_tdd').datebox('setValue', v_fromdate);
			// $.uf_limitdate();
			return true;
		}
	});

});