/*
프로그램명 : 사용자관리 form

작성자 : 박원용
작성일 : 2023.04.28
*/
$(function(){
	
	$('#ef0').form({
    onSubmit: function(param){},
    success:function(data){},
    onProgress: function(percent){},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(data){},
    onLoadError: function(){},

    onChange: function(target){
      if(!jv_rowclick) return false;
      //if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
      let a_vals;
      let a_arrfield;
      let a_arrvalue;
      switch(target.id){
        // 권한그룹 관한 case 넣어주기\
        
        case "AUTH_CD":	//listbox sample
          a_arrfield =  new Array("AUTH_CD", "AUTH_NM");
          a_arrvalue =  new Array($('#AUTH_CD').textbox('getValue'), $('#AUTH_CD').textbox('getText'));
          a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
          break;
        case "JOB_POSITION":	//listbox sample
          a_arrfield =  new Array("JOB_POSITION", "JOB_POSITION_NM");
          a_arrvalue =  new Array($('#JOB_POSITION').textbox('getValue'), $('#JOB_POSITION').textbox('getText'));
          a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
          break;
        case "JOB_DUTY":	//listbox sample
          a_arrfield =  new Array("JOB_DUTY", "JOB_DUTY_NM");
          a_arrvalue =  new Array($('#JOB_DUTY').textbox('getValue'), $('#JOB_DUTY').textbox('getText'));
          a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
          break;
        case "USE_YN_Y":	//radio sample
        case "USE_YN_N":
          if($(target).radiobutton('options').checked){
              a_vals = $.jf_singledatatojson('status', $(target).radiobutton('options').value);
          } 
          break;
        default:
          if(!$(target).textbox('isValid')){$(target).textbox('clear'); break;}
          a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
          break;
      }
      $.jf_synctogrid($('#dg0'), a_vals);
      
      return true;
    }
	});

  let htmlString = '<table>';

   //design
  htmlString += '<tr>';
  htmlString += '<th><label>사용자ID </label></th>';
  htmlString += '<td></td>'; //숫자 주도록해서 append
  htmlString += '<th><label>사용자명 </label></th>';
  htmlString += '<td></td>';
  htmlString += '<th><label>권한그룹 </label></th>';
  htmlString += '<td></td>';
  htmlString += '</tr>';

  htmlString += '<tr>';
  htmlString += '<th><label>직급 </label></th>';
  htmlString += '<td></td>'; //숫자 주도록해서 append
  htmlString += '<th><label>직책 </label></th>';
  htmlString += '<td></td>';
  htmlString += '<th><label>사용여부 </label></th>';
  htmlString += '<td></td>';
  htmlString += '</tr>';

  htmlString += '<tr>';
  htmlString += '<th><label>비밀번호 </label></th>';
  htmlString += '<td></td>'; //숫자 주도록해서 append
  htmlString += '<th><label>비밀번호 확인 </label></th>';
  htmlString += '<td></td>';
  htmlString += '<th><label>비고 </label></th>';
  htmlString += '<td></td>';
  htmlString += '</tr>';

  htmlString += '</table>';

  $('#fm_panel0').html(htmlString);


	// $('#fm_panel0').append('<table>');
	//design
	$('tr:nth-child(1) td:nth-child(2)').append('<input id="USER_ID" class="tracom-textbox" name="USER_ID">');
	$('tr:nth-child(1) td:nth-child(4)').append('<input id="USER_NM" class="tracom-textbox" name="USER_NM">');
  //$('#fm_panel0').append('<input id="" class="tracom-textbox" name="">'); // 권한그룹 넣어줘야함
  $('tr:nth-child(1) td:nth-child(6)').append('<input id="AUTH_CD" class="tracom-combobox" name="AUTH_CD">');
  $('tr:nth-child(2) td:nth-child(2)').append('<input id="JOB_POSITION" class="tracom-combobox" name="JOB_POSITION">');
  $('tr:nth-child(2) td:nth-child(4)').append('<input id="JOB_DUTY" class="tracom-combobox" name="JOB_DUTY">');
  $('tr:nth-child(2) td:nth-child(6)').append('<input id="USE_YN_Y" class="tracom-radiobutton" name="USE_YN">');
  $('tr:nth-child(2) td:nth-child(6)').append('<input id="USE_YN_N" class="tracom-radiobutton" name="USE_YN">');
  $('tr:nth-child(3) td:nth-child(2)').append('<input id="NEW_USER_PS" class="tracom-textbox" name="NEW_USER_PS">');
  $('tr:nth-child(3) td:nth-child(4)').append('<input id="CHK_USER_PS" class="tracom-textbox" name="CHK_USER_PS">');
  $('tr:nth-child(3) td:nth-child(6)').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');
	
	// $('#fm_panel0').append('</table>');

	$('#USER_ID').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: true,
    maxlength: 10,
    readonly: false,
    value:'',
    // label: '사용자ID',
    // labelWidth: 130,
    // labelAlign: 'right',
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
  });

  $('#USER_NM').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: true,
    maxlength: 30,
    readonly: false,
    // value:'',
    // label: '사용자명',
    // labelWidth: 130,
    // labelAlign: 'right',
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
  });
  $('#AUTH_CD').combobox({
    width: 200,
    height: 24,
    editable: false,
    required: true,
    url: '/authority/selectAuthorityList',
    method: 'post',
    queryParams: JSON.stringify({dma_search : {TYPE : "ALL", CONTENT : ""}}),
    valueField: 'AUTH_CD',
    textField: 'AUTH_NM',
    prompt:'-선택-',
    // label: '권한그룹',
    // labelWidth: 70,
    // labelAlign: 'right',
    panelMinHeight: 120,
    panelMaxHeight: 230,
    loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
    },
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
  });

  $('#JOB_POSITION').combobox({
    width: 200,
    height: 24,
    editable: false,
    required: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({dma_search : {CO_CD : "JOB_POSITION"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
    prompt:'-선택-',
    // label: '직급',
    // labelWidth: 54,
    // labelAlign: 'right',
    panelMaxHeight: 230,
    loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
    },
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
	});
	$('#JOB_DUTY').combobox({
    width: 200,
    height: 24,
    editable: false,
    required: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({dma_search : {CO_CD : "JOB_DUTY"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
    prompt:'-선택-',
    // label: '직책',
    // labelWidth: 54,
    // labelAlign: 'right',
    panelMaxHeight: 230,
    loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
    },
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
  });

  $('#USE_YN_Y').radiobutton({
		value: 'Y',
		label: '사용',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#USE_YN_N').radiobutton({
		value: 'N',
		label: '미사용',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});
  
  $('#NEW_USER_PS').textbox({
    width: 200,
    height: 25,
    type:'password',
    required: false,
    maxlength: 100,
    readonly: false,
    value:'',
    // label: '비밀번호',
    // labelWidth: 130,
    // labelAlign: 'right',
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
	});

  $('#CHK_USER_PS').textbox({
    width: 200,
    height: 25,
    type:'password',
    required: false,
    maxlength: 100,
    readonly: false,
    value:'',
    // label: '비밀번호 확인',
    // labelWidth: 130,
    // labelAlign: 'right',
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
	});

  $('#REMARK').textbox({
    width: 400,
    height: 100,
    type:'text',
    required: false,
    maxlength: 200,
    readonly: false,
    multiline : true,
    value:'',
    // label: '비고',
    // labelWidth: 54,
    // labelAlign: 'right',
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
	});
});
