/**
 * 프로그램명 : 운전자 관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.19
 * 
 * 수정자 : 박원용
 * 수정일 : 2023.07.13
 */
$(function(){
	
	$('#ef0').form({
        onSubmit: function(param){
        },
        success:function(data){
        },
        onProgress: function(percent){
        },
        onBeforeLoad: function(param){
        },
        onLoadSuccess: function(data){
        },
        onLoadError: function(){
        },
        onChange: function(target){
            if(!jv_rowclick) return false;
            //if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
                let a_vals;
                let a_arrfield;
                let a_arrvalue
                switch(target.id){
                    case "EPLY_YN":	//listbox sample
                        a_arrfield =  new Array("EPLY_YN", "EPLY_YN_NM");
                        a_arrvalue =  new Array($('#EPLY_YN').textbox('getValue'), $('#EPLY_YN').textbox('getText'));
                        a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                        break;
                    case "BUS_DIV":	//listbox sample
                        a_arrfield =  new Array("BUS_DIV", "BUS_DIV_NM");
                        a_arrvalue =  new Array($('#BUS_DIV').textbox('getValue'), $('#BUS_DIV').textbox('getText'));
                        a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                        break;
                    case "ATTACH_ID":
                        a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
                        break;
                    case "file_1":

                        break;
                    default:
                        // console.log(target.id)
                            if(!$(target).textbox('isValid')){$(target).textbox('clear'); break;}
                            a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
                        break;
                }
            $.jf_synctogrid($('#dg0'), a_vals);
            return true;
        }
	});
	
    let htmlString = '<table>';
    //design
    htmlString += '<tr>';
    htmlString += '<th><label>운전자ID </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>운전자명 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>운수사명 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>버스구분 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>입사일 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>자격취득일 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>재직여부 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>퇴직일 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>운전자 사진 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>비고 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 a
    htmlString += '</tr>';

    htmlString += '</table>';

    $('#fm_panel0').html(htmlString);
    

	// $('#fm_panel0').append('<table>');
	//design
    $('tr:nth-child(1) td:nth-child(2)').append('<input id="DRV_ID" class="tracom-textbox" name="DRV_ID">');
    $('tr:nth-child(1) td:nth-child(4)').append('<input id="DRV_NM" class="tracom-textbox" name="DRV_NM">');
	$('tr:nth-child(1) td:nth-child(6)').append('<input id="COMP_NM" class="tracom-textbox" name="COMP_NM">');
    $('tr:nth-child(1) td:nth-child(6)').append('<a id="sch_comp_btn" href="#"></a>');
    $('tr:nth-child(1) td:nth-child(6)').append('<input id="COMP_ID" class="tracom-textbox" name="COMP_ID">');

    $('tr:nth-child(2) td:nth-child(2)').append('<input id="BUS_DIV" class="tracom-textbox" name="BUS_DIV">');
    $('tr:nth-child(2) td:nth-child(4)').append('<input id="EPLY_DATE1" class="tracom-textbox" name="EPLY_DATE1">');
    $('tr:nth-child(2) td:nth-child(6)').append('<input id="CERTI_DT" class="tracom-textbox" name="CERTI_DT">');

    $('tr:nth-child(3) td:nth-child(2)').append('<input id="EPLY_YN" class="tracom-combobox" name="EPLY_YN">');
    $('tr:nth-child(3) td:nth-child(4)').append('<input id="RETIRE_DT" class="tracom-textbox" name="RETIRE_DT">');
    $('tr:nth-child(4) td:nth-child(2)').append('<input id="ATTACH_ID" type="hidden" name="ATTACH_ID">');
	var str = '<form id="filefrm" name="filefrm" method="post" enctype="multipart/form-data">'
			+ '<input id="path" type="hidden" name="path" >'
			+ '<input id="attach_id" type="hidden" name="attach_id" >'
			+ '<input id="file_1" type="file" name="file_1" onchange="$.uf_preview(this);" >'
			+ '<a id="filebtn" href="#"></a>'
			+ '</form>'
    $('tr:nth-child(4) td:nth-child(2)').append(str);
    // 나중에 사진 파일 받아올 수 있을때 분리해둔 공간에 img 넣어주기 
    // id는 추후 작업할 때 넣기
    $('tr:nth-child(4) td:nth-child(2)').append('<img id="picture" style="margin:0 0 0 0;border:0.1px solid black;width:300px;height:200px;float:left;"/>');
    $('tr:nth-child(4) td:nth-child(4)').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');
	
	// $('#fm_panel0').append('</table>');
    
	$('#DRV_ID').textbox({
        width: 200,
        height: 25,
        type:'text',	//or password
        required: true,
        maxlength: 10,
        //validType:'length[0,10]',
        readonly: true,
        value:'',
        // label:'운전자 ID',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
	$('#DRV_NM').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        //validType:'length[0,30]',
        readonly: false,
        value:'',
        // label:'운전자명',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
    $('#COMP_ID').textbox({
        width: 0,
        height: 0,
        type:"hidden",
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#COMP_NM').textbox({
        width: 250,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        readonly: true,
        value:'',
        // label:'운수사명',
        // labelWidth: 70,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#sch_comp_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
    $('#sch_comp_btn').bind('click', function(){
        let v_values = {VHC_ID:"",COMP_ID:$('#COMP_NM').textbox('getValue'), COMP_NM:$('#COMP_NM').textbox('getValue'), AREA:""};
        $.mf_selcompmdopen($('#dg0'),$('#ef0'), v_values, $('#BUS_DIV'),'f');
    });

    $('#BUS_DIV').combobox({
        width: 200,
		height: 24,
		editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "BUS_DIV"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
		value: '',				//dg0과 일치 시키면 편하다
        // label:'운행버스구분',
        // labelWidth: 100,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 130,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
		onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#AREA').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
            //$.uf_sckbusdiv(newValue);
		}
    });

    $('#EPLY_DATE1').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        // label: '입사일',
        // labelWidth: 65,
        // labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    
    $('#CERTI_DT').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        // label: '자격취득일',
        // labelWidth: 80,
        // labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#EPLY_YN').combobox({
        width: 180,
		height: 24,
		editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "EPLY_YN"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
		value: '',				//dg0과 일치 시키면 편하다
        // label:'재직여부',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 130,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
		onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#EPLY_YN').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
            $.uf_chkeply();
            if(!jv_rowclick) return false;
            $.uf_chkretiredate();
		}
    });

    $('#RETIRE_DT').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value: '',
        // label: '퇴직일',
        // labelWidth: 65,
        // labelAlign: 'left',
        onChange: function(a_newValue,oldValue){
            if(!jv_rowclick) return false;   
            return $.uf_chkretiredt(a_newValue);
            
        }
    });

    /*$('#file').textbox({
        required: false,
        maxlength: 10,
        readonly: false,
        value:'',
        label:'파일선택',
        labelWidth: 100,
		labelPosition: 'before',
		labelAlign: 'left',
    });*/
    $('#ATTACH_ID').textbox({
        required: false,
        maxlength: 10,
        readonly: false,		
        onChange: function(newValue,oldValue){
            // debugger;
            var imgUrl = "";
            if(newValue==""||newValue==null){
                imgUrl = "/static/img/common/noimg.jpg";
            }
            else{
                var attachSn = 0; 
                imgUrl = "/cmm/fms/getImage.do?atchFileId="+newValue+"&fileSn="+attachSn;
            }
            $("#picture").attr("src", imgUrl);
            if(!jv_rowclick) return false;
            $.uf_chkphoto(newValue);
            $.uf_filesave();
        }
    });
	
    $('#filebtn').linkbutton({
        height: 24,
        iconCls: 'icon-save'
    });
		
    $('#filebtn').bind('click', function(){
    event.preventDefault();
    var form = $("#filefrm")[0];
    $('#path').val("SI0300"); //저장시 파일 경로
    $('#attach_id').val($('#ATTACH_ID').textbox('getValue'));
    
    var formData = new FormData(form); 			
    
        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            url: '/cm/fileUploadAction',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {

                        $('#ATTACH_ID').textbox('setValue',data.rows[0].atchFileId);
                
                
                $('#filebtn').prop('disabled', false);
            },
            error: function (e) {
                //$('#result').text(e.responseText);
                console.log('ERROR : ', e);
                $('#filebtn').prop('disabled', false);
            }
        });
    });
	$('#REMARK').textbox({
        width: 350,
        height: 120,
        type:'text',
        required: false,
        maxlength: 200,
        //validType:'length[0,200]',
        readonly: false,
        value:'',
        // label:'비고',
        // labelWidth:35,
        // labelPosition:'before',
        // labelAlign:'left',
        multiline : true,
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
        });
});
