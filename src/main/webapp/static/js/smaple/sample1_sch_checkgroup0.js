$(function(){

	$('#sch_panel0').append('<div id="sch_cg0" class="" style="display: inline-block;"></div>');	//추후 class로 변경

    $('#sch_cg0').checkgroup({
        name:"checkGroup",
        data: [{
        	value:'10',
        	width: 15,
        	height: 15,
        	checked: false,
        	disabled: false,
        	label:'10'
    			},{
        	value:'20',
        	width: 15,
        	height: 15,
        	checked: false,
        	disabled: false,
        	label:'20'
    			}],
        labelWidth: 50,
        labelPosition: 'after',
        labelAlign: 'left',
        onChange: function(values){
	    	//자동 조회시 여기서 코딩
	    	//$.jf_retrieve($('#dg0'), $.pf_combineparams($('#dg0')));
	    	//alert(values);
	    }
     });

});