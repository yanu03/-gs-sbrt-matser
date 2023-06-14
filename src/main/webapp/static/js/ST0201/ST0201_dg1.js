/*
프로그램명 : 운행 평균속도 통계

작성자 : 박원용
작성일 : 2023.05.17
*/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" style="width:100%;height:100%"></table>');

    let v_fdate = $.tracomfromdate('d');
    let v_tdate = $.tracombasicdate();

    $('#dg1').pivotgrid({
        url:'http://localhost:8183/st/ST0201G2R0',
        method:'POST',
        queryParams: JSON.stringify({dma_search:{ROUT_ID : '', ST_LINK_SN : '', ED_LINK_SN : '', F_DATE : '', L_DATE: ''}}),
        pivot:{
            rows:['OPER_DT','LINK_NM'],
            columns:['STAT_H']
        },
        valueFieldWidth: 200,
        loadMsg: '데이터 로딩중입니다',
        emptyMsg: '데이터가 없습니다',
        loader: function(param, success, error){
            let v_chkdata = $('#dg1').pivotgrid('getData');
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
            else $('#dg1').pivotgrid('loaded');
        },
        loadFilter: function(a_data){
            uv_dg1data = a_data;
            return a_data;
        },
        headerStyler: function(title, col){
        },
        valueStyler: function(value,row,index){
        },
        onBeforeLoad: function(a_row, a_param){
        },
        onLoadSuccess: function(a_row, a_data){
            uv_chkdata0 == true;

            $.uf_removecion($('#dg1'));
            return true;
        },
        
    });

});