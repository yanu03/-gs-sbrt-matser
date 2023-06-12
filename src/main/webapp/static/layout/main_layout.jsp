<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
   <link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/material/easyui.css">
   <link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/icon.css">
   <link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/demo/demo.css">
   <script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.min.js"></script>
   <script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.easyui.min.js"></script>
</head>
<body>
      <!--layout-->
    <div class="easyui-layout" style="width:100%;height:100%;">
        <div data-options="region:'north'" style="height:100px" id="mainMenu">
        </div>
        <!--
        <div data-options="region:'north'" style="height:100px" id="mainMenu">
            메인&nbsp;
            <a href='javascript:jf_addtab("_sample1", "샘플1");'>샘플1(single crud grid)</a>&nbsp;
            <a href='javascript:jf_addtab("_sample2", "샘플2");'>샘플2</a>&nbsp;
            <a href='javascript:jf_addtab("_sample3", "샘플3");'>샘플3</a>&nbsp;
            <a href='javascript:jf_addtab("_sample4", "샘플4");'>샘플4</a>&nbsp;
            <a href='javascript:jf_addtab("_sample5", "샘플5");'>샘플5</a>
            <a href='javascript:jf_addtab("SI0401M01", "노선기초정보관리");'>노선기초정보관리</a>
            <a href='javascript:jf_addtab("SI0501M01", "정류소정보관리");'>정류소정보관리</a>
            <a href='javascript:jf_addtab("SI0503M01", "교차로정보관리");'>교차로정보관리</a>
            <a href='javascript:jf_addtab("SI0402M01", "노선경로정보관리");'>노선경로정보관리</a>
            <a href='javascript:jf_addtab("SI0102M01", "운수사 정보 관리");'>운수사 정보 관리</a>&nbsp;
            <a href='javascript:jf_addtab("AL0202M01", "운행계획관리");'>운행계획관리</a>&nbsp;
            <a href='javascript:jf_addtab("AL0203M01", "운행계획 세부 관리");'>운행계획 세부 관리</a>&nbsp;
            <a href='javascript:jf_addtab("AL0204M01", "운행계획 일별 관리");'>운행계획 일별 관리</a>&nbsp;
            <a href='javascript:jf_addtab("AL0302M01", "차량배차 관리");'>차량배차 관리</a>&nbsp;
            <a href='javascript:jf_addtab("AL0305M01", "차량배차 일별관리");'>차량배차 일별관리</a>&nbsp;
            <a href='javascript:jf_addtab("MO0101M01", "버스 위치정보 모니터링");'>버스 위치정보 모니터링</a>&nbsp;
            <a href='javascript:jf_addtab("MO0203M01", "정류소 모니터링");'>정류소 모니터링</a>&nbsp;
            <a href='javascript:jf_addtab("MO0204M01", "차내장치 모니터링");'>차내장치 모니터링</a>&nbsp;
            <a href='javascript:jf_addtab("SM0100M01", "코드 관리");'>코드 관리</a>&nbsp;
            <a href='javascript:jf_addtab("SM0403M01", "로그인 이력 조회");'>로그인 이력 조회</a>&nbsp;
            <a href='javascript:jf_addtab("SI0200M01", "차량 관리");'>차량 관리</a>&nbsp;
            <a href='javascript:jf_addtab("VD0100M01", "차내장치 정보 관리");'>차내장치 정보 관리</a>&nbsp;
      
            </div>      
        -->
      <div data-options="region:'south',split:false" style="height:30px;">
      <!--footer -->
      copy left tracom.co.ltd.,   
      </div>
      <div data-options="region:'center'">
         <!--content -->
         <!---->
            <div id="tab-main" class="easyui-tabs" data-options="plain:false,fit:true,tabHeight:30">
               <div title="START" style="padding:10px">
                  <!-- <object data="_start.html" type="text/html"></object> -->
               </div>
            </div>
      </div>
   </div>
   <script type="text/javascript">
    $( document ).ready(function() {
    	createMenuBar($.jf_getmenulist(), '#mainMenu');
    });

    createMenuBar = function(menuList, container){
    $.map(menuList, function(btn){
        var b = $('<a href="javascript:void(0)"></a>').appendTo(container);
        if (btn.items){
            b.menubutton($.extend({}, btn, {
                menu: createMenu(btn.items)
            }));           
        } else {
            b.linkbutton($.extend({}, btn, {
                plain: true,
            }));
            
            if(btn.PROG_PH!=null){
               b.linkbutton({
                   onClick:function(){
                	   if(typeof item.PROG_CD != "undefined"){
                   	   	jf_addtab(item.PROG_CD, "/static/ui"+item.PROG_PH.split('.')+'jsp', item.text);
                   	   }
                      //location.href = btn.PROG_PH;
                      //debugger;
                      //com.createProgram(item.MENU_CD, item.PROG_CD, item.PROG_PH, item.text);
                   }
               });
            }
        }
    });
    function createMenu(items){
        var m = $('<div></div>').appendTo('body').menu();
        _create(items);
        return m;

        function _create(items, p){
            $.map(items, function(item){
                m.menu('appendItem', $.extend({}, item, {
                    parent: (p?p.target:null)
                }));
                
                if(item.PROG_PH!=null){
                   m.menu({
                       onClick:function(item){
                    	   if(typeof item.PROG_CD != "undefined"){
                    		   jf_addtab(item.PROG_CD, "/static/"+item.PROG_PH.split('.')+'.jsp', item.text);
                    	   }
                          //content.createProgram(item.MENU_CD, item.PROG_CD, item.PROG_PH, item.text);
                       }
                   });
                }
                if (item.items){
                    var p1 = m.menu('findItem', item.text);
                    _create(item.items, p1);
                }
            });
        }
    }
}
   </script>
</body>
</html>