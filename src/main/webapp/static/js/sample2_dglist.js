$(function(){
	//single main grid
	$('#dg_panellist').append('<table id="dglist" class="easyui-datagrid" style="width:100%;height:100%" data-options="singleSelect:true,border:true,collapsible:true"></table>');
	
	$('#dglist').datagrid({
    url:'datagrid_data1.json',
    method: 'get',
    idField: '',
    columns:[[
        {field:'itemid',title:'Item ID',width:100,halign:'center'},
        {field:'productid',title:'Product',width:100,halign:'center'},
        {field:'listprice',title:'List Price',width:100,align:'right',halign:'center'},
        {field:'unitcost',title:'Unit Cost',width:80,align:'right',halign:'center'},
        {field:'attr1',title:'Attribute',width:250,halign:'center'},
        {field:'status',title:'Status',width:60,align:'center',halign:'center'}
    				]],
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dglist'), -1);
		},
		onBeforeLoad: function(param){
			//return false;
		},
		onClickRow: function(index,row){
		
		},
		onDblClickRow: function(index,row){
			//edit 모드로 진입
		},
		onBeforeSelect: function(index,row){
			
		},
		onSelect: function(index,row){
			//selct first > click
			//alert(index);
			//다음 그리드를 조회 해야 되자나
			$.jf_childretrive($('#dg0'), $.pf_combineparams(row));
			//$.jf_synctoform($('#ff0'), row);
		},
		onBeforeEdit: function(index,row){
			//valitdate check!
		},
		onBeginEdit: function(index,row){
			
		},
		onEndEdit: function(index,row,changes){
			//valitdate check!
		},
		onAfterEdit: function(index,row,changes){
		
		},
		onCancelEdit:function(index,row){
		
		}
	});
	
});