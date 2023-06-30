/**
 * 프로그램명 : 휴일관리dateSpinner
 * 작성자 : 박원용
 * 작성일 : 2023.04.07
 * 
 * 수정자 : 박원용
 * 수정일 : 2023.05.10
 */

$(function(){

	$('#sch_panel0').append('<input id="sch_ns0" class="tracom-numberspinner">');
	
  var authority = $.jf_getcurauthority();
	var v_date = new Date();
  var v_year = v_date.getFullYear().toString();
  /*추후 공통으로 빼주면 좋습니다*/
    
	$('#sch_ns0').numberspinner({
    width: 150,
    height: 24,
    value: v_year,
    min: 1900,
    max: 2100,
    increment: 1,
    editable: false,
    readonly: false,
    onSpinUp: function(){
      if(authority.SCH_AH=="Y"){
        if($.jf_changeddg($('#dg0'), null)){
          $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'search');
        }else{
          $.jf_retrieve($('#dg0'));
        }  
      }
    },
    onSpinDown: function(){ 
      if(authority.SCH_AH=="Y"){
        if($.jf_changeddg($('#dg0'), null)){
          $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'search');
        }else{
          $.jf_retrieve($('#dg0'));
        }  
      }
    },
    onChange : function(a_newvalue, a_oldvalue){
      uv_oldyear = a_oldvalue;
    }
	});

});