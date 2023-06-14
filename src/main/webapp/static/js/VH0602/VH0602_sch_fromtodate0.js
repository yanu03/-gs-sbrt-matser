/**
 * 프로그램명 : 우선신호 발생 이력 fromtodate
 * 작성자 : 박원용
 * 작성일 : 2023.05.11
 */
$(function(){
	//from date to date
	$('#sch_panel0').append('<input id="sch_fdd" type="text"> - ');
	$('#sch_panel0').append('<input id="sch_tdd" type="text">&nbsp;&nbsp;');
	
	$('#sch_fdd').datebox({
    width: 110,
    height: 24,
    currentText: '',
    required: false ,
    editable: false ,
    value: $.tracomfromdate('d'),
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){
			$('#sch_rb0').radiobutton('check');
		},
		onChange: function(a_newValue, oldValue){
			let v_todate = $('#sch_tdd').datebox('getValue');
			if(v_todate.length < 1) return false;
			if(a_newValue > v_todate) $('#sch_fdd').datebox('setValue', v_todate);
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
		onSelect: function(date){
			$('#sch_rb0').radiobutton('check');
		},
		onChange: function(a_newValue, oldValue){
			let v_fromdate = $('#sch_fdd').datebox('getValue');
			if(v_fromdate.length < 1) return false;
			if(a_newValue < v_fromdate) $('#sch_tdd').datebox('setValue', v_fromdate);
			return true;
		}
	});

});