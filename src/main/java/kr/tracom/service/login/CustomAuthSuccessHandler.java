package kr.tracom.service.login;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import kr.tracom.service.cm.User.UserService;
import kr.tracom.util.CommonUtil;
import kr.tracom.util.Constants;
import kr.tracom.util.SessionInfo;
import kr.tracom.util.SsoCrypto;

public class CustomAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

	/*
	 * HttpServletRequest : request 정보
	 * HttpServletResponse : Response에 대해 설정할 수 있는 변수
	 * AuthenticationException : 로그인 실패 시 예외에 대한 정보
	 */
	
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private UserService userService;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth) throws IOException, ServletException {

		
		logger.info("onAuthenticationSuccess");
		HttpSession session = req.getSession(true);
		
		Map loginParam = new HashMap(); 
		loginParam.put("USER_ID", auth.getName());
		Map memberMap = userService.selectMemberInfoByOnlyId(loginParam);

		//int systemBit = Integer.parseInt((String)memberMap.get("SYSTEM_BIT"));
		//int loginSystemBit = Integer.parseInt((String) loginParam.get("SYSTEM_BIT"));
		
		SsoCrypto.init();
		String ip =  CommonUtil.getIpAddress(req);
		SsoCrypto.setCookie(req,res);
		 
		//Cookie cookie = new Cookie("xmfkzha", auth.getName());
	    //cookie.setMaxAge(60*60*24*10);
	    //cookie.setPath("/user/login");
	    //res.addCookie(cookie);
		
		/*
		 * if(systemBit==Constants.SYSTEM_ALL) {
		 * session.setAttribute(Constants.SSN_CUR_SYSTEM, loginSystemBit);
		 * if(loginSystemBit==Constants.SYSTEM_SBRT) { String ssoId =
		 * SsoCrypto.encrypt((String) loginParam.get("USER_ID"), ip); Map resultData =
		 * new HashMap(); resultData.put("USER_ID", ssoId); resultData.put("SBRT_URL",
		 * sbrtUrl);
		 * 
		 * result.setData("dma_result", resultData); result.setMsg(Result.STATUS_SUCESS,
		 * "로그인 성공"); return result.getResult(); } } else if(systemBit==loginSystemBit)
		 * { session.setAttribute(Constants.SSN_CUR_SYSTEM, systemBit); } else {
		 * if(systemBit==Constants.SYSTEM_BIMS) { result.setMsg(Result.STATUS_ERROR,
		 * "차량운행관리 시스템 접근 권한이 없습니다. 시스템 관리자에게 문의하시기 바랍니다."); } else {
		 * result.setMsg(Result.STATUS_ERROR,
		 * "통합운영관리 시스템 접근 권한이 없습니다. 시스템 관리자에게 문의하시기 바랍니다."); } return
		 * result.getResult(); }
		 */
		
		// 로그인한 ID가 시스템 관리자인지 여부를 체크한다.
		// 시스템 관리자 ID는 websquareConfig.properties 파일의 system.admin.id 속성에 정의하면 된다.
		// 시스템 관자자 ID가 여러 개일 경우 콤마(",") 구분해서 작성할 수 있다.
		boolean isAdmin = userService.isAdmin((String) memberMap.get("USER_ID"));
		session.setAttribute(Constants.SSN_IS_ADMIN, isAdmin);
		
		
		
		// 클라이언트(UI)에 전달하는 IS_ADMIN 정보는 관리자인지의 여부에 따라 화면 제어가 필요한 로직 처리를 위해서만 사용한다.
		// 서버 서비스에서의 로직 처리는 보안을 위해서 클라이언트에서 전달하는 IS_ADMIN 정보가 아닌
		// 서버 서비스에서 관리하는 UserInfo.getIsAdmin()에서 관리자 여부를 받아와서 판단해야 한다.

		// 메뉴 정보 가져오기
		//memberMap.put("SYSTEM_BIT",session.getAttribute(Constants.SSN_CUR_SYSTEM));
		//memberMap.put("SSN_USER_ID",session.getAttribute(Constants.SSN_USER_ID));
		//List sessionMList = commonService.selectMenuList(memberMap);
		//session.setAttribute("MENU_LIST", (List) sessionMList);

		session.setAttribute(Constants.SSN_DELETED, "false");
		session.setAttribute(Constants.SSN_USER_ID, (String) memberMap.get("USER_ID"));
		session.setAttribute(Constants.SSN_USER_NM, (String) memberMap.get("USER_NM"));
		session.setAttribute(Constants.SSN_SYSTEM_BIT, memberMap.get("SYSTEM_BIT"));
		
		//user.setUserInfo(session);
		res.sendRedirect("/main/main");
	}
}
