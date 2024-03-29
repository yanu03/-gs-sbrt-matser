package kr.tracom.controller.AL;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.AL0203.AL0203Service;
import kr.tracom.service.AL0204.AL0204Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class AL0204Controller extends ControllerSupport{
	
	@Autowired
	private AL0204Service al0204Service;
	
	@RequestMapping("/al/AL0204G0R0")
	public @ResponseBody Map<String, Object> AL0204G0R0() throws Exception {
		result.setData("rows", al0204Service.AL0204G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0204G1R0")
	public @ResponseBody Map<String, Object> AL0204G1R0() throws Exception {
		result.setData("rows", al0204Service.AL0204G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/al/AL0204G1R0_CNT")
	public @ResponseBody Map<String, Object> AL0204G1R0_CNT() throws Exception {
		result.setData("rows", al0204Service.AL0204G1CNT());
		return result.getResult();
	}	
	
	@RequestMapping("/al/AL0204G1S0")
	public @ResponseBody Map<String, Object> AL0203G1S0() throws Exception {
		Map map = al0204Service.AL0204G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
}
