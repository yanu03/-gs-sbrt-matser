package kr.tracom.controller.cm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.cm.Common.CommonService;
import kr.tracom.support.ControllerSupport;
import kr.tracom.util.Constants;
import kr.tracom.util.Result;
import kr.tracom.util.SessionInfo;

@Controller
@Scope("request")
public class MainController extends ControllerSupport{

	@Autowired
	private SessionInfo user;

	@Autowired
	private CommonService commonService;
	
	@RequestMapping(value = "/")
	public String root(HttpServletRequest request) throws Exception
	{		
		return "redirect:/main/main";	
	}
	
	@RequestMapping(value = "cm/*/*")
	public String cmView(HttpServletRequest request, ModelMap model) throws Exception
	{		
		HttpSession session = request.getSession(true);
		user.setUserInfo(session);
		String path = request.getServletPath();
		String jspName = path.substring(path.lastIndexOf("/") + 1);
		model.addAttribute("progCd",request.getAttribute("progCd"));
		
		return "jsp/"+path.substring(1);
	}
	
	@RequestMapping(value = "ui/*/*")
	public String siView(HttpServletRequest request, ModelMap model) throws Exception
	{		
		HttpSession session = request.getSession(true);
		user.setUserInfo(session);
		String path = request.getServletPath();
		String jspName = path.substring(path.lastIndexOf("/") + 1);
		model.addAttribute("progCd",request.getAttribute("progCd"));
		//test
		return "jsp/"+path.substring(1);
	}
	
	@RequestMapping(value = "/main/main")
	public String main(HttpServletRequest request, ModelMap model) throws Exception
	{		
		HttpSession session = request.getSession(true);
		user.setUserInfo(session);
		
		return "jsp/cm/main/main";	
	}
	
	@RequestMapping("/main/allMenuInfo") //임시로 메뉴 가져오기
	public @ResponseBody Map<String, Object> getAllMenuInfo(HttpServletRequest request) {
		Result result = new Result();
		Map memberParam = null;
		Map setInfo = null;
		List<Map<String, Object>> menuList = null;
		Map defInfo = null;
		HttpSession session = request.getSession();
		
		try {
			int curSystem = (int)user.getCurSystem();
			memberParam = user.getUserInfoByBase();
			memberParam.put(Constants.SSN_SYSTEM_BIT, curSystem);
			memberParam.put("LEVEL", 1);
			
			//result.setData("dlt_menu", commonService.selectAllMenuList(memberParam));

			menuList = commonService.selectAllMenuListByLevel(memberParam);

			for(Map<String, Object>menuItem:menuList) {
				List<Map<String, Object>> subMenuList = null;
				Map subParam = user.getUserInfoByBase();
				subParam.put("PARENT_MENU_CD", menuItem.get("MENU_CD"));
				subParam.put(Constants.SSN_SYSTEM_BIT,curSystem);
				subMenuList	= commonService.selectAllMenuListByLevel(subParam);
				for(Map<String, Object>subMenuItem:subMenuList) {
					List<Map<String, Object>> subMenuList2 = null;
					Map subParam2 = user.getUserInfoByBase();
					subParam2.put("PARENT_MENU_CD", subMenuItem.get("MENU_CD"));
					subParam2.put(Constants.SSN_SYSTEM_BIT,curSystem);
					subMenuList2	= commonService.selectAllMenuListByLevel(subParam2);
					subMenuItem.put("items", subMenuList2);
				}
				menuItem.put("items", subMenuList);
			}
			result.setData("rows", menuList);
			result.setMsg(result.STATUS_SUCESS, "메뉴정보가 조회 되었습니다.");
		} catch (Exception ex) {
			ex.printStackTrace();
			result.setMsg(result.STATUS_ERROR, null, ex);
		}

		return result.getResult();
	}
	
	@RequestMapping("/main/init")
	public @ResponseBody Map<String, Object> getInitMainInfo(HttpServletRequest request) {
		Result result = new Result();
		Map memberParam = null;
		Map setInfo = null;
		List<Map<String, Object>> menuList = null;
		Map defInfo = null;
		HttpSession session = request.getSession();
		
		try {
			memberParam = user.getUserInfoByBase();
			defInfo = new HashMap();
			defInfo.put(Constants.SSN_USER_ID, user.getUserId());
			defInfo.put(Constants.SSN_USER_NM, user.getUserName());

			if (user.getIsAdmin()) {
				defInfo.put(Constants.SSN_IS_ADMIN, "Y"); 
			} else {  
				defInfo.put(Constants.SSN_IS_ADMIN, "N");
			}
			
			int curSystem = (int)user.getCurSystem();
			if(curSystem==0)curSystem=1;
			defInfo.put(Constants.SSN_CUR_SYSTEM, curSystem);
			defInfo.put(Constants.SSN_SYSTEM_BIT, user.getSystemBit());
			
			memberParam.put(Constants.SSN_SYSTEM_BIT, curSystem);
			memberParam.put("LEVEL", 1);
			
			//menuList = commonService.selectMenuList(memberParam);
			menuList = commonService.selectMenuListByLevel(memberParam);
			
			for(Map<String, Object>menuItem:menuList) {
				List<Map<String, Object>> subMenuList = null;
				Map subParam = user.getUserInfoByBase();
				subParam.put("PARENT_MENU_CD", menuItem.get("MENU_CD"));
				subParam.put(Constants.SSN_SYSTEM_BIT,curSystem);
				subMenuList	= commonService.selectMenuListByLevel(subParam);
				for(Map<String, Object>subMenuItem:subMenuList) {
					List<Map<String, Object>> subMenuList2 = null;
					Map subParam2 = user.getUserInfoByBase();
					subParam2.put("PARENT_MENU_CD", subMenuItem.get("MENU_CD"));
					subParam2.put(Constants.SSN_SYSTEM_BIT,curSystem);
					subMenuList2	= commonService.selectMenuListByLevel(subParam2);
					subMenuItem.put("items", subMenuList2);
				}
				menuItem.put("items", subMenuList);
			}
			result.setData("list_menu", menuList);
			result.setData("map_defInfo", defInfo);
			result.setData("list_programAuthority", commonService.selectProgramAuthorityList(memberParam));
			result.setMsg(result.STATUS_SUCESS, "메뉴정보가 조회 되었습니다.");
		} catch (Exception ex) {
			ex.printStackTrace();
			result.setMsg(result.STATUS_ERROR, null, ex);
		}

		return result.getResult();
	}
	
	@RequestMapping(value = "/main/mainView")
	public String mainView(HttpServletRequest request) throws Exception
	{		
		HttpSession session = request.getSession(true);
		user.setUserInfo(session);
		
		return "jsp/cm/main/mainView";	
	}
	
	@RequestMapping(value = "/"
			+ ""
			+ "/selectCodeList")
	public @ResponseBody Map<String, Object> selectCodeList(HttpServletRequest request) throws Exception
	{		
		result.setData("codeList", commonService.selectCodeList());
		return result.getResult();		
	}
}
