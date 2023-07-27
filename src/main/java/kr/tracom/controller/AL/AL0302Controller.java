package kr.tracom.controller.AL;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.AL0302.AL0302Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class AL0302Controller extends ControllerSupport {
	
	@Autowired
	private AL0302Service al0302Service;
	
	@RequestMapping("/al/AL0302G0R0")
	public @ResponseBody Map<String, Object> AL0302G0R0() throws Exception {
		result.setData("rows", al0302Service.AL0302G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302G1R0")
	public @ResponseBody Map<String, Object> AL0302G1R0() throws Exception {
		result.setData("rows", al0302Service.AL0302G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302G1S0")
	public @ResponseBody Map<String, Object> AL0302G1S0() throws Exception {
		Map map = al0302Service.AL0302G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/al/AL0302G1S1")
	public @ResponseBody Map<String, Object> AL0302G1S1() throws Exception {
		Map map = al0302Service.AL0302G1S1();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/al/AL0302SHI0")
	public @ResponseBody Map<String, Object> AL0302SHI0() throws Exception {
		result.setData("rows", al0302Service.AL0302SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302SHI1")
	public @ResponseBody Map<String, Object> AL0302SHI1() throws Exception {
		result.setData("rows", al0302Service.AL0302SHI1());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302G2R0")
	public @ResponseBody Map<String, Object> AL0302G2R0() throws Exception {
		result.setData("rows", al0302Service.AL0302G2R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302G2S0")
	public @ResponseBody Map<String, Object> AL0302G2S0() throws Exception {
		Map map = al0302Service.AL0302G2S0();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/al/AL0302P0R0")
	public @ResponseBody Map<String, Object> AL0302P0R0() throws Exception {
		result.setData("rows", al0302Service.AL0302P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302P1R0")
	public @ResponseBody Map<String, Object> AL0302P1R0() throws Exception {
		result.setData("rows", al0302Service.AL0302P1R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0302G1_exlDownload")
    public String  AL0302G1_exlDownload(HttpServletRequest req , Model model) throws Exception {
	   String allocId = req.getParameter("param");
	   String[] getValues = {"ALLOC_NO","SN", "ROUT_ST_TM", "ST_ROUT_ID", "ST_ROUT_NM", "VHC_ID", "VHC_NO", "DRV_ID", "DRV_NM", "ROUT_GRP",
			   "WAY_DIV", "ST_NODE_ID", "ST_NODE_SN", "ED_ROUT_ID", "ED_ROUT_NM", "ED_NODE_ID", "ED_NODE_SN"};
	   String[] headerTitle = {"배차번호", "순번", "출발시간", "시작노선ID", "운행노선명", "차량ID", "차량번호", "운전자ID", "운전자명", "노선그룹",
			   "상하행", "시작노드ID", "시작운행순번", "종료노선ID", "종료노선명", "종료노드ID", "종료노드순번"};
      
	   model.addAttribute("title", "차량배차정보");
	   model.addAttribute("headerTitle", headerTitle);
	   model.addAttribute("getValues", getValues);
	   model.addAttribute("excelList", al0302Service.AL0302G1_exlDownload(allocId));
	   return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
   }
}
