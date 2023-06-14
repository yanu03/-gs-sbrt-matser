/**
 * 프로그램명 : 운수사 정보 관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.11
 */
$(function () {
  $('#ef0').form({
    onSubmit: function (param) {},
    success: function (data) {},
    onProgress: function (percent) {},
    onBeforeLoad: function (param) {},
    onLoadSuccess: function (data) {},
    onLoadError: function () {},
    onChange: function (target) {
      if (!jv_rowclick) return false;
      //if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
      let a_vals;
      switch (target.id) {
        case 'status_p': //radio sample
        case 'status_q':
          if ($(target).radiobutton('options').checked) {
            a_vals = $.jf_singledatatojson(
              'status',
              $(target).radiobutton('options').value
            );
          }
          break;
        case 'AREA': //listbox sample
          let a_arrfield = new Array('AREA', 'AREA_NM');
          let a_arrvalue = new Array(
            $('#AREA').textbox('getValue'),
            $('#AREA').textbox('getText')
          );
          a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue); //arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
          break;
        default:
          if (!$(target).textbox('isValid')) {
            $(target).textbox('clear');
            break;
          }
          a_vals = $.jf_singledatatojson(
            target.id,
            $(target).textbox('getValue')
          );
          break;
      }
      $.jf_synctogrid($('#dg0'), a_vals);
      return true;
    },
  });

  $('#fm_panel0').append('<table>');
  //design
  $('#fm_panel0').append(
    '<input id="COMP_ID" class="tracom-textbox" name="COMP_ID"><p>'
  );
  $('#fm_panel0').append(
    '<input id="AREA" class="tracom-combobox" name="AREA">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="COMP_NM" class="tracom-textbox" name="COMP_NM">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="REP_NM" class="tracom-textbox" class="tracom-textbox" name="REP_NM"><p>'
  );
  $('#fm_panel0').append(
    '<input id="ADDR" class="tracom-textbox" name="ADDR">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append('<a id="sch_area_btn" href="#"></a><p>');

  $('#fm_panel0').append('<input id="GPS_X" name="GPS_X"');
  $('#fm_panel0').append('<input id="GPS_Y" name="GPS_Y">');
  $('#fm_panel0').append('<input id="TM_X" name="TM_X">');
  $('#fm_panel0').append('<input id="TM_Y" name="TM_Y">');

  $('#fm_panel0').append(
    '<input id="FAX" class="tracom-textbox" name="FAX">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="EMAIL" class="tracom-textbox" name="EMAIL"><p>'
  );
  $('#fm_panel0').append(
    '<input id="DRV_CNT" class="tracom-numberbox" name="DRV_CNT">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="SCV_VHC_CNT" class="tracom-numberbox" name="SCV_VHC_CNT">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="COMP_REG_NO" class="tracom-textbox" name="COMP_REG_NO"><p>'
  );
  $('#fm_panel0').append(
    '<input id="SPR_VHC_CNT" class="tracom-numberbox" name="SPR_VHC_CNT">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="PHONE" class="tracom-textbox" name="PHONE">&nbsp;&nbsp;'
  );
  $('#fm_panel0').append(
    '<input id="LIC_VHC_CNT" class="tracom-numberbox" name="LIC_VHC_CNT"><p>'
  );
  $('#fm_panel0').append(
    '<input id="REMARK" class="tracom-textbox" name="REMARK">'
  );

  $('#fm_panel0').append('</table>');

  $('#sch_area_btn').linkbutton({
    height: 24,
    iconCls: 'icon-search',
  });

  $('#COMP_ID').textbox({
    width: 200,
    height: 25,
    type: 'text', //or password
    required: true,
    maxlength: 10,
    //validType:'length[0,10]',
    readonly: true,
    value: '',
    label: '운수사 ID',
    labelWidth: 80,
    labelPosition: 'before',
    labelAlign: 'left',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#COMP_NM').textbox({
    width: 250,
    height: 25,
    type: 'text',
    required: true,
    maxlength: 30,
    //validType:'length[0,30]',
    readonly: false,
    value: '',
    label: '운수사 명',
    labelWidth: 80,
    labelPosition: 'before',
    labelAlign: 'left',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#AREA').combobox({
    width: 180,
    height: 24,
    editable: false,
    url: '/static/js/SI0102/JSON folder/SI0102_AREA_data.json',
    method: 'get',
    queryParams: {},
    valueField: 'id',
    textField: 'text',
    value: '', //dg0과 일치 시키면 편하다
    label: '권역',
    labelWidth: 40,
    labelPosition: 'before',
    labelAlign: 'left',
    panelMaxHeight: 400,
    onBeforeLoad: function (param) {
      $(this).combo('readonly', true);
    },
    onLoadSuccess: function () {
      $(this).combo('readonly', false);
    },
    onLoadError: function () {
      $('#AREA').combo('readonly', true);
      return false;
    },
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#GPS_X').textbox({
    width: 0,
    height: 0,
    type: 'hidden',
    value: '',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#GPS_Y').textbox({
    width: 0,
    height: 0,
    type: 'hidden',
    value: '',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#TM_X').textbox({
    width: 0,
    height: 0,
    type: 'hidden',
    value: '',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#TM_Y').textbox({
    width: 0,
    height: 0,
    type: 'hidden',
    value: '',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#sch_area_btn').bind('click', function () {
    // 도로명 검색 팝업 생성
    // 검색후 나온 결과를 클릭시 해당 주소를 ADDR textbox에 주소정보를 넣어줘야함 or
    // 검색후 나온 결과를 클릭하고 확인 버튼을 누르면 ADDR textbox에 주소정보를 넣어줘야함
    $.tracomalmsg('정보', '도로명 검색 팝업은 작업중...');
    //$('#selcomp').window('open');
  });

  $('#REP_NM').textbox({
    width: 200,
    height: 25,
    type: 'text',
    required: true,
    maxlength: 30,
    //validType:'length[0,30]',
    readonly: false,
    value: '',
    label: '대표자명',
    labelWidth: 80,
    labelPosition: 'before',
    labelAlign: 'left',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });

  $('#COMP_REG_NO').textbox({
    width: 260,
    height: 25,
    type: 'text',
    required: false,
    maxlength: 13,
    //validType:'length[0,12]',
    readonly: false,
    value: '',
    label: '사업자 등록 번호',
    labelWidth: 120,
    labelPosition: 'before',
    labelAlign: 'left',
    prompt: '000-000-00000',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#ADDR').textbox({
    width: 400,
    height: 25,
    type: 'text',
    required: false,
    maxlength: 100,
    //validType:'length[0,100]',
    readonly: false,
    value: '',
    label: '주소',
    labelWidth: 40,
    labelPosition: 'before',
    labelAlign: 'left',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#PHONE').textbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    maxlength: 13,
    //validType:'length[0,13]',
    readonly: false,
    value: '',
    label: '전화번호',
    prompt: '000-0000-0000',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#FAX').textbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    maxlength: 13,
    //validType:'length[0,13]',
    readonly: false,
    value: '',
    label: '팩스',
    prompt: '000-0000-0000',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#EMAIL').textbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    maxlength: 40,
    validType: 'email',
    readonly: false,
    value: '',
    label: '메일',
    prompt: '~~~@~~~.~~~',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#DRV_CNT').numberbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    readonly: false,
    value: '',
    min: 0,
    max: 5,
    label: '운전자수',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#SCV_VHC_CNT').numberbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    readonly: false,
    value: '',
    min: 0,
    max: 3,
    label: '운행노선수',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#LIC_VHC_CNT').numberbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    readonly: false,
    value: '',
    min: 0,
    max: 5,
    label: '면허차대수',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#SPR_VHC_CNT').numberbox({
    width: 200,
    height: 25,
    type: 'text',
    required: false,
    readonly: false,
    value: '',
    min: 0,
    max: 5,
    label: '얘바차대수',
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
  $('#REMARK').textbox({
    width: 500,
    height: 80,
    type: 'text',
    required: false,
    maxlength: 200,
    //validType:'length[0,200]',
    readonly: false,
    value: '',
    label: '비고',
    multiline: true,
    onChange: function (newValue, oldValue) {
      if (!jv_rowclick) return false;
    },
  });
});