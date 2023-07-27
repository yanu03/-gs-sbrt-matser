package kr.tracom.controller.AL;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.AL0203.AL0203Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class AL0203Controller extends ControllerSupport{
	
	@Autowired
	private AL0203Service al0203Service;
	
	@RequestMapping("/al/AL0203G0R0")
	public @ResponseBody Map<String, Object> AL0203G0R0() throws Exception {
		result.setData("rows", al0203Service.AL0203G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203SHI0")
	public @ResponseBody Map<String, Object> AL0203SHI0() throws Exception {
		result.setData("rows", al0203Service.AL0203SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203SHI1")
	public @ResponseBody Map<String, Object> AL0203SHI1() throws Exception {
		result.setData("rows", al0203Service.AL0203SHI1());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203G1R0")
	public @ResponseBody Map<String, Object> AL0203G1R0() throws Exception {
		result.setData("rows", al0203Service.AL0203G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203G1R0_CNT")
	public @ResponseBody Map<String, Object> AL0203G1R0_CNT() throws Exception {
		result.setData("rows", al0203Service.AL0203G1CNT());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203G0P1")
	public @ResponseBody Map<String, Object> AL0203G0P1() throws Exception {
		result.setData("rows", al0203Service.AL0203G1CNT());
		return result.getResult();
	}
	

	@RequestMapping("/al/AL0203G1S0")
	public @ResponseBody Map<String, Object> AL0203G1S0() throws Exception {
		Map map = al0203Service.AL0203G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/al/AL0203P0S0")
	public @ResponseBody Map<String, Object> AL0203P0S0() throws Exception {
		Map map = al0203Service.AL0203P0S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/al/AL0203P0R0")
	public @ResponseBody Map<String, Object> AL0203P0R0() throws Exception {
		result.setData("rows", al0203Service.AL0203P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203P1R0")
	public @ResponseBody Map<String, Object> AL0203P1R0() throws Exception {
		result.setData("rows", al0203Service.AL0203P1R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0203G1_exlDownload")
    public String  AL0203G0_exlDownload(HttpServletRequest req , Model model) throws Exception {
	   String allocId = req.getParameter("param1");
	   String allocNo = req.getParameter("param2");
	   String[] getValues = {"ALLOC_ID", "ROUT_ID", "ROUT_NM", "NODE_ID", "NODE_TYPE", "NODE_TYPE_NM", "NODE_NM", "ARRV_TM", "DPRT_TM"};
	   String[] headerTitle = {"����ID", "�뼱ID", "�뼱��", "���ID", "�������", "������� ��", "����", "�����ð�", "��߽ð�"};
      
	   model.addAttribute("title", "�����ȹ��������");
	   model.addAttribute("headerTitle", headerTitle);
	   model.addAttribute("getValues", getValues);
	   model.addAttribute("excelList", al0203Service.AL0203G1_exlDownload(allocId,allocNo));
	   return "ExcelView";
        //return new ModelAndView("ExcelView", "map", result);
   }
	
}
