package kr.tracom.controller.VD;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.VD0100.VD0100Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class VD0100Controller extends ControllerSupport {

	@Autowired
	private VD0100Service vd0100Service;
	
	/*@RequestMapping("/vd/VD0100G0R0")
	public @ResponseBody Map<String, Object> VD0100G0R0() throws Exception {
		result.setData("dlt_BMS_VHC_MST", vd0100Service.VD0100G0R0());
		return result.getResult();
	}*/
	
	@RequestMapping("/vd/VD0100SHI0")
	public @ResponseBody Map<String, Object> VD0100SHI0() throws Exception {
		result.setData("dlt_searchitem", vd0100Service.VD0100SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100SHI1")
	public @ResponseBody Map<String, Object> VD0100SHI1() throws Exception {
		result.setData("dlt_searchitem2", vd0100Service.VD0100SHI1());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100G0R0")
	public @ResponseBody Map<String, Object> VD0100G0R0() throws Exception {
		result.setData("dlt_BMS_DVC_INFO", vd0100Service.VD0100G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100G0K0")
	public @ResponseBody Map<String, Object> VD0100G0K0() throws Exception {
		result.setData("dma_SEQ_BMS_DVC_INFO_0", vd0100Service.VD0100G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/vd/VD0100G0S0")
	public @ResponseBody Map<String, Object> VD0100G0S0() throws Exception {
		Map map = vd0100Service.VD0100G0S0();
		result.setData("dma_result", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/vd/VD0100G0_exlDownload")
    public String  VD0100G0_exlDownload(HttpServletRequest req,Model model) throws Exception {
		String param = req.getParameter("param");
		String vhcName = req.getParameter("name");
		System.out.println(param);
		String[] getValues = {"DVC_ID", "DVC_KIND", "DVC_KIND_NM", "MAKER", "MAKER_NM", "INST_LOC", "INST_LOC_NM"
								, "MNG_ID", "DVC_IP", "TRNS_TYPE", "TRNS_TYPE_NM","REMARK"};
		String[] headerTitle = {"장치 ID", "장치종류", "장치종류명 ", "제조사", "제조사 명", "설치위치", "설치위치 명"
								, "관리 ID", "장치 IP", "통신유형", "통신유형 명", "비고"};
		
		model.addAttribute("title", vhcName+"차내장치정보");
		model.addAttribute("headerTitle", headerTitle);
		model.addAttribute("getValues", getValues);
		model.addAttribute("excelList", vd0100Service.VD0100G0_exlDownload(param));
		return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
	}
}
