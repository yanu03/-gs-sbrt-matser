$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'datagrid_data4_test.json',	//json 조회 url
    method: 'get',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'CP_NM',title:'운수사명',width:200,align:'left',halign:'center',editor:{type:'textbox',options:{required:true,validType:['length[0,10]']}}},
        {field:'AREA',title:'권역',width:200,align:'left',halign:'center',editor:{type:'textbox',options:{required:true,validType:['length[0,10]']}}},
        {field:'AGENT_NM',title:'대표자명',width:60,halign:'center',editor:{type:'textbox', options:{}}},
        {field:'CRN',title:'사업자등록번호',width:200,align:'center',halign:'center',editor:{type:'checkbox', options:{on:'Y', off:'N'}}},	//라디오 넣어봐
        {field:'ADD',title:'주소',width:400,align:'center',halign:'center',editor:{type:'textbox', options:{precision:2,min:0,max:100}}},	//type에 라디오 지원 안함
        {field:'REMARK',title:'비고',width:400,align:'center',halign:'center',editor:{type:'textbox', options:{precision:2,min:0,max:100}}}
    	]],
	frozenColumns:[[
        {field:'CP_ID',title:'운수사 ID',width:100,halign:'center'}
		]],
		//event 정의
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){
        // if($.jf_validatedata($('#dg0'), $.jf_fnddgstrct($('#dg0')), 'g')){
        // 	$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
        // 	$.jf_beginedit($('#dg0'), index);
        // }
    },
    onBeforeSelect: function(index,row){
        // let a_rtn = false;
		// 	if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
        //         // && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') && $.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g') 
        //         // child grid가 있을때 수에 맞추어서 널어줄것 
		// 		// $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
		// 		// $.jf_endedit($('#dg2'), $.jf_fnddgstrct($('#dg2')));
				
		// 		if($.jf_changeddg($('#dg1'), null) || $.jf_changeddg($('#dg2'), null)){
		// 				$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'focussave');
		// 				a_rtn = false;
		// 		}else{
		// 			a_rtn = true;
		// 		}				
		// 	}	
        // return a_rtn;
        //grid edit : g, form edit : f
        //return $.jf_validatedata($('#ef0'), $.jf_fnddgstrct($('#ef0')), 'f');	//onBeforeSelect --> onDblClickRow 또는 onSelect 중 1개가 동작함. 동시 동작 하지 않음.
        return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f');
    },
    onSelect: function(index,row){
        //$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));	//grid edit일때 사용
        $.jf_synctoform($('#dg0'),$('#ef0'), index, row);	//form edit일떄 사용
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){}
	});

});