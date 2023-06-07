$(function(){
	//from date to date
	$('#sch_panel0').append('<input id="sch_month" type="text">');
	
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth()+1).toString();
    let todate = year +"-"+ month;

    //formatter와 paser가 day를 붙여준다

    $.format = function(date){
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        return y+'-'+(m<10?('0'+m):m);
    };

    $.paser = function(s){
        if (!s) return new Date();
        var ss = (s.split('-'));
        var y = parseInt(ss[0],10);
        var m = parseInt(ss[1],10);
        if (!isNaN(y) && !isNaN(m)){
            return new Date(y,m-1);
        } else {
            return new Date();
        }
    };

	$('#sch_month').datebox({
        width: 200,
        height: 24,
        currentText: '',
        required: false ,
        editable: false ,
        value: todate,
        formatter: $.format,
        parser: $.paser,
        onSelect: function(date){
        },
        onChange: function(newValue, oldValue){
            let todate = $('#sch_month').datebox('getValue');
            if(todate.length < 1) return false;
           
            return true;
        }
	});
	

});