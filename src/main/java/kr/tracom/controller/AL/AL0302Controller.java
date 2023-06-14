package kr.tracom.controller.AL;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
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
}
