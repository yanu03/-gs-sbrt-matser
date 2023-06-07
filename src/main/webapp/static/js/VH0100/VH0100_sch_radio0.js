/**
 * 프로그램명 : 버스 운행지시 전송 이력 조회 sch radiobtn
 * 작성자 : 박원용
 * 작성일 : 2023.05.11
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_rb0" name="date">');
	$('#sch_panel0').append('<input id="sch_rb1" name="date">');
	$('#sch_panel0').append('<input id="sch_rb2" name="date">');
    
	$('#sch_rb0').radiobutton({
        label: '금일',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'today',
        checked: true,
        onChange: function(checked){
            //checked : true, false
            $.uf_changedate($('#sch_rb0').val());
        }
	});
	$('#sch_rb1').radiobutton({
        label: '일주일',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'week',
        checked: false,
        onChange: function(checked){
            //checked : true, false
            $.uf_changedate($('#sch_rb1').val());
        }
	});
	$('#sch_rb2').radiobutton({
        label: '1개월',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'month',
        checked: false,
        onChange: function(checked){
            //checked : true, false
            $.uf_changedate($('#sch_rb2').val());
        }
	});

});