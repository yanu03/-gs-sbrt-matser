package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0300.SI0300Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0300Controller extends ControllerSupport{
	
	@Autowired
	private SI0300Service si0300Service;
	
	@RequestMapping("/si/SI0300G0R0")
	public @ResponseBody Map<String, Object> SI0300G0R0() throws Exception {
		result.setData("rows", si0300Service.SI0300G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0300P0R0")
	public @ResponseBody Map<String, Object> SI0300P0R0() throws Exception {
		result.setData("rows", si0300Service.SI0300P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0300SHI0")
	public @ResponseBody Map<String, Object> SI0300SHI0() throws Exception {
		result.setData("dlt_searchitem", si0300Service.SI0300SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0300G0K0")
	public @ResponseBody Map<String, Object> SI0300G0K0() throws Exception {
		result.setData("dma_SEQ_BMS_DRV_MST_0", si0300Service.SI0300G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0300G0S0")
	public @ResponseBody Map<String, Object> SI0300G0S0() throws Exception {
		Map map = si0300Service.SI0300G0S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0300G0_exlDownload")
    public String  SI0300G0_exlDownload(Model model) throws Exception {

		String[] getValues = {"DRV_ID", "DRV_NM", "COMP_ID", "COMP_NM", "BUS_DIV", "BUS_DIV_NM", "EPLY_DATE1"
								, "EPLY_YN", "EPLY_YN_NM", "REMARK"};
		String[] headerTitle = {"운전자 ID", "운전자명", "운수사ID", "운수사명", "버스구분", "버스구분 명", "입사일"
								,"재직여부", "재직여부 명", "비고"};
		
		model.addAttribute("title", "운전자 정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0300Service.SI0300G0_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
}
