$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn0" href="#">조회</a>');
	$('#btn_panel0').append('<a id="btn1" href="#">추가</a>');
	$('#btn_panel0').append('<a id="btn2" href="#">삭제</a>');
	$('#btn_panel0').append('<a id="btn3" href="#">취소</a>');
	$('#btn_panel0').append('<a id="btn4" href="#">저장</a>');
	$('#btn_panel0').append('<a id="btn5" href="#">엑셀업로드</a>');
	$('#btn_panel0').append('<a id="btn6" href="#">엑셀다운로드</a>');
	$('#btn_panel0').append('<a id="btn7" href="#">엑셀양식</a>');
	$('#btn_panel0').append('<a id="btn8" href="#">닫기</a>');
	
	$('#btn_panel0').append('<a id="btn10" href="#">하부추가</a>');
	
	
	$('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-reload'
	});
	$('#btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-add',
	    disabled: false
	});
	$('#btn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove',
	   	plain: false
	});
	$('#btn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-cancel',
	});
	$('#btn4').linkbutton({
	    height: 24,
	    iconCls: 'icon-save'
	});
	$('#btn5').linkbutton({
	    height: 24,		
	});
	$('#btn6').linkbutton({
	    height: 24,		
	});
	$('#btn7').linkbutton({
	    height: 24,		
	});
	$('#btn8').linkbutton({
	    height: 24,		
	    iconCls: 'icon-clear'
	});
	$('#btn10').linkbutton({
	    height: 24,		
	});
	//윗부분은 따루 빠질 예정
	
	
	//btn 기능 binding
  $('#btn0').bind('click', function(){
		//조회
		$.jf_retrieve($('#dg0'), $.pf_combineparams($('#dg0')));
  });
  $('#btn1').bind('click', function(){
		$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
  });
  $('#btn2').bind('click', function(){
		$.jf_delete($('#dg0'), 1);
  });
  $('#btn3').bind('click', function(){

  });
  $('#btn4').bind('click', function(){

  });
  $('#btn5').bind('click', function(){

  });
  $('#btn6').bind('click', function(){

  });
  $('#btn7').bind('click', function(){

  });
  $('#btn10').bind('click', function(){
		$.jf_append($('#dg1'), $.pf_defaultparams($('#dg1')));
  });
  
});