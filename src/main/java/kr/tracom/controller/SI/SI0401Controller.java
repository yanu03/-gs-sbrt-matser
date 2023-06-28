package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0401.SI0401Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0401Controller extends ControllerSupport {
	
	@Autowired
	private SI0401Service si0401Service;
	
	@RequestMapping("/si/SI0401G0R0")
	public @ResponseBody Map<String, Object> SI0401G0R0() throws Exception {
		result.setData("rows", si0401Service.SI0401G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G0K0")
	public @ResponseBody Map<String, Object> SI0401G0R1() throws Exception {
		result.setData("rows", si0401Service.SI0401G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401SHI0")
	public @ResponseBody Map<String, Object> SI0401G0R2() throws Exception {
		result.setData("rows", si0401Service.SI0401SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G1R0")
	public @ResponseBody Map<String, Object> SI0401G1R0() throws Exception {
		result.setData("rows", si0401Service.SI0401G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G0S0")
	public @ResponseBody Map<String, Object> SI0401G0S0() throws Exception {
		Map map = si0401Service.SI0401G0S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0401G1S0")
	public @ResponseBody Map<String, Object> SI0401G1S0() throws Exception {
		Map map = si0401Service.SI0401G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0401P0R0")
	public @ResponseBody Map<String, Object> SI0401P0R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P1R0")
	public @ResponseBody Map<String, Object> SI0401P1R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P1K0")
	public @ResponseBody Map<String, Object> SI0401P1K0() throws Exception {
		result.setData("rows", si0401Service.SI0401P1K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P1S0")
	public @ResponseBody Map<String, Object> SI0401P1S0() throws Exception {
		Map map = si0401Service.SI0401P1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/si/SI0401P2R0")
	public @ResponseBody Map<String, Object> SI0401P2R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P2R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P3R0")
	public @ResponseBody Map<String, Object> SI0401P3R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P3R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G0_exlDownload")
    public String  SI0401G0_exlDownload(Model model) throws Exception {

		String[] getValues = {"ROUT_ID", "ROUT_NM", "ROUT_TYPE", "ROUT_TYPE_NM", "ROUT_GRP", "ROUT_GRP_NM", "ROUT_DIV","ROUT_DIV_NM"
				, "AREA", "AREA_NM", "ST_STTN_ID","ST_STTN_NM","ED_STTN_ID","ED_STTN_NM","RET_STTN_ID","RET_STTN_NM","OPER_CNT"
				, "ALLOC_CNT", "FST_TM", "LST_TM", "NONE_PEAK", "WAY_DIV", "WAY_DIV_NM", "USE_YN", "REMARK"};
		String[] headerTitle = {"노선ID", "노선명", "노선유형", "노선유형 명", "노선그룹", "노선그룹 명", "노선구분", "노선구분 명"
				,"권역", "권역 명", "시작정류소ID","기점명", "종료정류소ID", "기점명", "회차정류소ID", "회차정류소명", "운행횟수"
				, "배차횟수" ,"첫차시간(시분)", "막차시간(시분)", "운행간격(분)", "상하행", "상하행 명", "사용여부", "비고"};
		
		model.addAttribute("title", "노선 기초정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0401Service.SI0401G0_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
}
