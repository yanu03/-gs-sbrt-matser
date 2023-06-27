$(function(){

	var authority = $.jf_getcurauthority();

	if(authority.SCH_AH=="Y"){
		$('#subbtn_panel0').append('<a id="subbtn0" href="#">새로고침</a>');
	}

	$('#subbtn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
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
});