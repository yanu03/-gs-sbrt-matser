/**
 * 프로그램명 : 기상관리 year/month Spinner
 * 작성자 : 박원용
 * 작성일 : 2023.04.26
 */

$(function(){

	$('#sch_panel0').append('<input id="sch_ns0" class="tracom-numberspinner">');
  $('#sch_panel0').append('년 &nbsp;&nbsp;&nbsp;');
  $('#sch_panel0').append('<input id="sch_ns1" class="tracom-numberspinner">');
  $('#sch_panel0').append('월 &nbsp;&nbsp;&nbsp;');
	
	var v_date = new Date();
  var v_year = v_date.getFullYear().toString();
  var v_month = 1;//v_date.getMonth()+1;
  /*추후 공통으로 빼주면 좋습니다*/
    
	$('#sch_ns0').numberspinner({
    width: 120,
    height: 24,
    value: v_year,
    min: 1900,
    max: 2100,
    increment: 1,
    editable: false,
    readonly: false,
    onSpinUp: function(){
    },
    onSpinDown: function(){ 
    },
    onChange : function(a_newvalue, a_oldvalue){
    }
	});
  $('#sch_ns1').numberspinner({
    width: 60,
    height: 24,
    value: v_month,
    min: 0,
    max: 13,
    increment: 1,
    editable: false,
    readonly: false,
    onSpinUp: function(){
      $.uf_autochange($('#sch_ns1'));
    },
    onSpinDown: function(){ 
      $.uf_autochange($('#sch_ns1'));
    },
    onChange : function(a_newvalue, a_oldvalue){
    
    }
	});

});