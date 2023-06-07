var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'; /*URL*/

var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'rvgcNUYBq3hlmI5Jx1WkyXJE6z0sJEI36nWhOzG1auMqrMaK%2Fi4EnFHfW5AOFcVbC2ppCEtfCnyf%2FUzP1XfZ%2Bg%3D%3D'; /*Service Key*/

//queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/
//queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20'); /**/
queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2022'); /**/
//queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent('05'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        //console.log('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
        $('#test1').append('<div>&nbsp;'+ this.response +'</div');
        console.log(this.response);
    }
    //console.log(this.response);
};



xhr.send('body');


// $.uf_xmltojson = function(a_xml){
//     var parser = new DOMParser();
//     var xmlDoc = parser.parseFromString(a_xml, "text/xml");

//     var jsonObj = {};

//     // Check if the input is empty or not
//     if (xmlDoc.nodeType == 1) { 
//         // If it's an element node, add attributes and child elements recursively
//         // 만약 이것이 요소 노드라면, 속성과 하위 요소를 재귀적으로 추가하세요.
//         if (xmlDoc.attributes.length > 0) {
//         jsonObj["@attributes"] = {};
//         for (var j = 0; j < xmlDoc.attributes.length; j++) {
//             var attribute = xmlDoc.attributes.item(j);
//             jsonObj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//         }
//         }
//     } else if (xmlDoc.nodeType == 3) { 
//         // If it's a text node, set the value of the current object to the text
//         // 만약 이것이 텍스트 노드라면, 현재 객체의 값을 해당 텍스트로 설정하세요.
//         jsonObj = xmlDoc.nodeValue.trim();
//     }
    
//     // Loop through child nodes recursively and populate the object
//     if (xmlDoc.hasChildNodes()) {
//         for(var i = 0; i < xmlDoc.childNodes.length; i++) {
//         var child = xmlDoc.childNodes.item(i);
//         var nodeName = child.nodeName;
//         if (nodeName == "#text") continue;
//         if (jsonObj[nodeName]) { // If the node already exists, create an array
//             if (jsonObj[nodeName].constructor !== Array) {
//             jsonObj[nodeName] = [jsonObj[nodeName]];
//             }
//             jsonObj[nodeName].push($.uf_xmltojson(child)); // Add the new child node to the array
//         } else {
//             jsonObj[nodeName] = $.uf_xmltojson(child); // Create a new child node
//         }
//         }
//     }

//     console.log(jsonObj);
//     return jsonObj;
// };

