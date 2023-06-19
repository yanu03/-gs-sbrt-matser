/*
프로그램명 : 차내장치 정보 관리 datagrid
작성자 : 박원용
작성일 : 2023.04.13
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg0').datagrid({
    //url:'js/AL0102/JSON file/AL0102_sample0.json',	//json 조회 url
    url:'/vhc/selectVhcList',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    //method: 'GET', // json 데이터 가져올때는 GET
    queryParams: JSON.stringify({dma_search : {TYPE:"ALL",CONTENT : ""}}),	//json 조회 params
    //queryParams: {},
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
      {field:'VHC_ID',title:'차량 ID',width:120,align:'center',halign:'center',sortable:true},
      {field:'VHC_NO',title:'차량번호',width:120,align:'center',halign:'center',sortable:true}
    ]],
    frozenColumns:[[   
		]],
	//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(data){
      return data;
    },
    onLoadSuccess: function(data){
      $.jf_setfocus($('#dg0'), -1);
      $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
      return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(a_index,row){
      let a_rtn = false;
			if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f')){
        if($.jf_changeddg($('#dg1'), null)){
          $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'focussave');
          // 페이지 사용자 변수
          uv_vhcidx = a_index;
          //console.log(uv_vhcidx);
          a_rtn = false;
        }else{
          a_rtn = true;
        }
			}		
			return a_rtn;
    },
    onSelect: function(a_index,a_row){
      $.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), a_row));
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit: function(index,row){},
    onBeforeSortColumn: function(sort, order){
      if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return true;
      return false;
  },
	});

});