/** 
작성자 : 양현우
작성일 : 2023-07-31
수정자 : 양현우
수정일 : 2023-07-31
**/
$(function(){
	var authority = $.jf_getcurauthority();
	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<input id="switchbtn2" href="#">');
	}
	$('#switchbtn2').switchbutton({
	    height: 24,
		checked: true,
		label: '교차로',
		labelWidth:50,
		onChange: function(checked){
			var v_crsList = $.jf_fndicsostrct('_crs');
			if(checked){
				for(var i=0; i<v_crsList.length; i++){
					v_crsList[i].setMap(js_map);
				}	
			}
			else{
				for(var i=0; i<v_crsList.length; i++){
					v_crsList[i].setMap(null);
				}
			}
		}
	});
  
});