package kr.tracom.mapper.cm.User;

import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

@Mapper
public interface UserMapper {

	public String checkLoginAccess(String userID);
	
	// 사용자 정보 조회 (로그인 체크용도로 사용 )
	public Map selectMemberInfoForLogin(Map param);

	// 사용자의 비밀번호를 업데이트한다.
	public int updatePassword(Map param);
	
	// 로그인 이력 저장
	public void insertLoginHis(Map param);
	
	// 로그아웃 이력 저장
	public void insertLogoutHis(Map param);
	
	public Map searchByID(String userId);

}