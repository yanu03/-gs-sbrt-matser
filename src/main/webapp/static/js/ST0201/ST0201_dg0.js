/** 
�ۼ��� : ������
�ۼ��� : 2023-04-06
������ : ������
������ : 2023-04-06
**/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'/st/ST0201G0R0',	//json ��ȸ url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : ""}}),						//json ��ȸ params
    singleSelect: true, //signleSelect : ���� ���� true, üũ�ڽ� �����϶� false
    border: false,
    loadMsg: '������ �ε����Դϴ�',
    emptyMsg: '�����Ͱ� �����ϴ�',
    rownumbers: true,
    showFooter: true,
    columns:[[
        {field:'ROUT_GRP',title:'�뼱�׷�ID',width:150,halign:'center',align:'center'},
        {field:'ROUT_GRP_NM',title:'�뼱�׷��',width:100,halign:'center',align:'center'},
        {field:'ROUT_ID',title:'�뼱ID',width:150,halign:'center',align:'center'},
        {field:'ROUT_NM',title:'�뼱��',width:150,halign:'center',align:'left'},
			]],
		frozenColumns:[[
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
    loadFilter: function(a_data){
      return a_data;
    },
		//event ����
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg0'), -1);
			$.jf_setfooter($('#dg0'));
		},
		onBeforeLoad: function(param){
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
		},
		onSelect: function(index,a_row){
			//$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row), 'dma_param_ROUTEID');
      $.uf_sttnload(a_row.ROUT_ID);
      // $.uf_pivotload(a_row.ROUT_ID);
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});