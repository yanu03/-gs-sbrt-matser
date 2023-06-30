/*
프로그램명 : 운행 평균속도 통계

작성자 : 박원용
작성일 : 2023.05.17
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" style="width:100%;height:100%"></table>');

    let v_fdate = $.tracomfromdate('d');
    let v_tdate = $.tracombasicdate();

    $('#dg0').pivotgrid({
        url:'/st/ST0205G0R1',
        method:'POST',
        queryParams: JSON.stringify({dma_search : {F_DATE : v_fdate, L_DATE : v_tdate}}),
        pivot:{
            rows:['OPER_DT'],
            columns:['ROUT_GRP_NM'],
            values:[
                {field:'AVRG_SPD',op:'num'},
            ],
        },
        valueFieldWidth: 200,
        loadMsg: '데이터 로딩중입니다',
        emptyMsg: '데이터가 없습니다',
        loader: function(param, success, error){
            let v_chkdata = $('#dg0').pivotgrid('getData');
            // 무한 로드 방지 
            if(typeof(v_chkdata) == 'undefined') $.tracompvdgloader($(this), param, success, error);
            // 데이터가 없을 시 검색 예외 처리 및 무한 로드 방지
            else if(v_chkdata.length == 0 && uv_chkdata0 == false && typeof(v_chkdata[0]) == 'undefined'){
                $.tracompvdgloader($(this), param, success, error);
                uv_chkdata0 = true;
            }
            // 데이터가 있을 시 검색 예외 처리 
            else if(typeof(v_chkdata[0]) != 'undefined' && uv_chkdata0 == false) {
                $.tracompvdgloader($(this), param, success, error);
                uv_chkdata0 = true;
            }
            else $('#dg0').pivotgrid('loaded');
        },
        loadFilter: function(a_data){
            uv_dg0data = a_data;
            return a_data;
        },
        headerStyler: function(title, col){
            if(col.field == '_tree_field') col.title = '운행일';
            else if(col._field == 'ROUT_GRP_NM'); //console.log(col);
            else if(col.title == 'AVRG_SPD') col.title = '평균속도';
        },
        valueStyler: function(value,row,index){
            // console.log(row);
        },
        onBeforeLoad: function(a_row, a_param){
        },
        onLoadSuccess: function(a_row, a_data){
            let v_value;
            uv_chkdata0 == true;
            if(a_data.total != 0) v_value = 'RG001';
            $.pf_childretrieve($('#dg1'),v_value);
            $.cf_chart0ajax();
            $.cf_chart1ajax('RG001');
            $.uf_removecion($('#dg0'));
            return true;
        },
        
    });

});