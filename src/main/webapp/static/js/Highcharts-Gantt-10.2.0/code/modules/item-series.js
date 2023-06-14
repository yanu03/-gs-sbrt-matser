/*
 Highcharts JS v10.2.0 (2022-07-05)

 Item series type for Highcharts

 (c) 2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/item-series",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,g,f,c){a.hasOwnProperty(g)||(a[g]=c.apply(null,f),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:g,module:a[g]}})))}a=a?a._modules:{};
c(a,"Series/Item/ItemPoint.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,g){var f=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),c=a.series;g=g.extend;a=function(a){function b(){var b=
null!==a&&a.apply(this,arguments)||this;b.graphics=void 0;b.options=void 0;b.series=void 0;return b}f(b,a);return b}(a.seriesTypes.pie.prototype.pointClass);g(a.prototype,{haloPath:c.prototype.pointClass.prototype.haloPath});return a});c(a,"Series/Item/ItemSeries.js",[a["Core/Globals.js"],a["Series/Item/ItemPoint.js"],a["Core/DefaultOptions.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c,f,x,b){var g=this&&this.__extends||function(){var a=function(b,e){a=Object.setPrototypeOf||
{__proto__:[]}instanceof Array&&function(a,e){a.__proto__=e}||function(a,e){for(var b in e)e.hasOwnProperty(b)&&(a[b]=e[b])};return a(b,e)};return function(b,e){function c(){this.constructor=b}a(b,e);b.prototype=null===e?Object.create(e):(c.prototype=e.prototype,new c)}}(),d=f.defaultOptions,y=x.seriesTypes.pie,I=b.defined,z=b.extend,J=b.fireEvent,A=b.isNumber,B=b.merge,K=b.objectEach,L=b.pick;f=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;
a.points=void 0;return a}g(c,b);c.prototype.animate=function(a){a?this.group.attr({opacity:0}):this.group.animate({opacity:1},this.options.animation)};c.prototype.drawDataLabels=function(){this.center&&this.slots?a.seriesTypes.pie.prototype.drawDataLabels.call(this):this.points.forEach(function(a){a.destroyElements({dataLabel:1})})};c.prototype.drawPoints=function(){var a=this,b=this.options,c=a.chart.renderer,d=b.marker,g=this.borderWidth%2?.5:1,f=0,r=this.getRows(),w=Math.ceil(this.total/r),t=this.chart.plotWidth/
w,u=this.chart.plotHeight/r,v=this.itemSize||Math.min(t,u);this.points.forEach(function(e){var n,G,l=e.marker||{},p=l.symbol||d.symbol;l=L(l.radius,d.radius);var F=I(l)?2*l:v,q=F*b.itemPadding,H;e.graphics=n=e.graphics||{};a.chart.styledMode||(G=a.pointAttribs(e,e.selected&&"select"));if(!e.isNull&&e.visible){e.graphic||(e.graphic=c.g("point").add(a.group));for(var h=0;h<e.y;h++){if(a.center&&a.slots){var m=a.slots.shift();var k=m.x-v/2;m=m.y-v/2}else"horizontal"===b.layout?(k=f%w*t,m=u*Math.floor(f/
w)):(k=t*Math.floor(f/r),m=f%r*u);k+=q;m+=q;var M=H=Math.round(F-2*q);a.options.crisp&&(k=Math.round(k)-g,m=Math.round(m)+g);k={x:k,y:m,width:H,height:M};"undefined"!==typeof l&&(k.r=l);n[h]?n[h].animate(k):n[h]=c.symbol(p,null,null,null,null,{backgroundSize:"within"}).attr(z(k,G)).add(e.graphic);n[h].isActive=!0;f++}}K(n,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete n[b])})})};c.prototype.getRows=function(){var a=this.options.rows;if(!a){var b=this.chart.plotWidth/this.chart.plotHeight;
a=Math.sqrt(this.total);if(1<b)for(a=Math.ceil(a);0<a;){var c=this.total/a;if(c/a>b)break;a--}else for(a=Math.floor(a);a<this.total;){c=this.total/a;if(c/a<b)break;a++}}return a};c.prototype.getSlots=function(){function a(a){0<D&&(a.row.colCount--,D--)}for(var b=this.center,c=b[2],d=b[3],f,g=this.slots,r,w,t,u,v,x,n,C,l=0,p,E=this.endAngleRad-this.startAngleRad,q=Number.MAX_VALUE,y,h,m,k=this.options.rows,z=(c-d)/c,A=0===E%(2*Math.PI),B=this.total||0;q>B+(h&&A?h.length:0);)for(y=q,q=g.length=0,h=
m,m=[],l++,p=c/l/2,k?(d=(p-k)/p*c,0<=d?p=k:(d=0,z=1)):p=Math.floor(p*z),f=p;0<f;f--)t=(d+f/p*(c-d-l))/2,u=E*t,v=Math.ceil(u/l),m.push({rowRadius:t,rowLength:u,colCount:v}),q+=v+1;if(h){for(var D=y-this.total-(A?h.length:0);0<D;)h.map(function(a){return{angle:a.colCount/a.rowLength,row:a}}).sort(function(a,b){return b.angle-a.angle}).slice(0,Math.min(D,Math.ceil(h.length/2))).forEach(a);h.forEach(function(a){var c=a.rowRadius;x=(a=a.colCount)?E/a:0;for(C=0;C<=a;C+=1)n=this.startAngleRad+C*x,r=b[0]+
Math.cos(n)*c,w=b[1]+Math.sin(n)*c,g.push({x:r,y:w,angle:n})},this);g.sort(function(a,b){return a.angle-b.angle});this.itemSize=l;return g}};c.prototype.translate=function(b){0===this.total&&(this.center=this.getCenter());this.slots||(this.slots=[]);A(this.options.startAngle)&&A(this.options.endAngle)?(a.seriesTypes.pie.prototype.translate.apply(this,arguments),this.slots=this.getSlots()):(this.generatePoints(),J(this,"afterTranslate"))};c.defaultOptions=B(y.defaultOptions,{endAngle:void 0,innerSize:"40%",
itemPadding:.1,layout:"vertical",marker:B(d.plotOptions.line.marker,{radius:null}),rows:void 0,crisp:!1,showInLegend:!0,startAngle:void 0});return c}(y);z(f.prototype,{markerAttribs:void 0});f.prototype.pointClass=c;x.registerSeriesType("item",f);"";return f});c(a,"masters/modules/item-series.src.js",[],function(){})});
//# sourceMappingURL=item-series.js.map