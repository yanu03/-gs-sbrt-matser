$(function(){

	var authority = $.jf_getcurauthority();

	if(authority.SCH_AH=="Y"){
		$('#subbtn_panel0').append('<a id="subbtn0" href="#">새로고침</a>');
	}
	if(authority.SAV_AH=="Y"){
		$('#subbtn_panel0').append('<a id="subbtn1" href="#">삽입</a>');
		$('#subbtn_panel0').append('<a id="subbtn2" href="#">삭제</a>');
	}

	$('#subbtn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	$('#subbtn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-add',
	    disabled: false
	});
	$('#subbtn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove',
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
		//추가
	  if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
		if(!$.jf_changeddg($('#dg0'), null)){
			$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			$.jf_insert($('#dg1'), $.pf_defaultparams($('#dg1')), $.jf_curdgindex($('#dg1'))+1);
		} else{
			$.tracomalmsg('정보', '배차 데이터 저장 후 삽입이 가능합니다.', null);
		} 
	}
			
  });
  $('#subbtn2').bind('click', function(){
		$.jf_delete($('#dg1'));
  });
});