$(function(){

	var authority = $.jf_getcurauthority();

	if(authority.SCH_AH=="Y"){
		$('#subbtn_panel2').append('<a id="subbtn0" href="#">새로고침</a>');
	}
	if(authority.SAV_AH=="Y"){
		$('#subbtn_panel2').append('<a id="subbtn1" href="#">궤적생성</a>');
		$('#subbtn_panel2').append('<a id="subbtn2" href="#">배포</a>');
	}

	$('#subbtn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-reload'
	});
	$('#subbtn1').linkbutton({
	    height: 24,
	    //iconCls: 'icon-add',
	    disabled: false
	});
	$('#subbtn2').linkbutton({
	    height: 24,
	    //iconCls: 'icon-remove',
	   	plain: false
	});	
	
	//btn 기능 binding
  $('#subbtn0').bind('click', function(){
		//새로고침
		if($.jf_changeddg($('#dg1'), null)) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'subsave1');
		}else{
			$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), $.jf_curdgrow($('#dg0'))));
		}				
  });
  $('#subbtn1').bind('click', function(){
	//궤적생성
	if(!$.jf_isempty($('#sch_tb').textbox('getValue'))){$.uf_createoperdetailplan();}
	else $.tracomalmsg('정보', '정류소 정차시간을 입력해야 합니다.', null);
	
  });
  $('#subbtn2').bind('click', function(){
	//배포
	$.uf_distri();
  });
});