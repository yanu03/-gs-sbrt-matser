﻿$(function(){
	
	$('#subbtn_panel0').append('<a id="subbtn0" href="#">새로고침</a>');
	$('#subbtn_panel0').append('<a id="subbtn1" href="#">추가</a>');
	$('#subbtn_panel0').append('<a id="subbtn2" href="#">삭제</a>');
	
	$('#subbtn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-reload'
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
			if($.jf_curtabindex($('#tabs0')) == 0){
				if($.jf_changeddg($('#dg1'), null)) {
					$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'subsave1');
				}else{
					$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), $.jf_curdgrow($('#dg0'))));
				}				
			}else if($.jf_curtabindex($('#tabs0')) == 1){
				if($.jf_changeddg($('#dg2'), null)) {
					$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'subsave2');
				}else{
					$.jf_childretrieve($('#dg2'), $.pf_childparams($('#dg2'), $.jf_curdgrow($('#dg0'))));
				}
			}
  });
  $('#subbtn1').bind('click', function(){
  	//추가
			if($.jf_curtabindex($('#tabs0')) == 0){
				if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')) $.jf_append($('#dg1'), $.pf_defaultparams($('#dg1')));
			}
			if($.jf_curtabindex($('#tabs0')) == 1){
				if($.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g')) $.jf_append($('#dg2'), $.pf_defaultparams($('#dg2')));
			} 
  });
  $('#subbtn2').bind('click', function(){
		if($.jf_curtabindex($('#tabs0')) == 0) $.jf_delete($('#dg1'));
		if($.jf_curtabindex($('#tabs0')) == 1) $.jf_delete($('#dg2'));
  });
   
});