package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0503.SI0503Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0503Controller extends ControllerSupport {
	
	@Autowired
	private SI0503Service si0503Service;
	
	@RequestMapping("/si/SI0503G0R0")
	public @ResponseBody Map<String, Object> SI0503G0R0() throws Exception {
		result.setData("dlt_BMS_CRS_MST", si0503Service.SI0503G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0503G0K0")
	public @ResponseBody Map<String, Object> SI0503G0K0() throws Exception {
		result.setData("dma_SEQ_BMS_CRS_MST_0", si0503Service.SI0503G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0503SHI0")
	public @ResponseBody Map<String, Object> SI0503SHI0() throws Exception {
		result.setData("dlt_searchitem", si0503Service.SI0503SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0503G0S0")
	public @ResponseBody Map<String, Object> SI0503G0S0() throws Exception {
		Map map = si0503Service.SI0503G0S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0503G1R0")
	public @ResponseBody Map<String, Object> SI0503G1R0() throws Exception {
		result.setData("dlt_BMS_ROUT_MST", si0503Service.SI0503G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0503P0R0")
	public @ResponseBody Map<String, Object> SI0503P0R0() throws Exception {
		result.setData("", si0503Service.SI0503P0R0());
		return result.getResult();
	}

	@RequestMapping("/si/SI0503G0_exlDownload")
    public String  SI0503G0_exlDownload(Model model) throws Exception {

		String[] getValues = {"CRS_ID", "CRS_NM", "CRS_KIND", "CRS_KIND_NM", "SIG_CTR_TYPE", "SIG_CTR_TYPE_NM", "GPS_Y", "GPS_X"
								, "MAIN_CRS_YN", "PDSTRN_DET_YN", "USE_YN","REMARK"};
		String[] headerTitle = {"교차로ID", "교차로명", "교차로종류", "교차로종류 명", "신호제어기 유형", "신호제어기 유형 명", "위도", "경도"
								,"주요교차로여부", "보행자감지여부", "사용여부","비고"};
		
		model.addAttribute("title", "교차로정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0503Service.SI0503G0_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
}
