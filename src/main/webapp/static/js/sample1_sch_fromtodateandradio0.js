$(function(){
	//from date to date
	$('#sch_panel0').append('<input id="sch_fdd" type="text"> - ');
	$('#sch_panel0').append('<input id="sch_tdd" type="text">');
	$('#sch_panel0').append('<input id="sch_rb0"" name="fruit">');
	$('#sch_panel0').append('<input id="sch_rb1"" name="fruit">');
	$('#sch_panel0').append('<input id="sch_rb2"" name="fruit">');
	// $('#sch_panel0').append('<input id="sch_rb3"" name="fruit">');

	// $('#sch_panel0').append('<div id="sch_rg0" class="" style="display: inline-block;"></div>');		//추후 class로 변경

	$('#sch_fdd').datebox({
    width: 110,
    height: 24,
    currentText: '오늘',
    required: false ,
    editable: false ,
    value: $.tracombasicdate(),
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){
		},
		onChange: function(newValue, oldValue){
			let todate = $('#sch_tdd').datebox('getValue');
			if(todate.length < 1) return false;
			if(newValue > todate){ $('#sch_fdd').datebox('setValue', todate); }
			return true;
		}
	});
	
	$('#sch_tdd').datebox({
    width: 110,
    height: 24,
    currentText: '오늘',
    required: false ,
  	editable: false ,
    value: $.tracombasicdate(),	//초기값
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){
		},
		onChange: function(newValue, oldValue){
			let fromdate = $('#sch_fdd').datebox('getValue');
			if(fromdate.length < 1) return false;
			if(newValue < fromdate){ $('#sch_tdd').datebox('setValue', fromdate); }
			return true;
		}
	});

//   $('#sch_rg0').radiogroup({
// 		name: 'test',
// 		labelWidth:50,
// 		data: [{
// 			value:'manaul',
// 			label:'직접입력',
// 			checked: false
// 		},{
// 			value:'today',
// 			label:'금일',
// 			checked: true
// 		},{
// 				value:'thisweek',
// 			label:'금주',
// 			checked: false
// 		},{
// 				value:'thismonth',
// 			label:'금월',
// 			checked: false
// 		}],
// 		onChange:function(value){
// 			if(value == 'thisweek'){
// 				$('#sch_tdd').datebox('setValue', '2022-01-01');
// 				$('#sch_fdd').datebox('setValue', '2022-01-01');
// 			}
// 	}
// });

$('#sch_rb0').radiobutton({
	label: '오늘',
	labelWidth:100,
	labelPosition:'after',
	labelAlign:'left',
	value: 'day',
	//checked: false,
	onChange: function(checked){
		if(!checked) return false;
		//checked : true, false
		$('#sch_fdd').datebox('setValue', $.tracomfromdate('d'));
		$('#sch_tdd').datebox('setValue', $.tracomtodate('d'));
		//$.tracomfromdate('d');
	}
});
$('#sch_rb1').radiobutton({
	label: '일주일',
	labelWidth:100,
	labelPosition:'after',
	labelAlign:'left',
	value: 'week',
	//checked: false,
	onChange: function(checked){
		if(!checked) return false;
		//checked : true, false
		$('#sch_fdd').datebox('setValue', $.tracomfromdate('w'));
		$('#sch_tdd').datebox('setValue', $.tracomtodate('d'));
	}
});
$('#sch_rb2').radiobutton({
	label: '한달',
	labelWidth:100,
	labelPosition:'after',
	labelAlign:'left',
	value: 'month',
	//checked: false,
	onChange: function(checked){
		if(!checked) return false;
		//checked : true, false
		$('#sch_fdd').datebox('setValue', $.tracomfromdate('m'));
		$('#sch_tdd').datebox('setValue', $.tracomtodate('d'));
	}
});

});