package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0402.SI0402Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0402Controller extends ControllerSupport {
	
	@Autowired
	private SI0402Service si0402Service;
		
	@RequestMapping("/si/SI0402G1R0")
	public @ResponseBody Map<String, Object> SI0402G1R0() throws Exception {
		result.setData("rows", si0402Service.SI0402G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402G1S0")
	public @ResponseBody Map<String, Object> SI0402G1S0() throws Exception {
		Map map = si0402Service.SI0402G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/updateBearing")
	public @ResponseBody Map<String, Object> updateBearing() throws Exception {
		Map map = si0402Service.updateBearing();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	
	@RequestMapping("/si/SI0402P0R0")
	public @ResponseBody Map<String, Object> SI0402P0R0() throws Exception {
		result.setData("rows", si0402Service.SI0402P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402P1R0")
	public @ResponseBody Map<String, Object> SI0402P1R0() throws Exception {
		result.setData("rows", si0402Service.SI0402P1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402P2R0")
	public @ResponseBody Map<String, Object> SI0402P2R0() throws Exception {
		result.setData("rows", si0402Service.SI0402P2R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402P2S0")
	public @ResponseBody Map<String, Object> SI0402P2S0() throws Exception {
		Map map = si0402Service.SI0402P2S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0402P2K0")
	public @ResponseBody Map<String, Object> SI0402P2K0() throws Exception {
		result.setData("rows", si0402Service.SI0402P2K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402P3R0")
	public @ResponseBody Map<String, Object> SI0402P3R0() throws Exception {
		result.setData("rows", si0402Service.SI0402P3R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402P3S0")
	public @ResponseBody Map<String, Object> SI0402P3S0() throws Exception {
		Map map = si0402Service.SI0402P3S0();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/si/SI0402P3K0")
	public @ResponseBody Map<String, Object> SI0402P3K0() throws Exception {
		result.setData("rows", si0402Service.SI0402P3K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402P5R0")
	public @ResponseBody Map<String, Object> SI0402P5R0() throws Exception {
		result.setData("rows", si0402Service.SI0402P5R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0402G1K0")
	public @ResponseBody Map<String, Object> SI0402G1K0() throws Exception {
		result.setData("rows", si0402Service.SI0402G1K0());
		return result.getResult();
	}	

	@RequestMapping("/si/SI0402G1_exlDownload")
    public String SI0402G1_exlDownload(Model model) throws Exception {
		
		String[] getValues = {"NODE_ID", "OLD_NODE_ID", "NODE_NM", "WAY_DIV", "NODE_SN", "OLD_NODE_SN", "NODE_TYPE_NM", "NODE_TYPE"
								, "GPS_Y", "GPS_X","REMARK"};
		String[] headerTitle = {"노드ID", "이전노드ID", "노드명", "상하행", "노드순번", "이전노드순번", "유형 명", "유형"
								,"위도", "경도", "비고"};
		
		model.addAttribute("title", "노선경로정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0402Service.SI0402G1_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
}
