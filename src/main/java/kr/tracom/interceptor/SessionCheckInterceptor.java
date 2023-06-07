package kr.tracom.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.tracom.util.Constants;
import kr.tracom.util.SessionInfo;

//@Component
public class SessionCheckInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	private SessionInfo sessionInfo;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		String loginInfo = null;
		HttpSession session = request.getSession();
		String reqUrl = request.getRequestURI();
		boolean result = true;
		
		try {
			loginInfo = (String) session.getAttribute(Constants.SSN_USER_ID);

			if (loginInfo != null) {
				//userInfo.setUserInfo(session);
				/*
				 * if(isRoot(request)) { response.sendRedirect("/main/main"); }
				 */
			} else {
				if (!isSkipURI(request)) {
					result = false;
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					session.setAttribute("errMsg","Session이 종료 되었습니다.");
					response.sendRedirect("/user/login");
					//response.getWriter().write("{\"rsMsg\":{\"statusCode\":\"E\", \"errorCode\" : \"E0001\", \"message\":\"Session이 종료 되었습니다.\",\"status\":\"Error\"}}");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}
	
	private boolean isRoot(HttpServletRequest request) {
		
		String[] skipUrl = { "/"};
		boolean result = false;
		String uri = (request.getRequestURI()).replace(request.getContextPath(), "");
		System.out.println("isSkipURI() in uri="+uri);
		for (int i = 0; i < skipUrl.length; i++) {
			if (uri.equals(skipUrl[i])) {
				result = true;
				break;
			}
		}
		return result;
	}

	/**
	 * Session 체크 대상에서 예외 URI 구성
	 * 
	 * @date 2016. 8. 29.
	 * @param argument
	 *			파라미터 정보
	 * @returns <boolean> 반환 변수 및 객체
	 * @author tracom
	 * @example 샘플 코드
	 */
	private boolean isSkipURI(HttpServletRequest request) {
		
		String[] skipUrl = { "/"};
		boolean result = false;
		String uri = (request.getRequestURI()).replace(request.getContextPath(), "");
		System.out.println("isSkipURI() in uri="+uri);
		for (int i = 0; i < skipUrl.length; i++) {
			if (uri.equals(skipUrl[i])) {
				result = true;
				break;
			}
		}
		String[] skipUrl2 = {"/webjars", "/user"};
		for (int i = 0; i < skipUrl2.length; i++) {
			if (uri.contains(skipUrl2[i])) {
				result = true;
				break;
			}
		}
		return result;
	}
}
