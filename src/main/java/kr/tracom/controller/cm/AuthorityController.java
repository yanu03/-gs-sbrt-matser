package kr.tracom.controller.cm;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.cm.Authority.AuthorityService;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class AuthorityController extends ControllerSupport {

	@Autowired
	private AuthorityService authorityService;

	/**
	 * selectAuthoritySearchItem - 권한 아이템 리스트를 조회한다.
	 * 
	 * @date 2017.12.22
	 * @param {} 없음
	 * @returns mv dlt_authroitySearchItem ( 권한 아이템 리스트 )
	 * @author tracom
	 * @example
	 */
	@RequestMapping("/authority/selectAuthoritySearchItem")
	public @ResponseBody Map<String, Object> selectAuthoritySearchItem() throws Exception {
		result.setData("dlt_authoritySearchItem", authorityService.selectAuthoritySearchItem());
		return result.getResult();
	}

	/**
	 * selectAuthorityList - 조건에 따라 권한 리스트를 조회한다.
	 * 
	 * @date 2017.12.22
	 * @param {} dma_search { TYPE :"권한명 또는 권한 코드", CONTENTS :"검색어", USE_YN :"사용여부" }
	 * @returns mv dlt_authroity ( 권한 리스트 )
	 * @author tracom
	 * @example
	 */
	@RequestMapping("/authority/selectAuthorityList")
	public @ResponseBody Map<String, Object> selectAuthorityList() throws Exception {
		result.setData("dlt_authority", authorityService.selectAuthorityList());
		return result.getResult();
	}

	/**
	 * selectAuthorityMemberList - 조건에 따라 권한이 부여된 사용자 리스트를 불러온다.
	 * 
	 * @date 2017.12.22
	 * @param {} dma_authority { AUTH_CD :"권한 코드" }
	 * @returns mv dlt_authroityMember ( 권한이 부여된 사용자 리스트 )
	 * @author tracom
	 * @example
	 */
	@RequestMapping("/authority/selectAuthorityMemberList")
	public @ResponseBody Map<String, Object> selectAuthorityMemberList() throws Exception  {
		result.setData("dlt_authorityMember", authorityService.selectAuthorityMemberList());
		return result.getResult();
	}

	/**
	 * excludeSelectAuthorityMemberList - 권한이 부여되지 않은 직원리스트를 검색조건에 따라 조회한다.
	 * 
	 * @date 2017.12.22
	 * @param {} dma_search { TYPE :"사원코드  또는 사원명", CONTENTS :"검색어", AUTH_CD :"권한코드" }
	 * @returns mv dlt_member ( 권한이 부여되지 않은 직원 리스트 )
	 * @author tracom
	 * @example
	 */
	@RequestMapping("/authority/excludeSelectAuthorityMemberList")
	public @ResponseBody Map<String, Object> excludeSelectAuthorityMemberList() throws Exception {
		result.setData("dlt_member", authorityService.excludeSelectAuthorityMemberList());
		return result.getResult();
	}

	/**
	 * saveAuthority - 권한리스트를 등록 수정 삭제 한다.
	 * 
	 * @date 2017.12.22
	 * @param {} dlt_authority ( 권한관리 상태인( C,U,D ) 리스트 ), dma_search ( 조회조건 )
	 * @returns mv dlt_result ( 입력,수정,삭제된 건수 및 상태 ), dlt_authority( 변경된 권한리스트 )
	 * @author tracom
	 * @example
	 */
	@RequestMapping("/authority/saveAuthority")
	public @ResponseBody Map<String, Object> saveAuthority() throws Exception {
		Map hash = authorityService.saveAuthority();
		result.setData("dma_result", hash);
		//result.setData("dlt_authority", authorityService.selectAuthorityList());

		return result.getResultSave();
	}

	/**
	 * saveAuthorityMember 권한별 등록사원 리스트를 등록 수정 삭제 한다.
	 * 
	 * @date 2017.12.22
	 * @param {} dlt_authorityMember ( 권한관리 상태인( C,U,D ) 리스트 ), dma_search ( 조회조건 )
	 * @returns mv dlt_result ( 입력,수정,삭제된 건수 및 상태 ), dlt_authorityMember( 변경된 권한 사용자 리스트 )
	 * @author tracom
	 * @example
	 */
	@RequestMapping("/authority/saveAuthorityMember")
	public @ResponseBody Map<String, Object> saveAuthorityMember() throws Exception {

		Map hash = authorityService.saveAuthorityMember();
		result.setData("dma_result", hash);
		//result.setData("dlt_authorityMember", authorityService.selectAuthorityMemberList());
		return result.getResultSave();
	}

	/**
	 * saveAuthorityAll - 권한 및 권한별 사원정보를 등록 수정 삭제 한다.
	 * 
	 * @date 2017.12.22
	 * @param {} dlt_authority ( 상태인( C,U,D ) 권한 리스트 ), dlt_authorityMember ( 상태인( C,U,D ) 권한별 등록사원 리스트 )
	 * @returns mv dlt_result (입력,수정,삭제된 건수 및 상태)
	 * @author Inswave
	 * @example
	 */
	@RequestMapping("/authority/saveAuthorityAll")
	public @ResponseBody Map<String, Object> saveAuthorityAll() throws Exception {

		Map hash = authorityService.saveAuthorityAll();
		result.setData("dma_result_All", hash);
		return result.getResultSave();
	}
	
	@RequestMapping("/authority/selectAuthorityKey")
	public @ResponseBody Map<String, Object> selectAuthorityKey() throws Exception {
		result.setData("dma_SEQ_BMS_AUTH_MST_0", authorityService.selectAuthorityKey());
		return result.getResult();
	}

	@RequestMapping("/authority/authorityList_exlDownload")
    public String  authorityList_exlDownload(Model model) throws Exception {

		String[] getValues = {"AUTH_CD", "AUTH_NM", "USE_YN", "REMARK"};
		String[] headerTitle = {"권한코드", "권한명", "사용여부", "비고"};
		
		model.addAttribute("title", "권한그룹정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", authorityService.authorityList_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
	@RequestMapping("/authority/authorityMemberList_exlDownload")
    public String  authorityMemberList_exlDownload(HttpServletRequest req, Model model) throws Exception {
		String param = req.getParameter("param");
		String[] getValues = {"USER_ID", "USER_NM", "AUTH_CD"};
		String[] headerTitle = {"사용자ID", "사용자명", "권한코드"};
		
		model.addAttribute("title", "사용자권한정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", authorityService.authorityMemberList_exlDownload(param));
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
}
