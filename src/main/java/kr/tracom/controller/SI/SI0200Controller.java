package kr.tracom.controller.SI;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.tracom.service.SI0200.SI0200Service;
import kr.tracom.service.cm.Excel.ExcelUpload;
import kr.tracom.support.ControllerSupport;


@Controller
@Scope("request")
public class SI0200Controller extends ControllerSupport{

	@Autowired
	private SI0200Service si0200Service;
	
	@Autowired
	private ExcelUpload excelUploadService;
	
	@RequestMapping("/si/SI0200G0R0")
	public @ResponseBody Map<String, Object> SI0200G0R0() throws Exception {
		result.setData("rows", si0200Service.SI0200G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0200P0R0")
	public @ResponseBody Map<String, Object> SI0200P0R0() throws Exception {
		result.setData("rows", si0200Service.SI0200P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0200G0K0")
	public @ResponseBody Map<String, Object> SI0200G0K0() throws Exception {
		result.setData("rows", si0200Service.SI0200G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0200G0S0")
	public @ResponseBody Map<String, Object> SI0200G0S0() throws Exception {
		Map map = si0200Service.SI0200G0S0();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/si/SI0200G0_exlDownload")
    public String  SI0200G0_exlDownload(Model model) throws Exception {

		String[] getValues = {"VHC_ID", "VHC_NO", "COMP_ID", "COMP_NM", "AREA", "AREA_NM", "CHAS_NO"
								, "MAKER", "MAKER_NM", "RELS_DT", "REMARK"};
		String[] headerTitle = {"차량 ID", "차량 번호", "운수사 ID", "운수사 명", "권역", "권역 명", "차대번호"
				, "제조사", "제조사 명", "출고일자", "비고"};
		
		model.addAttribute("title", "차량정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", si0200Service.SI0200G0_exlDownload());
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
	
	
	@RequestMapping("/si/SI0200G0_exlUpload")
    public @ResponseBody  Map<String, Object> SI0200G0_exlUpload(@RequestParam("excelinputfile")MultipartFile file) throws Exception {
		String[] getValues = {"VHC_ID", "VHC_NO", "COMP_ID", "COMP_NM", "AREA", "AREA_NM", "CHAS_NO"
				, "MAKER", "MAKER_NM", "RELS_DT", "USE_YN", "REMARK"};
		String[] headerTitle = {"차량 ID", "차량 번호", "운수사 ID", "운수사 명", "권역", "권역 명", "차대번호"
				, "제조사", "제조사 명", "출고일자", "사용여부","비고"};
		List<Map<String, Object>> list = excelUploadService.excelToList(file, getValues);
		List<Map<String, Object>> resultList = si0200Service.SI0200G0_exlUpload(list, getValues, headerTitle);
		
		result.setData("rows",resultList);

		return result.getResult();
	}

	
	@RequestMapping("/si/SI0200SHI0")
	public @ResponseBody Map<String, Object> SI0200SHI0() throws Exception {
		result.setData("rows", si0200Service.SI0200SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0200SHI1")
	public @ResponseBody Map<String, Object> SI0200SHI1() throws Exception {
		result.setData("rows", si0200Service.SI0200SHI1());
		return result.getResult();
	}
}
