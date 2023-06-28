package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0501.SI0501Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0501Controller extends ControllerSupport {
	
	@Autowired
	private SI0501Service si0501Service;
	
	@RequestMapping("/si/SI0501G0R0")
	public @ResponseBody Map<String, Object> SI0501G0R0() throws Exception {
		result.setData("rows", si0501Service.SI0501G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0501G0K0")
	public @ResponseBody Map<String, Object> SI0501G0R1() throws Exception {
		result.setData("rows", si0501Service.SI0501G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0501SHI0")
	public @ResponseBody Map<String, Object> SI0501G0R2() throws Exception {
		result.setData("rows", si0501Service.SI0501SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0501G1R0")
	public @ResponseBody Map<String, Object> SI0501G1R0() throws Exception {
		result.setData("rows", si0501Service.SI0501G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0501G0S0")
	public @ResponseBody Map<String, Object> SI0501G0S0() throws Exception {
		Map map = si0501Service.SI0501G0S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0501G1S0")
	public @ResponseBody Map<String, Object> SI0401G1S0() throws Exception {
		Map map = si0501Service.SI0501G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0501P0R0")
	public @ResponseBody Map<String, Object> SI0501P0R0() throws Exception {
		result.setData("rows", si0501Service.SI0501P0R0());
		return result.getResult();
	}

	@RequestMapping("/si/SI0501G0_exlDownload")
    public String  SI0501G0_exlDownload(Model model) throws Exception {

		String[] getValues = {"STTN_ID", "STTN_NM", "AREA", "AREA_NM", "STTN_ENM", "STTN_NO", "GPS_Y", "GPS_X"
				, "STTN_FCLT_TYPE", "STTN_FCLT_TYPE_NM", "VHC_DOOR_DIR_TYPE", "VHC_DOOR_DIR_TYPE_NM", "WAY_DIV", "WAY_DIV_NM"
				, "BAY_TYPE", "BAY_TYPE_NM", "BAY_LEN", "LINE_CNT", "CENTER_YN", "STOP_TM_PEAK", "STOP_TM_NONE_PEAK", "USE_YN", "REMARK"};
		String[] headerTitle = {"정류소ID", "정류소명", "권역", "권역 명", "정류소영문명", "정류소번호", "위도", "경도"
				, "정류소시설유형", "정류소시설유형 명", "버스문방향", "버스문방향 명", "상하행", "상하행 명"
				, "베이유형", "베이유형 명", "베이길이(m)", "차선수", "중앙차로여부", "첨두시 정차시간(초)", "비첨두시 정차시간(초)", "사용여부", "비고"};
		
		model.addAttribute("title", "정류소정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0501Service.SI0501G0_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
}
