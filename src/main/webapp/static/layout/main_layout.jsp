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
    		<!--  -->
        <div data-options="region:'north'" style="height:100px">
        	<div class="easyui-layout" data-options="fit:true" >
        		
        		<div data-options="region:'north'" style="height:50px">
        		</div>
        		
        		<div data-options="region:'center'" style="height:50px">
        			<div class="easyui-layout" data-options="fit:true" >
        			
        				<div data-options="region:'center'" style="height:100px" id="mainMenu">
	        			</div>
	        			
	        			<div data-options="region:'east', width:'400'" style="height:100px">
	        				<label id="label1">label</label>
	        				<a href="#">link</a>
	        			</div>
	        			
        			</div>
        		</div>
	        	
        	</div>
        </div>
        <!--
        <div data-options="region:'north'" style="height:100px" id="mainMenu">
            ë©ì¸&nbsp;
            <a href='javascript:jf_addtab("_sample1", "ìí1");'>ìí1(single crud grid)</a>&nbsp;
            <a href='javascript:jf_addtab("_sample2", "ìí2");'>ìí2</a>&nbsp;
            <a href='javascript:jf_addtab("_sample3", "ìí3");'>ìí3</a>&nbsp;
            <a href='javascript:jf_addtab("_sample4", "ìí4");'>ìí4</a>&nbsp;
            <a href='javascript:jf_addtab("_sample5", "ìí5");'>ìí5</a>
            <a href='javascript:jf_addtab("SI0401M01", "ë¸ì ê¸°ì´ì ë³´ê´ë¦¬");'>ë¸ì ê¸°ì´ì ë³´ê´ë¦¬</a>
            <a href='javascript:jf_addtab("SI0501M01", "ì ë¥ìì ë³´ê´ë¦¬");'>ì ë¥ìì ë³´ê´ë¦¬</a>
            <a href='javascript:jf_addtab("SI0503M01", "êµì°¨ë¡ì ë³´ê´ë¦¬");'>êµì°¨ë¡ì ë³´ê´ë¦¬</a>
            <a href='javascript:jf_addtab("SI0402M01", "ë¸ì ê²½ë¡ì ë³´ê´ë¦¬");'>ë¸ì ê²½ë¡ì ë³´ê´ë¦¬</a>
            <a href='javascript:jf_addtab("SI0102M01", "ì´ìì¬ ì ë³´ ê´ë¦¬");'>ì´ìì¬ ì ë³´ ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("AL0202M01", "ì´íê³íê´ë¦¬");'>ì´íê³íê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("AL0203M01", "ì´íê³í ì¸ë¶ ê´ë¦¬");'>ì´íê³í ì¸ë¶ ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("AL0204M01", "ì´íê³í ì¼ë³ ê´ë¦¬");'>ì´íê³í ì¼ë³ ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("AL0302M01", "ì°¨ëë°°ì°¨ ê´ë¦¬");'>ì°¨ëë°°ì°¨ ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("AL0305M01", "ì°¨ëë°°ì°¨ ì¼ë³ê´ë¦¬");'>ì°¨ëë°°ì°¨ ì¼ë³ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("MO0101M01", "ë²ì¤ ìì¹ì ë³´ ëª¨ëí°ë§");'>ë²ì¤ ìì¹ì ë³´ ëª¨ëí°ë§</a>&nbsp;
            <a href='javascript:jf_addtab("MO0203M01", "ì ë¥ì ëª¨ëí°ë§");'>ì ë¥ì ëª¨ëí°ë§</a>&nbsp;
            <a href='javascript:jf_addtab("MO0204M01", "ì°¨ë´ì¥ì¹ ëª¨ëí°ë§");'>ì°¨ë´ì¥ì¹ ëª¨ëí°ë§</a>&nbsp;
            <a href='javascript:jf_addtab("SM0100M01", "ì½ë ê´ë¦¬");'>ì½ë ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("SM0403M01", "ë¡ê·¸ì¸ ì´ë ¥ ì¡°í");'>ë¡ê·¸ì¸ ì´ë ¥ ì¡°í</a>&nbsp;
            <a href='javascript:jf_addtab("SI0200M01", "ì°¨ë ê´ë¦¬");'>ì°¨ë ê´ë¦¬</a>&nbsp;
            <a href='javascript:jf_addtab("VD0100M01", "ì°¨ë´ì¥ì¹ ì ë³´ ê´ë¦¬");'>ì°¨ë´ì¥ì¹ ì ë³´ ê´ë¦¬</a>&nbsp;
      
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
