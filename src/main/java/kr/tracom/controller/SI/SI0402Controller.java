package kr.tracom.controller.SI;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.tracom.service.SI0402.SI0402Service;
import kr.tracom.service.cm.Excel.ExcelUpload;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0402Controller extends ControllerSupport {
	
	@Autowired
	private SI0402Service si0402Service;
	
	@Autowired
	private ExcelUpload excelUploadService;
		
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
    public String SI0402G1_exlDownload(HttpServletRequest req,Model model) throws Exception {
		String routId = req.getParameter("param");
		String[] getValues = {"ROUT_ID","NODE_ID", "NODE_NM", "NODE_SN", "NODE_TYPE",
							"WAY_DIV", "LINK_ID", "STTN_ID", "CRS_ID", "GPS_Y", "GPS_X","REMARK"};
		String[] headerTitle = {"노선ID","노드ID", "노드명", "노드순번", "노드유형",
				"상하행구분", "링크ID","정류소ID", "교차로ID" ,"위도", "경도", "비고"};
		
		model.addAttribute("title", "노선경로정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0402Service.SI0402G1_exlDownload(routId));
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
	@RequestMapping("/si/SI0402G1_exlUpload")
    public @ResponseBody  Map<String, Object> SI0200G0_exlUpload(@RequestParam("excelinputfile")MultipartFile file) throws Exception {
		String[] getValues = {"ROUT_ID","NODE_ID", "NODE_NM", "NODE_SN", "NODE_TYPE",
							"WAY_DIV", "LINK_ID", "STTN_ID", "CRS_ID", "GPS_Y", "GPS_X","REMARK"};
		List<Map<String, Object>> list = excelUploadService.excelToList(file, getValues);
		List<Map<String, Object>> resultList = si0402Service.SI0402G1_exlUpload(list);
		
		result.setData("rows",resultList);

		return result.getResult();
	}
	
}
