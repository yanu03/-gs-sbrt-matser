package kr.tracom.controller.SI;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.tracom.service.SI0401.SI0401Service;
import kr.tracom.support.ControllerSupport;

@Controller
@Scope("request")
public class SI0401Controller extends ControllerSupport {
	
	@Autowired
	private SI0401Service si0401Service;
	
	@RequestMapping("/si/SI0401G0R0")
	public @ResponseBody Map<String, Object> SI0401G0R0() throws Exception {
		result.setData("rows", si0401Service.SI0401G0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G0K0")
	public @ResponseBody Map<String, Object> SI0401G0R1() throws Exception {
		result.setData("rows", si0401Service.SI0401G0K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401SHI0")
	public @ResponseBody Map<String, Object> SI0401G0R2() throws Exception {
		result.setData("rows", si0401Service.SI0401SHI0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G1R0")
	public @ResponseBody Map<String, Object> SI0401G1R0() throws Exception {
		result.setData("rows", si0401Service.SI0401G1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401G0S0")
	public @ResponseBody Map<String, Object> SI0401G0S0() throws Exception {
		Map map = si0401Service.SI0401G0S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0401G1S0")
	public @ResponseBody Map<String, Object> SI0401G1S0() throws Exception {
		Map map = si0401Service.SI0401G1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}	
	
	@RequestMapping("/si/SI0401P0R0")
	public @ResponseBody Map<String, Object> SI0401P0R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P0R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P1R0")
	public @ResponseBody Map<String, Object> SI0401P1R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P1R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P1K0")
	public @ResponseBody Map<String, Object> SI0401P1K0() throws Exception {
		result.setData("rows", si0401Service.SI0401P1K0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P1S0")
	public @ResponseBody Map<String, Object> SI0401P1S0() throws Exception {
		Map map = si0401Service.SI0401P1S0();
		result.setData("rows", map);
		return result.getResultSave();
	}
	
	@RequestMapping("/si/SI0401P2R0")
	public @ResponseBody Map<String, Object> SI0401P2R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P2R0());
		return result.getResult();
	}
	
	@RequestMapping("/si/SI0401P3R0")
	public @ResponseBody Map<String, Object> SI0401P3R0() throws Exception {
		result.setData("rows", si0401Service.SI0401P3R0());
		return result.getResult();
	}
	

}
