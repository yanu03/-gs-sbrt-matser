/** 
작성자 : 양현우
작성일 : 2023-07-31
수정자 : 양현우
수정일 : 2023-07-31
**/
$(function(){
	var authority = $.jf_getcurauthority();
	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<input id="switchbtn1" href="#">');
	}
	$('#switchbtn1').switchbutton({
	    height: 24,
		checked: true,
		label: '정류소',
		labelWidth:50,
		onChange: function(checked){
			var v_sttnList = $.jf_fndicsostrct('_sttn');
			if(checked){
				for(var i=0; i<v_sttnList.length; i++){
					v_sttnList[i].setMap(js_map);
				}	
			}
			else{
				for(var i=0; i<v_sttnList.length; i++){
					v_sttnList[i].setMap(null);
				}
			}
		}
	});
});