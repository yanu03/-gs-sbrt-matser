/**
 * 프로그램명 : 코드관리 sch radiobtn
 * 작성자 : 박원용
 * 작성일 : 2023.04.10
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_rb0" name="YN">');
	$('#sch_panel0').append('<input id="sch_rb1" name="YN">');
	$('#sch_panel0').append('<input id="sch_rb2" name="YN">');
    
	$('#sch_rb0').radiobutton({
        label: '전체',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'all',
        checked: true,
        onChange: function(checked){
            //checked : true, false
        }
	});
	$('#sch_rb1').radiobutton({
        label: '사용',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'Y',
        checked: false,
        onChange: function(checked){
            //checked : true, false
        }
	});
	$('#sch_rb2').radiobutton({
        label: '미사용',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'N',
        checked: false,
        onChange: function(checked){
            //checked : true, false
        }
	});

});