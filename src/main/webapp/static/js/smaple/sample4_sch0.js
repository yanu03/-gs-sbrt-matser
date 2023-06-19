$(function(){
	$('#sch_panel0').append('<input id="sch_tb0" type="text">');

    $('#sch_tb0').textbox({
        buttonText:'검색',
        iconCls:'',
        maxlength: 20,
        iconAlign:'left',
        onChange: function(newValue,oldValue){
            //alert(newValue+':'+oldValue);
        },
        onClickButton: function(){
            //alert('click');
        }
    });
});