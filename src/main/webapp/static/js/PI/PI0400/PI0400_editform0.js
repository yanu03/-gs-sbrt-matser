/**
 * 프로그램명 : 기상관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.26
 */
$(function(){
	$('#ef0').form({
        onSubmit: function(param){},
        success:function(data){},
        onProgress: function(percent){},
        onBeforeLoad: function(param){},
        onLoadSuccess: function(data){},
        onLoadError: function(){},
        onChange: function(target){}
	});
	
	$('#fm_panel0').append('<table>');
	//design
    $('#fm_panel0').append('<input id="NOTI_DTM" class="tracom-textbox" name="NOTI_DTM">&nbsp;');
    $('#fm_panel0').append('<input id="SKY_COND" class="tracom-textbox" name="SKY_COND">');
    $('#fm_panel0').append('<input id="SKY_COND_NM" class="tracom-textbox" name="SKY_COND_NM"><p>');
    $('#fm_panel0').append('<input id="TEMPC" class="tracom-textbox" name="TEMPC">&nbsp;');
    $('#fm_panel0').append('<input id="DUSTC" class="tracom-textbox" name="DUSTC"><p>');
    $('#fm_panel0').append('<input id="TEMP_HIGH" class="tracom-textbox" name="TEMP_HIGH">&nbsp;');
    $('#fm_panel0').append('<input id="SDUSTC" class="tracom-textbox" name="SDUSTC"><p>');
    $('#fm_panel0').append('<input id="TEMP_MINI" class="tracom-textbox" name="TEMP_MINI">&nbsp;');
    $('#fm_panel0').append('<input id="SDC" class="tracom-textbox" name="SDC"><p>');
    $('#fm_panel0').append('<input id="HUMI" class="tracom-textbox" name="HUMI">&nbsp;');
    $('#fm_panel0').append('<input id="CMC" class="tracom-textbox" name="CMC"><p>');
    $('#fm_panel0').append('<input id="RAIN_PRO" class="tracom-textbox" name="RAIN_PRO">&nbsp;');
    $('#fm_panel0').append('<input id="OZONEC" class="tracom-textbox" name="OZONEC"><p>');
    $('#fm_panel0').append('<input id="RAINFALL" class="tracom-textbox" name="RAINFALL">&nbsp;');
    $('#fm_panel0').append('<input id="NDC" class="tracom-textbox"name="NDC">');
	
	$('#fm_panel0').append('</table>');
    
    
	$('#NOTI_DTM').textbox({
    width: 280,
    height: 25,
    type:'text',	//or password
    required: false,
    maxlength: 10,
    readonly: true,
    value:'',
    label:'발표일시',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
	});
  $('#SKY_COND').textbox({
    width: 0,
    height: 0,
    type:'hidden',
    onChange: function(newValue,oldValue){
      if(!jv_rowclick) return false;
    }
  });
	$('#SKY_COND_NM').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'하늘상태',
    labelWidth:160,
    onChange: function(newValue,oldValue){
      $.uf_changeimg(newValue);
      if(!jv_rowclick) return false;
    }
  });
  $('#TEMPC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'온도(℃)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    },
});

  $('#DUSTC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 17,
    readonly: true,
    value:'',
    label:'초미세먼지농도(㎍/㎥)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#TEMP_HIGH').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'최고기온(℃)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#SDUSTC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'미세먼지농도(㎍/㎥)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#TEMP_MINI').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'최저기온(℃)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#SDC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'아황산가스농도(ppm)	',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#HUMI').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'습도(%)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#CMC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'일산화탄소농도(ppm)	',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#RAIN_PRO').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'강수확률(%)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#OZONEC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'오존농도(ppm)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#RAINFALL').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'강수량(mm)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
  $('#NDC').textbox({
    width: 280,
    height: 25,
    type:'text',
    required: false,
    maxlength: 30,
    readonly: true,
    value:'',
    label:'이산화질소농도(ppm)',
    labelWidth:160,
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
  });
});