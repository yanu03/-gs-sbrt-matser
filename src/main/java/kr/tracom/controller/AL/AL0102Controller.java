package kr.tracom.controller.AL;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.tracom.service.AL0102.AL0102Service;
import kr.tracom.service.cm.Excel.ExcelUpload;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class AL0102Controller extends ControllerSupport {
	
	@Autowired
	private AL0102Service AL0102Service;
	
	@Autowired
	private ExcelUpload excelUploadService;
	
	@RequestMapping("/al/AL0102G0R0")
	public @ResponseBody Map<String, Object> AL0102G0R0() throws Exception {
		result.setData("dlt_BMS_HOLI_MST", AL0102Service.AL0102G0R0());
		return result.getResult();
	}	
	
	@RequestMapping("/al/AL0102SHI0")
	public @ResponseBody Map<String, Object> PI0205SHI0() throws Exception {
		result.setData("dlt_searchitem", AL0102Service.AL0102SHI0());
		return result.getResult();
	}	
	
	@RequestMapping("/al/AL0102G0S0")
	public @ResponseBody Map<String, Object> AL0102G0S0() throws Exception{
		Map map = AL0102Service.AL0102G0S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}
	@RequestMapping("/al/AL0102G0G0_exlDownload")
    public String  AL0102G0_exlDownload(Model model) throws Exception {

		String[] getValues = {"HOLI_DT", "HOLI_NM", "DAY_TYPE", "DAY_TYPE_NM", "REMARK"};
		String[] headerTitle = {"날짜", "공휴일/이벤트명", "구분", "구분 명", "비고"};
		
		model.addAttribute("title", "휴일정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", AL0102Service.AL0102G0_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
	
	@RequestMapping("/al/AL0102G0G0_exlUpload")
    public @ResponseBody  Map<String, Object> SI0200G0_exlUpload(@RequestParam("excelinputfile")MultipartFile file) throws Exception {

		String[] getValues = {"HOLI_DT", "HOLI_NM", "DAY_TYPE", "DAY_TYPE_NM", "REMARK"};
	
		result.setData("rows", excelUploadService.excelToList(file, getValues));
		return result.getResult();
	}
}
