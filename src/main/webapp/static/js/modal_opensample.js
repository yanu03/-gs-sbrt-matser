$(function(){
	
	$('#fm_panel0').append('<a id="tmp_btn0" href="#">차번호 창 띠우기</a>');
	$('#tmp_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-add'
	});
	$('#tmp_btn0').bind('click', function(){
		let v_values = {VHC_ID:null, VHC_NO:$('#VHC_NO').textbox('getValue')};
		$.mf_selcompmdopen(null, $('#ef0'), v_values, $('#VHC_NO'), 'f');
  });
	
});