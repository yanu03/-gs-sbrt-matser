$(function(){

	var authority = $.jf_getcurauthority();

	if(authority.SAV_AH=="Y"){
		$('#subbtn_panel1').append('<a id="subbtn1" href="#">궤적생성</a>');
	}
	$('#subbtn1').linkbutton({
	    height: 24,
	    //iconCls: 'icon-add',
	    disabled: false
	});
	
	//btn 기능 binding
  $('#subbtn1').bind('click', function(){
	//궤적생성
	
  });
});