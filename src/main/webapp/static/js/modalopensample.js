$(function(){
	
	$('#fm_panel0').append('<table>');
	//design
	
	$('#fm_panel0').append('<input id="VHC_ID" name="VHC_ID"><p>');
	$('#fm_panel0').append('<input id="VHC_NO" name="VHC_NO"><p>');
	
		$('#fm_panel0').append('<input id="COMP_ID" name="COMP_ID">&nbsp;');
		$('#fm_panel0').append('<input id="COMP_NM" name="COMP_NM">&nbsp;');
		$('#fm_panel0').append('<a id="btn10" href="#">찾기</a>&nbsp;');		
		$('#fm_panel0').append('<input id="AREA" name="AREA">&nbsp;<p>');
				
		$('#fm_panel0').append('<input id="STTN_ID" name="STTN_ID">&nbsp;');
		$('#fm_panel0').append('<input id="STTN_NM" name="STTN_NM">&nbsp;');
		$('#fm_panel0').append('<a id="btn11" href="#">찾기</a>');		
		$('#fm_panel0').append('<input id="STTN_NO" name="STTN_NO">&nbsp;');
		$('#fm_panel0').append('<input id="GPS_X" name="GPS_X">&nbsp;');
		$('#fm_panel0').append('<input id="GPS_Y" name="GPS_Y">&nbsp;<p>');
		
		$('#fm_panel0').append('<input id="TEST" name="TEST"><p>');

	$('#fm_panel0').append('</table>');
	
	
	$('#fm_panel0').append('<a id="tmp_btn0" href="#">차번호 창 띄우기</a>');
	$('#fm_panel0').append('<a id="btn11" href="#">정류장 창 띄우기</a>');		
	
	$('#tmp_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-add'
	});
	$('#tmp_btn0').bind('click', function(){
		let v_values = {COMP_ID:'', COMP_NM:$('#VHC_NO').textbox('getValue'), AREA:''};
		$.mf_selcompmdopen(null, $('#ef0'), v_values, $('#VHC_NO'), 'f');
  });
  
    $('#btn11').bind('click', function(){
		let v_values = {STTN_ID:'', STTN_NM:$('#STTN_NM').textbox('getValue'), STTN_NO:'', GPS_X:'', GPS_Y:''};
		$.mf_selbustopmdopen($('#ef0'), v_values, $('#TEST'));
  });
	
});