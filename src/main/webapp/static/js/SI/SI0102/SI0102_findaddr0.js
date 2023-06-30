/**
 * 프로그램명 : 운수사 정보 관리 주소찾기
 * 작성자 : 박원용
 * 작성일 : 2023.06.21
 */

$(function(){
  
  // 도로명 주소 팝업
  $.uf_findaddr = function(a_rtnobj){
    new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var v_roadAddr = data.roadAddress; // 도로명 주소 변수
          var v_jibunAddr = data.jibunAddress; // 지번 주소 변수
          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          $('#member_post').value = data.zonecode;
          if(v_roadAddr !== ''){
              $("#ADDR").textbox('setValue',v_roadAddr);
          } 
          else if(v_jibunAddr !== ''){
            // 지번주소 
            // $("#member_addr").value = jibunAddr;
          }
      },
      onclose: function(state) {
          //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
          if(state === 'FORCE_CLOSE'){
              //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.

          } else if(state === 'COMPLETE_CLOSE'){
              //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
              //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
              a_rtnobj.textbox('textbox').focus();
          }
      }
    }).open();
  }

});
