$(function(){

	$('#sch_panel0').append('<input id="sch_ns0">');
	
	let v_date = new Date();
  let v_year = v_date.getFullYear().toString();
  /*추후 공통으로 빼주면 좋습니다*/
    
	$('#sch_ns0').numberspinner({
    width: 100,
    height: 22,
    value: v_year,
    min: 1900,
    max: 2100,
    increment: 1,
    editable: false,
    readonly: false,
    onSpinUp: function(){ },
    onSpinDown: function(){ }
	});

});